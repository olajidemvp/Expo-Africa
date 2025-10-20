# ExpoAfrica

A premium talent marketplace connecting international exhibitions and conferences with skilled local professionals across 5 African countries (Nigeria, Kenya, Ghana, South Africa, and Egypt). Find sales agents, translators, event coordinators, and more.

## 🚀 Quick Deploy

Deploy your own instance in minutes:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/olajidemvp/Expo-Africa&env=DATABASE_URL,DIRECT_DATABASE_URL,JWT_SECRET,NEXTAUTH_SECRET,NEXTAUTH_URL&envDescription=Required%20environment%20variables%20for%20ExpoAfrica&envLink=https://github.com/olajidemvp/Expo-Africa/blob/main/DEPLOYMENT.md)

**New to deployment?** Follow our guides:
- 📘 [5-Minute Quick Deploy Guide](./QUICKSTART-DEPLOY.md) - **Start here!**
- 📗 [Complete Deployment Guide](./DEPLOYMENT.md) - Detailed instructions
- 📕 [Setup Guide](./SETUP.md) - Local development setup

## Features

### For Organizations
- Post job opportunities
- Browse and filter local talent
- Manage applications and communications
- Verified organization accounts

### For Local Staff
- Browse international job opportunities
- Apply for positions with cover letters
- Track application status
- Direct communication with organizations

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: SQLite (development), PostgreSQL (production ready)
- **Authentication**: JWT tokens

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd expo-africa
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration.

4. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

### Organizations
- Company information and verification status
- Job posting management
- Application review capabilities

### Local Staff
- Professional profiles with skills and experience
- Application tracking
- Communication tools

### Job Postings
- Categorized opportunities (Sales, Translation, Events, etc.)
- Skill requirements and location details
- Application management

### Applications
- Status tracking (Pending, Reviewing, Shortlisted, etc.)
- Cover letter support
- Messaging system

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Jobs
- `GET /api/jobs` - List job postings (with filters)
- `POST /api/jobs` - Create job posting (organizations only)

### Applications
- `GET /api/applications` - List applications (filtered by user)
- `POST /api/applications` - Apply for job (local staff only)
- `PATCH /api/applications/[id]` - Update application status (organizations only)

### Messages
- `GET /api/messages` - Get messages for application
- `POST /api/messages` - Send message

## User Types

### Organization Registration
- Company name and description
- Industry and country information
- Contact details and website
- Verification process

### Local Staff Registration
- Personal and contact information
- Skills and language capabilities
- Experience and portfolio
- Location details

## Development

### Database Commands
```bash
# Generate Prisma client
npx prisma generate

# Push schema changes
npx prisma db push

# View database
npx prisma studio

# Reset database
npx prisma db push --force-reset
```

### Adding New Features
1. Update Prisma schema if needed
2. Create/update API routes
3. Build frontend components
4. Test functionality

## Deployment

### ⚡ Quick Deploy (Recommended)
See our [Quick Deploy Guide](./QUICKSTART-DEPLOY.md) for 5-minute deployment to Vercel.

### 📚 Full Deployment Guides
- **Vercel** (Recommended): See [DEPLOYMENT.md](./DEPLOYMENT.md#-recommended-deploy-to-vercel)
- **Netlify** (Alternative): See [DEPLOYMENT.md](./DEPLOYMENT.md#-alternative-deploy-to-netlify)

### Required Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `DIRECT_DATABASE_URL`: Direct PostgreSQL URL (for migrations)
- `JWT_SECRET`: Strong random string (generate with `openssl rand -base64 32`)
- `NEXTAUTH_URL`: Your deployment URL
- `NEXTAUTH_SECRET`: Another strong random string

### Recommended Database Providers (All have free tiers)
- **Vercel Postgres** - Easiest, integrated with Vercel
- **Neon** - Generous free tier, serverless PostgreSQL
- **Supabase** - Includes auth and storage
- **Railway** - Simple setup

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
