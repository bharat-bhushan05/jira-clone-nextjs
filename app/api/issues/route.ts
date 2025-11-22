import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'
import { requireUser, ensureProjectMember } from '../../../lib/clerk'
import { trigger } from '../../../lib/pusher'

export async function POST(req: Request) {
  const userId = requireUser()
  const body = await req.json()
  await ensureProjectMember(body.projectId, userId, ['owner','admin','developer'])

  const issue = await prisma.issue.create({
    data: { title: body.title, description: body.description || '', status: body.status || 'todo', projectId: body.projectId, assigneeClerkId: body.assigneeClerkId, orderIndex: body.orderIndex ?? 0 }
  })

  trigger(`project-${body.projectId}`, 'issue:created', issue)
  return NextResponse.json(issue)
}

export async function PATCH(req: Request) {
  const userId = requireUser()
  const body = await req.json()
  await ensureProjectMember(body.projectId, userId, ['owner','admin','developer'])

  const updateData: any = {}
  if (body.status !== undefined) updateData.status = body.status
  if (body.title !== undefined) updateData.title = body.title
  if (body.description !== undefined) updateData.description = body.description
  if (body.orderIndex !== undefined) updateData.orderIndex = body.orderIndex

  const issue = await prisma.issue.update({ where: { id: body.id }, data: updateData })
  trigger(`project-${body.projectId}`, 'issue:updated', issue)
  return NextResponse.json(issue)
}
