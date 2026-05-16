import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-br from-teal-500 to-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">IM</span>
              </div>
              <span className="font-semibold text-slate-900 dark:text-white">InteropMed</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Enterprise-grade health data interoperability platform for complex clinical networks.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#shin" className="text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400">SHIN Platform</Link></li>
              <li><Link href="#api" className="text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400">API Reference</Link></li>
              <li><Link href="#docs" className="text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400">Documentation</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/technology" className="text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400">Technology</Link></li>
              <li><Link href="/solutions" className="text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400">Solutions</Link></li>
              <li><Link href="/about" className="text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400">About</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#privacy" className="text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400">Privacy Policy</a></li>
              <li><a href="#terms" className="text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400">Terms of Service</a></li>
              <li><a href="#compliance" className="text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400">Compliance</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            © {currentYear} InteropMed. All rights reserved. Enterprise health data interoperability.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#twitter" className="text-slate-400 hover:text-teal-500 transition-colors">
              <span className="sr-only">Twitter</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7a4.5 4.5 0 01-1.5-.5z"/></svg>
            </a>
            <a href="#linkedin" className="text-slate-400 hover:text-teal-500 transition-colors">
              <span className="sr-only">LinkedIn</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/></svg>
            </a>
            <a href="#github" className="text-slate-400 hover:text-teal-500 transition-colors">
              <span className="sr-only">GitHub</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
