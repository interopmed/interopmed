import HeroSection from '@/components/sections/HeroSection'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SiteCTA from '@/components/SiteCTA'
import ClinicalUseCases from '@/components/sections/ClinicalUseCases'
import TransitionsOfCare from '@/components/sections/TransitionsOfCare'

export const metadata = {
  title: 'Solutions | InteropMed Clinical Use Cases',
  description: 'Clinical use cases and care pathways enabled by InteropMed for specialty care, transitions of care, and telemetry.',
}

export default function SolutionsPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection
          headline="Clinical Solutions for High-Stakes Care"
          subheadline="InteropMed empowers medical directors with unified clinical context, live telemetry ingestion, and secure care transitions." 
          cta="/contact"
          ctaText="Request a Clinical Review"
          ctaHref="/contact"
        />

        <ClinicalUseCases />
        <TransitionsOfCare />

        <section className="py-20 md:py-32 bg-slate-950 text-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Designed for Clinical Excellence</h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto mb-10">
              SHIN supports tertiary surgical workflows, live device telemetry, and secure patient handoffs without adding complexity to care teams.
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  label: "Vascular Surgery",
                  detail: "Single-view surgical timelines across imaging, pathology, and perioperative data."
                },
                {
                  label: "Telemetry Monitoring",
                  detail: "Live stream ingestion with rule-based alerting and escalation."
                },
                {
                  label: "Care Coordination",
                  detail: "Automated patient routing and document exchange across providers."
                }
              ].map((item, idx) => (
                <div key={idx} className="p-8 bg-slate-900 rounded-3xl border border-slate-800">
                  <h3 className="text-xl font-semibold text-white mb-3">{item.label}</h3>
                  <p className="text-slate-400">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <SiteCTA
          eyebrow="Clinical review"
          title="Map InteropMed to your clinical workflow."
          description="Bring a care pathway, referral workflow, or telemetry use case and we will help scope the integration model."
          primaryHref="/contact"
          primaryLabel="Request clinical review"
          secondaryHref="/shin"
          secondaryLabel="Explore SHIN"
        />
      </main>
      <Footer />
    </>
  )
}
