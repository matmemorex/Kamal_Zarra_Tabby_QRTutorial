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

    const products = await db.collection('userProducts')
      .aggregate([
        { $match: { userId: new ObjectId(userId) } },
        { $sort: { registeredAt: -1 } },
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

    return res.json({
      success: true,
      products: products.map(p => ({
        id: p.product._id.toString(),
        name: p.product.name,
        variant: p.product.variant,
        category: p.product.category,
        image: p.product.image || null,
        registeredAt: p.registeredAt,
        warranty: {
          status: p.warrantyStatus,
          expiresAt: p.warrantyExpiresAt
        }
      })),
      totalProducts: products.length
    });
  } catch (error) {
    console.error('Error fetching wardrobe:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to load wardrobe'
    });
  }
}

