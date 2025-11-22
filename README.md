
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

