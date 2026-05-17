import Link from 'next/link'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import SiteCTA from '@/components/SiteCTA'
import ProblemSolutionMatrix from '@/components/sections/ProblemSolutionMatrix'
import SecurityCompliance from '@/components/sections/SecurityCompliance'

export const metadata = {
  title: 'InteropMed - Enterprise Health Data Interoperability',
  description: 'High-performance FHIR-native data middleware for complex clinical networks',
}

const flowSteps = [
  { step: 'Ingest', detail: 'Connect EHR, laboratory, imaging, device, and partner feeds.' },
  { step: 'Normalize', detail: 'Transform source records into FHIR-aligned resources.' },
  { step: 'Govern', detail: 'Apply validation, access policy, audit, and review controls.' },
  { step: 'Publish', detail: 'Serve clean clinical context to dashboards, APIs, and analytics.' },
]

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-white dark:bg-slate-950">
          <div className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl gap-14 px-6 py-16 lg:grid-cols-[0.96fr_1.04fr] lg:items-center lg:py-20">
            <div>
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 dark:border-slate-800 dark:bg-slate-900">
                <span className="h-2 w-2 rounded-full bg-teal-500" />
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-600 dark:text-slate-300">
                  FHIR-native interoperability
                </span>
              </div>
              <h1 className="max-w-4xl text-5xl font-bold leading-[1.02] text-slate-950 dark:text-white md:text-7xl">
                Clinical data infrastructure for governed exchange.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                InteropMed helps healthcare teams normalize fragmented clinical data into secure, auditable, FHIR-aligned workflows across complex care networks.
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="rounded-lg bg-gradient-to-r from-teal-500 to-blue-600 px-7 py-3 text-center text-sm font-semibold text-white transition hover:shadow-lg hover:shadow-teal-500/25"
                >
                  Request architecture review
                </Link>
                <Link
                  href="/shin"
                  className="rounded-lg border border-slate-300 px-7 py-3 text-center text-sm font-semibold text-slate-900 transition hover:border-teal-500 hover:text-teal-700 dark:border-slate-700 dark:text-slate-100 dark:hover:border-teal-400 dark:hover:text-teal-300"
                >
                  Explore SHIN platform
                </Link>
              </div>
              <div className="mt-12 grid max-w-2xl gap-6 border-t border-slate-200 pt-8 dark:border-slate-800 sm:grid-cols-3">
                {[
                  { value: 'FHIR R4', label: 'native resource model' },
                  { value: '<50ms', label: 'target query latency' },
                  { value: 'Audit', label: 'ready operations' },
                ].map((metric) => (
                  <div key={metric.value} className="border-l border-slate-200 pl-4 dark:border-slate-800">
                    <p className="text-2xl font-bold text-slate-950 dark:text-white">{metric.value}</p>
                    <p className="mt-1 text-sm leading-5 text-slate-500 dark:text-slate-400">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 shadow-2xl shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/30">
                <div className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-600 dark:text-teal-400">
                        SHIN node
                      </p>
                      <h2 className="mt-2 text-xl font-bold text-slate-950 dark:text-white">
                        Live interoperability fabric
                      </h2>
                    </div>
                    <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 dark:bg-teal-950 dark:text-teal-300">
                      Healthy
                    </span>
                  </div>

                  <div className="mb-6 grid gap-4 md:grid-cols-3">
                    {[
                      { label: 'Resources', value: '18.4k' },
                      { label: 'Latency', value: '47ms' },
                      { label: 'Policy checks', value: '100%' },
                    ].map((item) => (
                      <div key={item.label} className="rounded-lg bg-slate-50 p-4 dark:bg-slate-900">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                          {item.label}
                        </p>
                        <p className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">{item.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="grid gap-3">
                    {[
                      { label: 'Source systems', value: 'EHR / Labs / Imaging', status: 'connected' },
                      { label: 'FHIR normalization', value: 'Patient, Encounter, Observation', status: 'validated' },
                      { label: 'Governance', value: 'RBAC, audit, policy checks', status: 'enforced' },
                      { label: 'Consumers', value: 'Dashboards, APIs, analytics', status: 'available' },
                    ].map((row) => (
                      <div key={row.label} className="grid gap-3 rounded-lg border border-slate-200 p-4 dark:border-slate-800 md:grid-cols-[0.8fr_1fr_0.6fr]">
                        <p className="text-sm font-semibold text-slate-950 dark:text-white">{row.label}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{row.value}</p>
                        <p className="text-sm font-semibold text-teal-700 dark:text-teal-300">{row.status}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Rejected payloads</p>
                    <p className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">0.8%</p>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Terminology and identifier review queue</p>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Audit coverage</p>
                    <p className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">100%</p>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Access, transform, and publish events</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ProblemSolutionMatrix />

        <section className="bg-slate-950 py-20 text-white md:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-teal-300">
                  Operating model
                </p>
                <h2 className="text-4xl font-bold md:text-5xl">
                  From source data to trusted clinical action.
                </h2>
              </div>
              <p className="text-lg leading-8 text-slate-300">
                SHIN gives integration, clinical, and governance teams a shared path for ingesting data, normalizing resources, applying policy, and publishing dependable APIs.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              {flowSteps.map((item, index) => (
                <article key={item.step} className="rounded-lg border border-slate-800 bg-slate-900 p-6">
                  <p className="mb-5 font-mono text-sm text-teal-300">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mb-3 text-xl font-bold">{item.step}</h3>
                  <p className="text-sm leading-6 text-slate-400">{item.detail}</p>
                </article>
              ))}
            </div>

            <div className="mt-10">
              <Link
                href="/technology"
                className="inline-block rounded-lg border border-slate-700 px-7 py-3 text-sm font-semibold text-slate-100 transition hover:border-teal-400 hover:text-teal-300"
              >
                Explore the architecture
              </Link>
            </div>
          </div>
        </section>

        <SecurityCompliance />

        <SiteCTA
          eyebrow="Start planning"
          title="Ready to transform your data infrastructure?"
          description="Bring us your clinical data environment, integration constraints, and governance requirements. We will help frame the next practical step."
          primaryHref="/contact"
          primaryLabel="Request demo"
          secondaryHref="/technology"
          secondaryLabel="View technical specifications"
        />
      </main>
      <Footer />
    </>
  )
}
