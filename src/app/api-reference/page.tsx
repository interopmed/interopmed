import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'API Reference | InteropMed',
  description: 'InteropMed API reference overview for FHIR-native interoperability workflows.',
}

const endpoints = [
  {
    method: 'GET',
    path: '/api/patients',
    description: 'List patient resources available to authorized clinical workflows.',
  },
  {
    method: 'GET',
    path: '/api/providers',
    description: 'Retrieve provider and organization data for care coordination.',
  },
  {
    method: 'GET',
    path: '/api/records',
    description: 'Query clinical records and interoperability payloads.',
  },
  {
    method: 'POST',
    path: '/api/integrations',
    description: 'Coordinate integration events and connected system workflows.',
  },
]

const principles = [
  'Use standards-aligned resource contracts wherever possible.',
  'Authenticate service access through customer-approved controls.',
  'Validate payload shape, terminology, and ownership before production use.',
  'Log integration activity for operational review and auditability.',
]

export default function ApiReferencePage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-white py-20 dark:bg-slate-950 md:py-28">
          <div className="mx-auto max-w-4xl px-6">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-teal-600 dark:text-teal-400">
              API Reference
            </p>
            <h1 className="mb-6 text-4xl font-bold leading-tight text-slate-950 dark:text-white md:text-6xl">
              API surfaces for clinical data interoperability.
            </h1>
            <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">
              InteropMed APIs are organized around governed access to patient, provider, record, and integration workflows. This overview highlights the public reference structure for teams planning implementation.
            </p>
          </div>
        </section>

        <section className="bg-slate-50 py-16 dark:bg-slate-900">
          <div className="mx-auto max-w-5xl px-6">
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
              {endpoints.map((endpoint) => (
                <div
                  key={endpoint.path}
                  className="grid gap-4 border-b border-slate-200 p-6 last:border-0 dark:border-slate-800 md:grid-cols-[0.22fr_0.38fr_1fr]"
                >
                  <span className="font-mono text-sm font-semibold text-teal-600 dark:text-teal-400">
                    {endpoint.method}
                  </span>
                  <span className="break-words font-mono text-sm text-slate-950 dark:text-white">
                    {endpoint.path}
                  </span>
                  <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {endpoint.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 md:p-8">
              <h2 className="mb-5 text-2xl font-bold text-slate-950 dark:text-white">
                Implementation principles
              </h2>
              <ul className="space-y-3">
                {principles.map((principle) => (
                  <li key={principle} className="text-base leading-7 text-slate-600 dark:text-slate-300">
                    {principle}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
