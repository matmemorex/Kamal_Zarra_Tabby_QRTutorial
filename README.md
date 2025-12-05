# Tabby Loyalty - QR-Based Customer Registration System

A beautiful, mobile-first loyalty program for Tabby tudung products. Customers scan QR codes, register via WhatsApp OTP, and earn points and rewards.

## Features

- 📱 **QR Code Registration** - Scan unique QR codes on products
- 🔐 **WhatsApp OTP Authentication** - Secure passwordless login
- ⭐ **Points & Rewards** - Earn points for registrations and engagement
- 👗 **Digital Wardrobe** - Track all registered Tabby products
- 🎲 **Lucky Draw** - Automatic contest participation
- 🎨 **Beautiful UI** - Modern design inspired by animejs.com

## Tech Stack

- **Frontend:** Next.js 14, React, Motion (animations), TailwindCSS
- **Backend:** Next.js API Routes, MongoDB
- **Authentication:** JWT, WhatsApp OTP via WAHA
- **Styling:** TailwindCSS with custom gradients

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or MongoDB Atlas)
- WAHA API (for WhatsApp OTP) - optional in development

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file:
```env
MONGODB_URI=mongodb://localhost:27017
DB_NAME=tabby-loyalty
JWT_SECRET=your-secret-key-change-in-production
WAHA_API_URL=http://localhost:3000
WAHA_SESSION=default
NEXT_PUBLIC_API_URL=http://localhost:3000
```

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── pages/
│   ├── api/          # API routes
│   ├── auth/         # Authentication pages
│   ├── dashboard/    # User dashboard
│   ├── wardrobe/     # Digital wardrobe
│   ├── points/       # Points history
│   └── o/[token].jsx # QR landing page
├── components/       # React components
├── lib/              # Utilities and API client
└── styles/           # Global styles
```

## User Flow

1. **Scan QR Code** → `/o/[token]`
2. **Enter Phone** → `/auth/phone`
3. **Verify OTP** → `/auth/verify`
4. **Dashboard** → `/dashboard`

## Development Notes

- In development mode, OTPs are logged to console instead of sending via WhatsApp
- MongoDB connection is cached for better performance
- All API routes include error handling and validation

## License

Proprietary - MMG Development Team

