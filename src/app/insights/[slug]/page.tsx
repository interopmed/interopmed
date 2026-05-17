import Link from 'next/link'
import { notFound } from 'next/navigation'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { articles, getArticle } from '@/lib/articles'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

type InsightArticle = {
  title: string
  excerpt: string
  category: string
  author: string
  publishedAt: string
  readingTime: string
  sections: {
    heading: string
    body: string[]
  }[]
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

async function getDbInsight(slug: string): Promise<InsightArticle | null> {
  try {
    const insight = await db.insight.findPublishedBySlug(slug)

    if (!insight) {
      return null
    }

    return {
      title: insight.title,
      excerpt: insight.excerpt || insight.content.slice(0, 180),
      category: insight.category,
      author: `${insight.author.firstName} ${insight.author.lastName}`,
      publishedAt: formatDate(insight.publishedAt || insight.createdAt),
      readingTime: getReadingTime(insight.content),
      sections: [
        {
          heading: 'Insight',
          body: insight.content.split(/\n{2,}/).map((paragraph) => paragraph.trim()).filter(Boolean),
        },
      ],
    }
  } catch (error) {
    console.error('Error loading public insight detail:', error)
    return null
  }
}

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: PageProps<'/insights/[slug]'>) {
  const { slug } = await params
  const dbArticle = await getDbInsight(slug)
  const staticArticle = getArticle(slug)
  const article = dbArticle || staticArticle

  if (!article) {
    return {
      title: 'Insight not found | InteropMed',
    }
  }

  return {
    title: `${article.title} | InteropMed Insights`,
    description: article.excerpt,
  }
}

export default async function InsightPage({ params }: PageProps<'/insights/[slug]'>) {
  const { slug } = await params
  const dbArticle = await getDbInsight(slug)
  const staticArticle = getArticle(slug)
  const article = dbArticle || staticArticle

  if (!article) {
    notFound()
  }

  return (
    <>
      <Navbar />
      <main>
        <article>
          <header className="bg-white py-20 dark:bg-slate-950 md:py-28">
            <div className="mx-auto max-w-4xl px-6">
              <Link
                href="/insights"
                className="mb-8 inline-block text-sm font-semibold text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
              >
                Back to insights
              </Link>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-teal-600 dark:text-teal-400">
                {article.category}
              </p>
              <h1 className="mb-6 text-4xl font-bold leading-tight text-slate-950 dark:text-white md:text-6xl">
                {article.title}
              </h1>
              <p className="mb-8 text-xl leading-8 text-slate-600 dark:text-slate-300">
                {article.excerpt}
              </p>
              <div className="flex flex-wrap gap-3 text-sm text-slate-500 dark:text-slate-400">
                <span>{article.author}</span>
                <span aria-hidden="true">/</span>
                <span>{article.publishedAt}</span>
                <span aria-hidden="true">/</span>
                <span>{article.readingTime}</span>
              </div>
            </div>
          </header>

          <section className="bg-slate-50 py-16 dark:bg-slate-900">
            <div className="mx-auto max-w-4xl px-6">
              <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 md:p-10">
                {article.sections.map((section) => (
                  <section key={section.heading} className="mb-12 last:mb-0">
                    <h2 className="mb-5 text-2xl font-bold text-slate-950 dark:text-white">
                      {section.heading}
                    </h2>
                    <div className="space-y-5">
                      {section.body.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="text-base leading-8 text-slate-600 dark:text-slate-300"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  )
}
