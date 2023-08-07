import '../globals.css'
import { Inter } from 'next/font/google'




export default function SchoolLayout({ children }) {
    return (
        <>
            <div className="mt-5 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 px-4 sm:px-6 lg:px-8  min-h-[calc(100vh-64px)]">
                { children }
            </div>

        </>



    )
}
