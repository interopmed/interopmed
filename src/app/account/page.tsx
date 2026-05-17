import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import AccountLogoutButton from '@/components/AccountLogoutButton'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { ACCOUNT_SESSION_COOKIE, isValidAccountSession } from '@/lib/account-auth'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Account Dashboard | InteropMed',
  description: 'InteropMed account dashboard for managing insights and internal content.',
}

async function requireAccountSession() {
  const cookieStore = await cookies()
  const session = cookieStore.get(ACCOUNT_SESSION_COOKIE)?.value

  if (!isValidAccountSession(session)) {
    redirect('/account/login?next=/account')
  }
}

async function getDashboardStats() {
  try {
    const [totalInsights, publishedInsights, draftInsights, companies, employees] = await Promise.all([
      db.insight.count(),
      db.insight.count('published'),
      db.insight.count('draft'),
      db.prisma.company.count(),
      db.prisma.employee.count(),
    ])

    return {
      totalInsights,
      publishedInsights,
      draftInsights,
      companies,
      employees,
      hasData: true,
    }
  } catch (error) {
    console.error('Error loading account dashboard:', error)
    return {
      totalInsights: 0,
      publishedInsights: 0,
      draftInsights: 0,
      companies: 0,
      employees: 0,
      hasData: false,
    }
  }
}

export default async function AccountDashboardPage() {
  await requireAccountSession()
  const stats = await getDashboardStats()

  const cards = [
    { label: 'Total insights', value: stats.totalInsights, detail: 'All draft and published insight articles' },
    { label: 'Published', value: stats.publishedInsights, detail: 'Visible on the public Insights page' },
    { label: 'Drafts', value: stats.draftInsights, detail: 'Saved internally for future publishing' },
    { label: 'Companies', value: stats.companies, detail: 'Organizations available for content ownership' },
    { label: 'Employees', value: stats.employees, detail: 'Authors available for content attribution' },
  ]

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-white py-16 dark:bg-slate-950 md:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="max-w-4xl">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-teal-600 dark:text-teal-400">
                  Account
                </p>
                <h1 className="mb-6 text-4xl font-bold leading-tight text-slate-950 dark:text-white md:text-5xl">
                  Dashboard
                </h1>
                <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">
                  Manage InteropMed content operations, create insights, and keep an eye on the core database relationships that power published articles.
                </p>
              </div>
              <AccountLogoutButton />
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-16 dark:bg-slate-900">
          <div className="mx-auto max-w-7xl px-6">
            {!stats.hasData && (
              <div className="mb-8 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-200">
                Dashboard database stats could not be loaded. The account page is available, but counts will stay at zero until the database connection is healthy.
              </div>
            )}

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
              {cards.map((card) => (
                <div key={card.label} className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{card.label}</p>
                  <p className="mt-4 text-4xl font-bold text-slate-950 dark:text-white">{card.value}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{card.detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-4">
              <Link
                href="/account/insights"
                className="rounded-lg border border-slate-200 bg-white p-6 transition hover:border-teal-400 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-teal-500"
              >
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-teal-600 dark:text-teal-400">
                  Content
                </p>
                <h2 className="mb-3 text-xl font-bold text-slate-950 dark:text-white">Create insight</h2>
                <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Open the insight editor to create drafts or publish new thought leadership articles.
                </p>
              </Link>

              <Link
                href="/insights"
                className="rounded-lg border border-slate-200 bg-white p-6 transition hover:border-teal-400 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-teal-500"
              >
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-teal-600 dark:text-teal-400">
                  Public site
                </p>
                <h2 className="mb-3 text-xl font-bold text-slate-950 dark:text-white">View insights</h2>
                <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Review the public Insights page as visitors will see it.
                </p>
              </Link>

              <Link
                href="/contact"
                className="rounded-lg border border-slate-200 bg-white p-6 transition hover:border-teal-400 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-teal-500"
              >
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-teal-600 dark:text-teal-400">
                  Website
                </p>
                <h2 className="mb-3 text-xl font-bold text-slate-950 dark:text-white">Contact page</h2>
                <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Jump to the contact experience connected to account-driven content operations.
                </p>
              </Link>

              <Link
                href="/account/messages"
                className="rounded-lg border border-slate-200 bg-white p-6 transition hover:border-teal-400 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-teal-500"
              >
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-teal-600 dark:text-teal-400">
                  Leads
                </p>
                <h2 className="mb-3 text-xl font-bold text-slate-950 dark:text-white">Contact messages</h2>
                <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Review recent contact form submissions saved from the website.
                </p>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
