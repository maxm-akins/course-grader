import '../../globals.css'
import { Inter } from 'next/font/google'
import ClassHeader from '@/components/ClassHeader'
const inter = Inter({ subsets: ['latin'] })



export default function ClassLayout({ children }) {
    return (
        <>
            <div className="">
                <ClassHeader />

                { children }
            </div>

        </>



    )
}
