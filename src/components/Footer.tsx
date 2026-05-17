import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200 bg-slate-50 py-12 dark:border-slate-800 dark:bg-slate-900 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-teal-500 to-blue-600">
                <span className="text-xs font-bold text-white">IM</span>
              </div>
              <span className="font-semibold text-slate-900 dark:text-white">InteropMed</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Enterprise-grade health data interoperability platform for complex clinical networks.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-white">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shin" className="text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400">SHIN Platform</Link></li>
              <li><Link href="/api-reference" className="text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400">API Reference</Link></li>
              <li><Link href="/documentation" className="text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400">Documentation</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-white">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/technology" className="text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400">Technology</Link></li>
              <li><Link href="/solutions" className="text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400">Solutions</Link></li>
              <li><Link href="/implementation" className="text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400">Implementation</Link></li>
              <li><Link href="/insights" className="text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400">Insights</Link></li>
              <li><Link href="/about" className="text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400">About</Link></li>
              <li><Link href="/contact" className="text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-white">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400">Terms of Service</Link></li>
              <li><Link href="/compliance" className="text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400">Compliance</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between border-t border-slate-200 pt-8 dark:border-slate-800 md:flex-row">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Copyright {currentYear} InteropMed. All rights reserved. Enterprise health data interoperability.
          </p>
          <div className="mt-4 flex gap-6 md:mt-0">
            <Link href="/account" className="text-sm text-slate-500 transition hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400">
              Account
            </Link>
            <Link href="/contact" className="text-sm text-slate-500 transition hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
