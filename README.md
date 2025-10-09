# ExpoAfrica

A job board platform connecting international organizations with skilled local professionals in Nigeria. Find sales agents, translators, event coordinators, and more.

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

### Database Setup (Production)
1. Set up PostgreSQL database
2. Update `DATABASE_URL` in environment variables
3. Run migrations: `npx prisma db push`

### Environment Variables (Production)
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Strong random string for JWT signing
- `NEXTAUTH_URL`: Your domain URL
- `NEXTAUTH_SECRET`: NextAuth.js secret

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
