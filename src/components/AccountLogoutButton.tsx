'use client'

import { useState } from 'react'

export default function AccountLogoutButton() {
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  async function handleLogout() {
    setIsLoggingOut(true)
    await fetch('/api/account/logout', { method: 'POST' })
    window.location.assign('/account/login')
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="rounded-lg border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-teal-500 hover:text-teal-600 disabled:cursor-not-allowed disabled:opacity-70 dark:border-slate-700 dark:text-slate-200 dark:hover:border-teal-400 dark:hover:text-teal-300"
    >
      {isLoggingOut ? 'Signing out...' : 'Sign out'}
    </button>
  )
}
