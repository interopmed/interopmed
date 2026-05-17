import Link from 'next/link'

export default function HeroSection({ 
  headline, 
  subheadline, 
  cta,
  ctaText = "Request a Technical Deep Dive",
  ctaHref,
}: {
  headline: string
  subheadline: string
  cta: string
  ctaText?: string
  ctaHref?: string
}) {
  const primaryHref = ctaHref || (cta.startsWith('/') ? cta : '/contact')

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
      
      {/* Animated accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl opacity-50" />

      {/* Content */}
      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
          {headline}
        </h1>
        <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          {subheadline}
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Link
            href={primaryHref}
            className="px-8 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-teal-500/30 transition-all duration-300 transform hover:scale-105"
          >
            {ctaText}
          </Link>
          <Link href="/documentation" className="px-8 py-3 border border-slate-400 text-slate-200 rounded-lg font-semibold hover:border-teal-500 hover:text-teal-400 transition-all duration-300">
            View Documentation
          </Link>
        </div>
      </div>
    </section>
  )
}
