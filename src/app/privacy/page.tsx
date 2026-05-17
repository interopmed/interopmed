import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'Privacy Policy | InteropMed',
  description: 'InteropMed privacy policy for website visitors, prospective customers, and business contacts.',
}

const sections = [
  {
    title: 'Information we collect',
    body: [
      'We collect information you choose to provide, including your name, work email, organization, contact topic, and message when you submit a form or contact InteropMed directly.',
      'We may also collect limited technical information such as IP address, browser details, device type, pages visited, and timestamps to operate, secure, and improve the website.',
    ],
  },
  {
    title: 'How we use information',
    body: [
      'We use contact information to respond to inquiries, schedule demos, provide requested resources, evaluate partnership opportunities, and maintain business records.',
      'We use technical information to monitor reliability, diagnose issues, protect against misuse, and understand how visitors interact with our website.',
    ],
  },
  {
    title: 'Health information',
    body: [
      'This website is not intended for submitting patient health information or other sensitive clinical data. Please do not include protected health information in website forms.',
      'If InteropMed processes regulated health information for a customer, that processing is handled under the applicable customer agreement, security terms, and any required business associate or data processing agreement.',
    ],
  },
  {
    title: 'Sharing and service providers',
    body: [
      'We do not sell personal information. We may share information with service providers that help us operate our website, manage infrastructure, communicate with prospects, analyze usage, or protect our systems.',
      'We may disclose information if required by law, legal process, security investigation, or to protect InteropMed, our users, customers, or the public.',
    ],
  },
  {
    title: 'Data retention',
    body: [
      'We keep personal information only as long as needed for the purposes described in this policy, unless a longer retention period is required for legal, security, accounting, or legitimate business reasons.',
      'Contact requests and related business communications may be retained to manage follow-up, maintain relationship history, and improve support quality.',
    ],
  },
  {
    title: 'Security',
    body: [
      'We use administrative, technical, and organizational safeguards designed to protect information against unauthorized access, loss, misuse, or alteration.',
      'No internet service can guarantee absolute security, so visitors should avoid submitting unnecessary sensitive information through public website forms.',
    ],
  },
  {
    title: 'Your choices',
    body: [
      'You may request access, correction, deletion, or restriction of personal information where applicable law provides those rights.',
      'You may also opt out of non-essential marketing communications by using the unsubscribe instructions in those messages or by contacting us.',
    ],
  },
  {
    title: 'International visitors',
    body: [
      'InteropMed may process information in countries where we or our service providers operate. Those locations may have privacy laws different from your jurisdiction.',
      'When required, we use appropriate contractual, organizational, or technical measures for cross-border processing.',
    ],
  },
  {
    title: 'Changes to this policy',
    body: [
      'We may update this policy to reflect changes in our practices, services, or legal requirements. The updated version will be posted on this page with a revised effective date.',
    ],
  },
]

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-white py-20 dark:bg-slate-950 md:py-28">
          <div className="mx-auto max-w-4xl px-6">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-teal-600 dark:text-teal-400">
              Privacy Policy
            </p>
            <h1 className="mb-6 text-4xl font-bold leading-tight text-slate-950 dark:text-white md:text-6xl">
              How InteropMed handles website and business contact information.
            </h1>
            <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">
              Effective May 17, 2026. This policy explains how InteropMed collects, uses, shares, and protects information from website visitors, prospects, partners, and business contacts.
            </p>
          </div>
        </section>

        <section className="bg-slate-50 py-16 dark:bg-slate-900">
          <div className="mx-auto max-w-4xl px-6">
            <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 md:p-10">
              <div className="space-y-12">
                {sections.map((section) => (
                  <section key={section.title}>
                    <h2 className="mb-5 text-2xl font-bold text-slate-950 dark:text-white">
                      {section.title}
                    </h2>
                    <div className="space-y-4">
                      {section.body.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="text-base leading-8 text-slate-600 dark:text-slate-300"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}

                <section>
                  <h2 className="mb-5 text-2xl font-bold text-slate-950 dark:text-white">
                    Contact us
                  </h2>
                  <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
                    For privacy questions or requests, contact InteropMed at privacy@interopmed.com or use the contact form on this website.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
