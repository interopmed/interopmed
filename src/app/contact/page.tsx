import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'Contact | InteropMed',
  description: 'Contact InteropMed for enterprise healthcare interoperability demos, architecture reviews, and partnership conversations.',
}

const contactChannels = [
  {
    label: 'Enterprise demos',
    value: 'demo@interopmed.com',
    detail: 'For health systems evaluating SHIN, FHIR-native middleware, or clinical data modernization.',
  },
  {
    label: 'Architecture reviews',
    value: 'architecture@interopmed.com',
    detail: 'For technical teams planning integration, security, performance, or data-governance reviews.',
  },
  {
    label: 'Partnerships',
    value: 'partners@interopmed.com',
    detail: 'For implementation partners, standards groups, and digital health collaborators.',
  },
]

const priorities = [
  'FHIR R4 implementation planning',
  'Legacy clinical system integration',
  'Security and compliance review',
  'Clinical workflow modernization',
]

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-white py-20 dark:bg-slate-950 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-teal-600 dark:text-teal-400">
                Contact InteropMed
              </p>
              <h1 className="mb-6 text-4xl font-bold leading-tight text-slate-950 dark:text-white md:text-6xl">
                Start a focused interoperability conversation.
              </h1>
              <p className="mb-8 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                Tell us about your clinical data environment, integration constraints, and success criteria. We will route your request to the team best suited for the next step.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                {priorities.map((priority) => (
                  <div
                    key={priority}
                    className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                  >
                    {priority}
                  </div>
                ))}
              </div>
            </div>

            <form className="rounded-lg border border-slate-200 bg-slate-50 p-6 shadow-xl shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20 md:p-8">
              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-100">First name</span>
                  <input
                    type="text"
                    name="firstName"
                    autoComplete="given-name"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-100">Last name</span>
                  <input
                    type="text"
                    name="lastName"
                    autoComplete="family-name"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                </label>
              </div>

              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-100">Work email</span>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-100">Organization</span>
                  <input
                    type="text"
                    name="organization"
                    autoComplete="organization"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                </label>
              </div>

              <label className="mt-5 block">
                <span className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-100">What would you like to discuss?</span>
                <select
                  name="topic"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  defaultValue=""
                >
                  <option value="" disabled>Select a topic</option>
                  <option>Request a demo</option>
                  <option>Architecture review</option>
                  <option>Security and compliance</option>
                  <option>Partnership conversation</option>
                </select>
              </label>

              <label className="mt-5 block">
                <span className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-100">Message</span>
                <textarea
                  name="message"
                  rows={6}
                  className="w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </label>

              <button
                type="submit"
                className="mt-6 w-full rounded-lg bg-gradient-to-r from-teal-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:shadow-lg hover:shadow-teal-500/25"
              >
                Request follow-up
              </button>
              <p className="mt-4 text-xs leading-5 text-slate-500 dark:text-slate-400">
                By submitting this form, you agree to be contacted about InteropMed services and technical resources.
              </p>
            </form>
          </div>
        </section>

        <section className="bg-slate-50 py-20 dark:bg-slate-900">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-10 max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-teal-600 dark:text-teal-400">
                Direct channels
              </p>
              <h2 className="text-3xl font-bold text-slate-950 dark:text-white md:text-4xl">
                Reach the right team from the start.
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {contactChannels.map((channel) => (
                <div
                  key={channel.label}
                  className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950"
                >
                  <h3 className="mb-3 text-lg font-semibold text-slate-950 dark:text-white">{channel.label}</h3>
                  <a
                    href={`mailto:${channel.value}`}
                    className="mb-4 block break-words text-sm font-semibold text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
                  >
                    {channel.value}
                  </a>
                  <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">{channel.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
