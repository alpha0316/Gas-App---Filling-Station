import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from './store'
import PasswordForm from './PasswordForm'
import OtpForm from './OtpForm'

export default function LoginPage() {
  const user = useAuthStore((s) => s.user)
  const [mode, setMode] = useState<'password' | 'otp'>('password')

  if (user) return <Navigate to="/" replace />

  return (
    <div className="min-h-screen bg-page flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-surface border border-border rounded-card p-6">
        <div className="flex items-center gap-2 mb-6">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
            <rect x="6" y="2" width="8" height="16" rx="3" fill="#1a73e8" />
            <rect x="8" y="0" width="4" height="4" rx="1.5" fill="#1a73e8" />
          </svg>
          <h1 className="font-bold text-[17px] tracking-tight">Gears</h1>
        </div>

        <div className="flex gap-1.5 mb-5" role="tablist">
          {(['password', 'otp'] as const).map((m) => (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={mode === m}
              onClick={() => setMode(m)}
              className={`flex-1 py-2 rounded-button text-sm font-medium transition-colors ${
                mode === m ? 'bg-accent text-white' : 'bg-surface border border-border text-muted hover:text-ink'
              }`}
            >
              {m === 'password' ? 'Password' : 'One-time code'}
            </button>
          ))}
        </div>

        {mode === 'password' ? <PasswordForm /> : <OtpForm />}
      </div>
    </div>
  )
}
