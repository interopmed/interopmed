import Link from 'next/link'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import SiteCTA from '@/components/SiteCTA'
import HeroSection from '@/components/sections/HeroSection'
import ProblemSolutionMatrix from '@/components/sections/ProblemSolutionMatrix'
import SecurityCompliance from '@/components/sections/SecurityCompliance'

export const metadata = {
  title: 'InteropMed - Enterprise Health Data Interoperability',
  description: 'High-performance FHIR-native data middleware for complex clinical networks',
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection
          headline="Unifying Healthcare Data Layer by Layer."
          subheadline="InteropMed bridges the gap between legacy clinical databases and modern care frontiers with a FHIR-native, high-performance data ecosystem."
          cta="/contact"
          ctaText="Request a Technical Deep Dive"
          ctaHref="/contact"
        />

        <ProblemSolutionMatrix />

        <section className="bg-gradient-to-br from-slate-900 to-slate-950 py-20 dark:from-slate-950 dark:to-slate-900 md:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <div>
                <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
                  SHIN: The Clinical Data Platform Redesigned
                </h2>
                <p className="mb-8 text-lg text-slate-300">
                  Smart Health Interop Node (SHIN) is a purpose-built middleware platform delivering FHIR-native data processing at enterprise scale. Built from the ground up for clinicians, researchers, and IT architects who refuse to compromise on performance, security, or compliance.
                </p>
                <ul className="mb-8 space-y-4">
                  {[
                    'FHIR R4 native data model with full normalization',
                    'PostgreSQL + JSONB for ACID compliance at NoSQL speed',
                    'Python/Django REST Framework for production-grade APIs',
                    'React Server Components for ultra-responsive clinical dashboards',
                  ].map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className="mt-1 font-bold text-teal-400">+</span>
                      <span className="text-slate-200">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/technology"
                  className="inline-block rounded-lg bg-gradient-to-r from-teal-500 to-blue-600 px-8 py-3 font-semibold text-white transition duration-300 hover:shadow-2xl hover:shadow-teal-500/30"
                >
                  Explore SHIN Architecture
                </Link>
              </div>

              <div className="relative hidden lg:block">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-500/20 to-blue-600/20 blur-3xl" />
                <div className="relative rounded-2xl border border-slate-700 bg-slate-800/50 p-8 backdrop-blur">
                  <div className="space-y-4 font-mono text-sm">
                    <div className="text-teal-400">{'>'} GET /fhir/Patient/pat-001</div>
                    <div className="ml-4 text-slate-400">
                      <div className="text-slate-500">{'{'}</div>
                      <div className="ml-2">
                        <div><span className="text-blue-400">{'"resourceType"'}</span>: <span className="text-green-400">{'"Patient"'}</span>,</div>
                        <div><span className="text-blue-400">{'"id"'}</span>: <span className="text-green-400">{'"pat-001"'}</span>,</div>
                        <div><span className="text-blue-400">{'"name"'}</span>: [<span className="text-green-400">{'"John Smith"'}</span>],</div>
                        <div><span className="text-blue-400">{'"birthDate"'}</span>: <span className="text-green-400">{'"1974-12-25"'}</span>,</div>
                        <div><span className="text-blue-400">{'"verified"'}</span>: <span className="text-green-400">true</span></div>
                      </div>
                      <div className="text-slate-500">{'}'}</div>
                    </div>
                    <div className="text-xs text-slate-500">Response time: 47ms | Status: 200 OK</div>
                  </div>
                </div>
              </div>
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
