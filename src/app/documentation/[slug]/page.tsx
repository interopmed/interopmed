import Link from 'next/link'
import { notFound } from 'next/navigation'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { documentationGuides, getDocumentationGuide } from '@/lib/documentation'

export function generateStaticParams() {
  return documentationGuides.map((guide) => ({
    slug: guide.slug,
  }))
}

export async function generateMetadata({ params }: PageProps<'/documentation/[slug]'>) {
  const { slug } = await params
  const guide = getDocumentationGuide(slug)

  if (!guide) {
    return {
      title: 'Documentation not found | InteropMed',
    }
  }

  return {
    title: `${guide.title} | InteropMed Documentation`,
    description: guide.description,
  }
}

export default async function DocumentationGuidePage({ params }: PageProps<'/documentation/[slug]'>) {
  const { slug } = await params
  const guide = getDocumentationGuide(slug)

  if (!guide) {
    notFound()
  }

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-white py-20 dark:bg-slate-950 md:py-28">
          <div className="mx-auto max-w-4xl px-6">
            <Link
              href="/documentation"
              className="mb-8 inline-block text-sm font-semibold text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
            >
              Back to documentation
            </Link>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-teal-600 dark:text-teal-400">
              {guide.category}
            </p>
            <h1 className="mb-6 text-4xl font-bold leading-tight text-slate-950 dark:text-white md:text-6xl">
              {guide.title}
            </h1>
            <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">
              {guide.description}
            </p>
          </div>
        </section>

        <section className="bg-slate-50 py-16 dark:bg-slate-900">
          <div className="mx-auto max-w-4xl px-6">
            <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 md:p-10">
              <div className="space-y-12">
                {guide.sections.map((section) => (
                  <section key={section.heading}>
                    <h2 className="mb-5 text-2xl font-bold text-slate-950 dark:text-white">
                      {section.heading}
                    </h2>
                    <div className="space-y-4">
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
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
