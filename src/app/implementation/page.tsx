import Link from 'next/link'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'Implementation | InteropMed',
  description: 'Productized InteropMed implementation packages for FHIR-native interoperability, SHIN deployment, and managed clinical data operations.',
}

const packages = [
  {
    name: 'Launch',
    price: 'Pilot implementation',
    bestFor: 'Digital health teams and specialty clinics validating one workflow.',
    includes: [
      'Architecture and data-flow review',
      'One priority workflow mapped to HL7 FHIR resources',
      'Initial SHIN configuration and sandbox deployment',
      'Validation rules and exception review model',
    ],
  },
  {
    name: 'Scale',
    price: 'Production rollout',
    bestFor: 'Healthcare vendors, clinical networks, and regional programs moving into production.',
    includes: [
      'Multiple source and destination integrations',
      'Production-grade access, audit, and monitoring model',
      'HL7 FHIR profile, terminology, and identifier governance',
      'Implementation runbook and operational handoff',
    ],
  },
  {
    name: 'Operate',
    price: 'Managed support',
    bestFor: 'Organizations that need ongoing interoperability operations and SLA-backed support.',
    includes: [
      'Recurring platform subscription and support cadence',
      'Connector maintenance and mapping updates',
      'Exception triage and data quality reporting',
      'Security, compliance, and change-management reviews',
    ],
  },
]

const buyers = [
  'Digital health companies that need reliable EHR or HL7 FHIR integration',
  'Specialty clinical networks coordinating referrals, diagnostics, and care teams',
  'Healthcare software vendors adding interoperability to existing products',
  'Regional programs modernizing legacy interfaces into governed APIs',
]

const freeLayer = [
  'Open-source FHIR utilities',
  'SDKs',
  'Docs and examples',
  'Demo connectors',
]

const premiumLayer = [
  'SHIN Platform subscription',
  'Managed connectors',
  'Governance console',
  'Implementation packages',
  'Managed operations',
]

export default function ImplementationPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-white py-20 dark:bg-slate-950 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-teal-600 dark:text-teal-400">
                Implementation
              </p>
              <h1 className="mb-6 text-4xl font-bold leading-tight text-slate-950 dark:text-white md:text-6xl">
                Buy the platform with a repeatable path to production.
              </h1>
              <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">
                InteropMed is an HL7 FHIR-aligned interoperability platform that helps healthcare organizations implement, govern, and operate clinical data exchange through SHIN platform subscription, implementation packages, and ongoing operational support.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                Ideal early customers
              </p>
              <div className="space-y-3">
                {buyers.map((buyer) => (
                  <div key={buyer} className="rounded-lg bg-white p-4 text-sm font-medium text-slate-700 dark:bg-slate-950 dark:text-slate-300">
                    {buyer}
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
                Free to premium
              </p>
              <h2 className="text-3xl font-bold text-slate-950 dark:text-white md:text-5xl">
                A clear upgrade path from developer utility to production operations.
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-300">
                The free layer should attract technical users and validate demand. The premium layer should carry the real business value: reliability, governance, support, and accountable implementation.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <article className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 md:p-8">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                  Free
                </p>
                <h3 className="mb-5 text-2xl font-bold text-slate-950 dark:text-white">
                  Build and evaluate
                </h3>
                <ul className="space-y-3">
                  {freeLayer.map((item) => (
                    <li key={item} className="border-t border-slate-100 pt-3 text-sm leading-6 text-slate-600 dark:border-slate-800 dark:text-slate-300">
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/open-source"
                  className="mt-7 inline-block rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-teal-500 hover:text-teal-700 dark:border-slate-700 dark:text-slate-100 dark:hover:border-teal-400 dark:hover:text-teal-300"
                >
                  View open-source layer
                </Link>
              </article>

              <article className="rounded-lg border border-teal-200 bg-white p-6 dark:border-teal-900 dark:bg-slate-950 md:p-8">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-teal-600 dark:text-teal-400">
                  Premium
                </p>
                <h3 className="mb-5 text-2xl font-bold text-slate-950 dark:text-white">
                  Deploy and operate
                </h3>
                <ul className="space-y-3">
                  {premiumLayer.map((item) => (
                    <li key={item} className="border-t border-slate-100 pt-3 text-sm leading-6 text-slate-600 dark:border-slate-800 dark:text-slate-300">
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="mt-7 inline-block rounded-lg bg-gradient-to-r from-teal-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:shadow-lg hover:shadow-teal-500/25"
                >
                  Discuss premium fit
                </Link>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 dark:bg-slate-950">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-10 max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-teal-600 dark:text-teal-400">
                Packages
              </p>
              <h2 className="text-3xl font-bold text-slate-950 dark:text-white md:text-5xl">
                Productized implementation instead of open-ended consulting.
              </h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {packages.map((item) => (
                <article key={item.name} className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 md:p-8">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-teal-600 dark:text-teal-400">
                    {item.price}
                  </p>
                  <h3 className="mb-3 text-2xl font-bold text-slate-950 dark:text-white">{item.name}</h3>
                  <p className="mb-6 text-sm leading-6 text-slate-600 dark:text-slate-400">{item.bestFor}</p>
                  <ul className="space-y-3">
                    {item.includes.map((feature) => (
                      <li key={feature} className="border-t border-slate-100 pt-3 text-sm leading-6 text-slate-600 dark:border-slate-800 dark:text-slate-300">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <div className="mt-10 rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 md:p-8">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
                    Start with an architecture review.
                  </h2>
                  <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">
                    We will identify the first workflow, source systems, HL7 FHIR resources, integration risks, and the right package for your rollout.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="rounded-lg bg-gradient-to-r from-teal-500 to-blue-600 px-7 py-3 text-center text-sm font-semibold text-white transition hover:shadow-lg hover:shadow-teal-500/25"
                >
                  Request review
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
