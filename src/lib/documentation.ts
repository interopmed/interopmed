export type DocumentationSection = {
  heading: string
  body: string[]
}

export type DocumentationGuide = {
  slug: string
  title: string
  description: string
  category: string
  sections: DocumentationSection[]
}

export const documentationGuides: DocumentationGuide[] = [
  {
    slug: 'getting-started',
    title: 'Getting started',
    description: 'Understand the SHIN platform model, core integration concepts, and the planning inputs needed before implementation.',
    category: 'Planning',
    sections: [
      {
        heading: 'Implementation overview',
        body: [
          'Start by defining the clinical workflows, source systems, destination systems, and governance owners involved in the interoperability program.',
          'A successful SHIN implementation usually begins with one high-value workflow, a clear data contract, and a repeatable review model for future expansion.',
        ],
      },
      {
        heading: 'Readiness checklist',
        body: [
          'Identify source systems, data formats, authentication requirements, network boundaries, and operational stakeholders before configuring integrations.',
          'Confirm who owns data quality review, clinical validation, security approval, and production release decisions.',
        ],
      },
      {
        heading: 'First deployment path',
        body: [
          'Choose a bounded pilot such as patient demographics, observations, referral context, or encounter synchronization.',
          'Use the pilot to validate resource mapping, exception handling, audit review, and support processes before broad rollout.',
        ],
      },
    ],
  },
  {
    slug: 'fhir-implementation',
    title: 'FHIR implementation',
    description: 'Review resource mapping, validation expectations, terminology considerations, and rollout patterns for FHIR-native workflows.',
    category: 'Standards',
    sections: [
      {
        heading: 'Resource mapping',
        body: [
          'Map source data to FHIR resources using explicit ownership for each resource type, required field, terminology system, and transformation rule.',
          'Common early resources include Patient, Practitioner, Organization, Encounter, Observation, DiagnosticReport, MedicationRequest, and DocumentReference.',
        ],
      },
      {
        heading: 'Validation model',
        body: [
          'Validation should cover required fields, reference integrity, coding systems, timestamps, identifiers, and customer-specific clinical rules.',
          'Treat validation failures as operational signals. Each failure should have a clear owner, severity, and resolution workflow.',
        ],
      },
      {
        heading: 'Terminology and identifiers',
        body: [
          'FHIR implementation quality depends heavily on consistent identifiers and terminology governance across systems.',
          'Plan how local codes, national identifiers, organization identifiers, and patient matching rules will be reviewed and maintained.',
        ],
      },
    ],
  },
  {
    slug: 'security-and-access',
    title: 'Security and access',
    description: 'Plan authentication, authorization, environment boundaries, audit logging, and operational review practices.',
    category: 'Security',
    sections: [
      {
        heading: 'Access control',
        body: [
          'Define access rules by workflow, user group, system role, environment, and data sensitivity. Avoid broad access grants that outlive the implementation phase.',
          'Service-to-service access should use customer-approved authentication and rotation practices.',
        ],
      },
      {
        heading: 'Environment boundaries',
        body: [
          'Separate development, test, staging, and production environments with clear data handling rules for each.',
          'Production clinical data should only flow through approved environments with appropriate logging, monitoring, and access governance.',
        ],
      },
      {
        heading: 'Audit and monitoring',
        body: [
          'Plan audit events for data access, transformations, integration failures, configuration changes, and administrative actions.',
          'Operational dashboards should help teams identify failures, unusual access patterns, and data quality drift quickly.',
        ],
      },
    ],
  },
  {
    slug: 'operations',
    title: 'Operations',
    description: 'Monitor integration health, manage exceptions, review data quality, and coordinate changes across clinical and technical teams.',
    category: 'Operations',
    sections: [
      {
        heading: 'Run model',
        body: [
          'Define who monitors integrations, who triages issues, who approves clinical data changes, and who communicates service-impacting incidents.',
          'A clear run model reduces friction between clinical operations, application owners, infrastructure teams, and vendor support.',
        ],
      },
      {
        heading: 'Exception handling',
        body: [
          'Classify exceptions by severity, workflow impact, retry behavior, and clinical risk. Not every integration error needs the same response path.',
          'Track recurring exceptions to identify upstream data quality issues, mapping drift, or workflow changes that need governance review.',
        ],
      },
      {
        heading: 'Change management',
        body: [
          'Clinical integration changes should include impact review, test evidence, rollback expectations, and stakeholder communication.',
          'Maintain release notes for resource mappings, policy changes, new source systems, and data contract updates.',
        ],
      },
    ],
  },
]

export function getDocumentationGuide(slug: string) {
  return documentationGuides.find((guide) => guide.slug === slug)
}
