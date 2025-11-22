import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'
import { requireUser } from '../../../lib/clerk'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const projectId = url.searchParams.get('projectId')
  if (!projectId) return NextResponse.json({ error: 'projectId required' }, { status: 400 })

  const userId = requireUser()
  const project = await prisma.project.findUnique({ where: { id: projectId }, include: { issues: { include: { comments: true, attachments: true } }, members: true } })
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  // permission check: must be member or owner
  const isMember = project.ownerClerkId === userId || project.members.some(m => m.clerkId === userId)
  if (!isMember) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  return NextResponse.json(project)
}
