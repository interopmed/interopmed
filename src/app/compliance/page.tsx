import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'Compliance | InteropMed',
  description: 'InteropMed compliance overview for healthcare interoperability, security, privacy, and governance alignment.',
}

const frameworks = [
  {
    title: 'HIPAA and HITECH readiness',
    body: 'InteropMed is designed for healthcare organizations that require administrative, technical, and organizational controls for regulated health data workflows.',
  },
  {
    title: 'FHIR-first interoperability',
    body: 'Our architecture emphasizes standards-aligned data exchange, validation, normalization, and traceable clinical information flows.',
  },
  {
    title: 'GDPR and privacy alignment',
    body: 'Privacy-oriented design supports data minimization, purpose limitation, access governance, and appropriate handling of personal information.',
  },
  {
    title: 'Auditability and accountability',
    body: 'Operational workflows are designed around traceability, change history, access review, and clear ownership across clinical and technical teams.',
  },
]

const sections = [
  {
    title: 'Compliance posture',
    body: [
      'InteropMed supports healthcare organizations with infrastructure patterns and governance practices aligned to health data interoperability, privacy, and security expectations.',
      'Compliance depends on the customer environment, configuration, implementation scope, data flows, contracts, and operational controls. InteropMed works with customers to define responsibilities clearly during implementation.',
    ],
  },
  {
    title: 'Security controls',
    body: [
      'Security planning includes access control, authentication strategy, secure configuration, environment separation, logging, monitoring, and incident response coordination.',
      'Enterprise deployments should be reviewed against customer security policies, threat models, vendor risk requirements, and any applicable regulatory obligations.',
    ],
  },
  {
    title: 'Data governance',
    body: [
      'InteropMed promotes governance practices for data ownership, approved use cases, retention expectations, terminology consistency, transformation review, and clinical data quality.',
      'For interoperability programs, governance is treated as part of the operating model rather than a document stored after implementation.',
    ],
  },
  {
    title: 'Clinical interoperability standards',
    body: [
      'InteropMed focuses on standards-based integration patterns, including FHIR-oriented workflows and compatibility with complex clinical networks.',
      'Standards alignment helps reduce custom point-to-point logic, improve semantic consistency, and make audit and review processes more dependable.',
    ],
  },
  {
    title: 'Customer responsibility',
    body: [
      'Customers remain responsible for their own regulatory obligations, user access decisions, data classification, privacy notices, consent workflows, and internal policies.',
      'InteropMed implementation teams can support architecture review and documentation, but customers should involve legal, privacy, compliance, clinical, and security stakeholders for final decisions.',
    ],
  },
]

export default function CompliancePage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-white py-20 dark:bg-slate-950 md:py-28">
          <div className="mx-auto max-w-4xl px-6">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-teal-600 dark:text-teal-400">
              Compliance
            </p>
            <h1 className="mb-6 text-4xl font-bold leading-tight text-slate-950 dark:text-white md:text-6xl">
              Governance for trusted clinical data exchange.
            </h1>
            <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">
              InteropMed is built for healthcare interoperability programs that need security, privacy, auditability, and standards alignment from the beginning.
            </p>
          </div>
        </section>

        <section className="bg-slate-50 py-16 dark:bg-slate-900">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {frameworks.map((item) => (
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

        <section className="bg-white py-16 dark:bg-slate-950">
          <div className="mx-auto max-w-4xl px-6">
            <div className="space-y-12">
              {sections.map((section) => (
                <section key={section.title} className="border-b border-slate-200 pb-10 last:border-0 last:pb-0 dark:border-slate-800">
                  <h2 className="mb-5 text-2xl font-bold text-slate-950 dark:text-white">
                    {section.title}
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
        </section>
      </main>
      <Footer />
    </>
  )
}
