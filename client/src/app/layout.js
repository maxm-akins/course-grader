import './globals.css'
import { Inter } from 'next/font/google'
import NavBar from '@/components/NavBar'
import HomeNavBar from '@/components/HomeNavBar'
const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={ inter.className }>

        <HomeNavBar />
        {/* <NavBar /> */ }
        <div className="w-full h-[calc(100vh-64px)]">
          { children }

        </div>


      </body>
    </html>
  )
}
