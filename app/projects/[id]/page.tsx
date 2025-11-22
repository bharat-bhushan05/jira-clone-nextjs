import { prisma } from '../../../lib/prisma'
import Board from '../../../components/Board'

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const project = await prisma.project.findUnique({ where: { id: params.id }, include: { issues: true } })
  if (!project) return <div>Project not found</div>
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">{project.name}</h1>
      <p className="text-sm text-slate-600 mb-6">{project.description}</p>
      <Board issues={project.issues} projectId={project.id} />
    </div>
  )
}
