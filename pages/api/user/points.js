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

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const client = await clientPromise;
    const db = client.db(DB_NAME);

    // Calculate current balance
    const balanceResult = await db.collection('pointsTransactions')
      .aggregate([
        { $match: { userId: new ObjectId(userId) } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ])
      .toArray();

    const currentBalance = balanceResult[0]?.total || 0;

    // Get transactions
    const transactions = await db.collection('pointsTransactions')
      .find({ userId: new ObjectId(userId) })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await db.collection('pointsTransactions')
      .countDocuments({ userId: new ObjectId(userId) });

    return res.json({
      success: true,
      currentBalance,
      transactions: transactions.map(t => ({
        id: t._id.toString(),
        type: t.type,
        amount: t.amount,
        source: t.source,
        description: t.description,
        balanceAfter: t.balanceAfter,
        createdAt: t.createdAt
      })),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching points:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to load points'
    });
  }
}

