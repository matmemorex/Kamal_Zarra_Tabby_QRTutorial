import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'tabby-loyalty';

let client;
let clientPromise;

if (!MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(MONGODB_URI);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(MONGODB_URI);
  clientPromise = client.connect();
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token } = req.query;

  if (!token) {
    return res.status(400).json({
      success: false,
      error: 'Token is required'
    });
  }

  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    // Find product
    const product = await db.collection('products').findOne({
      qrToken: token,
      status: 'active'
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    // Check if already registered
    const registration = await db.collection('userProducts').findOne({
      productId: product._id
    });

    if (registration) {
      return res.status(409).json({
        success: false,
        error: 'Product already registered',
        registeredAt: registration.registeredAt
      });
    }

    return res.json({
      success: true,
      product: {
        id: product._id.toString(),
        name: product.name,
        variant: product.variant,
        category: product.category,
        retailPrice: product.retailPrice,
        pointsValue: product.pointsValue,
        luckyDrawEntries: product.luckyDrawEntries,
        image: product.image || null,
        isRegistered: false
      }
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}

