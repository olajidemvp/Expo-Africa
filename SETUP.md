# ExpoAfrica Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy `.env.example` to `.env.local` and update the values:

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-super-secret-jwt-key-here-change-this-in-production"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-here-change-this-in-production"
```

### 3. Set Up the Database

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Open Prisma Studio to view/edit data
npx prisma studio
```

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Features Implemented

### ✅ User Management
- **Talent Registration**: Comprehensive form with skills, languages, experience
- **Organization Registration**: Company details, industry, location
- **Authentication**: JWT-based auth with secure cookies
- **Login/Logout**: Separate flows for talent and organizations

### ✅ Job Board
- **Browse Jobs**: Filter by category, type, location, remote status
- **Search**: Full-text search across titles, companies, descriptions
- **Job Categories**: Sales, Translation, Events, Marketing, Tech, Photography, etc.

### ✅ Talent Discovery
- **Browse Professionals**: Filter by skills, experience, location, availability
- **Verified Profiles**: Badge system for verified professionals
- **Rating System**: 5-star rating display
- **Skills & Languages**: Comprehensive skill and language proficiency display

### ✅ UI/UX Features
- **Responsive Design**: Mobile-first, works on all devices
- **Modern Interface**: Clean, professional design with Tailwind CSS
- **Accessibility**: WCAG compliant with keyboard navigation
- **Performance**: Optimized with Next.js 15 and React 19
- **SEO Ready**: Meta tags and semantic HTML

## Database Schema

### Organizations
- Company information and verification
- Job posting management
- Application review

### Local Staff (Talent)
- Professional profiles with comprehensive details
- Skills and language proficiency
- Portfolio and social links
- Availability and rates

### Jobs
- Job postings with detailed requirements
- Categories and types
- Location and remote options
- Skills and experience requirements

### Applications
- Status tracking (pending, reviewing, shortlisted, etc.)
- Cover letters
- Communication history

### Messages
- Application-specific messaging
- Read/unread status
- Sender identification

## API Routes

### Authentication
- `POST /api/auth/register` - Register new user (talent or organization)
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user details

### Future Endpoints (To Be Implemented)
- `GET /api/jobs` - List jobs with filters
- `POST /api/jobs` - Create job posting
- `GET /api/jobs/[id]` - Get job details
- `POST /api/applications` - Apply for job
- `GET /api/applications` - List user's applications
- `PATCH /api/applications/[id]` - Update application status
- `GET /api/messages` - Get messages
- `POST /api/messages` - Send message

## Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: SQLite (dev), PostgreSQL ready (production)
- **ORM**: Prisma
- **Authentication**: JWT with jose library
- **Password Hashing**: SHA-256

## Production Deployment

### Environment Variables
Set these in your production environment:

```env
DATABASE_URL="postgresql://user:password@host:5432/database"
JWT_SECRET="generate-a-strong-random-secret"
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="generate-another-strong-random-secret"
```

### Database Setup
```bash
# Run migrations
npx prisma db push

# Or use migrations for production
npx prisma migrate deploy
```

### Build and Deploy
```bash
npm run build
npm start
```

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# View database in Prisma Studio
npx prisma studio

# Reset database (WARNING: Deletes all data)
npx prisma db push --force-reset
```

## Project Structure

```
expo-africa/
├── app/
│   ├── about/              # About page
│   ├── api/
│   │   └── auth/          # Authentication endpoints
│   ├── components/        # Reusable components
│   ├── jobs/              # Job browsing page
│   ├── lib/               # Utilities (auth, prisma, hash)
│   ├── login/             # Login page
│   ├── register/          # Registration page
│   ├── talent/            # Talent browsing page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── prisma/
│   └── schema.prisma      # Database schema
├── public/                # Static files
└── package.json           # Dependencies
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For issues or questions, please open an issue on GitHub.

## License

MIT License - See LICENSE file for details
