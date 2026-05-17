'use client'

import { FormEvent, useState } from 'react'

type FormState = {
  status: 'idle' | 'submitting' | 'success' | 'error'
  message: string
}

export default function ContactForm() {
  const [state, setState] = useState<FormState>({ status: 'idle', message: '' })

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState({ status: 'submitting', message: 'Saving your message...' })

    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.get('firstName'),
          lastName: formData.get('lastName'),
          email: formData.get('email'),
          organization: formData.get('organization'),
          topic: formData.get('topic'),
          message: formData.get('message'),
        }),
      })
      const result = await response.json().catch(() => ({
        success: false,
        error: 'The contact endpoint returned an unreadable response.',
      }))

      if (!response.ok || !result.success) {
        setState({
          status: 'error',
          message: result.error || 'Failed to save message',
        })
        return
      }

      form.reset()
      setState({
        status: 'success',
        message: 'Thanks. Your message was sent and our team will follow up.',
      })
    } catch (error) {
      setState({
        status: 'error',
        message:
          error instanceof Error
            ? `Could not reach the contact endpoint: ${error.message}`
            : 'Could not reach the contact endpoint.',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-slate-200 bg-slate-50 p-6 shadow-xl shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20 md:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-100">First name</span>
          <input
            required
            type="text"
            name="firstName"
            autoComplete="given-name"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-100">Last name</span>
          <input
            required
            type="text"
            name="lastName"
            autoComplete="family-name"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />
        </label>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-100">Work email</span>
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-100">Organization</span>
          <input
            type="text"
            name="organization"
            autoComplete="organization"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />
        </label>
      </div>

      <label className="mt-5 block">
        <span className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-100">What would you like to discuss?</span>
        <select
          required
          name="topic"
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          defaultValue=""
        >
          <option value="" disabled>Select a topic</option>
          <option>Request a demo</option>
          <option>Architecture review</option>
          <option>Implementation package</option>
          <option>Managed interoperability support</option>
          <option>Security and compliance</option>
          <option>Partnership conversation</option>
        </select>
      </label>

      <label className="mt-5 block">
        <span className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-100">Message</span>
        <textarea
          required
          name="message"
          rows={6}
          className="w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
        />
      </label>

      <button
        type="submit"
        disabled={state.status === 'submitting'}
        className="mt-6 w-full rounded-lg bg-gradient-to-r from-teal-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:shadow-lg hover:shadow-teal-500/25 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {state.status === 'submitting' ? 'Saving...' : 'Request follow-up'}
      </button>
      {state.message && (
        <p className={`mt-4 rounded-lg border p-4 text-sm ${state.status === 'error' ? 'border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300' : 'border-slate-200 bg-white text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300'}`}>
          {state.message}
        </p>
      )}
      <p className="mt-4 text-xs leading-5 text-slate-500 dark:text-slate-400">
        By submitting this form, you agree to be contacted about InteropMed services and technical resources.
      </p>
    </form>
  )
}
