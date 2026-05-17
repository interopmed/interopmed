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
        heading: 'Implementation scope',
        body: [
          'A FHIR implementation should begin with a bounded clinical workflow rather than a broad platform migration. Define the patient journey, source systems, destination systems, actors, and decision points that the first release must support.',
          'For each workflow, identify the minimum viable resource set, required identifiers, clinical codes, event triggers, and downstream consumers. This keeps the first release measurable and prevents the implementation from becoming a general data lake exercise.',
          'Typical first scopes include patient demographics, encounter context, observation exchange, diagnostic reports, referral documents, medication requests, or care team synchronization.',
        ],
      },
      {
        heading: 'Resource mapping strategy',
        body: [
          'Map source data to FHIR resources using explicit ownership for each resource type, required field, terminology system, and transformation rule.',
          'Common early resources include Patient, Practitioner, Organization, Encounter, Observation, DiagnosticReport, MedicationRequest, and DocumentReference.',
          'Each mapping should document the source field, target FHIR path, transformation rule, required status, allowed values, fallback behavior, and the team responsible for clinical review.',
          'Avoid mapping every available field by default. Prioritize fields that are required for the clinical workflow, regulatory reporting, safety review, operational routing, or downstream analytics.',
        ],
      },
      {
        heading: 'Core resources',
        body: [
          'Patient is usually the anchor resource. Confirm medical record numbers, enterprise identifiers, demographic fields, and patient matching expectations before connecting downstream resources.',
          'Practitioner and Organization resources should represent accountable care teams, facilities, departments, and external partners clearly enough for routing and audit review.',
          'Encounter provides clinical context for observations, reports, orders, procedures, and documents. Encounter mapping should be reviewed carefully because many workflow errors come from missing or inconsistent visit context.',
          'Observation and DiagnosticReport should be modeled with attention to code systems, units, reference ranges, timestamps, performer, device context, and result status.',
        ],
      },
      {
        heading: 'Validation model',
        body: [
          'Validation should cover required fields, reference integrity, coding systems, timestamps, identifiers, and customer-specific clinical rules.',
          'Treat validation failures as operational signals. Each failure should have a clear owner, severity, and resolution workflow.',
          'Separate structural validation from clinical validation. Structural validation confirms that the resource shape is usable; clinical validation confirms that the content is safe, meaningful, and appropriate for the workflow.',
          'Validation rules should be versioned. When source systems, clinical workflows, or terminology sets change, teams need to know which validation rules were active at the time a payload was accepted or rejected.',
        ],
      },
      {
        heading: 'Terminology and identifiers',
        body: [
          'FHIR implementation quality depends heavily on consistent identifiers and terminology governance across systems.',
          'Plan how local codes, national identifiers, organization identifiers, and patient matching rules will be reviewed and maintained.',
          'Terminology mapping should document source codes, target systems, code display values, equivalence assumptions, and review status. Ambiguous mappings should remain visible until a clinical owner approves them.',
          'Identifiers should be stable, scoped, and traceable. Avoid using display labels or temporary local values as long-term identifiers for clinical entities.',
        ],
      },
      {
        heading: 'Profiles and extensions',
        body: [
          'Use implementation guide profiles when the workflow needs stricter rules than the base FHIR specification. Profiles help teams agree on required elements, cardinality, terminology bindings, and resource relationships.',
          'Extensions should be used when the workflow requires data that FHIR does not represent directly. Each extension needs a clear definition, owner, data type, purpose, and compatibility review.',
          'Before adding an extension, confirm that the requirement cannot be represented through an existing FHIR element, profile, coding system, or related resource.',
        ],
      },
      {
        heading: 'API behavior',
        body: [
          'Define supported read, search, create, update, and history behaviors for each resource. Not every implementation needs every FHIR interaction on day one.',
          'Search parameters should be selected around real workflow needs such as patient, encounter, date, status, category, organization, and identifier.',
          'Pagination, sorting, rate limits, error responses, and partial failure behavior should be documented before production use so consuming teams can build resilient clients.',
        ],
      },
      {
        heading: 'Testing approach',
        body: [
          'Test with representative payloads from each source system rather than only ideal examples. Include missing fields, duplicate identifiers, invalid codes, unusual timestamps, inactive patients, and cross-organization references.',
          'Use automated tests for schema expectations, required mappings, terminology bindings, and known edge cases. Pair those tests with clinical review for resource meaning and workflow fit.',
          'Maintain a regression set for every resolved production issue. When a mapping or validation bug is fixed, the test suite should prevent that issue from returning.',
        ],
      },
      {
        heading: 'Rollout plan',
        body: [
          'Start with a read-only or shadow-mode phase where transformed resources are generated and reviewed without driving clinical action. This helps teams compare FHIR output against source-system truth.',
          'Move to limited production use with a small workflow, defined support coverage, rollback expectations, and visible monitoring. Expand only after data quality, latency, and support processes are stable.',
          'For each expansion, document newly supported resources, source systems, consuming systems, operational owners, known limitations, and validation changes.',
        ],
      },
      {
        heading: 'Operational governance',
        body: [
          'FHIR implementation is not finished at go-live. Resource mappings, terminology sets, source-system behavior, and clinical workflows will change over time.',
          'Create a review cadence for mapping changes, validation exceptions, terminology updates, and consumer feedback. Include clinical, integration, security, and product stakeholders when changes affect patient care or reporting.',
          'Operational dashboards should show accepted resources, rejected resources, validation categories, source-system trends, latency, retry behavior, and high-impact exceptions.',
        ],
      },
      {
        heading: 'Production readiness checklist',
        body: [
          'Confirm that resource mappings are reviewed, required identifiers are stable, validation rules are versioned, terminology mappings are approved, and API behavior is documented.',
          'Confirm that support teams can see integration failures, replay or retry messages where appropriate, identify responsible owners, and communicate clinical impact.',
          'Confirm that privacy, security, audit, retention, and access control expectations are documented for the workflow before enabling production consumers.',
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
