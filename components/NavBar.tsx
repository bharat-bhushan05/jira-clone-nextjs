'use client'
import { SignInButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export default function NavBar() {
  return (
    <nav className="bg-white shadow-sm py-3">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold">Jira Clone</Link>
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-sm">Dashboard</Link>
          <SignInButton>
            <button className="px-3 py-1 rounded bg-slate-100">Sign in</button>
          </SignInButton>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </nav>
  )
}
