# ⚡ Quick Deploy to Vercel (5 Minutes)

This is the **fastest way** to get ExpoAfrica running in production.

---

## 🎯 **Before You Start**

You'll need:
- A GitHub account
- A Vercel account (free - sign up at [vercel.com](https://vercel.com))
- 5 minutes of your time

---

## 📝 **Step-by-Step Guide**

### **1️⃣ Fork or Push to GitHub** (1 minute)

```bash
# If you haven't already pushed to GitHub:
git add .
git commit -m "Ready for deployment"
git push origin main
```

---

### **2️⃣ Set Up Database** (2 minutes)

**Option A: Vercel Postgres (Easiest)**

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"Storage"** tab
3. Click **"Create Database"** → Select **"Postgres"**
4. Name it: `expoafrica-db`
5. **Copy the connection strings** - you'll need:
   - `POSTGRES_PRISMA_URL` → Use as `DATABASE_URL`
   - `POSTGRES_URL_NON_POOLING` → Use as `DIRECT_DATABASE_URL`

**Option B: Neon (Free, Generous Limits)**

1. Go to [neon.tech](https://neon.tech)
2. Sign up (free)
3. Click **"Create Project"**
4. Name it: `expoafrica`
5. Copy both connection strings:
   - **Pooled connection** → `DATABASE_URL`
   - **Direct connection** → `DIRECT_DATABASE_URL`

---

### **3️⃣ Deploy to Vercel** (2 minutes)

1. **Go to Vercel Dashboard**
   - Visit [vercel.com/new](https://vercel.com/new)

2. **Import Your Repository**
   - Click **"Import Git Repository"**
   - Select your `Expo-Africa` repository
   - Click **"Import"**

3. **Configure Environment Variables**

   Before clicking "Deploy", add these **4 required variables**:

   | Variable | Value | How to Get |
   |----------|-------|------------|
   | `DATABASE_URL` | Your database connection string | From Step 2 |
   | `DIRECT_DATABASE_URL` | Your direct database URL | From Step 2 |
   | `JWT_SECRET` | Random secret | Run: `openssl rand -base64 32` |
   | `NEXTAUTH_SECRET` | Random secret | Run: `openssl rand -base64 32` |

   **Generate secrets in terminal:**
   ```bash
   # For JWT_SECRET
   openssl rand -base64 32

   # For NEXTAUTH_SECRET
   openssl rand -base64 32
   ```

   Copy each output and paste into Vercel.

4. **Deploy**
   - Click **"Deploy"**
   - Wait 2-3 minutes for build
   - ✅ Your app is now live!

---

### **4️⃣ Set Up Database Schema** (30 seconds)

After deployment completes:

```bash
# Install Vercel CLI (one time)
npm install -g vercel

# Login
vercel login

# Link to your project
vercel link

# Pull environment variables
vercel env pull .env.local

# Push database schema
npx prisma db push
```

**Done!** Your database is ready.

---

## 🎉 **You're Live!**

Your ExpoAfrica platform is now running at:
```
https://your-app-name.vercel.app
```

### **Next Steps:**

1. **Test Your App**
   - Visit your URL
   - Try creating a talent account
   - Try creating an organization account
   - Browse jobs and talent

2. **Add Custom Domain** (Optional)
   - Vercel Dashboard → Settings → Domains
   - Add your domain
   - Update `NEXTAUTH_URL` to your custom domain

3. **Update `NEXTAUTH_URL`** (Important!)
   - Go to Vercel Dashboard → Settings → Environment Variables
   - Update `NEXTAUTH_URL` to:
     ```
     https://your-app-name.vercel.app
     ```
   - Or use your custom domain:
     ```
     https://yourdomain.com
     ```
   - Redeploy for changes to take effect

---

## 🔧 **Common Issues**

### **Error: "DATABASE_URL not found"**
- Go to Vercel Dashboard → Settings → Environment Variables
- Make sure all 4 variables are added
- Redeploy

### **Error: "Prisma Client not initialized"**
- Run `npx prisma db push` from your local terminal
- Make sure you ran `vercel env pull .env.local` first

### **Can't login/register**
- Check that `NEXTAUTH_URL` matches your deployment URL
- Make sure JWT_SECRET is set

---

## 📊 **Monitor Your App**

- **Analytics**: Vercel Dashboard → Analytics
- **Logs**: Vercel Dashboard → Deployments → View Function Logs
- **Database**: Run `npx prisma studio` locally

---

## 💰 **Cost**

Everything is **FREE** on:
- ✅ Vercel Free Tier (100GB bandwidth, 100 GB-hrs functions)
- ✅ Vercel Postgres Free Tier (256MB storage)
- ✅ OR Neon Free Tier (3GB storage)

Perfect for getting started and handling moderate traffic!

---

## 🆘 **Need Help?**

Check the full [DEPLOYMENT.md](./DEPLOYMENT.md) guide for:
- Alternative database options
- Netlify deployment
- Custom domain setup
- Advanced configurations

---

**That's it! You're ready to connect talent with opportunities across Africa!** 🚀🌍
