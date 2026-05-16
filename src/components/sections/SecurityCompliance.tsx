export default function SecurityCompliance() {
  const features = [
    {
      title: "End-to-End Encryption",
      description: "TLS 1.3 in-flight, AES-256-GCM at-rest with hardware-backed key management",
      icon: "🔐"
    },
    {
      title: "OAuth 2.0 & OpenID Connect",
      description: "Industry-standard authentication protocols with zero-trust architecture",
      icon: "🛡️"
    },
    {
      title: "Role-Based Access Control",
      description: "Fine-grained permission model enforced at every data access layer",
      icon: "👥"
    },
    {
      title: "Tamper-Proof Audit Logs",
      description: "Immutable audit trails with cryptographic verification for compliance reporting",
      icon: "📋"
    },
    {
      title: "Compliance Frameworks",
      description: "HIPAA, HITECH, GDPR, Privacy Act (Australia) fully aligned",
      icon: "✅"
    },
    {
      title: "Incident Response",
      description: "24/7 security monitoring with automated anomaly detection and alerting",
      icon: "🚨"
    }
  ]

  return (
    <section className="py-20 md:py-32 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Security & Compliance: Enterprise Grade
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            InteropMed operates under the strictest international health data governance standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="p-8 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-teal-500 dark:hover:border-teal-400 transition-all duration-300 hover:shadow-lg dark:hover:shadow-teal-500/10"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mt-16 p-8 md:p-12 bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-950/30 dark:to-teal-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
            Compliance Certifications & Alignments
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "HIPAA", badge: "Compliant" },
              { name: "HITECH Act", badge: "Compliant" },
              { name: "GDPR", badge: "Compliant" },
              { name: "Privacy Act (AU)", badge: "Compliant" }
            ].map((cert, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-2">✓</div>
                <p className="font-semibold text-slate-900 dark:text-white">{cert.name}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{cert.badge}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
