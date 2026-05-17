'use client'

import { FormEvent, useState } from 'react'

type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

type Topic = {
  title: string
  brief: string
  category: string
  audience: string
}

type ChatResponse = {
  reply: string
  topics: Topic[]
  refinedArticle?: string
  generatorBrief?: {
    topic: string
    audience: string
    category: string
    tone: string
  }
}

function dispatchGeneratorBrief(brief: ChatResponse['generatorBrief'] | Topic) {
  if (!brief) {
    return
  }

  const detail =
    'brief' in brief
      ? {
          topic: `${brief.title}: ${brief.brief}`,
          audience: brief.audience,
          category: brief.category,
          tone: 'strategic and practical',
        }
      : brief

  window.dispatchEvent(new CustomEvent('interopmed:insight-generator-brief', { detail }))
}

export default function InsightChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        'Tell me what market, workflow, or product angle you want to explore. I can suggest topics, challenge the angle, or refine a draft before you generate the full article.',
    },
  ])
  const [input, setInput] = useState('')
  const [draft, setDraft] = useState('')
  const [context, setContext] = useState('')
  const [topics, setTopics] = useState<Topic[]>([])
  const [refinedArticle, setRefinedArticle] = useState('')
  const [generatorBrief, setGeneratorBrief] = useState<ChatResponse['generatorBrief']>()
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle')
  const [error, setError] = useState('')

  async function sendMessage(message: string) {
    const nextMessages: ChatMessage[] = [...messages, { role: 'user', content: message }]

    setMessages(nextMessages)
    setInput('')
    setStatus('submitting')
    setError('')

    try {
      const response = await fetch('/api/insights/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages,
          draft,
          context,
        }),
      })
      const result = await response.json().catch(() => ({
        success: false,
        error: 'The insight chat endpoint returned an unreadable response.',
      }))

      if (!response.ok || !result.success) {
        setStatus('error')
        setError(result.error || 'Failed to chat with the insight agent')
        return
      }

      const data = result.data as ChatResponse
      setMessages([...nextMessages, { role: 'assistant', content: data.reply }])
      setTopics(data.topics || [])
      setRefinedArticle(data.refinedArticle || '')
      setGeneratorBrief(data.generatorBrief)
      setStatus('idle')
    } catch (error) {
      setStatus('error')
      setError(
        error instanceof Error
          ? `Could not reach the insight chat endpoint: ${error.message}`
          : 'Could not reach the insight chat endpoint.'
      )
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!input.trim() || status === 'submitting') {
      return
    }

    await sendMessage(input.trim())
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 md:p-8">
      <div className="mb-6">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-teal-600 dark:text-teal-400">
          AI chat
        </p>
        <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
          Decide and refine
        </h2>
      </div>

      <div className="max-h-96 space-y-4 overflow-y-auto rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`rounded-lg p-4 text-sm leading-6 ${
              message.role === 'assistant'
                ? 'bg-white text-slate-700 dark:bg-slate-950 dark:text-slate-300'
                : 'bg-teal-600 text-white'
            }`}
          >
            {message.content}
          </div>
        ))}
        {status === 'submitting' && (
          <div className="rounded-lg bg-white p-4 text-sm text-slate-500 dark:bg-slate-950 dark:text-slate-400">
            Thinking...
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-100">Message</span>
          <textarea
            required
            rows={3}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Suggest five insight topics for payer-provider interoperability in 2026."
            className="w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-100">Context</span>
            <textarea
              rows={3}
              value={context}
              onChange={(event) => setContext(event.target.value)}
              placeholder="Product focus, target audience, campaign notes"
              className="w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-100">Draft to refine</span>
            <textarea
              rows={3}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Paste a rough article, outline, or intro"
              className="w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
          </label>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="rounded-lg bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
          >
            Send
          </button>
          <button
            type="button"
            disabled={status === 'submitting'}
            onClick={() => sendMessage('Give me five strong topic options and recommend the best one.')}
            className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-teal-500 hover:text-teal-700 disabled:cursor-not-allowed disabled:opacity-70 dark:border-slate-700 dark:text-slate-300 dark:hover:border-teal-400 dark:hover:text-teal-300"
          >
            Topics
          </button>
          <button
            type="button"
            disabled={status === 'submitting' || !draft.trim()}
            onClick={() => sendMessage('Refine the draft for clarity, structure, and executive usefulness.')}
            className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-teal-500 hover:text-teal-700 disabled:cursor-not-allowed disabled:opacity-70 dark:border-slate-700 dark:text-slate-300 dark:hover:border-teal-400 dark:hover:text-teal-300"
          >
            Refine draft
          </button>
        </div>
      </form>

      {error && (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </p>
      )}

      {(topics.length > 0 || generatorBrief || refinedArticle) && (
        <div className="mt-6 space-y-5">
          {topics.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                Topic options
              </h3>
              <div className="space-y-3">
                {topics.map((topic) => (
                  <button
                    key={topic.title}
                    type="button"
                    onClick={() => dispatchGeneratorBrief(topic)}
                    className="block w-full rounded-lg border border-slate-200 p-4 text-left transition hover:border-teal-500 dark:border-slate-800 dark:hover:border-teal-400"
                  >
                    <span className="block font-semibold text-slate-950 dark:text-white">{topic.title}</span>
                    <span className="mt-2 block text-sm leading-6 text-slate-600 dark:text-slate-400">{topic.brief}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {generatorBrief && (
            <button
              type="button"
              onClick={() => dispatchGeneratorBrief(generatorBrief)}
              className="rounded-lg bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
            >
              Use recommended brief
            </button>
          )}

          {refinedArticle && (
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                Refined article
              </h3>
              <textarea
                readOnly
                value={refinedArticle}
                rows={10}
                className="w-full resize-y rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
              />
            </div>
          )}
        </div>
      )}
    </section>
  )
}
