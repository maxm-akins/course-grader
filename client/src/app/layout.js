import './globals.css'
import { Inter } from 'next/font/google'
import NavBar from '@/components/NavBar'
import HomeNavBar from '@/components/HomeNavBar'
import Footer from '@/components/Footer'
import NavBarRender from '@/components/NavBarRender'
const inter = Inter({ subsets: ['latin'] })
import { Providers } from '@/context/Providers'
import PersistWrapper from '@/components/PersistWrapper'
import LoadingScreen from '@/components/LoadingScreen'
import { Suspense } from 'react';


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={ inter.className }>
        <Suspense fallback={ <LoadingScreen /> }>
          <Providers>

            <PersistWrapper>
              <NavBarRender />
              <div className="w-full min-h-[calc(100vh-64px)]">

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
