import Link from 'next/link'

export default function ProjectCard({ project }: any) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="font-semibold">{project.name}</h3>
      <p className="text-sm text-slate-500">{project.description}</p>
      <div className="mt-3 flex gap-2">
        <Link className="text-indigo-600 text-sm" href={`/projects/${project.id}`}>Open</Link>
      </div>
    </div>
  )
}
