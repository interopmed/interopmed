import Link from 'next/link'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-white py-20 dark:bg-slate-950 md:py-32">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-teal-600 dark:text-teal-400">
              404
            </p>
            <h1 className="mb-6 text-4xl font-bold leading-tight text-slate-950 dark:text-white md:text-6xl">
              This page is not available.
            </h1>
            <p className="mb-8 text-lg leading-8 text-slate-600 dark:text-slate-300">
              The page may have moved, or the link may be incomplete. Start from a known area of the InteropMed site.
            </p>
            <div className="flex flex-col justify-center gap-4 md:flex-row">
              <Link
                href="/"
                className="rounded-lg bg-gradient-to-r from-teal-500 to-blue-600 px-8 py-3 font-semibold text-white transition hover:shadow-lg hover:shadow-teal-500/25"
              >
                Go home
              </Link>
              <Link
                href="/contact"
                className="rounded-lg border border-slate-300 px-8 py-3 font-semibold text-slate-900 transition hover:border-teal-500 hover:text-teal-600 dark:border-slate-700 dark:text-slate-100 dark:hover:border-teal-400 dark:hover:text-teal-400"
              >
                Contact us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
