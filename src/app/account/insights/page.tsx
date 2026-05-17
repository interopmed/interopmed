import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Footer from '@/components/Footer'
import InsightCreateForm from '@/components/InsightCreateForm'
import Navbar from '@/components/Navbar'
import { ACCOUNT_SESSION_COOKIE, isValidAccountSession } from '@/lib/account-auth'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Account Insights | InteropMed',
  description: 'Create and manage InteropMed insight articles.',
}

async function requireAccountSession() {
  const cookieStore = await cookies()
  const session = cookieStore.get(ACCOUNT_SESSION_COOKIE)?.value

  if (!isValidAccountSession(session)) {
    redirect('/account/login?next=/account/insights')
  }
}

async function getRecentInsights() {
  try {
    return await db.insight.findMany({ take: 8 })
  } catch (error) {
    console.error('Error loading account insights:', error)
    return []
  }
}

export default async function AccountInsightsPage() {
  await requireAccountSession()
  const insights = await getRecentInsights()

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-white py-16 dark:bg-slate-950 md:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-teal-600 dark:text-teal-400">
              Account
            </p>
            <div className="max-w-4xl">
              <h1 className="mb-6 text-4xl font-bold leading-tight text-slate-950 dark:text-white md:text-5xl">
                Add insights to the InteropMed content library.
              </h1>
              <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">
                Create draft or published insight articles backed by the database Article model. Use existing company and employee IDs so each insight keeps its content ownership relationships intact.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-16 dark:bg-slate-900">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[1.15fr_0.85fr]">
            <InsightCreateForm />

            <aside className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 md:p-8">
              <h2 className="mb-5 text-2xl font-bold text-slate-950 dark:text-white">
                Recent insights
              </h2>
              {insights.length > 0 ? (
                <div className="space-y-4">
                  {insights.map((insight) => (
                    <article key={insight.id} className="border-b border-slate-200 pb-4 last:border-0 last:pb-0 dark:border-slate-800">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-teal-600 dark:text-teal-400">
                        {insight.status}
                      </p>
                      <h3 className="font-semibold text-slate-950 dark:text-white">{insight.title}</h3>
                      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        {insight.company.name} / {insight.author.firstName} {insight.author.lastName}
                      </p>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                  No database insights loaded yet. After creating an insight, refresh this page to see it in the recent list.
                </p>
              )}
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
