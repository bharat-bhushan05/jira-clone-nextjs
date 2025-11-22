import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'
import { requireUser } from '../../../lib/clerk'

export async function POST(req: Request) {
  const userId = requireUser()
  const body = await req.json()
  const { projectId, clerkId, role } = body
  const project = await prisma.project.findUnique({ where: { id: projectId } })
  if (!project) return NextResponse.json({ error: 'Project missing' }, { status: 404 })
  if (project.ownerClerkId !== userId) return NextResponse.json({ error: 'Only owner can add members' }, { status: 403 })

  const member = await prisma.member.create({ data: { projectId, clerkId, role } })
  return NextResponse.json(member)
}
