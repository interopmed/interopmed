export type ArticleSection = {
  heading: string
  body: string[]
}

export type BlogArticle = {
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  publishedAt: string
  readingTime: string
  sections: ArticleSection[]
}

export const articles: BlogArticle[] = [
  {
    slug: 'why-fhir-native-middleware-matters',
    title: 'Why FHIR-Native Middleware Matters for Modern Clinical Networks',
    excerpt:
      'Health systems need more than point-to-point integrations. FHIR-native middleware gives clinical, technical, and governance teams a shared operating model for trusted data exchange.',
    category: 'Interoperability',
    author: 'InteropMed Research',
    publishedAt: 'May 16, 2026',
    readingTime: '5 min read',
    sections: [
      {
        heading: 'The integration burden is shifting',
        body: [
          'Healthcare interoperability has moved beyond basic message exchange. Clinical networks now need to support specialty workflows, live telemetry, patient-mediated access, longitudinal records, and analytics pipelines across a mix of legacy systems and modern APIs.',
          'Traditional interface engines can still move data, but they often leave teams with brittle mappings, limited semantic validation, and governance gaps. The result is a technical estate where every new workflow requires another custom bridge.',
        ],
      },
      {
        heading: 'FHIR creates a common clinical contract',
        body: [
          'FHIR gives teams a shared language for resources such as Patient, Observation, Encounter, Medication, and DiagnosticReport. When middleware treats FHIR as its native model, downstream systems can consume normalized clinical data without relearning each source system.',
          'That common contract matters because interoperability is not only a transport problem. It is also a data quality, workflow, privacy, and accountability problem.',
        ],
      },
      {
        heading: 'Native middleware improves governance',
        body: [
          'A FHIR-native data layer can centralize validation, audit trails, access policies, and transformation logic. This makes it easier for clinical leaders and technical teams to understand which data moved, why it moved, and whether it met the required standard.',
          'For enterprise deployments, that transparency is just as important as performance. Without it, teams struggle to scale trust across departments, vendors, and care settings.',
        ],
      },
      {
        heading: 'The path forward',
        body: [
          'Modern clinical networks should evaluate middleware by its ability to normalize data, preserve clinical meaning, enforce policy, and provide observable APIs. FHIR-native design gives those capabilities a strong foundation.',
          'InteropMed built SHIN around that principle: one standards-aligned data layer that helps health systems move from fragmented integrations to dependable clinical data infrastructure.',
        ],
      },
    ],
  },
]

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug)
}
