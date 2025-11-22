import { prisma } from '../../lib/prisma'
import ProjectCard from '../../components/ProjectCard'

export default async function Dashboard() {
  const projects = await prisma.project.findMany({ take: 20 })
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Projects</h2>
      <div className="grid grid-cols-3 gap-4">
        {projects.map((p: any) => <ProjectCard key={p.id} project={p} />)}
      </div>
    </div>
  )
}
