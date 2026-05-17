import HeroSection from '@/components/sections/HeroSection'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CompanyPhilosophy from '@/components/sections/CompanyPhilosophy'

export const metadata = {
  title: 'About | InteropMed Corporate Governance',
  description: 'Corporate governance, standards alignment, and leadership positioning for InteropMed.',
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection
          headline="Committed to Trusted Health Informatics Governance"
          subheadline="InteropMed is an HL7 FHIR-aligned interoperability platform that helps healthcare organizations implement, govern, and operate clinical data exchange."
          cta="/contact"
          ctaText="Request Governance Brief"
          ctaHref="/contact"
        />

        <CompanyPhilosophy />

        <section className="py-20 md:py-32 bg-slate-50 dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-sm uppercase tracking-[0.3em] text-teal-500 mb-4">Standards Alignment</p>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                Built to meet global digital health benchmarks
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                Our platform aligns with international health informatics frameworks and the highest standards of clinical data integrity.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "HL7 FHIR R4",
                  description: "Standards-aligned implementation support for semantic interoperability across systems."
                },
                {
                  title: "AIDH / CHIA",
                  description: "Active alignment with Australasian digital health governance and clinical informatics best practices."
                },
                {
                  title: "Privacy & Compliance",
                  description: "Designed for HIPAA, HITECH, GDPR, and Australian privacy requirements."
                }
              ].map((item, idx) => (
                <div key={idx} className="p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-slate-950 text-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid gap-12 lg:grid-cols-3">
              {[
                {
                  label: "Executive Trust",
                  content: "Clear reporting, auditability, and governance controls for C-suite and digital health councils."
                },
                {
                  label: "Clinical Rigor",
                  content: "Designed with frontline clinicians in mind, reducing cognitive load and improving decision support."
                },
                {
                  label: "Technical Discipline",
                  content: "Transparent architecture, documented APIs, and enterprise observability built into every layer."
                }
              ].map((item, idx) => (
                <div key={idx} className="p-8 rounded-3xl border border-slate-800 bg-slate-900/95">
                  <p className="text-teal-400 uppercase tracking-[0.3em] text-xs mb-4">{item.label}</p>
                  <p className="text-slate-300 leading-relaxed">{item.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
