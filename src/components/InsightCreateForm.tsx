'use client'

import { FormEvent, useState } from 'react'
import { slugify } from '@/lib/slugify'

type FormState = {
  status: 'idle' | 'submitting' | 'success' | 'error'
  message: string
}

export default function InsightCreateForm() {
  const [title, setTitle] = useState('')
  const [state, setState] = useState<FormState>({ status: 'idle', message: '' })

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState({ status: 'submitting', message: 'Creating insight...' })

    const formData = new FormData(event.currentTarget)
    const tags = String(formData.get('tags') || '')
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)

    const response = await fetch('/api/insights', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        slug: formData.get('slug') || slugify(title),
        excerpt: formData.get('excerpt'),
        content: formData.get('content'),
        category: formData.get('category'),
        status: formData.get('status'),
        featuredImage: formData.get('featuredImage'),
        companyId: formData.get('companyId'),
        authorId: formData.get('authorId'),
        tags,
      }),
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
      setState({
        status: 'error',
        message: result.error || 'Failed to create insight',
      })
      return
    }

    event.currentTarget.reset()
    setTitle('')
    setState({ status: 'success', message: 'Insight created successfully.' })
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 md:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-100">Title</span>
          <input
            required
            type="text"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-100">Slug</span>
          <input
            type="text"
            name="slug"
            placeholder={title ? slugify(title) : 'generated-from-title'}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
        </label>
      </div>

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
          <span className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-100">Category</span>
          <input
            type="text"
            name="category"
            defaultValue="interoperability"
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

      <label className="mt-5 block">
        <span className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-100">Excerpt</span>
        <textarea
          name="excerpt"
          rows={3}
          className="w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        />
      </label>

      <label className="mt-5 block">
        <span className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-100">Content</span>
        <textarea
          required
          name="content"
          rows={10}
          className="w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        />
      </label>

      <label className="mt-5 block">
        <span className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-100">Featured Image URL</span>
        <input
          type="text"
          name="featuredImage"
          placeholder="/generated/insights/example.png"
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        />
      </label>

      <label className="mt-5 block">
        <span className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-100">Tags</span>
        <input
          type="text"
          name="tags"
          placeholder="FHIR, governance, clinical networks"
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        />
      </label>

      <button
        type="submit"
        disabled={state.status === 'submitting'}
        className="mt-6 rounded-lg bg-gradient-to-r from-teal-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:shadow-lg hover:shadow-teal-500/25 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {state.status === 'submitting' ? 'Creating...' : 'Create insight'}
      </button>

      {state.message && (
        <p className={`mt-4 text-sm ${state.status === 'error' ? 'text-red-600 dark:text-red-400' : 'text-slate-600 dark:text-slate-300'}`}>
          {state.message}
        </p>
      )}
    </form>
  )
}
