import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { MongoClient, ObjectId } from 'mongodb';

// Phone normalization utility
function normalizePhone(input) {
  let phone = input.replace(/[-\s()]/g, '');
  if (phone.startsWith('0')) {
    phone = phone.substring(1);
  }
  if (!phone.startsWith('60')) {
    phone = '60' + phone;
  }
  if (phone.length < 11 || phone.length > 12) {
    throw new Error('Invalid phone number format');
  }
  return phone;
}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'tabby-loyalty';
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

let clientPromise;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    const client = new MongoClient(MONGODB_URI);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  const client = new MongoClient(MONGODB_URI);
  clientPromise = client.connect();
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { phone, otp, productToken } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({
        success: false,
        error: 'Phone and OTP are required'
      });
    }

    // Normalize phone
    const normalizedPhone = normalizePhone(phone);

    // Verify OTP
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const request = await db.collection('oldRequests').findOne({
      phone: normalizedPhone,
      expiresAt: { $gt: new Date() }
    });

    if (!request) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or expired OTP'
      });
    }

    const isValid = await bcrypt.compare(otp.toString(), request.hash);

    if (!isValid) {
      // Increment retry count
      await db.collection('oldRequests').updateOne(
        { _id: request._id },
        { $inc: { retries: 1 } }
      );

      if (request.retries >= 2) {
        await db.collection('oldRequests').deleteOne({ _id: request._id });
        return res.status(400).json({
          success: false,
          error: 'Max retries exceeded. Please request a new OTP.'
        });
      }

      return res.status(400).json({
        success: false,
        error: 'Invalid OTP'
      });
    }

    // Delete used OTP
    await db.collection('oldRequests').deleteOne({ _id: request._id });

    // Find or create user
    let user = await db.collection('users').findOne({
      phone: normalizedPhone
    });

    const isNewUser = !user;

    if (!user) {
      const result = await db.collection('users').insertOne({
        phone: normalizedPhone,
        profileComplete: false,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      user = { _id: result.insertedId, phone: normalizedPhone, profileComplete: false };
    }

    // Register product if token provided
    let productData = null;
    if (productToken) {
      const product = await db.collection('products').findOne({
        qrToken: productToken
      });

      if (product) {
        // Check if already registered
        const existing = await db.collection('userProducts').findOne({
          productId: product._id
        });

        if (!existing) {
          // Register product
          const warrantyExpiresAt = new Date();
          warrantyExpiresAt.setDate(warrantyExpiresAt.getDate() + (product.warrantyPeriod || 365));

          await db.collection('userProducts').insertOne({
            userId: user._id,
            productId: product._id,
            registeredAt: new Date(),
            warrantyExpiresAt,
            warrantyStatus: 'active',
            status: 'owned',
            createdAt: new Date(),
            updatedAt: new Date()
          });

          // Award points
          if (product.pointsValue) {
            const pointsResult = await db.collection('pointsTransactions')
              .aggregate([
                { $match: { userId: user._id } },
                { $group: { _id: null, total: { $sum: '$amount' } } }
              ])
              .toArray();

            const balanceBefore = pointsResult[0]?.total || 0;
            const balanceAfter = balanceBefore + product.pointsValue;

            await db.collection('pointsTransactions').insertOne({
              userId: user._id,
              type: 'credit',
              amount: product.pointsValue,
              source: 'product_registration',
              balanceBefore,
              balanceAfter,
              description: `Product registration: ${product.name}`,
              productId: product._id,
              createdAt: new Date()
            });
          }

          // Add lucky draw entries
          if (product.luckyDrawEntries) {
            const activeDraws = await db.collection('draws')
              .find({
                status: 'active',
                endDate: { $gte: new Date() }
              })
              .toArray();

            for (const draw of activeDraws) {
              await db.collection('luckyDrawEntries').insertOne({
                userId: user._id,
                drawId: draw._id,
                entries: product.luckyDrawEntries,
                source: 'product_registration',
                status: 'active',
                productId: product._id,
                createdAt: new Date()
              });

              await db.collection('draws').updateOne(
                { _id: draw._id },
                { $inc: { totalEntries: product.luckyDrawEntries } }
              );
            }
          }

          productData = {
            id: product._id.toString(),
            registered: true,
            pointsEarned: product.pointsValue || 0,
            luckyDrawEntries: product.luckyDrawEntries || 0
          };
        }
      }
    }

    // Create session
    const token = jwt.sign({ userId: user._id.toString() }, JWT_SECRET, { expiresIn: '30d' });

    await db.collection('sessions').insertOne({
      userId: user._id,
      token,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      active: true,
      createdAt: new Date(),
      lastActivityAt: new Date(),
      ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      userAgent: req.headers['user-agent']
    });

    // Set cookie
    res.setHeader('Set-Cookie', `session=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=2592000`);

    return res.json({
      success: true,
      user: {
        id: user._id.toString(),
        phone: user.phone,
        isNew: isNewUser,
        profileComplete: user.profileComplete || false
      },
      product: productData,
      token
    });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Verification failed'
    });
  }
}

