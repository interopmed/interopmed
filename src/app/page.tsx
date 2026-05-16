import HeroSection from '@/components/sections/HeroSection'
import ProblemSolutionMatrix from '@/components/sections/ProblemSolutionMatrix'
import SHINArchitecture from '@/components/sections/SHINArchitecture'
import SecurityCompliance from '@/components/sections/SecurityCompliance'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'InteropMed - Enterprise Health Data Interoperability',
  description: 'High-performance FHIR-native data middleware for complex clinical networks',
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <HeroSection
          headline="Unifying Healthcare Data Layer by Layer."
          subheadline="InteropMed bridges the gap between legacy clinical databases and modern care frontiers with a FHIR-native, high-performance data ecosystem."
          cta="Request a Technical Deep Dive"
          ctaText="Request a Technical Deep Dive"
        />

        {/* Problem & Solution Matrix */}
        <ProblemSolutionMatrix />

        {/* SHIN Architecture Preview */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-slate-900 to-slate-950 dark:from-slate-950 dark:to-slate-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  SHIN: The Clinical Data Platform Redesigned
                </h2>
                <p className="text-lg text-slate-300 mb-8">
                  Smart Health Interop Node (SHIN) is a purpose-built middleware platform delivering FHIR-native data processing at enterprise scale. Built from the ground up for clinicians, researchers, and IT architects who refuse to compromise on performance, security, or compliance.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "FHIR R4 native data model with full normalization",
                    "PostgreSQL + JSONB for ACID compliance at NoSQL speed",
                    "Python/Django REST Framework for production-grade APIs",
                    "React Server Components for ultra-responsive clinical dashboards"
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-teal-400 font-bold mt-1">✓</span>
                      <span className="text-slate-200">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a href="/technology" className="inline-block px-8 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-teal-500/30 transition-all duration-300 transform hover:scale-105">
                  Explore SHIN Architecture →
                </a>
              </div>
              <div className="hidden lg:block relative">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-blue-600/20 rounded-2xl blur-3xl" />
                <div className="relative bg-slate-800/50 border border-slate-700 rounded-2xl p-8 backdrop-blur">
                  <div className="space-y-4 font-mono text-sm">
                    <div className="text-teal-400">{'>'} GET /fhir/Patient/pat-001</div>
                    <div className="text-slate-400 ml-4">
                      <div className="text-slate-500">{"{"}</div>
                      <div className="ml-2">
                        <div><span className="text-blue-400">"resourceType"</span>: <span className="text-green-400">"Patient"</span>,</div>
                        <div><span className="text-blue-400">"id"</span>: <span className="text-green-400">"pat-001"</span>,</div>
                        <div><span className="text-blue-400">"name"</span>: [<span className="text-green-400">"John Smith"</span>],</div>
                        <div><span className="text-blue-400">"birthDate"</span>: <span className="text-green-400">"1974-12-25"</span>,</div>
                        <div><span className="text-blue-400">"verified"</span>: <span className="text-green-400">true</span></div>
                      </div>
                      <div className="text-slate-500">{"}"}</div>
                    </div>
                    <div className="text-slate-500 text-xs">Response time: 47ms | Status: 200 OK</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security & Compliance */}
        <SecurityCompliance />

        {/* CTA Section */}
        <section className="py-20 md:py-32 bg-white dark:bg-slate-950">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Ready to Transform Your Data Infrastructure?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
              Join healthcare enterprises using InteropMed to unify data, accelerate innovation, and deliver better patient outcomes.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-teal-500/30 transition-all duration-300 transform hover:scale-105">
                Request Demo
              </button>
              <a href="/technology" className="px-8 py-3 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 rounded-lg font-semibold hover:border-teal-500 dark:hover:border-teal-400 hover:text-teal-600 dark:hover:text-teal-400 transition-all duration-300">
                View Technical Specifications
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
