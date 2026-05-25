'use client'

import { useState } from 'react'

export default function APIPlayground() {
  const [selectedResource, setSelectedResource] = useState('patient')
  const [response, setResponse] = useState<Record<string, unknown> | null>(null)
  const [loading, setLoading] = useState(false)

  const mockData = {
    patient: {
      resourceType: "Patient",
      id: "pat-001",
      identifier: [
        {
          system: "urn:oid:1.2.36.146.595.217.0.1",
          value: "12345"
        }
      ],
      name: [
        {
          use: "official",
          family: "Smith",
          given: ["John", "Paul"]
        }
      ],
      gender: "male",
      birthDate: "1974-12-25",
      contact: [
        {
          relationship: [
            {
              coding: [
                {
                  system: "http://terminology.hl7.org/CodeSystem/v2-0131",
                  code: "N",
                  display: "Next-of-kin"
                }
              ]
            }
          ],
          name: {
            family: "Smith",
            given: ["Jane"]
          },
          telecom: [
            {
              system: "phone",
              value: "+61-2-5551-1234",
              use: "home"
            }
          ]
        }
      ]
    },
    observation: {
      resourceType: "Observation",
      id: "obs-001",
      status: "final",
      category: [
        {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/observation-category",
              code: "vital-signs",
              display: "Vital Signs"
            }
          ]
        }
      ],
      code: {
        coding: [
          {
            system: "http://loinc.org",
            code: "85354-9",
            display: "Blood pressure panel with all children optional"
          }
        ],
        text: "Blood Pressure"
      },
      subject: {
        reference: "Patient/pat-001"
      },
      effectiveDateTime: "2024-05-16T14:30:00Z",
      valueQuantity: {
        value: 120,
        unit: "mmHg",
        system: "http://unitsofmeasure.org",
        code: "mm[Hg]"
      }
    },
    encounter: {
      resourceType: "Encounter",
      id: "enc-001",
      status: "finished",
      class: {
        system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
        code: "IMP",
        display: "Inpatient encounter"
      },
      type: [
        {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/encounter-type",
              code: "ADMS",
              display: "Annual diabetes mellitus screening"
            }
          ]
        }
      ],
      subject: {
        reference: "Patient/pat-001"
      },
      period: {
        start: "2024-05-16T10:00:00Z",
        end: "2024-05-16T15:30:00Z"
      },
      reasonCode: [
        {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "73211009",
              display: "Diabetes mellitus"
            }
          ]
        }
      ]
    }
  }

  const handleFetch = async () => {
    setLoading(true)
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800))
    setResponse(mockData[selectedResource as keyof typeof mockData])
    setLoading(false)
  }

  return (
    <section className="py-20 md:py-32 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Interactive FHIR API Playground
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Experience real-time FHIR resource retrieval from the SHIN platform. Select a resource type and click Fetch to see live structured healthcare data.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-8">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">FHIR Resource Selector</h3>
            
            <div className="space-y-4 mb-8">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                Select Resource Type
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'patient', label: 'Patient' },
                  { id: 'observation', label: 'Observation' },
                  { id: 'encounter', label: 'Encounter' }
                ].map(resource => (
                  <button
                    key={resource.id}
                    onClick={() => setSelectedResource(resource.id)}
                    className={`px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                      selectedResource === resource.id
                        ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/30'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    {resource.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg border-l-4 border-blue-500">
              <p className="text-xs text-slate-600 dark:text-slate-400 font-mono">
                GET /api/fhir/{selectedResource}/[id]
              </p>
            </div>

            <button
              onClick={handleFetch}
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Fetching...
                </span>
              ) : (
                'Fetch FHIR Resource'
              )}
            </button>
          </div>

          {/* Response */}
          <div className="bg-slate-900 dark:bg-slate-950 rounded-lg border border-slate-700 p-8 font-mono text-sm overflow-auto max-h-96">
            <h3 className="text-teal-400 mb-4 font-semibold">Response Preview</h3>
            {response ? (
              <pre className="text-slate-300 text-xs leading-relaxed whitespace-pre-wrap break-words">
                {JSON.stringify(response, null, 2)}
              </pre>
            ) : (
              <p className="text-slate-500 italic">Click &quot;Fetch FHIR Resource&quot; to see live data...</p>
            )}
          </div>
        </div>

        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            <span className="font-semibold text-blue-600 dark:text-blue-400">Enterprise-Grade API:</span> SHIN&apos;s RESTful endpoints deliver validated FHIR R4 resources with full provenance tracking, access control enforcement, and sub-50ms latency. All requests are cryptographically signed and audit-logged.
          </p>
        </div>
      </div>
    </section>
  )
}

