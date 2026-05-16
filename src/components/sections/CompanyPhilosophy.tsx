export default function CompanyPhilosophy() {
  return (
    <section className="py-20 md:py-32 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-teal-400">Philosophy</p>
            <h2 className="text-4xl md:text-5xl font-bold">Clinical precision meets elite software engineering.</h2>
            <p className="text-lg text-slate-300 leading-relaxed">
              InteropMed operates at the precise intersection of clinical medicine and enterprise software. We build interoperability infrastructure for hospitals, specialty networks, and digital health ecosystems that demand uncompromising fidelity, resilience, and governance.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed">
              Our platform is designed to move clinical data with surgical accuracy across complex care networks, while delivering the transparency and accountability required for executive decision-making.
            </p>
          </div>

          <div className="grid gap-6">
            {[
              {
                title: "Clinical Trust",
                description: "We engineer around clinical workflows first, ensuring every data transaction supports better patient care.",
              },
              {
                title: "Technical Sophistication",
                description: "Our architecture is built for edge-scale healthcare systems, combining FHIR-native semantics with enterprise-grade performance.",
              },
              {
                title: "Governance by Design",
                description: "Every data access path is audit-logged, permissioned, and compliant with international health regulations.",
              }
            ].map((item, idx) => (
              <div key={idx} className="p-8 bg-slate-900/95 border border-slate-800 rounded-3xl">
                <p className="text-sm uppercase tracking-[0.3em] text-teal-400 mb-3">{item.title}</p>
                <p className="text-slate-300 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
