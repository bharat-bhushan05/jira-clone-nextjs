export default function IssueCard({ issue }: any) {
  return (
    <div className="bg-white p-3 rounded-lg shadow-sm mb-2">
      <div className="flex justify-between items-start gap-2">
        <div>
          <strong>{issue.title}</strong>
          <p className="text-sm text-slate-600">{issue.description}</p>
        </div>
        <div className="text-xs text-slate-400">{issue.priority}</div>
      </div>
    </div>
  )
}
