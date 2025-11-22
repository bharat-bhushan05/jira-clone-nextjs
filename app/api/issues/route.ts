import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'
import { requireUser, ensureProjectMember } from '../../../lib/clerk'
import { trigger } from '../../../lib/pusher'

export async function POST(req: Request) {
  const userId = requireUser()
  const body = await req.json()
  await ensureProjectMember(body.projectId, userId, ['owner','admin','developer'])

  const issue = await prisma.issue.create({ data: { title: body.title, description: body.description || '', status: body.status || 'todo', projectId: body.projectId, assigneeClerkId: body.assigneeClerkId } })

  trigger(`project-${body.projectId}`, 'issue:created', issue)

  return NextResponse.json(issue)
}

export async function PATCH(req: Request) {
  const userId = requireUser()
  const body = await req.json()
  await ensureProjectMember(body.projectId, userId, ['owner','admin','developer'])

  const issue = await prisma.issue.update({ where: { id: body.id }, data: { status: body.status, title: body.title, description: body.description } })

  trigger(`project-${body.projectId}`, 'issue:updated', issue)
  return NextResponse.json(issue)
}
