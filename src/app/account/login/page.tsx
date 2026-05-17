import AccountLoginForm from '@/components/AccountLoginForm'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'Account Login | InteropMed',
  description: 'Sign in to the InteropMed account area.',
}

type AccountLoginPageProps = {
  searchParams: Promise<{
    next?: string | string[]
  }>
}

export default async function AccountLoginPage({ searchParams }: AccountLoginPageProps) {
  const params = await searchParams
  const next = typeof params.next === 'string' && params.next.startsWith('/account')
    ? params.next
    : '/account'

  return (
    <>
      <Navbar />
      <main className="flex min-h-[calc(100vh-160px)] items-center justify-center bg-slate-50 px-6 py-16 dark:bg-slate-900">
        <AccountLoginForm redirectTo={next} />
      </main>
      <Footer />
    </>
  )
}
