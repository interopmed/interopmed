import Link from 'next/link'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { articles } from '@/lib/articles'
import { db } from '@/lib/db'

export const metadata = {
  title: 'Insights | InteropMed',
  description: 'Insights from InteropMed on healthcare interoperability, FHIR-native infrastructure, and clinical data modernization.',
}

export const dynamic = 'force-dynamic'

type InsightCard = {
  slug: string
  title: string
  excerpt: string
  category: string
  publishedAt: string
  readingTime: string
  featuredImage?: string | null
}

function formatDate(value: Date | string | null) {
  if (!value) {
    return 'Draft'
  }

  return new Date(value).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function getReadingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  return `${Math.max(1, Math.ceil(words / 200))} min read`
}

async function getPublishedInsights(): Promise<InsightCard[]> {
  try {
    const dbInsights = await db.insight.findMany({ status: 'published' })

    return dbInsights.map((insight) => ({
      slug: insight.slug,
      title: insight.title,
      excerpt: insight.excerpt || insight.content.slice(0, 180),
      category: insight.category,
      publishedAt: formatDate(insight.publishedAt || insight.createdAt),
      readingTime: getReadingTime(insight.content),
      featuredImage: insight.featuredImage,
    }))
  } catch (error) {
    console.error('Error loading public insights:', error)
    return []
  }
}

export default async function InsightsPage() {
  const dbInsights = await getPublishedInsights()
  const staticInsights = articles.filter(
    (article) => !dbInsights.some((insight) => insight.slug === article.slug)
  )
  const insightCards: InsightCard[] = [
    ...dbInsights,
    ...staticInsights.map((article) => ({
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt,
      category: article.category,
      publishedAt: article.publishedAt,
      readingTime: article.readingTime,
      featuredImage: null,
    })),
  ]
  const featuredArticle = insightCards[0]

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-white py-20 dark:bg-slate-950 md:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-teal-600 dark:text-teal-400">
              InteropMed Insights
            </p>
            <div className="max-w-4xl">
              <h1 className="mb-6 text-4xl font-bold leading-tight text-slate-950 dark:text-white md:text-6xl">
                Practical thinking for clinical data infrastructure.
              </h1>
              <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">
                Insights on interoperability strategy, FHIR implementation, governance, and the architecture choices behind resilient healthcare data platforms.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-20 dark:bg-slate-900">
          <div className="mx-auto max-w-7xl px-6">
            <Link
              href={`/insights/${featuredArticle.slug}`}
              className="group grid gap-8 rounded-lg border border-slate-200 bg-white p-6 transition hover:border-teal-400 hover:shadow-xl hover:shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-teal-500 dark:hover:shadow-black/20 md:grid-cols-[0.8fr_1.2fr] md:p-8"
            >
              <div className="min-h-56 overflow-hidden rounded-lg bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 text-white">
                {featuredArticle.featuredImage ? (
                  <img
                    src={featuredArticle.featuredImage}
                    alt=""
                    className="h-full min-h-56 w-full object-cover"
                  />
                ) : (
                  <div className="flex min-h-56 flex-col justify-between p-6">
                    <div>
                      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-teal-300">
                        Featured insight
                      </p>
                      <div className="h-1 w-16 rounded-full bg-teal-400" />
                    </div>
                    <p className="font-mono text-sm text-slate-300">
                      FHIR / Governance / Clinical Networks
                    </p>
                  </div>
                )}
              </div>

              <article>
                <div className="mb-4 flex flex-wrap gap-3 text-sm text-slate-500 dark:text-slate-400">
                  <span>{featuredArticle.category}</span>
                  <span aria-hidden="true">/</span>
                  <span>{featuredArticle.publishedAt}</span>
                  <span aria-hidden="true">/</span>
                  <span>{featuredArticle.readingTime}</span>
                </div>
                <h2 className="mb-4 text-3xl font-bold text-slate-950 transition group-hover:text-teal-700 dark:text-white dark:group-hover:text-teal-300">
                  {featuredArticle.title}
                </h2>
                <p className="mb-6 text-base leading-7 text-slate-600 dark:text-slate-300">
                  {featuredArticle.excerpt}
                </p>
                <span className="text-sm font-semibold text-teal-600 dark:text-teal-400">
                  Read insight
                </span>
              </article>
            </Link>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {insightCards.map((article) => (
                <Link
                  key={article.slug}
                  href={`/insights/${article.slug}`}
                  className="rounded-lg border border-slate-200 bg-white p-6 transition hover:border-teal-400 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-teal-500"
                >
                  {article.featuredImage && (
                    <img
                      src={article.featuredImage}
                      alt=""
                      className="mb-5 aspect-video w-full rounded-lg object-cover"
                    />
                  )}
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-teal-600 dark:text-teal-400">
                    {article.category}
                  </p>
                  <h3 className="mb-3 text-xl font-semibold text-slate-950 dark:text-white">
                    {article.title}
                  </h3>
                  <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {article.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
