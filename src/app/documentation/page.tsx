import Link from 'next/link'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'Documentation | InteropMed',
  description: 'InteropMed documentation hub for platform setup, interoperability planning, and implementation guidance.',
}

const guides = [
  {
    title: 'Getting started',
    description: 'Understand the SHIN platform model, core integration concepts, and the planning inputs needed before implementation.',
  },
  {
    title: 'FHIR implementation',
    description: 'Review resource mapping, validation expectations, terminology considerations, and rollout patterns for FHIR-native workflows.',
  },
  {
    title: 'Security and access',
    description: 'Plan authentication, authorization, environment boundaries, audit logging, and operational review practices.',
  },
  {
    title: 'Operations',
    description: 'Monitor integration health, manage exceptions, review data quality, and coordinate changes across clinical and technical teams.',
  },
]

export default function DocumentationPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-white py-20 dark:bg-slate-950 md:py-28">
          <div className="mx-auto max-w-4xl px-6">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-teal-600 dark:text-teal-400">
              Documentation
            </p>
            <h1 className="mb-6 text-4xl font-bold leading-tight text-slate-950 dark:text-white md:text-6xl">
              Implementation guidance for clinical data infrastructure.
            </h1>
            <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">
              Use these documentation areas to plan platform setup, standards alignment, security review, and operational readiness for InteropMed deployments.
            </p>
          </div>
        </section>

        <section className="bg-slate-50 py-16 dark:bg-slate-900">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-6 md:grid-cols-2">
              {guides.map((guide) => (
                <article
                  key={guide.title}
                  className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 md:p-8"
                >
                  <h2 className="mb-3 text-2xl font-bold text-slate-950 dark:text-white">
                    {guide.title}
                  </h2>
                  <p className="text-base leading-7 text-slate-600 dark:text-slate-300">
                    {guide.description}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-10 rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 md:p-8">
              <h2 className="mb-4 text-2xl font-bold text-slate-950 dark:text-white">
                Need implementation support?
              </h2>
              <p className="mb-6 text-base leading-7 text-slate-600 dark:text-slate-300">
                InteropMed can help your team scope integration architecture, governance, and implementation readiness.
              </p>
              <Link
                href="/contact"
                className="inline-block rounded-lg bg-gradient-to-r from-teal-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:shadow-lg hover:shadow-teal-500/25"
              >
                Contact the team
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
