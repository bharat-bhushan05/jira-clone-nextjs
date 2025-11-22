export default function ProjectCard({ project }: any) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="font-semibold">{project.name}</h3>
      <p className="text-sm text-slate-500">{project.description}</p>
      <a className="text-indigo-600 text-sm mt-3 inline-block" href={`/projects/${project.id}`}>Open</a>
    </div>
  )
}
