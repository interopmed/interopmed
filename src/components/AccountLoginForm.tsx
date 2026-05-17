'use client'

import { FormEvent, useState } from 'react'

type LoginState = {
  status: 'idle' | 'submitting' | 'error'
  message: string
}

export default function AccountLoginForm({ redirectTo = '/account' }: { redirectTo?: string }) {
  const [state, setState] = useState<LoginState>({ status: 'idle', message: '' })

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState({ status: 'submitting', message: '' })

    const formData = new FormData(event.currentTarget)
    const response = await fetch('/api/account/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password: formData.get('password'),
      }),
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
      setState({
        status: 'error',
        message: result.error || 'Login failed',
      })
      return
    }

    window.location.assign(redirectTo)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-950 dark:shadow-black/20 md:p-8">
      <h1 className="mb-3 text-3xl font-bold text-slate-950 dark:text-white">Account login</h1>
      <p className="mb-6 text-sm leading-6 text-slate-600 dark:text-slate-400">
        Sign in to manage InteropMed insights and internal content.
      </p>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-100">Password</span>
        <input
          required
          type="password"
          name="password"
          autoComplete="current-password"
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        />
      </label>

      <button
        type="submit"
        disabled={state.status === 'submitting'}
        className="mt-6 w-full rounded-lg bg-gradient-to-r from-teal-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:shadow-lg hover:shadow-teal-500/25 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {state.status === 'submitting' ? 'Signing in...' : 'Sign in'}
      </button>

      {state.message && (
        <p className="mt-4 text-sm text-red-600 dark:text-red-400">{state.message}</p>
      )}
    </form>
  )
}
