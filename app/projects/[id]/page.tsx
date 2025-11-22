import { prisma } from '../../../lib/prisma'
import Board from '../../../components/Board'
import Link from 'next/link'

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const project = await prisma.project.findUnique({
    where: { id: params.id },
    include: { issues: { orderBy: { orderIndex: 'asc' } }, members: true }
  })
  if (!project) return <div>Project not found</div>
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">{project.name}</h1>
          <p className="text-sm text-slate-600">{project.description}</p>
        </div>
        <div className="flex gap-2">
          <Link href={`/projects/${project.id}/export`} className="btn px-3 py-1 bg-slate-100 rounded">Export</Link>
          <Link href={`/projects/${project.id}/members`} className="btn px-3 py-1 bg-slate-100 rounded">Members</Link>
        </div>
      </div>

      <Board issues={project.issues} projectId={project.id} />
    </div>
  )
}
