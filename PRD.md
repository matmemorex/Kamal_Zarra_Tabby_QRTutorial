# Product Requirements Document (PRD)
## Tabby Loyalty - QR-Based Customer Registration System

**Version:** 1.0  
**Date:** December 2024  
**Author:** MMG Development Team  
**Status:** Implementation Ready

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Project Overview](#2-project-overview)
3. [Objectives](#3-objectives)
4. [User Personas](#4-user-personas)
5. [User Journey & Flow](#5-user-journey--flow)
6. [Functional Requirements](#6-functional-requirements)
7. [Technical Architecture](#7-technical-architecture)
8. [Database Schema](#8-database-schema)
9. [API Specifications](#9-api-specifications)
10. [Frontend Implementation](#10-frontend-implementation)
11. [Backend Implementation](#11-backend-implementation)
12. [Security & Privacy](#12-security--privacy)
13. [Success Metrics](#13-success-metrics)
14. [Timeline & Milestones](#14-timeline--milestones)
15. [Appendix](#15-appendix)

---

## 1. Executive Summary

### 1.1 Project Description
Tabby Loyalty is a QR code-based customer engagement and loyalty system for Tabby tudung products. Customers scan a unique QR code attached to their purchased tudung, register via phone number with WhatsApp OTP verification, and earn loyalty points and rewards.

### 1.2 Business Goals
- Increase customer engagement post-purchase
- Build customer database for marketing
- Encourage repeat purchases through loyalty rewards
- Create digital wardrobe tracking for customers
- Drive word-of-mouth through referral incentives

### 1.3 Key Features
- **QR Code Product Registration** - Unique code per tudung
- **WhatsApp OTP Authentication** - Passwordless, secure verification
- **Points & Rewards System** - Gamified loyalty program
- **Digital Wardrobe** - Track all registered Tabby products
- **Lucky Draw Entries** - Automatic contest participation
- **Profile Completion Bonus** - Extra rewards for complete profiles

### 1.4 Technology Stack
```
Frontend:
- React.js / Next.js 14+
- Motion One (animations)
- TailwindCSS
- Progressive Web App (PWA)

Backend:
- Node.js 18+
- Next.js API Routes
- MongoDB / PostgreSQL
- WAHA (WhatsApp API)

Infrastructure:
- Vercel / AWS
- MongoDB Atlas / Supabase
- Redis (caching)
- CloudFlare (CDN)
```

---

## 2. Project Overview

### 2.1 Problem Statement
Tabby currently has no direct relationship with end customers after point-of-sale. Without a loyalty system:
- No customer data collected
- No post-purchase engagement
- Difficult to measure product satisfaction
- No mechanism to encourage repeat purchases
- Limited brand loyalty

### 2.2 Solution
A mobile-first web application that allows customers to:
1. Register products via QR code scan
2. Authenticate securely via WhatsApp OTP
3. Earn points for purchases and engagement
4. Track their digital wardrobe
5. Participate in lucky draws
6. Receive personalized offers

### 2.3 Success Criteria
- **Registration Rate:** 40%+ of customers register within 30 days of purchase
- **Completion Rate:** 80%+ of users complete full registration flow
- **Engagement:** 60%+ of users return to check points/rewards
- **Data Quality:** 90%+ of phone numbers valid and verified

---

## 3. Objectives

### 3.1 Primary Objectives
1. **Customer Acquisition**
   - Collect verified phone numbers from 40% of product sales
   - Build database of 10,000+ verified customers in Year 1

2. **Engagement**
   - Average 3+ product registrations per user
   - 60% monthly active user rate

3. **Revenue Impact**
   - 20% increase in repeat purchase rate
   - 15% increase in average order value through loyalty redemption

### 3.2 Secondary Objectives
1. Establish brand preference through rewards
2. Enable data-driven marketing decisions
3. Create referral network for organic growth
4. Build product feedback mechanism

---

## 4. User Personas

### 4.1 Primary Persona: "Sarah the Collector"
**Demographics:**
- Age: 25-35
- Location: Urban Malaysia (Klang Valley, JB, Penang)
- Income: RM 3,000 - RM 6,000
- Tech-savvy, active on social media

**Behaviors:**
- Owns 5-10+ tudungs
- Purchases every 2-3 months
- Follows Tabby on Instagram/TikTok
- Participates in online contests

**Goals:**
- Track her tudung collection
- Get exclusive deals and early access
- Win prizes through lucky draws
- Build status through loyalty tiers

**Pain Points:**
- Forgets warranty details
- Misses limited edition releases
- No rewards for brand loyalty

### 4.2 Secondary Persona: "Aisha the First-Timer"
**Demographics:**
- Age: 18-24
- Student or early career
- Budget-conscious
- New to premium tudungs

**Behaviors:**
- First or second Tabby purchase
- Research-driven buyer
- Skeptical of registration processes
- Values instant gratification

**Goals:**
- Understand product authenticity
- Access warranty easily
- Get value from purchase

**Pain Points:**
- Complicated registration
- Privacy concerns with phone number
- Unclear benefits

---

## 5. User Journey & Flow

### 5.1 Complete User Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     CUSTOMER JOURNEY                         │
└─────────────────────────────────────────────────────────────┘

Step 1: QR Code Scan
├── Customer receives Tabby tudung with QR tag
├── Scans QR code using phone camera
└── Opens: https://tabby.my/o/ABF9K207

Step 2A: System Detection (Backend)
├── System detects QR token: ABF9K207
├── Queries products table for matching token
├── Retrieves: Bawal Satin Luxe - Emerald Green
└── Loads product details + benefits

Step 2B: Landing Page (Not Logged In)
├── Shows welcome message
├── Displays product image & name
├── Lists benefits:
│   ├── 50 Points
│   ├── Digital Warranty
│   └── Lucky Draw Entry
└── CTA: "Daftar dengan Nombor Telefon"

Step 3: Phone Number Entry
├── User enters phone: 012-3456789
├── System normalizes: 60123456789
├── Validates Malaysian number format
└── Triggers OTP generation

Step 4: WhatsApp OTP Delivery
├── Next.js API receives request
├── Generates 6-digit OTP: 738294
├── Creates hash + stores in oldRequests collection
├── Calls WAHA API
├── Sends WhatsApp message:
│   "Kod OTP anda: 738294 - sah 5 minit"
└── User receives message on WhatsApp

Step 5: OTP Verification
├── User enters 6-digit code
├── System validates:
│   ├── Check oldRequests collection
│   ├── Verify hash matches
│   └── Confirm not expired (<5 min)
├── If valid:
│   ├── Create user in users collection
│   ├── Generate JWT session token
│   ├── Set httpOnly cookie
│   ├── Link product in userProducts
│   ├── Add +50 points transaction
│   └── Add +1 lucky draw entry
└── Redirect to dashboard

Step 6: Success Dashboard
├── Display success message
├── Show points earned: +50
├── Show achievements:
│   ├── Digital Wardrobe: 1 tudung
│   ├── Lucky Draw Entries: 1
│   └── Bonus available: Complete profile for +3 entries
└── CTA: "Lengkapkan Profil Sekarang"

Optional: Profile Completion
├── User fills additional info:
│   ├── Full name
│   ├── Email
│   ├── Date of birth
│   └── Preferences
├── System awards:
│   ├── +3 lucky draw entries
│   └── +25 bonus points
└── Unlocks: Personalized recommendations
```

### 5.2 Alternative Flows

**Flow A: Returning User**
```
1. Scan QR → 2. System detects logged-in user
3. Auto-link product → 4. Award points immediately
5. Show updated dashboard
```

**Flow B: Invalid/Used QR Code**
```
1. Scan QR → 2. System detects:
   - QR already registered, OR
   - QR not found in database
3. Show error message
4. Provide customer support contact
```

**Flow C: OTP Timeout/Failure**
```
1. OTP expires (>5 min) → 2. User cannot verify
3. Show "Resend OTP" option
4. Generate new OTP → 5. Retry verification
```

---

## 6. Functional Requirements

### 6.1 QR Code System

**FR-QR-001: QR Code Generation**
- **Description:** System generates unique QR codes for each product
- **Format:** `https://tabby.my/o/{TOKEN}` where TOKEN is 8 alphanumeric characters
- **Requirements:**
  - Token must be unique across all products
  - URL must be scannable by standard camera apps
  - QR code must encode full URL (not just token)
  - Physical tag must be tamper-evident
- **Implementation:**
  ```javascript
  // Generate unique token
  function generateQRToken() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';
    for (let i = 0; i < 8; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
  }
  
  // Generate QR code image
  const QRCode = require('qrcode');
  const url = `https://tabby.my/o/${token}`;
  await QRCode.toFile(`qr-codes/${token}.png`, url);
  ```

**FR-QR-002: QR Code Validation**
- Verify QR token exists in database
- Check if token already registered
- Validate product is active/available
- Track scan timestamp and location

### 6.2 Authentication System

**FR-AUTH-001: Phone Number Entry**
- **Requirements:**
  - Accept Malaysian format: 012-3456789, 0123456789, 12-3456789
  - Normalize to international: 60123456789
  - Validate format: Must be 10-11 digits after normalization
  - Block international numbers (only +60)
- **Implementation:**
  ```javascript
  function normalizePhone(input) {
    // Remove spaces, dashes
    let phone = input.replace(/[-\s]/g, '');
    
    // Remove leading 0 if present
    if (phone.startsWith('0')) {
      phone = phone.substring(1);
    }
    
    // Add country code
    if (!phone.startsWith('60')) {
      phone = '60' + phone;
    }
    
    // Validate length (60 + 9-10 digits)
    if (phone.length < 11 || phone.length > 12) {
      throw new Error('Invalid phone number');
    }
    
    return phone;
  }
  ```

**FR-AUTH-002: OTP Generation**
- **Requirements:**
  - Generate random 6-digit code (100000-999999)
  - Hash OTP before storing (bcrypt, 10 rounds)
  - Set expiry timestamp (5 minutes from generation)
  - Store in oldRequests collection
- **Implementation:**
  ```javascript
  const bcrypt = require('bcryptjs');
  
  async function generateOTP(phone) {
    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    
    // Hash OTP
    const hash = await bcrypt.hash(otp.toString(), 10);
    
    // Store in database
    await db.collection('oldRequests').insertOne({
      phone,
      hash,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      createdAt: new Date()
    });
    
    return otp;
  }
  ```

**FR-AUTH-003: OTP Verification**
- **Requirements:**
  - Verify hash matches stored hash
  - Check expiry timestamp
  - Allow 3 retry attempts
  - Invalidate OTP after successful use
- **Implementation:**
  ```javascript
  async function verifyOTP(phone, inputOTP) {
    const request = await db.collection('oldRequests').findOne({
      phone,
      expiresAt: { $gt: new Date() }
    });
    
    if (!request) {
      throw new Error('OTP expired or not found');
    }
    
    const isValid = await bcrypt.compare(inputOTP, request.hash);
    
    if (!isValid) {
      // Increment retry count
      await db.collection('oldRequests').updateOne(
        { _id: request._id },
        { $inc: { retries: 1 } }
      );
      
      if (request.retries >= 2) {
        await db.collection('oldRequests').deleteOne({ _id: request._id });
        throw new Error('Max retries exceeded');
      }
      
      throw new Error('Invalid OTP');
    }
    
    // Delete used OTP
    await db.collection('oldRequests').deleteOne({ _id: request._id });
    
    return true;
  }
  ```

**FR-AUTH-004: Session Management**
- Create JWT token after successful verification
- Set httpOnly cookie (secure, sameSite)
- Token expires after 30 days
- Store session info in users collection

### 6.3 WhatsApp Integration

**FR-WA-001: WAHA API Integration**
- **Requirements:**
  - Use WAHA (WhatsApp HTTP API)
  - Send OTP via WhatsApp Business API
  - Handle message delivery status
  - Retry failed messages (max 3 attempts)
- **Implementation:**
  ```javascript
  async function sendWhatsAppOTP(phone, otp) {
    const wahaUrl = process.env.WAHA_API_URL;
    const wahaToken = process.env.WAHA_API_TOKEN;
    
    const message = {
      chatId: `${phone}@c.us`,
      text: `Kod OTP anda: ${otp}\n\nKod ini sah untuk 5 minit.\n\nJangan kongsi kod ini dengan sesiapa.\n\n- Tabby Loyalty`
    };
    
    const response = await fetch(`${wahaUrl}/api/sendText`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${wahaToken}`
      },
      body: JSON.stringify(message)
    });
    
    if (!response.ok) {
      throw new Error('Failed to send WhatsApp message');
    }
    
    return await response.json();
  }
  ```

**FR-WA-002: Message Templates**
- OTP Message: Include code + expiry + security warning
- Welcome Message: Sent after successful registration
- Points Update: Notification when points earned

### 6.4 Points & Rewards System

**FR-POINTS-001: Point Allocation**
- **Rules:**
  - Product registration: +50 points
  - Profile completion: +25 points
  - Referral (referrer): +100 points
  - Referral (referee): +50 points
  - Birthday month: 2x points multiplier
  - Review submission: +20 points

**FR-POINTS-002: Points Transactions**
- Track all point movements (credits + debits)
- Store transaction type, amount, timestamp
- Link to related entity (productId, referralId, etc.)
- Calculate running balance

**FR-POINTS-003: Points Redemption**
- Define reward catalog (products, discounts, vouchers)
- Validate sufficient balance before redemption
- Create redemption record
- Deduct points from balance
- Generate redemption code/voucher

### 6.5 Lucky Draw System

**FR-LUCKY-001: Entry Allocation**
- **Rules:**
  - Product registration: +1 entry
  - Profile completion: +3 entries
  - Each RM50 spent: +1 entry (future purchases)
  - Referral: +2 entries
  - Review with photo: +1 entry

**FR-LUCKY-002: Draw Management**
- Admin creates draw campaign (name, prize, end date)
- System automatically includes eligible entries
- Random selection algorithm (provably fair)
- Winner notification via WhatsApp + app
- Prize claim process

### 6.6 Digital Wardrobe

**FR-WARDROBE-001: Product Registration**
- Link product to user account
- Store registration timestamp
- Display in user's wardrobe
- Show product details (name, color, purchase date)

**FR-WARDROBE-002: Warranty Tracking**
- Calculate warranty expiry (1 year from registration)
- Send reminder 30 days before expiry
- Provide digital warranty certificate
- Enable warranty claims through app

---

## 7. Technical Architecture

### 7.1 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
├─────────────────────────────────────────────────────────────┤
│  • React/Next.js Frontend                                    │
│  • Progressive Web App (PWA)                                 │
│  • Motion One Animations                                     │
│  • TailwindCSS Styling                                       │
│  • Local Storage (offline support)                           │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTPS
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER                         │
├─────────────────────────────────────────────────────────────┤
│  • Next.js API Routes                                        │
│  • Authentication Middleware                                 │
│  • Rate Limiting                                             │
│  • Input Validation                                          │
│  • Error Handling                                            │
└─────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    ↓                   ↓
┌──────────────────────────┐  ┌──────────────────────────┐
│    BUSINESS LOGIC        │  │   EXTERNAL SERVICES      │
├──────────────────────────┤  ├──────────────────────────┤
│ • User Service           │  │ • WAHA API               │
│ • Auth Service           │  │   (WhatsApp)             │
│ • Product Service        │  │ • Email Service          │
│ • Points Service         │  │   (SendGrid/Resend)      │
│ • Rewards Service        │  │ • SMS Backup             │
│ • Analytics Service      │  │   (Twilio)               │
└──────────────────────────┘  └──────────────────────────┘
                    │
                    ↓
┌─────────────────────────────────────────────────────────────┐
│                       DATA LAYER                             │
├─────────────────────────────────────────────────────────────┤
│  • MongoDB / PostgreSQL (Primary Database)                   │
│  • Redis (Session Cache, Rate Limiting)                      │
│  • S3 / CloudFlare R2 (Media Storage)                        │
└─────────────────────────────────────────────────────────────┘
```

### 7.2 Technology Choices

**Frontend Framework: Next.js 14+**
- **Why:** 
  - Server-side rendering for SEO
  - API routes for backend logic
  - File-based routing
  - Built-in optimization
  - Easy deployment (Vercel)

**Database: MongoDB**
- **Why:**
  - Flexible schema for evolving requirements
  - JSON-like documents (natural for JavaScript)
  - Good performance for read-heavy operations
  - Easy horizontal scaling
  - Managed service available (MongoDB Atlas)

**Alternative: PostgreSQL**
- **If chosen:**
  - Better for complex queries
  - ACID compliance
  - Relational integrity
  - Use with Prisma ORM

**Caching: Redis**
- **Use cases:**
  - Session storage
  - Rate limiting (OTP requests)
  - Temporary OTP storage (alternative to database)
  - API response caching

**WhatsApp: WAHA (WhatsApp HTTP API)**
- **Why:**
  - Self-hosted WhatsApp Business API
  - No official Meta approval needed
  - Cost-effective
  - Full control over messaging

---

## 8. Database Schema

### 8.1 MongoDB Collections

#### Collection: `users`
```javascript
{
  _id: ObjectId("..."),
  phone: "60123456789",           // Normalized phone number
  fullName: "Sarah Ahmad",         // Optional, from profile completion
  email: "sarah@example.com",      // Optional
  dateOfBirth: ISODate("1995-03-15"), // Optional
  preferences: {
    newsletter: true,
    whatsappUpdates: true,
    categories: ["casual", "formal"]
  },
  profileComplete: true,           // Boolean flag
  createdAt: ISODate("2024-12-01T08:30:00Z"),
  updatedAt: ISODate("2024-12-05T14:20:00Z"),
  
  // Metadata
  metadata: {
    firstScanLocation: "Kuala Lumpur",
    deviceType: "iPhone 14",
    registrationSource: "qr_scan"
  }
}
```

**Indexes:**
- `phone` (unique)
- `email` (unique, sparse)
- `createdAt` (for analytics)

#### Collection: `products`
```javascript
{
  _id: ObjectId("..."),
  qrToken: "ABF9K207",              // Unique 8-char token
  qrCodeUrl: "https://tabby.my/o/ABF9K207",
  
  // Product Details
  name: "Bawal Satin Luxe",
  variant: "Emerald Green",
  sku: "BSL-EMR-001",
  category: "bawal",
  collection: "Satin Luxe 2024",
  
  // Pricing
  retailPrice: 89.00,
  
  // Rewards
  pointsValue: 50,                  // Points awarded on registration
  luckyDrawEntries: 1,              // Entries awarded
  
  // Status
  status: "active",                 // active, discontinued, recalled
  manufacturedDate: ISODate("2024-11-15"),
  warrantyPeriod: 365,              // days
  
  // Inventory
  batchNumber: "BATCH-2024-11-01",
  
  createdAt: ISODate("2024-11-15T10:00:00Z")
}
```

**Indexes:**
- `qrToken` (unique)
- `sku`
- `status`
- `category`

#### Collection: `userProducts`
```javascript
{
  _id: ObjectId("..."),
  userId: ObjectId("..."),          // Reference to users
  productId: ObjectId("..."),       // Reference to products
  
  // Registration Details
  registeredAt: ISODate("2024-12-01T08:35:00Z"),
  scanLocation: "Kuala Lumpur",
  
  // Warranty
  warrantyExpiresAt: ISODate("2025-12-01T08:35:00Z"),
  warrantyStatus: "active",         // active, expired, claimed
  
  // Status
  status: "owned",                  // owned, gifted, returned, lost
  
  // Additional Info
  purchaseDate: ISODate("2024-11-28"), // Optional, user-provided
  purchaseLocation: "Pavilion KL",     // Optional
  giftedFrom: "Aisha Rahman",          // Optional
  notes: "Anniversary gift",           // Optional, user notes
  
  createdAt: ISODate("2024-12-01T08:35:00Z"),
  updatedAt: ISODate("2024-12-01T08:35:00Z")
}
```

**Indexes:**
- `userId` (for user's wardrobe query)
- `productId` (check if product registered)
- Compound: `userId + productId` (unique together)
- `warrantyExpiresAt` (for expiry reminders)

#### Collection: `pointsTransactions`
```javascript
{
  _id: ObjectId("..."),
  userId: ObjectId("..."),
  
  // Transaction Details
  type: "credit",                   // credit, debit
  amount: 50,                       // Positive for credit, negative for debit
  
  // Source
  source: "product_registration",   // product_registration, profile_completion,
                                    // referral, redemption, birthday_bonus,
                                    // admin_adjustment
  
  // Related Entities
  productId: ObjectId("..."),       // If from product registration
  referralId: ObjectId("..."),      // If from referral
  redemptionId: ObjectId("..."),    // If from redemption
  
  // Balance Tracking
  balanceBefore: 0,
  balanceAfter: 50,
  
  // Metadata
  description: "Product registration: Bawal Satin Luxe",
  metadata: {
    productName: "Bawal Satin Luxe",
    variant: "Emerald Green"
  },
  
  createdAt: ISODate("2024-12-01T08:35:00Z")
}
```

**Indexes:**
- `userId` (for user's transaction history)
- `userId + createdAt` (sorted transactions)
- `type`
- `source`

#### Collection: `luckyDrawEntries`
```javascript
{
  _id: ObjectId("..."),
  userId: ObjectId("..."),
  drawId: ObjectId("..."),          // Reference to draws collection
  
  // Entry Details
  entries: 3,                       // Number of entries
  source: "profile_completion",     // product_registration, profile_completion,
                                    // purchase, referral, review
  
  // Related Entities
  productId: ObjectId("..."),       // If from product registration
  
  // Status
  status: "active",                 // active, used, expired
  
  createdAt: ISODate("2024-12-01T08:35:00Z")
}
```

**Indexes:**
- `userId + drawId`
- `drawId + status` (for draw selection)
- `userId` (user's total entries)

#### Collection: `draws`
```javascript
{
  _id: ObjectId("..."),
  
  // Draw Details
  name: "Year-End Mega Draw 2024",
  description: "Win a trip to Dubai + RM10,000 shopping vouchers",
  
  // Prizes
  prizes: [
    {
      place: 1,
      description: "Dubai Trip + RM10,000 vouchers",
      value: 15000
    },
    {
      place: 2,
      description: "RM5,000 vouchers",
      value: 5000
    }
  ],
  
  // Schedule
  startDate: ISODate("2024-11-01"),
  endDate: ISODate("2024-12-31"),
  drawDate: ISODate("2025-01-05"),
  
  // Status
  status: "active",                 // active, completed, cancelled
  
  // Results (after draw)
  winners: [
    {
      userId: ObjectId("..."),
      place: 1,
      notifiedAt: ISODate("2025-01-05T15:00:00Z")
    }
  ],
  
  // Stats
  totalEntries: 15420,
  totalParticipants: 3205,
  
  createdAt: ISODate("2024-11-01"),
  completedAt: ISODate("2025-01-05")
}
```

**Indexes:**
- `status`
- `endDate`
- `drawDate`

#### Collection: `oldRequests` (OTP Storage)
```javascript
{
  _id: ObjectId("..."),
  phone: "60123456789",
  hash: "$2a$10$...",               // Bcrypt hash of OTP
  
  // Expiry
  expiresAt: ISODate("2024-12-05T08:40:00Z"), // 5 minutes from creation
  
  // Retry Tracking
  retries: 0,                       // Increments on failed attempts
  maxRetries: 3,
  
  // Metadata
  ipAddress: "1.2.3.4",
  userAgent: "Mozilla/5.0...",
  
  createdAt: ISODate("2024-12-05T08:35:00Z")
}
```

**Indexes:**
- `phone + expiresAt` (find valid OTP)
- `expiresAt` (TTL index to auto-delete expired)

#### Collection: `sessions`
```javascript
{
  _id: ObjectId("..."),
  userId: ObjectId("..."),
  token: "jwt_token_string",
  
  // Session Details
  ipAddress: "1.2.3.4",
  userAgent: "Mozilla/5.0...",
  deviceType: "mobile",
  deviceName: "iPhone 14",
  
  // Expiry
  expiresAt: ISODate("2025-01-05T08:35:00Z"), // 30 days
  
  // Status
  active: true,
  lastActivityAt: ISODate("2024-12-05T14:20:00Z"),
  
  createdAt: ISODate("2024-12-05T08:35:00Z")
}
```

**Indexes:**
- `token` (unique)
- `userId`
- `expiresAt` (TTL index)

### 8.2 PostgreSQL Schema (Alternative)

If using PostgreSQL with Prisma:

```prisma
// schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id                String             @id @default(cuid())
  phone             String             @unique
  fullName          String?
  email             String?            @unique
  dateOfBirth       DateTime?
  profileComplete   Boolean            @default(false)
  createdAt         DateTime           @default(now())
  updatedAt         DateTime           @updatedAt
  
  // Relations
  products          UserProduct[]
  points            PointsTransaction[]
  luckyDrawEntries  LuckyDrawEntry[]
  sessions          Session[]
  
  @@index([phone])
  @@index([createdAt])
}

model Product {
  id                String        @id @default(cuid())
  qrToken           String        @unique
  qrCodeUrl         String
  name              String
  variant           String
  sku               String
  category          String
  retailPrice       Decimal       @db.Decimal(10, 2)
  pointsValue       Int
  luckyDrawEntries  Int
  status            String        @default("active")
  createdAt         DateTime      @default(now())
  
  // Relations
  registrations     UserProduct[]
  
  @@index([qrToken])
  @@index([sku])
  @@index([status])
}

model UserProduct {
  id                String    @id @default(cuid())
  userId            String
  productId         String
  registeredAt      DateTime  @default(now())
  warrantyExpiresAt DateTime
  warrantyStatus    String    @default("active")
  status            String    @default("owned")
  
  // Relations
  user              User      @relation(fields: [userId], references: [id])
  product           Product   @relation(fields: [productId], references: [id])
  
  @@unique([userId, productId])
  @@index([userId])
  @@index([productId])
}

model PointsTransaction {
  id            String    @id @default(cuid())
  userId        String
  type          String    // credit, debit
  amount        Int
  source        String
  balanceBefore Int
  balanceAfter  Int
  description   String
  createdAt     DateTime  @default(now())
  
  // Relations
  user          User      @relation(fields: [userId], references: [id])
  
  @@index([userId, createdAt])
  @@index([source])
}

model LuckyDrawEntry {
  id          String   @id @default(cuid())
  userId      String
  drawId      String
  entries     Int
  source      String
  status      String   @default("active")
  createdAt   DateTime @default(now())
  
  // Relations
  user        User     @relation(fields: [userId], references: [id])
  draw        Draw     @relation(fields: [drawId], references: [id])
  
  @@index([userId, drawId])
  @@index([drawId, status])
}

model Draw {
  id                String           @id @default(cuid())
  name              String
  description       String
  startDate         DateTime
  endDate           DateTime
  drawDate          DateTime
  status            String           @default("active")
  totalEntries      Int              @default(0)
  createdAt         DateTime         @default(now())
  
  // Relations
  entries           LuckyDrawEntry[]
  
  @@index([status])
  @@index([endDate])
}

model OTPRequest {
  id         String   @id @default(cuid())
  phone      String
  hash       String
  expiresAt  DateTime
  retries    Int      @default(0)
  createdAt  DateTime @default(now())
  
  @@index([phone, expiresAt])
}

model Session {
  id             String   @id @default(cuid())
  userId         String
  token          String   @unique
  ipAddress      String
  userAgent      String
  expiresAt      DateTime
  active         Boolean  @default(true)
  lastActivityAt DateTime @default(now())
  createdAt      DateTime @default(now())
  
  // Relations
  user           User     @relation(fields: [userId], references: [id])
  
  @@index([token])
  @@index([userId])
}
```

---

## 9. API Specifications

### 9.1 API Endpoints

#### Base URL
```
Production: https://tabby.my/api
Staging: https://staging.tabby.my/api
Development: http://localhost:3000/api
```

#### Authentication
All protected endpoints require JWT token in cookie or Authorization header:
```
Cookie: session=<jwt_token>
OR
Authorization: Bearer <jwt_token>
```

---

### 9.2 Public Endpoints

#### `GET /api/products/:token`
**Description:** Get product details by QR token

**Request:**
```
GET /api/products/ABF9K207
```

**Response (200):**
```json
{
  "success": true,
  "product": {
    "id": "64a7f8e9c1234567890abcdef",
    "name": "Bawal Satin Luxe",
    "variant": "Emerald Green",
    "category": "bawal",
    "retailPrice": 89.00,
    "pointsValue": 50,
    "luckyDrawEntries": 1,
    "image": "https://cdn.tabby.my/products/bawal-satin-emerald.jpg",
    "isRegistered": false
  }
}
```

**Response (404):**
```json
{
  "success": false,
  "error": "Product not found"
}
```

**Response (409):**
```json
{
  "success": false,
  "error": "Product already registered",
  "registeredAt": "2024-12-01T08:35:00Z"
}
```

**Implementation:**
```javascript
// pages/api/products/[token].js
export default async function handler(req, res) {
  const { token } = req.query;
  
  try {
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
        id: product._id,
        name: product.name,
        variant: product.variant,
        category: product.category,
        retailPrice: product.retailPrice,
        pointsValue: product.pointsValue,
        luckyDrawEntries: product.luckyDrawEntries,
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
```

---

#### `POST /api/auth/send-otp`
**Description:** Send OTP to phone via WhatsApp

**Request:**
```json
{
  "phone": "012-3456789"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "OTP sent successfully",
  "expiresIn": 300
}
```

**Response (429):**
```json
{
  "success": false,
  "error": "Too many requests. Please try again in 60 seconds."
}
```

**Implementation:**
```javascript
// pages/api/auth/send-otp.js
import { normalizePhone } from '@/lib/utils';
import { generateOTP } from '@/lib/auth';
import { sendWhatsAppOTP } from '@/lib/whatsapp';
import { rateLimit } from '@/lib/rate-limit';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { phone } = req.body;
    
    // Normalize phone
    const normalizedPhone = normalizePhone(phone);
    
    // Rate limiting (3 requests per hour per phone)
    const rateLimitResult = await rateLimit.check(normalizedPhone, {
      limit: 3,
      window: 3600
    });
    
    if (!rateLimitResult.success) {
      return res.status(429).json({
        success: false,
        error: 'Too many requests. Please try again later.',
        retryAfter: rateLimitResult.retryAfter
      });
    }
    
    // Generate OTP
    const otp = await generateOTP(normalizedPhone);
    
    // Send via WhatsApp
    await sendWhatsAppOTP(normalizedPhone, otp);
    
    return res.json({
      success: true,
      message: 'OTP sent successfully',
      expiresIn: 300
    });
    
  } catch (error) {
    console.error('Error sending OTP:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to send OTP'
    });
  }
}
```

---

#### `POST /api/auth/verify-otp`
**Description:** Verify OTP and create session

**Request:**
```json
{
  "phone": "012-3456789",
  "otp": "738294",
  "productToken": "ABF9K207"
}
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "64a7f8e9c1234567890abcdef",
    "phone": "60123456789",
    "isNew": true,
    "profileComplete": false
  },
  "product": {
    "id": "64a7f8e9c1234567890abcdef",
    "registered": true,
    "pointsEarned": 50,
    "luckyDrawEntries": 1
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (400):**
```json
{
  "success": false,
  "error": "Invalid or expired OTP"
}
```

**Implementation:**
```javascript
// pages/api/auth/verify-otp.js
import { verifyOTP, createSession } from '@/lib/auth';
import { normalizePhone } from '@/lib/utils';
import { registerProduct, awardPoints, addLuckyDrawEntries } from '@/lib/rewards';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { phone, otp, productToken } = req.body;
    
    // Normalize phone
    const normalizedPhone = normalizePhone(phone);
    
    // Verify OTP
    const isValid = await verifyOTP(normalizedPhone, otp);
    
    if (!isValid) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or expired OTP'
      });
    }
    
    // Find or create user
    let user = await db.collection('users').findOne({
      phone: normalizedPhone
    });
    
    const isNewUser = !user;
    
    if (!user) {
      user = await db.collection('users').insertOne({
        phone: normalizedPhone,
        profileComplete: false,
        createdAt: new Date()
      });
    }
    
    // Register product
    const product = await db.collection('products').findOne({
      qrToken: productToken
    });
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }
    
    // Register product to user
    await registerProduct(user._id, product._id);
    
    // Award points
    await awardPoints(user._id, product.pointsValue, 'product_registration', {
      productId: product._id
    });
    
    // Add lucky draw entries
    await addLuckyDrawEntries(user._id, product.luckyDrawEntries, 'product_registration', {
      productId: product._id
    });
    
    // Create session
    const token = await createSession(user._id);
    
    // Set cookie
    res.setHeader('Set-Cookie', `session=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=2592000`);
    
    return res.json({
      success: true,
      user: {
        id: user._id,
        phone: user.phone,
        isNew: isNewUser,
        profileComplete: user.profileComplete || false
      },
      product: {
        id: product._id,
        registered: true,
        pointsEarned: product.pointsValue,
        luckyDrawEntries: product.luckyDrawEntries
      },
      token
    });
    
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return res.status(500).json({
      success: false,
      error: 'Verification failed'
    });
  }
}
```

---

### 9.3 Protected Endpoints (Require Authentication)

#### `GET /api/user/dashboard`
**Description:** Get user's dashboard data

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "64a7f8e9c1234567890abcdef",
    "phone": "60123456789",
    "fullName": "Sarah Ahmad",
    "profileComplete": true
  },
  "stats": {
    "totalPoints": 175,
    "productsOwned": 3,
    "luckyDrawEntries": 7,
    "tier": "Silver"
  },
  "recentProducts": [
    {
      "id": "64a7f8e9c1234567890abcdef",
      "name": "Bawal Satin Luxe",
      "variant": "Emerald Green",
      "registeredAt": "2024-12-01T08:35:00Z",
      "warrantyExpiresAt": "2025-12-01T08:35:00Z"
    }
  ],
  "activeDraws": [
    {
      "id": "64a7f8e9c1234567890abcdef",
      "name": "Year-End Mega Draw 2024",
      "endDate": "2024-12-31",
      "myEntries": 7,
      "totalEntries": 15420
    }
  ]
}
```

**Implementation:**
```javascript
// pages/api/user/dashboard.js
import { authenticate } from '@/lib/middleware';

export default authenticate(async function handler(req, res) {
  const { userId } = req.user;
  
  try {
    // Get user
    const user = await db.collection('users').findOne({
      _id: userId
    });
    
    // Calculate total points
    const pointsResult = await db.collection('pointsTransactions')
      .aggregate([
        { $match: { userId } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ])
      .toArray();
    
    const totalPoints = pointsResult[0]?.total || 0;
    
    // Count products
    const productsCount = await db.collection('userProducts')
      .countDocuments({ userId });
    
    // Count lucky draw entries
    const entriesResult = await db.collection('luckyDrawEntries')
      .aggregate([
        { $match: { userId, status: 'active' } },
        { $group: { _id: null, total: { $sum: '$entries' } } }
      ])
      .toArray();
    
    const luckyDrawEntries = entriesResult[0]?.total || 0;
    
    // Get recent products
    const recentProducts = await db.collection('userProducts')
      .aggregate([
        { $match: { userId } },
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
            { $match: { userId, drawId: draw._id, status: 'active' } },
            { $group: { _id: null, total: { $sum: '$entries' } } }
          ])
          .toArray();
        
        return {
          id: draw._id,
          name: draw.name,
          endDate: draw.endDate,
          myEntries: entries[0]?.total || 0,
          totalEntries: draw.totalEntries
        };
      })
    );
    
    return res.json({
      success: true,
      user: {
        id: user._id,
        phone: user.phone,
        fullName: user.fullName,
        profileComplete: user.profileComplete
      },
      stats: {
        totalPoints,
        productsOwned: productsCount,
        luckyDrawEntries,
        tier: calculateTier(totalPoints)
      },
      recentProducts: recentProducts.map(rp => ({
        id: rp.product._id,
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
});

function calculateTier(points) {
  if (points >= 1000) return 'Gold';
  if (points >= 500) return 'Silver';
  return 'Bronze';
}
```

---

#### `GET /api/user/wardrobe`
**Description:** Get user's registered products (digital wardrobe)

**Response (200):**
```json
{
  "success": true,
  "products": [
    {
      "id": "64a7f8e9c1234567890abcdef",
      "name": "Bawal Satin Luxe",
      "variant": "Emerald Green",
      "category": "bawal",
      "image": "https://cdn.tabby.my/products/bawal-satin-emerald.jpg",
      "registeredAt": "2024-12-01T08:35:00Z",
      "warranty": {
        "status": "active",
        "expiresAt": "2025-12-01T08:35:00Z",
        "daysRemaining": 361
      }
    }
  ],
  "totalProducts": 3
}
```

---

#### `GET /api/user/points`
**Description:** Get user's points history

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)

**Response (200):**
```json
{
  "success": true,
  "currentBalance": 175,
  "transactions": [
    {
      "id": "64a7f8e9c1234567890abcdef",
      "type": "credit",
      "amount": 50,
      "source": "product_registration",
      "description": "Product registration: Bawal Satin Luxe",
      "balanceAfter": 50,
      "createdAt": "2024-12-01T08:35:00Z"
    },
    {
      "id": "64a7f8e9c1234567890abcdef",
      "type": "credit",
      "amount": 25,
      "source": "profile_completion",
      "description": "Profile completion bonus",
      "balanceAfter": 75,
      "createdAt": "2024-12-01T09:15:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 7,
    "pages": 1
  }
}
```

---

#### `PUT /api/user/profile`
**Description:** Update user profile

**Request:**
```json
{
  "fullName": "Sarah Ahmad",
  "email": "sarah@example.com",
  "dateOfBirth": "1995-03-15",
  "preferences": {
    "newsletter": true,
    "whatsappUpdates": true,
    "categories": ["casual", "formal"]
  }
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "rewards": {
    "pointsEarned": 25,
    "luckyDrawEntriesEarned": 3
  },
  "user": {
    "id": "64a7f8e9c1234567890abcdef",
    "phone": "60123456789",
    "fullName": "Sarah Ahmad",
    "email": "sarah@example.com",
    "profileComplete": true
  }
}
```

**Implementation:**
```javascript
// pages/api/user/profile.js
import { authenticate } from '@/lib/middleware';
import { awardPoints, addLuckyDrawEntries } from '@/lib/rewards';

export default authenticate(async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { userId } = req.user;
  const { fullName, email, dateOfBirth, preferences } = req.body;
  
  try {
    // Get current user
    const user = await db.collection('users').findOne({ _id: userId });
    
    const wasProfileComplete = user.profileComplete;
    
    // Update user
    const updateData = {
      fullName,
      email,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
      preferences,
      profileComplete: true,
      updatedAt: new Date()
    };
    
    await db.collection('users').updateOne(
      { _id: userId },
      { $set: updateData }
    );
    
    // Award bonus if profile wasn't complete before
    let rewards = { pointsEarned: 0, luckyDrawEntriesEarned: 0 };
    
    if (!wasProfileComplete) {
      await awardPoints(userId, 25, 'profile_completion');
      await addLuckyDrawEntries(userId, 3, 'profile_completion');
      
      rewards = {
        pointsEarned: 25,
        luckyDrawEntriesEarned: 3
      };
    }
    
    return res.json({
      success: true,
      message: 'Profile updated successfully',
      rewards,
      user: {
        id: userId,
        phone: user.phone,
        fullName,
        email,
        profileComplete: true
      }
    });
    
  } catch (error) {
    console.error('Error updating profile:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to update profile'
    });
  }
});
```

---

#### `POST /api/user/logout`
**Description:** Logout user and invalidate session

**Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

**Implementation:**
```javascript
// pages/api/user/logout.js
import { authenticate } from '@/lib/middleware';

export default authenticate(async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { userId, sessionId } = req.user;
  
  try {
    // Invalidate session
    await db.collection('sessions').updateOne(
      { _id: sessionId },
      { $set: { active: false } }
    );
    
    // Clear cookie
    res.setHeader('Set-Cookie', 'session=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0');
    
    return res.json({
      success: true,
      message: 'Logged out successfully'
    });
    
  } catch (error) {
    console.error('Error logging out:', error);
    return res.status(500).json({
      success: false,
      error: 'Logout failed'
    });
  }
});
```

---

### 9.4 Admin Endpoints

#### `POST /api/admin/draws/create`
**Description:** Create new lucky draw campaign (Admin only)

**Request:**
```json
{
  "name": "Year-End Mega Draw 2024",
  "description": "Win a trip to Dubai + RM10,000 shopping vouchers",
  "prizes": [
    {
      "place": 1,
      "description": "Dubai Trip + RM10,000 vouchers",
      "value": 15000
    }
  ],
  "startDate": "2024-11-01",
  "endDate": "2024-12-31",
  "drawDate": "2025-01-05"
}
```

---

#### `POST /api/admin/draws/:id/select-winners`
**Description:** Run draw algorithm and select winners (Admin only)

**Response (200):**
```json
{
  "success": true,
  "winners": [
    {
      "place": 1,
      "userId": "64a7f8e9c1234567890abcdef",
      "userName": "Sarah Ahmad",
      "phone": "60123456789",
      "entries": 7
    }
  ]
}
```

---

## 10. Frontend Implementation

### 10.1 Project Structure

```
tabby-loyalty/
├── public/
│   ├── icons/
│   ├── images/
│   └── manifest.json (PWA)
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Navigation.jsx
│   │   ├── auth/
│   │   │   ├── PhoneInput.jsx
│   │   │   ├── OTPInput.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── product/
│   │   │   ├── ProductCard.jsx
│   │   │   ├── WardrobeItem.jsx
│   │   │   └── BenefitsList.jsx
│   │   ├── dashboard/
│   │   │   ├── PointsCard.jsx
│   │   │   ├── StatsCard.jsx
│   │   │   └── LuckyDrawCard.jsx
│   │   └── ui/
│   │       ├── Button.jsx
│   │       ├── Input.jsx
│   │       ├── Modal.jsx
│   │       └── Loading.jsx
│   ├── pages/
│   │   ├── index.jsx (Homepage/Hero)
│   │   ├── o/
│   │   │   └── [token].jsx (QR Landing)
│   │   ├── auth/
│   │   │   ├── phone.jsx
│   │   │   └── verify.jsx
│   │   ├── dashboard/
│   │   │   └── index.jsx
│   │   ├── wardrobe/
│   │   │   └── index.jsx
│   │   ├── points/
│   │   │   └── index.jsx
│   │   ├── profile/
│   │   │   └── index.jsx
│   │   └── api/ (API Routes)
│   ├── lib/
│   │   ├── api.js (API client)
│   │   ├── auth.js (Auth utilities)
│   │   ├── db.js (Database connection)
│   │   ├── utils.js (Utilities)
│   │   ├── whatsapp.js (WAHA integration)
│   │   └── rewards.js (Points/rewards logic)
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useUser.js
│   │   └── usePoints.js
│   ├── styles/
│   │   └── globals.css
│   └── context/
│       └── AuthContext.jsx
├── next.config.js
├── package.json
└── tailwind.config.js
```

### 10.2 Key Components

#### Phone Input Component
```javascript
// src/components/auth/PhoneInput.jsx
import { useState } from 'react';

export default function PhoneInput({ onSubmit, loading }) {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate phone format
    const phoneRegex = /^0?1[0-9]{8,9}$/;
    if (!phoneRegex.test(phone.replace(/[-\s]/g, ''))) {
      setError('Nombor telefon tidak sah');
      return;
    }
    
    try {
      await onSubmit(phone);
    } catch (err) {
      setError(err.message);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">
          Nombor Telefon
        </label>
        <div className="flex gap-3">
          <div className="bg-gray-100 px-4 py-3 rounded-lg font-semibold">
            +60
          </div>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="12-3456789"
            className="flex-1 px-4 py-3 border rounded-lg"
            disabled={loading}
          />
        </div>
        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50"
      >
        {loading ? 'Menghantar...' : 'Hantar OTP'}
      </button>
    </form>
  );
}
```

#### OTP Input Component
```javascript
// src/components/auth/OTPInput.jsx
import { useState, useRef, useEffect } from 'react';

export default function OTPInput({ onComplete, loading }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);
  
  const handleChange = (index, value) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    
    // Check if complete
    if (newOtp.every(digit => digit !== '')) {
      onComplete(newOtp.join(''));
    }
  };
  
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    
    if (!/^\d+$/.test(pastedData)) return;
    
    const newOtp = pastedData.split('').concat(Array(6).fill('')).slice(0, 6);
    setOtp(newOtp);
    
    // Focus last filled input
    const lastIndex = Math.min(pastedData.length, 5);
    inputRefs.current[lastIndex]?.focus();
    
    if (newOtp.every(digit => digit !== '')) {
      onComplete(newOtp.join(''));
    }
  };
  
  return (
    <div className="flex gap-3 justify-center" onPaste={handlePaste}>
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={el => inputRefs.current[index] = el}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          disabled={loading}
          className="w-12 h-14 text-center text-2xl font-bold border-2 border-purple-300 rounded-lg focus:border-purple-600 focus:outline-none disabled:opacity-50"
        />
      ))}
    </div>
  );
}
```

#### Dashboard Stats Card
```javascript
// src/components/dashboard/StatsCard.jsx
export default function StatsCard({ icon, label, value, trend }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-600 text-sm mb-1">{label}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p className="text-sm text-green-600 mt-2">
              ↑ {trend}
            </p>
          )}
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );
}
```

### 10.3 Page Implementations

#### QR Landing Page
```javascript
// src/pages/o/[token].jsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { motion } from 'motion';
import ProductCard from '@/components/product/ProductCard';
import BenefitsList from '@/components/product/BenefitsList';

export default function QRLandingPage() {
  const router = useRouter();
  const { token } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (!token) return;
    
    fetchProduct();
  }, [token]);
  
  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${token}`);
      const data = await res.json();
      
      if (!data.success) {
        setError(data.error);
        return;
      }
      
      setProduct(data.product);
    } catch (err) {
      setError('Failed to load product');
    } finally {
      setLoading(false);
    }
  };
  
  const handleRegister = () => {
    // Store token in session for use after auth
    sessionStorage.setItem('productToken', token);
    router.push('/auth/phone');
  };
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
    </div>;
  }
  
  if (error) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p className="text-red-600 text-lg mb-4">{error}</p>
        <button onClick={() => router.push('/')} className="text-purple-600">
          Kembali ke Laman Utama
        </button>
      </div>
    </div>;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 p-6">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold text-center mb-6">
            Selamat datang ke<br />Tabby Loyalty
          </h1>
          
          <ProductCard product={product} />
          
          <div className="bg-white rounded-2xl p-6 my-6 shadow-lg">
            <h3 className="font-bold text-lg mb-4">Daftar & Dapat:</h3>
            <BenefitsList
              benefits={[
                { icon: '⭐', text: `${product.pointsValue} Points` },
                { icon: '🛡️', text: 'Waranti Digital' },
                { icon: '🎲', text: `${product.luckyDrawEntries} Lucky Draw Entry` }
              ]}
            />
          </div>
          
          <button
            onClick={handleRegister}
            className="w-full bg-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-purple-700 shadow-lg"
          >
            Daftar dengan Nombor Telefon
          </button>
        </motion.div>
      </div>
    </div>
  );
}
```

#### Dashboard Page
```javascript
// src/pages/dashboard/index.jsx
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import StatsCard from '@/components/dashboard/StatsCard';
import PointsCard from '@/components/dashboard/PointsCard';
import LuckyDrawCard from '@/components/dashboard/LuckyDrawCard';

export default function DashboardPage() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchDashboard();
  }, []);
  
  const fetchDashboard = async () => {
    try {
      const res = await fetch('/api/user/dashboard');
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error('Error fetching dashboard:', err);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6">
        <h1 className="text-2xl font-bold mb-2">
          Selamat datang, {user.fullName || user.phone}!
        </h1>
        <p className="opacity-90">Tier: {data.stats.tier}</p>
      </div>
      
      {/* Stats Grid */}
      <div className="p-6 grid grid-cols-2 gap-4">
        <StatsCard
          icon="⭐"
          label="Total Points"
          value={data.stats.totalPoints}
        />
        <StatsCard
          icon="👗"
          label="Produk"
          value={data.stats.productsOwned}
        />
        <StatsCard
          icon="🎲"
          label="Lucky Draw"
          value={data.stats.luckyDrawEntries}
        />
        <StatsCard
          icon="🏆"
          label="Tier"
          value={data.stats.tier}
        />
      </div>
      
      {/* Recent Products */}
      <div className="px-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Produk Terkini</h2>
        <div className="space-y-3">
          {data.recentProducts.map(product => (
            <div key={product.id} className="bg-white rounded-xl p-4 shadow">
              <p className="font-semibold">{product.name}</p>
              <p className="text-sm text-gray-600">{product.variant}</p>
              <p className="text-xs text-gray-500 mt-2">
                Didaftar: {new Date(product.registeredAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Active Draws */}
      {data.activeDraws.length > 0 && (
        <div className="px-6">
          <h2 className="text-xl font-bold mb-4">Lucky Draw Aktif</h2>
          <div className="space-y-3">
            {data.activeDraws.map(draw => (
              <LuckyDrawCard key={draw.id} draw={draw} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

---

## 11. Backend Implementation

### 11.1 Core Services

#### Auth Service
```javascript
// src/lib/auth.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectDB } from './db';

const JWT_SECRET = process.env.JWT_SECRET;

export async function generateOTP(phone) {
  const otp = Math.floor(100000 + Math.random() * 900000);
  const hash = await bcrypt.hash(otp.toString(), 10);
  
  const db = await connectDB();
  
  // Delete old OTP requests for this phone
  await db.collection('oldRequests').deleteMany({ phone });
  
  // Store new OTP
  await db.collection('oldRequests').insertOne({
    phone,
    hash,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    retries: 0,
    createdAt: new Date()
  });
  
  return otp;
}

export async function verifyOTP(phone, inputOTP) {
  const db = await connectDB();
  
  const request = await db.collection('oldRequests').findOne({
    phone,
    expiresAt: { $gt: new Date() }
  });
  
  if (!request) {
    return false;
  }
  
  const isValid = await bcrypt.compare(inputOTP, request.hash);
  
  if (!isValid) {
    // Increment retry count
    await db.collection('oldRequests').updateOne(
      { _id: request._id },
      { $inc: { retries: 1 } }
    );
    
    // Delete if max retries exceeded
    if (request.retries >= 2) {
      await db.collection('oldRequests').deleteOne({ _id: request._id });
    }
    
    return false;
  }
  
  // Delete used OTP
  await db.collection('oldRequests').deleteOne({ _id: request._id });
  
  return true;
}

export async function createSession(userId) {
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '30d' });
  
  const db = await connectDB();
  
  await db.collection('sessions').insertOne({
    userId,
    token,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    active: true,
    createdAt: new Date()
  });
  
  return token;
}

export async function verifySession(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    const db = await connectDB();
    
    const session = await db.collection('sessions').findOne({
      token,
      active: true,
      expiresAt: { $gt: new Date() }
    });
    
    if (!session) {
      return null;
    }
    
    // Update last activity
    await db.collection('sessions').updateOne(
      { _id: session._id },
      { $set: { lastActivityAt: new Date() } }
    );
    
    return decoded.userId;
  } catch (error) {
    return null;
  }
}
```

#### Rewards Service
```javascript
// src/lib/rewards.js
import { connectDB } from './db';
import { ObjectId } from 'mongodb';

export async function registerProduct(userId, productId) {
  const db = await connectDB();
  
  // Check if already registered
  const existing = await db.collection('userProducts').findOne({
    productId: new ObjectId(productId)
  });
  
  if (existing) {
    throw new Error('Product already registered');
  }
  
  // Get product details
  const product = await db.collection('products').findOne({
    _id: new ObjectId(productId)
  });
  
  if (!product) {
    throw new Error('Product not found');
  }
  
  // Register product
  const warrantyExpiresAt = new Date();
  warrantyExpiresAt.setDate(warrantyExpiresAt.getDate() + product.warrantyPeriod);
  
  await db.collection('userProducts').insertOne({
    userId: new ObjectId(userId),
    productId: new ObjectId(productId),
    registeredAt: new Date(),
    warrantyExpiresAt,
    warrantyStatus: 'active',
    status: 'owned',
    createdAt: new Date(),
    updatedAt: new Date()
  });
  
  return true;
}

export async function awardPoints(userId, amount, source, metadata = {}) {
  const db = await connectDB();
  
  // Get current balance
  const result = await db.collection('pointsTransactions')
    .aggregate([
      { $match: { userId: new ObjectId(userId) } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ])
    .toArray();
  
  const balanceBefore = result[0]?.total || 0;
  const balanceAfter = balanceBefore + amount;
  
  // Create transaction
  await db.collection('pointsTransactions').insertOne({
    userId: new ObjectId(userId),
    type: 'credit',
    amount,
    source,
    balanceBefore,
    balanceAfter,
    description: getPointsDescription(source, metadata),
    metadata,
    createdAt: new Date()
  });
  
  return balanceAfter;
}

export async function addLuckyDrawEntries(userId, entries, source, metadata = {}) {
  const db = await connectDB();
  
  // Get active draws
  const activeDraws = await db.collection('draws')
    .find({
      status: 'active',
      endDate: { $gte: new Date() }
    })
    .toArray();
  
  // Add entries to each active draw
  for (const draw of activeDraws) {
    await db.collection('luckyDrawEntries').insertOne({
      userId: new ObjectId(userId),
      drawId: draw._id,
      entries,
      source,
      status: 'active',
      metadata,
      createdAt: new Date()
    });
    
    // Update draw total entries
    await db.collection('draws').updateOne(
      { _id: draw._id },
      { $inc: { totalEntries: entries } }
    );
  }
  
  return true;
}

function getPointsDescription(source, metadata) {
  const descriptions = {
    'product_registration': `Product registration: ${metadata.productName || 'Product'}`,
    'profile_completion': 'Profile completion bonus',
    'referral': 'Referral bonus',
    'birthday_bonus': 'Birthday month bonus',
    'review': 'Product review bonus',
    'redemption': `Redemption: ${metadata.rewardName || 'Reward'}`
  };
  
  return descriptions[source] || source;
}

export async function getUserBalance(userId) {
  const db = await connectDB();
  
  const result = await db.collection('pointsTransactions')
    .aggregate([
      { $match: { userId: new ObjectId(userId) } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ])
    .toArray();
  
  return result[0]?.total || 0;
}
```

#### WhatsApp Service
```javascript
// src/lib/whatsapp.js

const WAHA_API_URL = process.env.WAHA_API_URL;
const WAHA_SESSION = process.env.WAHA_SESSION || 'default';

export async function sendWhatsAppOTP(phone, otp) {
  const message = {
    chatId: `${phone}@c.us`,
    text: `Kod OTP anda: *${otp}*\n\nKod ini sah untuk 5 minit.\n\nJangan kongsi kod ini dengan sesiapa.\n\n- Tabby Loyalty`
  };
  
  try {
    const response = await fetch(`${WAHA_API_URL}/api/sendText`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        session: WAHA_SESSION,
        ...message
      })
    });
    
    if (!response.ok) {
      throw new Error(`WAHA API error: ${response.statusText}`);
    }
    
    const result = await response.json();
    return result;
    
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    throw error;
  }
}

export async function sendWelcomeMessage(phone, userName) {
  const message = {
    chatId: `${phone}@c.us`,
    text: `Selamat datang ke Tabby Loyalty, ${userName}! 🎉\n\nTerima kasih kerana menyertai program kami. Anda kini boleh:\n\n✨ Kumpul points\n🎁 Tebus hadiah\n🎲 Sertai lucky draw\n\nJemput lengkapkan profil anda untuk dapatkan bonus tambahan!`
  };
  
  try {
    await fetch(`${WAHA_API_URL}/api/sendText`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        session: WAHA_SESSION,
        ...message
      })
    });
  } catch (error) {
    console.error('Error sending welcome message:', error);
    // Don't throw - welcome message is not critical
  }
}

export async function sendPointsNotification(phone, points, reason) {
  const message = {
    chatId: `${phone}@c.us`,
    text: `🎉 Tahniah! Anda dapat *${points} points*\n\nSebab: ${reason}\n\nBaki semasa: Check di app Tabby Loyalty`
  };
  
  try {
    await fetch(`${WAHA_API_URL}/api/sendText`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        session: WAHA_SESSION,
        ...message
      })
    });
  } catch (error) {
    console.error('Error sending points notification:', error);
  }
}
```

### 11.2 Middleware

#### Authentication Middleware
```javascript
// src/lib/middleware.js
import { verifySession } from './auth';

export function authenticate(handler) {
  return async (req, res) => {
    // Get token from cookie or Authorization header
    const token = req.cookies.session || 
                  req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }
    
    // Verify session
    const userId = await verifySession(token);
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Invalid or expired session'
      });
    }
    
    // Add user info to request
    req.user = { userId };
    
    // Call the actual handler
    return handler(req, res);
  };
}

export function adminOnly(handler) {
  return authenticate(async (req, res) => {
    const db = await connectDB();
    
    const user = await db.collection('users').findOne({
      _id: new ObjectId(req.user.userId)
    });
    
    if (!user || user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Admin access required'
      });
    }
    
    return handler(req, res);
  });
}
```

#### Rate Limiting
```javascript
// src/lib/rate-limit.js
import { connectDB } from './db';

const RATE_LIMITS = {
  'otp-send': { limit: 3, window: 3600 },      // 3 per hour
  'otp-verify': { limit: 5, window: 300 },     // 5 per 5 minutes
  'api-general': { limit: 100, window: 60 }    // 100 per minute
};

export async function checkRateLimit(identifier, type = 'api-general') {
  const db = await connectDB();
  const { limit, window } = RATE_LIMITS[type];
  
  const key = `ratelimit:${type}:${identifier}`;
  const now = Date.now();
  const windowStart = now - (window * 1000);
  
  // Get requests in current window
  const requests = await db.collection('rateLimits').find({
    key,
    timestamp: { $gt: new Date(windowStart) }
  }).toArray();
  
  if (requests.length >= limit) {
    const oldestRequest = requests[0];
    const retryAfter = Math.ceil((oldestRequest.timestamp.getTime() + (window * 1000) - now) / 1000);
    
    return {
      success: false,
      retryAfter
    };
  }
  
  // Add new request
  await db.collection('rateLimits').insertOne({
    key,
    timestamp: new Date()
  });
  
  // Clean up old requests
  await db.collection('rateLimits').deleteMany({
    timestamp: { $lt: new Date(windowStart) }
  });
  
  return {
    success: true,
    remaining: limit - requests.length - 1
  };
}
```

---

## 12. Security & Privacy

### 12.1 Security Measures

**Authentication:**
- JWT tokens with 30-day expiration
- HttpOnly cookies for web security
- Session invalidation on logout
- bcrypt hashing for OTP (10 rounds)

**Data Protection:**
- Phone numbers normalized and stored securely
- No plain-text OTP storage
- HTTPS only (TLS 1.3)
- CORS restrictions

**Rate Limiting:**
- OTP requests: 3 per hour per phone
- OTP verification: 5 attempts per 5 minutes
- API requests: 100 per minute per IP

**Input Validation:**
- Phone number format validation
- OTP format validation (6 digits only)
- SQL/NoSQL injection prevention
- XSS prevention (sanitize inputs)

### 12.2 Privacy Compliance

**Data Collection:**
- Minimal data collection (phone, name, email optional)
- Clear consent before data collection
- Purpose limitation (loyalty program only)

**User Rights:**
- Right to access data (dashboard)
- Right to update profile
- Right to delete account
- Right to opt-out of communications

**Data Retention:**
- Active users: Indefinite
- Inactive users (2+ years): Anonymize
- Deleted accounts: 30-day grace period

**Third-Party Sharing:**
- No data sold to third parties
- WAHA for OTP delivery only
- Analytics anonymized

### 12.3 PDPA Compliance (Malaysia)

**Personal Data Protection Act 2010:**
- ✅ Notice & Choice: Users informed of data collection
- ✅ Disclosure: Privacy policy provided
- ✅ Security: Appropriate safeguards implemented
- ✅ Retention: Data kept only as long as necessary
- ✅ Data Integrity: Accuracy maintained
- ✅ Access: Users can view/update their data
- ✅ Correction: Users can correct errors

---

## 13. Success Metrics

### 13.1 Key Performance Indicators (KPIs)

**Acquisition Metrics:**
- Registration Rate: Target 40% of customers
- Completion Rate: Target 80% (phone → verified)
- Time to Register: Average < 3 minutes

**Engagement Metrics:**
- Monthly Active Users (MAU): Target 60%
- Products per User: Target 3+
- Profile Completion: Target 70%
- Return Visit Rate: Target 3+ per month

**Revenue Metrics:**
- Repeat Purchase Rate: +20% increase
- Average Order Value: +15% increase
- Redemption Rate: 30% of points redeemed

**Operational Metrics:**
- OTP Delivery Success: >95%
- API Response Time: <500ms p95
- System Uptime: 99.9%

### 13.2 Analytics Tracking

**Events to Track:**
```javascript
// User events
- 'qr_scanned' { product_id, location }
- 'phone_entered' { }
- 'otp_sent' { }
- 'otp_verified' { duration }
- 'registration_completed' { is_new_user }
- 'profile_completed' { }

// Engagement events
- 'dashboard_viewed' { }
- 'wardrobe_viewed' { }
- 'points_checked' { }
- 'product_viewed' { product_id }

// Transaction events
- 'points_earned' { amount, source }
- 'points_redeemed' { amount, reward_id }
- 'lucky_draw_entered' { draw_id, entries }
```

**Tools:**
- Google Analytics 4
- Mixpanel (user behavior)
- Sentry (error tracking)
- LogRocket (session replay)

---

## 14. Timeline & Milestones

### 14.1 Development Phases

**Phase 1: MVP (4 weeks)**
Week 1-2: Core Authentication
- QR code system
- Phone input + OTP verification
- WhatsApp integration
- User creation

Week 3-4: Basic Loyalty Features
- Product registration
- Points system
- Basic dashboard
- Profile management

**Phase 2: Enhanced Features (3 weeks)**
Week 5-6: Advanced Loyalty
- Lucky draw system
- Digital wardrobe
- Points redemption
- Tier system

Week 7: Admin Dashboard
- User management
- Draw management
- Analytics dashboard

**Phase 3: Polish & Launch (2 weeks)**
Week 8: Testing & QA
- End-to-end testing
- Performance optimization
- Security audit
- Bug fixes

Week 9: Launch Prep
- Staging deployment
- User acceptance testing
- Marketing materials
- Production deployment

### 14.2 Post-Launch Roadmap

**Month 2-3:**
- Referral system
- Birthday rewards
- Push notifications
- Review system

**Month 4-6:**
- Tier benefits enhancement
- Partner rewards program
- Community features
- Gamification elements

---

## 15. Appendix

### 15.1 Environment Variables

```bash
# Database
DATABASE_URL=mongodb://localhost:27017/tabby-loyalty
# OR for PostgreSQL:
# DATABASE_URL=postgresql://user:pass@localhost:5432/tabby

# Redis (optional)
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-secret-key-change-in-production

# WAHA (WhatsApp)
WAHA_API_URL=http://localhost:3000
WAHA_SESSION=default

# Next.js
NEXT_PUBLIC_API_URL=https://tabby.my

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Sentry (Error Tracking)
SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
```

### 15.2 Deployment Checklist

**Pre-Deployment:**
- [ ] Environment variables configured
- [ ] Database backups enabled
- [ ] SSL certificate installed
- [ ] DNS configured
- [ ] CDN configured
- [ ] Error tracking setup
- [ ] Analytics integrated

**Security:**
- [ ] Rate limiting active
- [ ] CORS configured
- [ ] Security headers set
- [ ] Input validation implemented
- [ ] SQL injection prevention
- [ ] XSS prevention

**Performance:**
- [ ] Database indexes created
- [ ] API response caching
- [ ] Image optimization
- [ ] Code minification
- [ ] Gzip compression

**Monitoring:**
- [ ] Uptime monitoring
- [ ] Error alerts
- [ ] Performance monitoring
- [ ] Database monitoring
- [ ] Log aggregation

### 15.3 Testing Strategy

**Unit Tests:**
- Auth functions (OTP generation/verification)
- Points calculation
- Phone normalization
- Rewards logic

**Integration Tests:**
- API endpoints
- Database operations
- WhatsApp integration
- Session management

**End-to-End Tests:**
- Complete registration flow
- Product registration
- Points earning
- Profile completion

**Load Tests:**
- 100 concurrent OTP requests
- 1000 concurrent dashboard loads
- Database query performance

### 15.4 Support & Maintenance

**Customer Support:**
- WhatsApp support channel
- Email support
- FAQ section
- Tutorial videos

**Maintenance Schedule:**
- Database backups: Daily
- Security updates: Weekly
- Feature releases: Bi-weekly
- Performance reviews: Monthly

### 15.5 Glossary

- **QR Token:** 8-character unique identifier for product
- **OTP:** One-Time Password for authentication
- **WAHA:** WhatsApp HTTP API
- **JWT:** JSON Web Token for session management
- **Lucky Draw:** Contest with random winner selection
- **Digital Wardrobe:** User's collection of registered products
- **Points Transaction:** Record of points earned/spent
- **Tier:** User level based on points (Bronze/Silver/Gold)

---

## Document Control

**Version History:**
- v1.0 (2024-12-05): Initial PRD

**Approvals:**
- [ ] Product Manager
- [ ] Technical Lead
- [ ] Business Stakeholder
- [ ] Legal/Compliance

**Next Review Date:** 2025-01-05

---

**End of Document**
