import { auth } from '@clerk/nextjs'
import { prisma } from './prisma'

export function requireUser() {
  const { userId } = auth()
  if (!userId) throw new Error('Not authenticated')
  return userId
}

/**
 * Ensure user is a project member with allowed role(s).
 * Throws on failure.
 */
export async function ensureProjectMember(projectId: string, userId: string, allowedRoles: string[] = ['owner','admin','developer']) {
  const member = await prisma.member.findFirst({ where: { projectId, clerkId: userId } })
  if (!member) throw new Error('Not a project member')
  if (!allowedRoles.includes(member.role)) throw new Error('Insufficient role')
  return member
}
