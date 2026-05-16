export default function SHINArchitecture() {
  const layers = [
    {
      name: "Clinical Presentation",
      description: "React Server Components delivering real-time dashboards at ultra-low latency",
      tech: "Next.js App Router • RSC • WebSockets",
      color: "from-violet-500 to-purple-600"
    },
    {
      name: "Logic & Orchestration",
      description: "Enterprise-grade business logic, validation pipelines, and access control",
      tech: "Python • Django REST Framework • Celery",
      color: "from-blue-500 to-cyan-600"
    },
    {
      name: "Data Layer",
      description: "ACID-compliant storage processing nested FHIR data at NoSQL speed",
      tech: "PostgreSQL • JSONB • PgVector",
      color: "from-teal-500 to-green-600"
    },
    {
      name: "FHIR Integration",
      description: "Standardized healthcare data ingestion from legacy systems and modern APIs",
      tech: "HL7 FHIR R4 • RESTful APIs • Normalization",
      color: "from-emerald-500 to-teal-600"
    }
  ]

  return (
    <section className="py-20 md:py-32 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            SHIN Architecture: Layer-by-Layer Precision
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            A meticulously engineered data pipeline from clinical ingestion through advanced analytics, built for mission-critical healthcare environments.
          </p>
        </div>

        <div className="space-y-6">
          {layers.map((layer, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300"
            >
              {/* Gradient accent */}
              <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${layer.color} opacity-5 rounded-full -mr-24 -mt-24`} />

              <div className="relative p-8 md:p-10">
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br ${layer.color} flex items-center justify-center text-white font-bold text-lg`}>
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-white mb-2">
                      {layer.name}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      {layer.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {layer.tech.split(' • ').map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-xs font-mono font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Performance Metrics */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Query Latency", value: "<50ms" },
            { label: "Data Consistency", value: "ACID" },
            { label: "Concurrent Users", value: "10,000+" },
            { label: "Uptime SLA", value: "99.99%" }
          ].map((metric, idx) => (
            <div
              key={idx}
              className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-center"
            >
              <p className="text-3xl md:text-4xl font-bold text-teal-600 dark:text-teal-400 mb-2">
                {metric.value}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
