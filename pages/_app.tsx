import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { OrganizationProvider } from '../lib/contexts/OrganizationContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <OrganizationProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </OrganizationProvider>
  )
}
