import Link from 'next/link'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'Open Source FHIR Utilities | InteropMed',
  description: 'Free InteropMed FHIR utilities, SDKs, examples, and demo connectors for teams evaluating clinical data exchange.',
}

const freeTools = [
  {
    title: 'Open-source FHIR utilities',
    detail: 'Validation helpers, mapping references, payload examples, and implementation checklists for common HL7 FHIR workflows.',
  },
  {
    title: 'SDKs',
    detail: 'Developer-friendly client patterns for authentication, resource access, query workflows, and integration testing.',
  },
  {
    title: 'Docs and examples',
    detail: 'Practical guides that show how to model clinical workflows, align resources, and prepare teams for governed exchange.',
  },
  {
    title: 'Demo connectors',
    detail: 'Reference connectors for sandbox evaluation, workflow demos, and early proof-of-concept integrations.',
  },
]

const premiumPath = [
  'SHIN Platform subscription',
  'Managed connectors',
  'Governance console',
  'Implementation packages',
  'Managed operations',
]

export default function OpenSourcePage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-white py-20 dark:bg-slate-950 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-teal-600 dark:text-teal-400">
                Free developer layer
              </p>
              <h1 className="mb-6 text-4xl font-bold leading-tight text-slate-950 dark:text-white md:text-6xl">
                Open-source FHIR utilities that help teams start faster.
              </h1>
              <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">
                InteropMed can use free utilities, SDKs, documentation, examples, and demo connectors to earn developer trust before a team needs the premium SHIN production platform.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/documentation"
                  className="rounded-lg bg-gradient-to-r from-teal-500 to-blue-600 px-7 py-3 text-center text-sm font-semibold text-white transition hover:shadow-lg hover:shadow-teal-500/25"
                >
                  Read documentation
                </Link>
                <Link
                  href="/implementation"
                  className="rounded-lg border border-slate-300 px-7 py-3 text-center text-sm font-semibold text-slate-900 transition hover:border-teal-500 hover:text-teal-700 dark:border-slate-700 dark:text-slate-100 dark:hover:border-teal-400 dark:hover:text-teal-300"
                >
                  Scale with SHIN
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                What stays premium
              </p>
              <div className="space-y-3">
                {premiumPath.map((item) => (
                  <div key={item} className="rounded-lg bg-white p-4 text-sm font-medium text-slate-700 dark:bg-slate-950 dark:text-slate-300">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-16 dark:bg-slate-900">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-10 max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-teal-600 dark:text-teal-400">
                Free offering
              </p>
              <h2 className="text-3xl font-bold text-slate-950 dark:text-white md:text-5xl">
                Useful enough to adopt. Clear enough to upgrade.
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {freeTools.map((tool) => (
                <article key={tool.title} className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 md:p-8">
                  <h3 className="mb-3 text-2xl font-bold text-slate-950 dark:text-white">
                    {tool.title}
                  </h3>
                  <p className="text-base leading-7 text-slate-600 dark:text-slate-300">
                    {tool.detail}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-10 rounded-lg border border-teal-200 bg-white p-6 dark:border-teal-900 dark:bg-slate-950 md:p-8">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
                    Keep the free layer technical. Sell the operational layer.
                  </h2>
                  <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">
                    Open source should help teams evaluate and prototype. Premium should begin when they need production connectors, governance, implementation support, monitoring, and SLA-backed operations.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="rounded-lg bg-gradient-to-r from-teal-500 to-blue-600 px-7 py-3 text-center text-sm font-semibold text-white transition hover:shadow-lg hover:shadow-teal-500/25"
                >
                  Plan the upgrade path
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
