import { MongoClient, ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';

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

async function authenticate(req) {
  const token = req.cookies.session || 
                req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const session = await db.collection('sessions').findOne({
      token,
      active: true,
      expiresAt: { $gt: new Date() }
    });

    if (!session) {
      return null;
    }

    return decoded.userId;
  } catch (error) {
    return null;
  }
}

function calculateTier(points) {
  if (points >= 1000) return 'Gold';
  if (points >= 500) return 'Silver';
  return 'Bronze';
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const userId = await authenticate(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);

    // Get user
    const user = await db.collection('users').findOne({
      _id: new ObjectId(userId)
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Calculate total points
    const pointsResult = await db.collection('pointsTransactions')
      .aggregate([
        { $match: { userId: new ObjectId(userId) } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ])
      .toArray();

    const totalPoints = pointsResult[0]?.total || 0;

    // Count products
    const productsCount = await db.collection('userProducts')
      .countDocuments({ userId: new ObjectId(userId) });

    // Count lucky draw entries
    const entriesResult = await db.collection('luckyDrawEntries')
      .aggregate([
        { $match: { userId: new ObjectId(userId), status: 'active' } },
        { $group: { _id: null, total: { $sum: '$entries' } } }
      ])
      .toArray();

    const luckyDrawEntries = entriesResult[0]?.total || 0;

    // Get recent products
    const recentProducts = await db.collection('userProducts')
      .aggregate([
        { $match: { userId: new ObjectId(userId) } },
        { $sort: { registeredAt: -1 } },
        { $limit: 3 },
        {
          $lookup: {
            from: 'products',
            localField: 'productId',
            foreignField: '_id',
            as: 'product'
          }
        },
        { $unwind: '$product' }
      ])
      .toArray();

    // Get active draws
    const activeDraws = await db.collection('draws')
      .find({
        status: 'active',
        endDate: { $gte: new Date() }
      })
      .toArray();

    // Get user's entries for each draw
    const drawsWithEntries = await Promise.all(
      activeDraws.map(async (draw) => {
        const entries = await db.collection('luckyDrawEntries')
          .aggregate([
            { $match: { userId: new ObjectId(userId), drawId: draw._id, status: 'active' } },
            { $group: { _id: null, total: { $sum: '$entries' } } }
          ])
          .toArray();

        return {
          id: draw._id.toString(),
          name: draw.name,
          endDate: draw.endDate,
          myEntries: entries[0]?.total || 0,
          totalEntries: draw.totalEntries || 0
        };
      })
    );

    return res.json({
      success: true,
      user: {
        id: user._id.toString(),
        phone: user.phone,
        fullName: user.fullName,
        profileComplete: user.profileComplete || false
      },
      stats: {
        totalPoints,
        productsOwned: productsCount,
        luckyDrawEntries,
        tier: calculateTier(totalPoints)
      },
      recentProducts: recentProducts.map(rp => ({
        id: rp.product._id.toString(),
        name: rp.product.name,
        variant: rp.product.variant,
        registeredAt: rp.registeredAt,
        warrantyExpiresAt: rp.warrantyExpiresAt
      })),
      activeDraws: drawsWithEntries
    });
  } catch (error) {
    console.error('Error fetching dashboard:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to load dashboard'
    });
  }
}

