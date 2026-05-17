import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'Terms of Service | InteropMed',
  description: 'InteropMed terms of service for website visitors, prospective customers, and business contacts.',
}

const sections = [
  {
    title: 'Use of this website',
    body: [
      'You may use this website to learn about InteropMed, request information, contact our team, and access public resources we make available.',
      'You agree not to misuse the website, attempt unauthorized access, interfere with availability, submit malicious content, or use the website in a way that violates applicable law.',
    ],
  },
  {
    title: 'Informational content',
    body: [
      'Website content is provided for general business and technical information. It is not medical, legal, compliance, procurement, or professional advice.',
      'Healthcare interoperability, privacy, and compliance decisions should be evaluated with qualified clinical, legal, security, and operational advisors.',
    ],
  },
  {
    title: 'Accounts and submissions',
    body: [
      'If you submit a form, message, or other information through the website, you are responsible for ensuring the information is accurate and that you have permission to provide it.',
      'Do not submit patient health information, protected health information, confidential customer data, passwords, credentials, or other sensitive information through public website forms.',
    ],
  },
  {
    title: 'Customer agreements',
    body: [
      'Use of any InteropMed product, hosted service, implementation support, or enterprise platform is governed by a separate written agreement with InteropMed.',
      'If there is a conflict between these website terms and a signed customer agreement, the signed customer agreement controls for the covered product or service.',
    ],
  },
  {
    title: 'Intellectual property',
    body: [
      'The website, brand elements, product names, text, graphics, and other content are owned by InteropMed or its licensors and are protected by intellectual property laws.',
      'You may not copy, modify, distribute, sell, or create derivative works from website content except as allowed by law or with written permission from InteropMed.',
    ],
  },
  {
    title: 'Third-party links and services',
    body: [
      'The website may link to third-party websites, services, standards bodies, documentation, or resources. InteropMed is not responsible for third-party content, availability, security, or privacy practices.',
      'Your use of third-party resources is governed by the terms and policies of those third parties.',
    ],
  },
  {
    title: 'Disclaimers',
    body: [
      'The website is provided on an as-is and as-available basis. InteropMed does not warrant that the website will be uninterrupted, error-free, secure, or free of harmful components.',
      'To the fullest extent permitted by law, InteropMed disclaims implied warranties including merchantability, fitness for a particular purpose, and non-infringement.',
    ],
  },
  {
    title: 'Limitation of liability',
    body: [
      'To the fullest extent permitted by law, InteropMed will not be liable for indirect, incidental, consequential, special, exemplary, or punitive damages arising from website use.',
      'Nothing in these terms limits liability that cannot legally be limited.',
    ],
  },
  {
    title: 'Changes to these terms',
    body: [
      'We may update these terms to reflect changes in the website, business practices, or legal requirements. The updated version will be posted on this page with a revised effective date.',
      'Your continued use of the website after changes are posted means you accept the updated terms.',
    ],
  },
]

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-white py-20 dark:bg-slate-950 md:py-28">
          <div className="mx-auto max-w-4xl px-6">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-teal-600 dark:text-teal-400">
              Terms of Service
            </p>
            <h1 className="mb-6 text-4xl font-bold leading-tight text-slate-950 dark:text-white md:text-6xl">
              Terms for using the InteropMed website.
            </h1>
            <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">
              Effective May 17, 2026. These terms govern use of the InteropMed public website and related website forms, pages, and resources.
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
                    Contact
                  </h2>
                  <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
                    Questions about these terms can be sent to legal@interopmed.com or through the contact form on this website.
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
