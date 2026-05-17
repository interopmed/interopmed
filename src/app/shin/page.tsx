import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'SHIN Platform | InteropMed',
  description: 'InteropMed SHIN platform for FHIR-native healthcare interoperability and clinical data infrastructure.',
}

const capabilities = [
  {
    title: 'HL7 FHIR-native data layer',
    body: 'Normalize clinical data into standards-aligned resources that downstream systems can consume with less custom translation.',
  },
  {
    title: 'Integration orchestration',
    body: 'Coordinate data movement across EHRs, registries, labs, imaging systems, patient apps, and analytics destinations.',
  },
  {
    title: 'Governance controls',
    body: 'Support validation, access policy, audit trails, review workflows, and accountable ownership for clinical data exchange.',
  },
  {
    title: 'Operational visibility',
    body: 'Track integration health, event flow, transformation behavior, and exception patterns across complex networks.',
  },
]

const workflows = [
  'Patient identity and demographic synchronization',
  'Observation, encounter, and diagnostic result exchange',
  'Referral and transitions-of-care coordination',
  'FHIR API enablement for modern health applications',
  'Clinical data quality and governance review',
]

export default function ShinPlatformPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-white py-20 dark:bg-slate-950 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-teal-600 dark:text-teal-400">
                SHIN Platform
              </p>
              <h1 className="mb-6 text-4xl font-bold leading-tight text-slate-950 dark:text-white md:text-6xl">
                A standards-aligned health interoperability network layer.
              </h1>
              <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">
                SHIN helps healthcare organizations move from fragmented point-to-point interfaces to governed, observable, HL7 FHIR-native clinical data infrastructure.
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900 md:p-8">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-teal-600 dark:text-teal-400">
                Platform focus
              </p>
              <div className="space-y-4">
                {workflows.map((workflow) => (
                  <div
                    key={workflow}
                    className="rounded-lg border border-slate-200 bg-white p-4 text-sm font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                  >
                    {workflow}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-16 dark:bg-slate-900">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {capabilities.map((item) => (
                <article
                  key={item.title}
                  className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950"
                >
                  <h2 className="mb-3 text-lg font-semibold text-slate-950 dark:text-white">
                    {item.title}
                  </h2>
                  <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
