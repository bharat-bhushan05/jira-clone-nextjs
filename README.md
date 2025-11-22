
# ✅ **1. Short “Quick Start” README**

## **Jira Clone — Quick Start Guide**

A lightweight Jira-style task management system built with **Next.js + Prisma + MongoDB + Clerk + Tailwind + ShadCN**.

---

## 🚀 **1. Requirements**

* Node 18+
* MongoDB Atlas
* Clerk account
* Git

---

## ⚙️ **2. Setup**

```bash
git clone <repo-url>
cd jira-clone-nextjs
cp .env.example .env
npm install
```

Fill required env values:

* Clerk keys
* MongoDB URL

---

## 🗄️ **3. Database Setup**

```bash
npx prisma generate
npx prisma db push
npm run seed   # optional
```

---

## ▶️ **4. Run App**

```bash
npm run dev
```

Open → [http://localhost:3000](http://localhost:3000)

---

## 🚀 **5. Build for Production**

```bash
npm run build
npm start
```

---

## ☁️ **6. Deploy**

Use **Vercel** → add all `.env` variables → deploy.

---

## 🎉 Done!

Your Jira Clone is now running.

---

---

# ✅ **2. Deployment-Only README**

# **Jira Clone — Deployment Guide**

This document covers ONLY the deployment steps for hosting the Jira Clone in a production environment.

---

# 📦 **1. Requirements**

You must have:

### **Hosting**

* **Vercel** (recommended)

### **Services**

* MongoDB Atlas (Production cluster)
* Clerk Authentication
* (Optional) AWS S3 for file storage
* (Optional) Pusher for realtime updates

---

# 🔐 **2. Prepare Environment Variables**

You must provide ALL required variables in **Vercel → Project Settings → Environment Variables**.

Required:

```
NEXT_PUBLIC_CLERK_FRONTEND_API=
CLERK_API_KEY=
CLERK_JWT_KEY=
DATABASE_URL=
```

Optional (for extended features):

```
AWS_S3_BUCKET=
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=

PUSHER_APP_ID=
PUSHER_KEY=
PUSHER_SECRET=
PUSHER_CLUSTER=
NEXT_PUBLIC_PUSHER_KEY=
NEXT_PUBLIC_PUSHER_CLUSTER=
```

---

# 🚀 **3. Deploy to Vercel**

### Step 1 → Push project to GitHub

### Step 2 → Go to [https://vercel.com](https://vercel.com)

### Step 3 → “Import Project”

### Step 4 → Select your GitHub repository

### Step 5 → Add all `.env` variables

### Step 6 → Click **Deploy**

---

# 🗄️ **4. Connect MongoDB Atlas**

Ensure:

* Your IP whitelist includes **0.0.0.0/0**
* The username has proper permissions
* The connection string uses `retryWrites=true&w=majority`

---

# ⚙️ **5. Clerk Production Setup**

Inside Clerk Dashboard:

* Add your Vercel domain as **Allowed Origin**
* Enable production OAuth (optional)

---

# 📁 **6. S3 Deployment (Optional)**

If using file uploads:

1. Create an S3 bucket
2. Set CORS rules
3. Add AWS keys to environment
4. Make bucket **private** (recommended)

---

# 📡 **7. Pusher Deployment (Optional)**

Set:

* App ID
* Key
* Secret
* Cluster
* Public key for client

---

# 🧪 **8. Post-Deployment Checklist**

* ✔ API routes working
* ✔ Clerk auth working
* ✔ DB reads/writes working
* ✔ CORS configured (Clerk + S3 + Vercel)
* ✔ Optional realtime updates working

---

# 🎉 Deployment complete!

---

---

# ✅ **3. Client-Only README & Backend-Only README**

Below are **two separate targeted READMEs**.

---

# 🖥️ **3A. Client-Only README (Frontend Only)**

# **Jira Clone — Frontend (Client) README**

This document describes how to run ONLY the **client-side application**, built using:

* Next.js (App Router)
* React 18
* Tailwind CSS
* ShadCN UI
* Clerk Authentication

---

## 📦 1. Install Dependencies

```bash
npm install
```

---

## ⚙️ 2. Environment Variables (Client-Only)

In `.env` include only:

```
NEXT_PUBLIC_CLERK_FRONTEND_API=
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_PUSHER_KEY=     # optional
NEXT_PUBLIC_PUSHER_CLUSTER=  # optional
```

> The client cannot use server-side secrets.

---

## ▶️ 3. Run Client in Dev Mode

```bash
npm run dev
```

Now visit → [http://localhost:3000](http://localhost:3000)

---

## 🔌 4. Backend Requirements

The frontend depends on a backend providing:

* Clerk session validation
* Projects API
* Issues API
* Comments API
* File upload endpoint (optional)
* Realtime events (optional)

Ensure your backend base URLs match `NEXT_PUBLIC_APP_URL`.

---

## 📁 5. UI Libraries

The client uses:

* Tailwind for layout
* ShadCN components (Buttons, Cards, Dialogs)
* React state + server components

---

## 📦 6. Production Build

```bash
npm run build
npm start
```

---

# 🎉 Client is ready!

---

---

# 🔧 **3B. Backend-Only README (API + Database Only)**

# **Jira Clone — Backend (API + DB) README**

This document explains how to run only the backend layer:

* Next.js API Route Handlers
* Prisma ORM
* MongoDB
* Authentication (Clerk)
* Optional integrations (S3, Pusher)

---

## ⚙️ 1. Install Dependencies

```bash
npm install
```

---

## 🔐 2. Environment Variables (Backend Required)

```
CLERK_API_KEY=
CLERK_JWT_KEY=
DATABASE_URL=
```

### Optional:

```
AWS_S3_BUCKET=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=

PUSHER_APP_ID=
PUSHER_KEY=
PUSHER_SECRET=
PUSHER_CLUSTER=
```

---

## 🗄️ 3. Prepare Database (Prisma + MongoDB)

```bash
npx prisma generate
npx prisma db push
npm run seed   # optional
```

---

## ▶️ 4. Run Backend Server

```bash
npm run dev
```

API routes available:

```
/api/projects
/api/issues
/api/comments
/api/uploads
/api/export
/api/import
/api/notifications
```

---

## 🧪 5. Backend Testing

```bash
npm test         # Jest
npx playwright   # E2E
```

---

## 🚀 6. Backend Production Build

```bash
npm run build
npm start
```

---

## 🔧 7. Deployment (Backend-Focused)

You may deploy backend-only using:

* Vercel (Serverless)
* Railway
* Render
* Docker container

Ensure environment variables are set in the platform.

---

# 🎉 Backend API is running!


---
Here's how to get each of these details from Clerk.com:

## Step 1: Access Clerk Dashboard

1. Go to [Clerk Dashboard](https://dashboard.clerk.dev)
2. Sign in and select your application

## Step 2: Get `NEXT_PUBLIC_CLERK_FRONTEND_API`

1. In the left sidebar, click on **"API Keys"**
2. Look for **"Frontend API Key"** (starts with `pk_`)
3. Copy this value

## Step 3: Get `CLERK_API_KEY`

1. In the **"API Keys"** section
2. Look for **"Backend API Key"** (starts with `sk_`)
3. Copy this value (this is your `CLERK_API_KEY`)

## Step 4: Get `CLERK_JWT_KEY`

1. In the **"API Keys"** section
2. Scroll to **"JWT Public Key"**
3. Copy the entire key (includes `-----BEGIN PUBLIC KEY-----` and `-----END PUBLIC KEY-----`)

## Step 5: Alternative Navigation Path

If you don't see these directly:

1. Go to **"Configure"** → **"API Keys"** in the sidebar
2. Or go to **"Settings"** → **"API Keys"**

## Visual Guide:

```
Clerk Dashboard → Your App → API Keys Section
├── Frontend API Key → NEXT_PUBLIC_CLERK_FRONTEND_API
├── Backend API Key → CLERK_API_KEY  
└── JWT Public Key → CLERK_JWT_KEY
```

## Important Notes:

- **`NEXT_PUBLIC_CLERK_FRONTEND_API`** starts with `pk_` (public key)
- **`CLERK_API_KEY`** starts with `sk_` (secret key) - keep this secure!
- **`CLERK_JWT_KEY`** is a multi-line PEM format key

## Environment Variables Format:

Add these to your `.env.local` file:

```env
# Clerk Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...  # This is the Frontend API
CLERK_SECRET_KEY=sk_test_...                   # This is the Backend API
CLERK_JWT_KEY=-----BEGIN PUBLIC KEY-----
...your actual key here...
-----END PUBLIC KEY-----

# Database URL (from your database provider)
DATABASE_URL="your-database-connection-string"
```

**Note**: Some projects use `NEXT_PUBLIC_CLERK_FRONTEND_API` while others use `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - they refer to the same Frontend API Key.

## For `DATABASE_URL`:

This is NOT from Clerk. You'll get this from:
- **Railway**, **Vercel**, **PlanetScale**, **Supabase**, or your database provider
- Check your database service's dashboard for the connection string

## Security Reminder:
- Never commit these keys to version control
- Make sure `.env.local` is in your `.gitignore`
- Restart your development server after adding these variables
---


Here's how to get Pusher credentials from the Pusher dashboard:

## Step 1: Access Pusher Dashboard

1. Go to [Pusher Dashboard](https://dashboard.pusher.com)
2. Sign in to your account
3. Create a new app or select an existing one

## Step 2: Get Pusher Credentials

Once you're in your app dashboard:

### For New App:
1. Click **"Create new app"**
2. Enter app name (e.g., "Jira Clone")
3. Select cluster (choose the one closest to your users)
4. Choose "Channels" as the product

### For Existing App:
1. Click on your app name
2. Go to **"App Keys"** tab in the sidebar

## Step 3: Copy Each Value

In the **"App Keys"** section, you'll see:

- **`PUSHER_APP_ID`** - The numeric App ID
- **`PUSHER_KEY`** - The "Key" field (starts with numbers and letters)
- **`PUSHER_SECRET`** - The "Secret" field (keep this secure!)
- **`PUSHER_CLUSTER`** - The cluster name (e.g., `mt1`, `us2`, `eu`)

## Step 4: Environment Variables Format

Add these to your `.env.local` file:

```env
# Pusher Credentials
PUSHER_APP_ID="your-actual-app-id"
PUSHER_KEY="your-actual-key"
PUSHER_SECRET="your-actual-secret"
PUSHER_CLUSTER="your-cluster"

# Public Pusher variables (exposed to client)
NEXT_PUBLIC_PUSHER_KEY="your-actual-key"
NEXT_PUBLIC_PUSHER_CLUSTER="your-cluster"
```

## Step-by-Step Visual Guide:

```
Pusher Dashboard → Your App → App Keys Tab
├── app_id → PUSHER_APP_ID
├── key → PUSHER_KEY & NEXT_PUBLIC_PUSHER_KEY
├── secret → PUSHER_SECRET
└── cluster → PUSHER_CLUSTER & NEXT_PUBLIC_PUSHER_CLUSTER
```

## Common Clusters:
- `mt1` - US East (Northern Virginia)
- `us2` - US West (Oregon)
- `eu` - Europe (Ireland)
- `ap1` - Asia Pacific (Singapore)

## Important Notes:

1. **Security**: 
   - `PUSHER_SECRET` should never be exposed to the client
   - Only `KEY` and `CLUSTER` are safe to expose via `NEXT_PUBLIC_` variables

2. **Same Values**:
   - `PUSHER_KEY` = `NEXT_PUBLIC_PUSHER_KEY`
   - `PUSHER_CLUSTER` = `NEXT_PUBLIC_PUSHER_CLUSTER`

3. **Restart Required**: Restart your development server after adding these variables

## If You Don't Have a Pusher Account:

1. Go to [Pusher Signup](https://pusher.com/signup)
2. Create a free account (Channels has a generous free tier)
3. Verify your email
4. Create your first app in the dashboard

## Verification:

Test your Pusher setup by running your application and checking if real-time features work. You can also check the Pusher dashboard for connection events.

---



