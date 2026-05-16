export default function TransitionsOfCare() {
  return (
    <section className="py-20 md:py-32 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-teal-500 mb-4">Transitions of Care</p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
            Patient Data That Moves with the Care Pathway
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mt-4">
            InteropMed eliminates handoff friction between community clinics, tertiary centres, and specialised surgical units.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Peripheral Clinic",
              description: "Patient registration, referrals, and diagnostic images are captured in full FHIR context.",
            },
            {
              title: "Regional Hub",
              description: "Shared clinical records sync instantly, with no need for duplicate tests or manual reconciliation.",
            },
            {
              title: "Tertiary Care",
              description: "Specialty teams access a unified patient timeline with operative plans, procedural notes, and labs.",
            }
          ].map((item, idx) => (
            <div key={idx} className="p-8 border border-slate-200 dark:border-slate-800 rounded-3xl bg-slate-50 dark:bg-slate-900">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                {item.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
