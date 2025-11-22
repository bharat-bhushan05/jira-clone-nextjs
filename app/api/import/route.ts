import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'
import { requireUser } from '../../../lib/clerk'

export async function POST(req: Request) {
  const userId = requireUser()
  const body = await req.json()
  // Expect full project object exported above
  if (!body || !body.name) return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })

  // Create project and nested issues/members/comments/attachments (attachments URLs kept as-is)
  const project = await prisma.project.create({
    data: {
      name: body.name,
      description: body.description || '',
      ownerClerkId: userId,
      members: { create: [{ clerkId: userId, role: 'owner' }] },
      issues: {
        create: (body.issues || []).map((iss: any) => ({
          title: iss.title,
          description: iss.description,
          status: iss.status,
          priority: iss.priority,
          orderIndex: iss.orderIndex || 0,
          comments: { create: (iss.comments || []).map((c: any) => ({ content: c.content, authorClerkId: c.authorClerkId })) },
          attachments: { create: (iss.attachments || []).map((a: any) => ({ filename: a.filename, url: a.url, uploadedBy: a.uploadedBy })) }
        }))
      }
    }
  })

  return NextResponse.json(project)
}
