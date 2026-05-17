const items = [
  {
    problem: 'Vendor lock-in',
    solution: 'Standards-first architecture gives teams a portable clinical data contract instead of another proprietary integration layer.',
  },
  {
    problem: 'Data fragmentation',
    solution: 'SHIN normalizes patient, encounter, observation, and document context into a unified operating model.',
  },
  {
    problem: 'Performance pressure',
    solution: 'FHIR-aware storage and query patterns support responsive clinical dashboards and dependable API access.',
  },
  {
    problem: 'Governance gaps',
    solution: 'Access policy, validation, audit trails, and exception workflows are designed into the exchange layer.',
  },
]

export default function ProblemSolutionMatrix() {
  return (
    <section className="bg-slate-50 py-20 dark:bg-slate-900 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-teal-600 dark:text-teal-400">
            Why it matters
          </p>
          <h2 className="text-4xl font-bold text-slate-950 dark:text-white md:text-5xl">
            Replace brittle interfaces with governed clinical data infrastructure.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {items.map((item, index) => (
            <article
              key={item.problem}
              className="rounded-lg border border-slate-200 bg-white p-6 transition hover:border-teal-400 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-teal-500 md:p-8"
            >
              <div className="mb-5 flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 font-mono text-sm font-bold text-teal-700 dark:bg-teal-950/50 dark:text-teal-300">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-xl font-bold text-slate-950 dark:text-white">
                  {item.problem}
                </h3>
              </div>
              <p className="text-base leading-7 text-slate-600 dark:text-slate-300">
                {item.solution}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
