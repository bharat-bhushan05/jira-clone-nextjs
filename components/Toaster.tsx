'use client'
import { useState } from 'react'

type Toast = { id: string, title: string, description?: string }

export default function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([])

  function push(t: Toast) {
    setToasts(prev => [...prev, t])
    setTimeout(() => setToasts(prev => prev.filter(x => x.id !== t.id)), 5000)
  }

  // make push available globally if you want (simplified)
  (globalThis as any).pushToast = push

  return (
    <div className="fixed top-4 right-4 space-y-2 z-50">
      {toasts.map(t => (
        <div key={t.id} className="bg-white p-3 rounded shadow">
          <div className="font-semibold">{t.title}</div>
          {t.description && <div className="text-sm text-slate-500">{t.description}</div>}
        </div>
      ))}
    </div>
  )
}
