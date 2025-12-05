import bcrypt from 'bcryptjs';
import { MongoClient } from 'mongodb';

// Phone normalization utilities
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

function validatePhone(phone) {
  const cleaned = phone.replace(/[-\s()]/g, '');
  const regex = /^0?1[0-9]{8,9}$/;
  return regex.test(cleaned);
}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'tabby-loyalty';
const WAHA_API_URL = process.env.WAHA_API_URL || 'http://localhost:3000';

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

async function sendWhatsAppOTP(phone, otp) {
  try {
    const response = await fetch(`${WAHA_API_URL}/api/sendText`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session: process.env.WAHA_SESSION || 'default',
        chatId: `${phone}@c.us`,
        text: `Kod OTP anda: *${otp}*\n\nKod ini sah untuk 5 minit.\n\nJangan kongsi kod ini dengan sesiapa.\n\n- Tabby Loyalty`
      })
    });

    if (!response.ok) {
      throw new Error(`WAHA API error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    // In development, log the OTP instead
    if (process.env.NODE_ENV === 'development') {
      console.log(`[DEV] OTP for ${phone}: ${otp}`);
    }
    throw error;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        success: false,
        error: 'Phone number is required'
      });
    }

    // Validate phone format
    if (!validatePhone(phone)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid phone number format'
      });
    }

    // Normalize phone
    const normalizedPhone = normalizePhone(phone);

    // Rate limiting check (simple in-memory for now)
    // In production, use Redis or database

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    const hash = await bcrypt.hash(otp.toString(), 10);

    // Store in database
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    // Delete old OTP requests for this phone
    await db.collection('oldRequests').deleteMany({ phone: normalizedPhone });

    // Store new OTP
    await db.collection('oldRequests').insertOne({
      phone: normalizedPhone,
      hash,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
      retries: 0,
      createdAt: new Date(),
      ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      userAgent: req.headers['user-agent']
    });

    // Send via WhatsApp
    try {
      await sendWhatsAppOTP(normalizedPhone, otp);
    } catch (error) {
      // In development, still return success
      if (process.env.NODE_ENV === 'development') {
        console.log(`[DEV] Would send OTP ${otp} to ${normalizedPhone}`);
      } else {
        throw error;
      }
    }

    return res.json({
      success: true,
      message: 'OTP sent successfully',
      expiresIn: 300
    });
  } catch (error) {
    console.error('Error sending OTP:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to send OTP'
    });
  }
}

