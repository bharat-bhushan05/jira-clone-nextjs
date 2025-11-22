# Jira Clone (Next.js + Tailwind + Prisma + MongoDB + Clerk)

Small Jira-like application demonstrating full-stack patterns using Next.js App Router, Prisma (MongoDB), Clerk for auth, Tailwind for styling, plus role-based permissions, S3 uploads and realtime updates using Pusher.

## Features
- User authentication with Clerk
- CRUD for Projects and Issues (basic)
- Role-based project members and permissions
- S3 uploads via presigned PUT URLs
- Realtime updates via Pusher
- Shadcn-style UI placeholders (convert further if needed)

## Requirements
- Node 18+
- pnpm / npm / yarn
- MongoDB Atlas (or local MongoDB)
- Clerk account (to get API keys)
- AWS S3 bucket for uploads
- Pusher account for realtime

## Setup
1. Clone repo
2. Copy `.env.example` to `.env` and fill values (Clerk keys, DATABASE_URL, AWS keys, Pusher keys)
3. Install deps: `npm install`
4. Generate Prisma client: `npx prisma generate`
5. Push Prisma to DB: `npx prisma db push`
6. Seed demo data: `npm run seed`
7. Run dev server: `npm run dev`
8. Visit `http://localhost:3000`

## New features added
- Role-based permissions (Project Member model in Prisma). Owner can add members and control roles.
- S3 direct uploads via pre-signed URLs (server-side route at /api/uploads). Use AWS credentials in env.
- Realtime updates using Pusher (broadcasts on project-{projectId} channels for issue changes).

## Additional environment variables (add these to .env)
- AWS_S3_BUCKET
- AWS_REGION
- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- PUSHER_APP_ID
- PUSHER_KEY
- PUSHER_SECRET
- PUSHER_CLUSTER
- NEXT_PUBLIC_PUSHER_KEY
- NEXT_PUBLIC_PUSHER_CLUSTER

## How S3 upload flow works
1. Client requests a signed URL from `POST /api/uploads` with `{ filename, contentType }`.
2. Server returns `{ uploadUrl, publicUrl }` where `uploadUrl` is a PUT presigned URL and `publicUrl` is the resulting S3 URL.
3. Client uploads the file directly to S3 using `fetch(uploadUrl, { method: 'PUT', body: file })`.
4. Client then attaches the `publicUrl` to an issue by calling the issues endpoint or creating a FileAttachment record.

## Realtime notes
- Install Pusher and fill env vars. The server triggers events on create/update of issues. Client should subscribe to `project-{projectId}` and listen for events like `issue:created` and `issue:updated`.
