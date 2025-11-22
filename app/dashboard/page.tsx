import { prisma } from '../../lib/prisma'
import ProjectCard from '../../components/ProjectCard'
import Link from 'next/link'

export default async function Dashboard() {
  const projects = await prisma.project.findMany({ take: 50, orderBy: { createdAt: 'desc' } })
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Projects</h2>
        <Link href="/projects/new" className="px-3 py-1 rounded bg-indigo-600 text-white">New Project</Link>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {projects.map((p: any) => <ProjectCard key={p.id} project={p} />)}
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-2">Analytics</h3>
        <Link href="/analytics" className="text-indigo-600">Open analytics dashboard →</Link>
      </div>
    </div>
  )
}
