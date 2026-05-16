export default function ProblemSolutionMatrix() {
  const items = [
    {
      problem: "Vendor Lock-in",
      solution: "FHIR-native architecture with open standards ensuring data portability",
      icon: "🔒"
    },
    {
      problem: "Data Fragmentation",
      solution: "Unified data layer synthesizing disparate clinical systems in real-time",
      icon: "📊"
    },
    {
      problem: "Performance Bottlenecks",
      solution: "PostgreSQL + JSONB delivering sub-50ms query latency at enterprise scale",
      icon: "⚡"
    },
    {
      problem: "Compliance Complexity",
      solution: "Built-in audit trails, role-based access control, and encryption-at-rest",
      icon: "✅"
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            The Healthcare Data Ecosystem Redesigned
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            We eliminate the fundamental inefficiencies that plague modern clinical networks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="p-8 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-teal-500 dark:hover:border-teal-400 transition-all duration-300 hover:shadow-lg dark:hover:shadow-teal-500/10 group"
            >
              <div className="flex items-start gap-4 mb-4">
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">
                    Problem: {item.problem}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    {item.solution}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
