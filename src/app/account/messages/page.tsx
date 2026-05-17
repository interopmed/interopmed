import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { ACCOUNT_SESSION_COOKIE, isValidAccountSession } from '@/lib/account-auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Contact Messages | InteropMed Account',
  description: 'Review contact form messages submitted through the InteropMed website.',
}

async function requireAccountSession() {
  const cookieStore = await cookies()
  const session = cookieStore.get(ACCOUNT_SESSION_COOKIE)?.value

  if (!isValidAccountSession(session)) {
    redirect('/account/login?next=/account/messages')
  }
}

async function getContactMessages() {
  try {
    return await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    })
  } catch (error) {
    console.error('Error loading contact messages:', error)
    return []
  }
}

function formatDate(value: Date) {
  return value.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export default async function AccountMessagesPage() {
  await requireAccountSession()
  const messages = await getContactMessages()

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-white py-16 dark:bg-slate-950 md:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-teal-600 dark:text-teal-400">
              Account
            </p>
            <h1 className="mb-6 text-4xl font-bold leading-tight text-slate-950 dark:text-white md:text-5xl">
              Contact messages
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Review recent website contact form submissions saved to the database.
            </p>
          </div>
        </section>

        <section className="bg-slate-50 py-16 dark:bg-slate-900">
          <div className="mx-auto max-w-7xl px-6">
            {messages.length > 0 ? (
              <div className="grid gap-5">
                {messages.map((message) => (
                  <article
                    key={message.id}
                    className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-teal-600 dark:text-teal-400">
                          {message.topic}
                        </p>
                        <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                          {message.firstName} {message.lastName}
                        </h2>
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                          {message.email}
                          {message.organization ? ` / ${message.organization}` : ''}
                        </p>
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        <p>{message.status}</p>
                        <p>{formatDate(message.createdAt)}</p>
                      </div>
                    </div>
                    <p className="mt-5 whitespace-pre-wrap text-base leading-8 text-slate-600 dark:text-slate-300">
                      {message.message}
                    </p>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-slate-200 bg-white p-6 text-sm leading-6 text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
                No contact messages have been saved yet.
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
