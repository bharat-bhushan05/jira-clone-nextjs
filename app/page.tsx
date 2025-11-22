import Link from 'next/link'

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto text-center py-20">
      <h1 className="text-4xl font-bold mb-4">Jira Clone</h1>
      <p className="mb-8">A demonstration project — sign in to manage projects & issues.</p>
      <div className="flex gap-4 justify-center">
        <Link className="btn px-4 py-2 bg-indigo-600 text-white rounded" href="/dashboard">Go to dashboard</Link>
      </div>
    </div>
  )
}
