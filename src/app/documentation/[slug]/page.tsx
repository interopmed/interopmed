import Link from 'next/link'
import { notFound } from 'next/navigation'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { documentationGuides, getDocumentationGuide } from '@/lib/documentation'

function sectionId(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

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

  const guideIndex = documentationGuides.findIndex((item) => item.slug === guide.slug)
  const previousGuide = guideIndex > 0 ? documentationGuides[guideIndex - 1] : null
  const nextGuide = guideIndex < documentationGuides.length - 1 ? documentationGuides[guideIndex + 1] : null
  const readingTime = `${Math.max(
    3,
    Math.ceil(guide.sections.flatMap((section) => section.body).join(' ').split(/\s+/).length / 180)
  )} min read`

  return (
    <>
      <Navbar />
      <main>
        <section className="border-b border-slate-200 bg-white py-16 dark:border-slate-800 dark:bg-slate-950 md:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <Link
              href="/documentation"
              className="mb-8 inline-block text-sm font-semibold text-teal-600 transition hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
            >
              Back to documentation
            </Link>
            <div className="grid gap-10 lg:grid-cols-[1fr_0.42fr] lg:items-end">
              <div>
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-teal-600 dark:text-teal-400">
                  {guide.category}
                </p>
                <h1 className="mb-6 max-w-4xl text-4xl font-bold leading-tight text-slate-950 dark:text-white md:text-6xl">
                  {guide.title}
                </h1>
                <p className="max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                  {guide.description}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {[
                  { label: 'Guide type', value: guide.category },
                  { label: 'Sections', value: String(guide.sections.length) },
                  { label: 'Reading time', value: readingTime },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                      {item.label}
                    </p>
                    <p className="mt-2 text-lg font-bold text-slate-950 dark:text-white">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-12 dark:bg-slate-900 md:py-16">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[0.32fr_1fr]">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                  In this guide
                </p>
                <nav className="space-y-2">
                  {guide.sections.map((section, index) => (
                    <a
                      key={section.heading}
                      href={`#${sectionId(section.heading)}`}
                      className="grid grid-cols-[2rem_1fr] rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-teal-700 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-teal-300"
                    >
                      <span className="font-mono text-xs text-slate-400">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span>{section.heading}</span>
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            <div className="space-y-6">
              {guide.sections.map((section, index) => (
                <section
                  key={section.heading}
                  id={sectionId(section.heading)}
                  className="scroll-mt-28 rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 md:p-9"
                >
                  <div className="mb-6 flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-50 font-mono text-sm font-bold text-teal-700 dark:bg-teal-950/50 dark:text-teal-300">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-teal-600 dark:text-teal-400">
                        {guide.category}
                      </p>
                      <h2 className="text-2xl font-bold text-slate-950 dark:text-white md:text-3xl">
                        {section.heading}
                      </h2>
                    </div>
                  </div>
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

              <div className="grid gap-4 md:grid-cols-2">
                {previousGuide ? (
                  <Link
                    href={`/documentation/${previousGuide.slug}`}
                    className="rounded-lg border border-slate-200 bg-white p-5 transition hover:border-teal-400 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-teal-500"
                  >
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                      Previous
                    </p>
                    <p className="font-bold text-slate-950 dark:text-white">{previousGuide.title}</p>
                  </Link>
                ) : (
                  <div />
                )}

                {nextGuide && (
                  <Link
                    href={`/documentation/${nextGuide.slug}`}
                    className="rounded-lg border border-slate-200 bg-white p-5 transition hover:border-teal-400 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-teal-500 md:text-right"
                  >
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                      Next
                    </p>
                    <p className="font-bold text-slate-950 dark:text-white">{nextGuide.title}</p>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
