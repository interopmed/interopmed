import SHINArchitecture from '@/components/sections/SHINArchitecture'
import APIPlayground from '@/components/sections/APIPlayground'
import HeroSection from '@/components/sections/HeroSection'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SiteCTA from '@/components/SiteCTA'

export const metadata = {
  title: 'Technology | InteropMed - SHIN Platform Architecture',
  description: 'Deep dive into SHIN platform architecture, FHIR-native design, and enterprise-grade technology stack.',
}

export default function TechnologyPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <HeroSection
          headline="Enterprise Architecture for Healthcare Data"
          subheadline="SHIN represents a fundamental reimagining of health data middleware, built from the ground up with FHIR, PostgreSQL, and Python to handle the complexity of modern clinical networks."
          cta="/contact"
          ctaText="Download Architecture Whitepaper"
          ctaHref="/contact"
        />

        {/* Architecture Deep Dive */}
        <SHINArchitecture />

        {/* Technology Stack Details */}
        <section className="py-20 md:py-32 bg-slate-50 dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                The Technology Stack: Why SHIN Wins
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                Every technology choice in SHIN was made to solve a specific healthcare data challenge.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Data Layer */}
              <div className="p-8 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="text-3xl mb-4">🗄️</div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Data Layer: PostgreSQL + JSONB
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  FHIR resources are deeply nested, unstructured data. Traditional relational schemas force painful normalization. SHIN uses PostgreSQL&apos;s JSONB to store nested FHIR resources while maintaining ACID guarantees and powerful query capabilities.
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <span className="text-teal-500 font-bold">→</span>
                    <span className="text-slate-600 dark:text-slate-300"><strong>ACID Compliance:</strong> Every transaction is guaranteed consistent</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-teal-500 font-bold">→</span>
                    <span className="text-slate-600 dark:text-slate-300"><strong>Horizontal Scalability:</strong> Partitioning and streaming replication</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-teal-500 font-bold">→</span>
                    <span className="text-slate-600 dark:text-slate-300"><strong>NoSQL Flexibility:</strong> JSONB queries without sacrificing integrity</span>
                  </div>
                </div>
              </div>

              {/* Logic Engine */}
              <div className="p-8 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="text-3xl mb-4">⚙️</div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Logic Engine: Python & Django
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Healthcare requires complex validation logic, sophisticated access control, and integration pipelines. Python&apos;s ecosystem and Django&apos;s battle-tested ORM provide the foundation for SHIN&apos;s orchestration layer.
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <span className="text-teal-500 font-bold">→</span>
                    <span className="text-slate-600 dark:text-slate-300"><strong>Security:</strong> OAuth2, RBAC, and encryption built-in</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-teal-500 font-bold">→</span>
                    <span className="text-slate-600 dark:text-slate-300"><strong>Validation:</strong> Complex clinical rules enforced server-side</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-teal-500 font-bold">→</span>
                    <span className="text-slate-600 dark:text-slate-300"><strong>Async Processing:</strong> Celery handles heavy compute jobs</span>
                  </div>
                </div>
              </div>

              {/* Presentation Layer */}
              <div className="p-8 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="text-3xl mb-4">⚛️</div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Presentation: React Server Components
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Clinicians need real-time dashboards that are both secure and snappy. React Server Components (RSC) in Next.js deliver data directly server-side, eliminating waterfall requests and keeping sensitive data off the browser.
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <span className="text-teal-500 font-bold">→</span>
                    <span className="text-slate-600 dark:text-slate-300"><strong>Zero JS Shipping:</strong> Static rendering where possible</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-teal-500 font-bold">→</span>
                    <span className="text-slate-600 dark:text-slate-300"><strong>Sub-Second Interactivity:</strong> Optimized bundles</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-teal-500 font-bold">→</span>
                    <span className="text-slate-600 dark:text-slate-300"><strong>Privacy First:</strong> Secrets never reach the browser</span>
                  </div>
                </div>
              </div>

              {/* Integration */}
              <div className="p-8 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="text-3xl mb-4">🔌</div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  FHIR Integration Layer
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  SHIN consumes data from legacy clinical systems and modern APIs, normalizing everything into FHIR R4. Proprietary formats are automatically converted to standard, interoperable structures.
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <span className="text-teal-500 font-bold">→</span>
                    <span className="text-slate-600 dark:text-slate-300"><strong>Multi-Source Ingestion:</strong> HL7v2, HL7v3, Direct, RESTful APIs</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-teal-500 font-bold">→</span>
                    <span className="text-slate-600 dark:text-slate-300"><strong>Automatic Normalization:</strong> Vendor-specific data standardized</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-teal-500 font-bold">→</span>
                    <span className="text-slate-600 dark:text-slate-300"><strong>Semantic Validation:</strong> Clinical codes and references verified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* API Playground */}
        <APIPlayground />

        {/* Performance Guarantees */}
        <section className="py-20 md:py-32 bg-white dark:bg-slate-950">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                Enterprise-Grade Performance Guarantees
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  metric: "<50ms",
                  label: "P95 Query Latency",
                  detail: "Clinical dashboards load in under a human heartbeat"
                },
                {
                  metric: "99.99%",
                  label: "Uptime SLA",
                  detail: "Multi-region failover, automated recovery"
                },
                {
                  metric: "10,000+",
                  label: "Concurrent Users",
                  detail: "Health system scale with consistent performance"
                }
              ].map((perf, idx) => (
                <div key={idx} className="p-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
                  <div className="text-5xl font-bold text-teal-600 dark:text-teal-400 mb-4">
                    {perf.metric}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    {perf.label}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    {perf.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <SiteCTA
          eyebrow="Architecture review"
          title="Need a technical review of your interoperability stack?"
          description="Share your current integration landscape and we will help identify the strongest next step for FHIR-native modernization."
          primaryHref="/contact"
          primaryLabel="Request architecture review"
          secondaryHref="/api-reference"
          secondaryLabel="View API reference"
        />
      </main>
      <Footer />
    </>
  )
}
