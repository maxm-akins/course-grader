import './globals.css'
import { Inter } from 'next/font/google'

import Footer from '@/components/Footer'
import NavBarRender from '@/components/NavBarRender'
const inter = Inter({ subsets: ['latin'] })
import { Providers } from '@/context/Providers'
import PersistWrapper from '@/components/PersistWrapper'
import LoadingScreen from '@/components/LoadingScreen'
import { Suspense } from 'react';
import CookieBanner from '@/components/CookieBanner'
import Script from 'next/script'

export const metadata = {
  title: 'Course Judge',
  // description: '...',
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={ inter.className }>
        <Script
          type="text/javascript"
          src="https://app.termly.io/embed.min.js"
          data-auto-block="on"
          data-website-uuid="bad8bc47-c66f-4f7e-964b-cc1cd15f20f9"
        />
        <Suspense fallback={ <LoadingScreen /> }>
          <Providers>

            <PersistWrapper>
              <NavBarRender />
              <div className="w-full min-h-[calc(100vh)]  transition-all">
                {/* <CookieBanner /> */ }
                { children }

              </div>
              <Footer />

            </PersistWrapper>

          </Providers>

        </Suspense>

      </body>
    </html>
  )
}
