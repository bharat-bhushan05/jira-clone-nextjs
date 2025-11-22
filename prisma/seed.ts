import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const p = await prisma.project.create({ data: { name: 'Demo Project', description: 'This is a seeded demo project', ownerClerkId: 'seed-owner' } })
  await prisma.member.create({ data: { projectId: p.id, clerkId: 'seed-owner', role: 'owner' } })
  await prisma.issue.createMany({ data: [
    { title: 'Sample task 1', description: 'Do something important', status: 'todo', projectId: p.id },
    { title: 'Sample task 2', description: 'In progress task', status: 'in-progress', projectId: p.id },
    { title: 'Sample task 3', description: 'Done task', status: 'done', projectId: p.id }
  ]})
}

main().catch(e => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
