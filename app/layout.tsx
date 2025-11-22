import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import NavBar from '../components/NavBar'

export const metadata = {
  title: 'Jira Clone',
  description: 'A lightweight Jira-like app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider
          frontendApi={process.env.NEXT_PUBLIC_CLERK_FRONTEND_API}
          navigate={(to) => window.history.pushState(null, '', to)}
        >
          <div className="min-h-screen bg-slate-50">
            <NavBar />
            <main className="p-6">{children}</main>
          </div>
        </ClerkProvider>
      </body>
    </html>
  )
}
