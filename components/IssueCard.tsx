export default function IssueCard({ issue }: any) {
  return (
    <div className="bg-white p-3 rounded-lg shadow-sm mb-2">
      <div className="flex justify-between">
        <strong>{issue.title}</strong>
        <span className="text-xs text-slate-400">{issue.priority}</span>
      </div>
      <p className="text-sm text-slate-600">{issue.description}</p>
    </div>
  )
}
