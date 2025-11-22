import { prisma } from '../../lib/prisma'
import { Chart } from 'chart.js/auto'
import dynamic from 'next/dynamic'

export default async function AnalyticsPage() {
  // Basic data queries - extend as needed
  const projectsCount = await prisma.project.count()
  const issuesCount = await prisma.issue.count()
  const issuesByStatus = await prisma.$queryRaw`db.issue.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } }
  ])`

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Analytics Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow-sm">
          <div className="text-sm text-slate-500">Projects</div>
          <div className="text-2xl font-semibold">{projectsCount}</div>
        </div>
        <div className="bg-white p-4 rounded shadow-sm">
          <div className="text-sm text-slate-500">Total Issues</div>
          <div className="text-2xl font-semibold">{issuesCount}</div>
        </div>
        <div className="bg-white p-4 rounded shadow-sm">
          <div className="text-sm text-slate-500">Statuses</div>
          <pre className="text-xs">{JSON.stringify(issuesByStatus, null, 2)}</pre>
        </div>
      </div>

      <div className="mt-6">
        {/* Extend: embed Chart.js graphs via client component */}
        <p className="text-sm text-slate-500">Charts will go here (client chart components using Chart.js).</p>
      </div>
    </div>
  )
}
