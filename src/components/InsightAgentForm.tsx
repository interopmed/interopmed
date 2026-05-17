'use client'

import { FormEvent, useEffect, useState } from 'react'

type AgentState = {
  status: 'idle' | 'submitting' | 'success' | 'error'
  message: string
  result?: {
    insight?: {
      title: string
      slug: string
      status: string
    }
    featuredImage?: string | null
    imageError?: string
    socialResults?: {
      platform: string
      status: string
      id?: string
      error?: string
    }[]
  }
}

export default function InsightAgentForm() {
  const [state, setState] = useState<AgentState>({ status: 'idle', message: '' })
  const [topic, setTopic] = useState('')
  const [audience, setAudience] = useState('healthcare CIOs and interoperability leaders')
  const [category, setCategory] = useState('interoperability')
  const [tone, setTone] = useState('strategic and practical')

  useEffect(() => {
    function handleGeneratorBrief(event: Event) {
      const customEvent = event as CustomEvent<{
        topic?: string
        audience?: string
        category?: string
        tone?: string
      }>
      const detail = customEvent.detail

      if (detail?.topic) {
        setTopic(detail.topic)
      }

      if (detail?.audience) {
        setAudience(detail.audience)
      }

      if (detail?.category) {
        setCategory(detail.category)
      }

      if (detail?.tone) {
        setTone(detail.tone)
      }
    }

    window.addEventListener('interopmed:insight-generator-brief', handleGeneratorBrief)

    return () => {
      window.removeEventListener('interopmed:insight-generator-brief', handleGeneratorBrief)
    }
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState({ status: 'submitting', message: 'Generating insight...' })

    const formData = new FormData(event.currentTarget)
    const platforms = ['linkedin', 'x'].filter((platform) => formData.get(platform) === 'on')
    try {
      const response = await fetch('/api/insights/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          audience,
          category,
          tone,
          companyId: formData.get('companyId'),
          authorId: formData.get('authorId'),
          status: formData.get('status'),
          generateImage: formData.get('generateImage') === 'on',
          publishSocial: platforms.length > 0,
          platforms,
        }),
      })
      const result = await response.json().catch(() => ({
        success: false,
        error: 'The insight generator endpoint returned an unreadable response.',
      }))

      if (!response.ok || !result.success) {
        setState({
          status: 'error',
          message: result.error || 'Failed to generate insight',
        })
        return
      }

      setState({
        status: 'success',
        message: 'Insight generated.',
        result: result.data,
      })
    } catch (error) {
      setState({
        status: 'error',
        message:
          error instanceof Error
            ? `Could not reach the insight generator endpoint: ${error.message}`
            : 'Could not reach the insight generator endpoint.',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-teal-200 bg-white p-6 shadow-sm dark:border-teal-900 dark:bg-slate-950 md:p-8">
      <div className="mb-6 flex flex-col gap-2">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-600 dark:text-teal-400">
          Gemini agent
        </p>
        <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
          Generate insight
        </h2>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-100">Topic brief</span>
        <textarea
          required
          name="topic"
          rows={4}
          value={topic}
          onChange={(event) => setTopic(event.target.value)}
          placeholder="FHIR data quality strategy for regional care networks"
          className="w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        />
      </label>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-100">Company ID</span>
          <input
            required
            type="text"
            name="companyId"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-100">Author ID</span>
          <input
            required
            type="text"
            name="authorId"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
        </label>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-100">Audience</span>
          <input
            type="text"
            name="audience"
            value={audience}
            onChange={(event) => setAudience(event.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-100">Category</span>
          <input
            type="text"
            name="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
        </label>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-100">Tone</span>
          <input
            type="text"
            name="tone"
            value={tone}
            onChange={(event) => setTone(event.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-100">Status</span>
          <select
            name="status"
            defaultValue="draft"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </label>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <label className="flex items-center gap-3 rounded-lg border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 dark:border-slate-800 dark:text-slate-300">
          <input type="checkbox" name="generateImage" defaultChecked className="h-4 w-4 accent-teal-600" />
          Featured image
        </label>
        <label className="flex items-center gap-3 rounded-lg border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 dark:border-slate-800 dark:text-slate-300">
          <input type="checkbox" name="linkedin" className="h-4 w-4 accent-teal-600" />
          LinkedIn
        </label>
        <label className="flex items-center gap-3 rounded-lg border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 dark:border-slate-800 dark:text-slate-300">
          <input type="checkbox" name="x" className="h-4 w-4 accent-teal-600" />
          X
        </label>
      </div>

      <button
        type="submit"
        disabled={state.status === 'submitting'}
        className="mt-6 rounded-lg bg-gradient-to-r from-teal-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:shadow-lg hover:shadow-teal-500/25 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {state.status === 'submitting' ? 'Generating...' : 'Run agent'}
      </button>

      {state.message && (
        <div className={`mt-5 rounded-lg border p-4 text-sm ${state.status === 'error' ? 'border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300' : 'border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'}`}>
          <p className="font-semibold">{state.message}</p>
          {state.result?.insight && (
            <a
              href={`/insights/${state.result.insight.slug}`}
              className="mt-2 inline-block font-semibold text-teal-700 hover:text-teal-800 dark:text-teal-300 dark:hover:text-teal-200"
            >
              {state.result.insight.title}
            </a>
          )}
          {state.result?.featuredImage && (
            <img
              src={state.result.featuredImage}
              alt=""
              className="mt-4 aspect-video w-full rounded-lg object-cover"
            />
          )}
          {state.result?.imageError && (
            <p className="mt-3 text-amber-700 dark:text-amber-300">{state.result.imageError}</p>
          )}
          {state.result?.socialResults && state.result.socialResults.length > 0 && (
            <ul className="mt-4 space-y-2">
              {state.result.socialResults.map((result) => (
                <li key={result.platform} className="flex flex-wrap gap-2">
                  <span className="font-semibold">{result.platform}</span>
                  <span>{result.status}</span>
                  {result.id && <span>{result.id}</span>}
                  {result.error && <span className="text-amber-700 dark:text-amber-300">{result.error}</span>}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </form>
  )
}
