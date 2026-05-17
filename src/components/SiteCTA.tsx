import Link from 'next/link'

type SiteCTAProps = {
  eyebrow?: string
  title?: string
  description?: string
  primaryHref?: string
  primaryLabel?: string
  secondaryHref?: string
  secondaryLabel?: string
}

export default function SiteCTA({
  eyebrow = 'Next step',
  title = 'Ready to plan your interoperability roadmap?',
  description = 'Talk with InteropMed about your clinical data environment, integration constraints, and governance requirements.',
  primaryHref = '/contact',
  primaryLabel = 'Request follow-up',
  secondaryHref = '/documentation',
  secondaryLabel = 'View documentation',
}: SiteCTAProps) {
  return (
    <section className="bg-white py-20 dark:bg-slate-950 md:py-28">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-teal-600 dark:text-teal-400">
          {eyebrow}
        </p>
        <h2 className="mb-6 text-4xl font-bold text-slate-950 dark:text-white md:text-5xl">
          {title}
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
          {description}
        </p>
        <div className="flex flex-col justify-center gap-4 md:flex-row">
          <Link
            href={primaryHref}
            className="rounded-lg bg-gradient-to-r from-teal-500 to-blue-600 px-8 py-3 font-semibold text-white transition duration-300 hover:shadow-2xl hover:shadow-teal-500/30"
          >
            {primaryLabel}
          </Link>
          <Link
            href={secondaryHref}
            className="rounded-lg border border-slate-300 px-8 py-3 font-semibold text-slate-900 transition duration-300 hover:border-teal-500 hover:text-teal-600 dark:border-slate-600 dark:text-slate-100 dark:hover:border-teal-400 dark:hover:text-teal-400"
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
