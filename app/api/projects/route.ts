import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'
import { requireUser } from '../../../lib/clerk'

export async function GET() {
  const projects = await prisma.project.findMany({ take: 200, orderBy: { createdAt: 'desc' } })
  return NextResponse.json(projects)
}

export async function POST(req: Request) {
  const userId = requireUser()
  const body = await req.json()
  const project = await prisma.project.create({
    data: { name: body.name, description: body.description || '', ownerClerkId: userId,
      members: { create: { clerkId: userId, role: 'owner' } } }
  })
  return NextResponse.json(project)
}
