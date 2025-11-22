import { NextResponse } from 'next/server'
import { requireUser } from '../../../lib/clerk'
import { prisma } from '../../../lib/prisma'

export async function POST(req: Request) {
  const userId = requireUser()
  const body = await req.json()
  // store notification in DB or send email via SES (stub)
  // Example: { projectId, message, type }
  if (!body.message) return NextResponse.json({ error: 'message required' }, { status: 400 })
  // persist (create a collection if needed) — simplified: just return success
  return NextResponse.json({ ok: true })
}
