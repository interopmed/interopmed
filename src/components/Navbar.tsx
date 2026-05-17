'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">IM</span>
          </div>
          <span className="font-semibold text-slate-900 dark:text-white text-lg">InteropMed</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/technology" className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
            Technology
          </Link>
          <Link href="/solutions" className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
            Solutions
          </Link>
          <Link href="/implementation" className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
            Implementation
          </Link>
          <Link href="/insights" className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
            Insights
          </Link>
          <Link href="/about" className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
            Contact
          </Link>
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex">
          <Link href="/contact" className="px-6 py-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-300 transform hover:scale-105">
            Request Demo
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-slate-700 dark:text-slate-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
          <div className="px-6 py-4 space-y-3">
            <Link href="/technology" className="block text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400">
              Technology
            </Link>
            <Link href="/solutions" className="block text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400">
              Solutions
            </Link>
            <Link href="/implementation" className="block text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400">
              Implementation
            </Link>
            <Link href="/insights" className="block text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400">
              Insights
            </Link>
            <Link href="/about" className="block text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400">
              About
            </Link>
            <Link href="/contact" className="block text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400">
              Contact
            </Link>
            <Link href="/contact" className="block w-full mt-4 px-6 py-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-lg text-sm font-semibold text-center">
              Request Demo
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
