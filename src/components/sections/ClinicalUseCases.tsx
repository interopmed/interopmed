export default function ClinicalUseCases() {
  const useCases = [
    {
      title: "Tertiary Care Integration",
      description: "Consolidate patient histories, operative reports, imaging timelines, and pathology at the point of care for high-stakes surgical decision-making.",
      metrics: ["150+ data points per patient", "Sub-second retrieval", "Real-time updates"]
    },
    {
      title: "Transitions of Care",
      description: "Eliminate diagnostic redundancies as patients move from peripheral clinics to tertiary hubs. Automated handoff documentation ensures continuity.",
      metrics: ["95% first-contact care", "Fewer repeat tests", "Improved outcomes"]
    },
    {
      title: "Real-time Telemetry & IoT",
      description: "Stream data from wireless physiological monitors into SHIN. Serverless functions trigger alerts when clinical thresholds breach, escalating to clinicians instantly.",
      metrics: ["<100ms latency", "Predictive alerting", "Seamless integration"]
    },
    {
      title: "Federated Analytics",
      description: "Run clinical research queries across multiple federated systems without centralizing sensitive data. Privacy-preserving analytics at scale.",
      metrics: ["Multi-site queries", "Privacy-first design", "HIPAA-safe reporting"]
    }
  ]

  return (
    <section className="py-20 md:py-32 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Clinical Solutions Driving Real Impact
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            InteropMed enables clinicians and researchers to work with unified, trustworthy data across complex healthcare ecosystems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {useCases.map((useCase, idx) => (
            <div
              key={idx}
              className="p-8 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-teal-500 dark:hover:border-teal-400 transition-all duration-300 hover:shadow-lg dark:hover:shadow-teal-500/10 group"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="text-3xl">
                  {idx === 0 && "🏥"}
                  {idx === 1 && "🔄"}
                  {idx === 2 && "📡"}
                  {idx === 3 && "📊"}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    {useCase.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                    {useCase.description}
                  </p>
                  <div className="space-y-1">
                    {useCase.metrics.map((metric, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-teal-600 dark:text-teal-400">
                        <span className="w-1.5 h-1.5 bg-teal-600 dark:bg-teal-400 rounded-full" />
                        {metric}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
