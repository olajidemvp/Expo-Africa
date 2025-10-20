# 🚀 Deployment Guide for ExpoAfrica

This guide will help you deploy your ExpoAfrica platform to **Vercel** (recommended) or **Netlify**.

---

## ⭐ **Recommended: Deploy to Vercel**

Vercel is the **best choice** because:
- ✅ Made by the creators of Next.js
- ✅ Zero configuration needed
- ✅ Automatic HTTPS and CDN
- ✅ Free tier includes everything you need
- ✅ Built-in PostgreSQL database option

### **Step 1: Set Up Database**

Choose one of these **FREE** PostgreSQL providers:

#### **Option A: Vercel Postgres** (Easiest, Recommended)
1. Go to [Vercel Dashboard](https://vercel.com)
2. Click "Storage" → "Create Database" → "Postgres"
3. Copy the connection strings (you'll get both `DATABASE_URL` and `DIRECT_DATABASE_URL`)

#### **Option B: Neon** (Generous Free Tier)
1. Go to [Neon.tech](https://neon.tech)
2. Sign up and create a new project
3. Copy both connection strings:
   - **Pooled connection** → Use for `DATABASE_URL`
   - **Direct connection** → Use for `DIRECT_DATABASE_URL`

#### **Option C: Supabase** (Includes Auth & Storage)
1. Go to [Supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings → Database
4. Copy the connection string (use for both `DATABASE_URL` and `DIRECT_DATABASE_URL`)

#### **Option D: Railway** (Simple Setup)
1. Go to [Railway.app](https://railway.app)
2. Create a new PostgreSQL database
3. Copy the connection string

---

### **Step 2: Deploy to Vercel**

#### **Method 1: Using Vercel Dashboard (Easiest)**

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository

3. **Configure Environment Variables**

   In the Vercel deployment settings, add these variables:

   ```env
   DATABASE_URL=postgresql://user:password@host:5432/database?sslmode=require
   DIRECT_DATABASE_URL=postgresql://user:password@host:5432/database?sslmode=require
   JWT_SECRET=your-super-secret-random-string-here
   NEXTAUTH_URL=https://your-app.vercel.app
   NEXTAUTH_SECRET=another-super-secret-random-string
   ```

   **Generate secure secrets:**
   ```bash
   # Generate JWT_SECRET
   openssl rand -base64 32

   # Generate NEXTAUTH_SECRET
   openssl rand -base64 32
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (2-3 minutes)
   - Your app will be live at `https://your-app.vercel.app`

5. **Set Up Database Schema**

   After first deployment, run this ONCE:
   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Login to Vercel
   vercel login

   # Link to your project
   vercel link

   # Run database migration
   vercel env pull .env.local
   npx prisma db push
   ```

#### **Method 2: Using Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts to set environment variables
```

---

### **Step 3: Update Your Domain (Optional)**

1. In Vercel Dashboard → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update `NEXTAUTH_URL` environment variable to your custom domain

---

## 🔧 **Alternative: Deploy to Netlify**

⚠️ **Note**: Netlify has limited Next.js API route support compared to Vercel.

### **Step 1: Set Up Database**

Use one of the database options from the Vercel section above (Neon, Supabase, or Railway).

### **Step 2: Deploy to Netlify**

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Add Netlify Plugin for Next.js**
   ```bash
   npm install -D @netlify/plugin-nextjs
   ```

3. **Create `netlify.toml`** (already included in project)

4. **Deploy**
   ```bash
   netlify login
   netlify init
   netlify deploy --prod
   ```

5. **Set Environment Variables**

   In Netlify Dashboard → Site Settings → Environment Variables:
   ```env
   DATABASE_URL=your-postgres-url
   DIRECT_DATABASE_URL=your-postgres-url
   JWT_SECRET=your-secret
   NEXTAUTH_URL=https://your-site.netlify.app
   NEXTAUTH_SECRET=your-secret
   ```

6. **Run Database Migration**
   ```bash
   netlify env:import .env.local
   npx prisma db push
   ```

---

## 🔐 **Security Checklist**

Before deploying to production:

- [ ] Generate strong random secrets for `JWT_SECRET` and `NEXTAUTH_SECRET`
- [ ] Use PostgreSQL (not SQLite) in production
- [ ] Enable SSL for database connection (`?sslmode=require`)
- [ ] Set `NEXTAUTH_URL` to your production domain
- [ ] Never commit `.env.local` to Git (it's in `.gitignore`)
- [ ] Review and test all authentication flows
- [ ] Set up database backups

---

## 📊 **Post-Deployment**

### **Monitor Your App**

1. **Vercel Analytics** (Free)
   - Automatic in Vercel dashboard
   - Shows page views, performance, errors

2. **Prisma Studio** (View Database)
   ```bash
   npx prisma studio
   ```

### **Common Issues & Fixes**

#### **"Prisma Client not found"**
```bash
# Run this in your project:
npm run postinstall
```

#### **"Database connection failed"**
- Verify `DATABASE_URL` is correct
- Check SSL mode is enabled (`?sslmode=require`)
- Ensure database allows connections from Vercel IPs

#### **"Build failed"**
- Check build logs in Vercel dashboard
- Ensure all environment variables are set
- Verify Node.js version compatibility

---

## 🎯 **Quick Deploy Checklist**

- [ ] Choose database provider (Vercel Postgres, Neon, or Supabase)
- [ ] Get database connection strings
- [ ] Generate JWT secrets
- [ ] Push code to GitHub
- [ ] Import repository to Vercel
- [ ] Add environment variables
- [ ] Deploy
- [ ] Run `prisma db push` to set up database schema
- [ ] Test registration and login
- [ ] Set up custom domain (optional)

---

## 💡 **Recommended Free Tier Limits**

| Provider | Storage | Bandwidth | Functions |
|----------|---------|-----------|-----------|
| **Vercel** | 100GB | 100GB/month | 100GB-hrs |
| **Vercel Postgres** | 256MB | Free tier | - |
| **Neon** | 3GB | Unlimited | - |
| **Supabase** | 500MB | 2GB | 50MB functions |

All free tiers are sufficient for getting started and handling moderate traffic.

---

## 🆘 **Need Help?**

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Prisma Docs**: [prisma.io/docs](https://prisma.io/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)

---

## 🎉 **Your App is Live!**

Once deployed, your ExpoAfrica platform will be accessible at:
- Vercel: `https://your-app.vercel.app`
- Custom domain: `https://yourdomain.com`

Share it with your users and start connecting talent with opportunities! 🚀
