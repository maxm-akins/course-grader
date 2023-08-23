"use client"

import { Disclosure, Menu, Transition, } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import AuthContext from '@/context/AuthProvider'
import { useContext, Fragment } from 'react'
import SchoolContext from '@/context/SchoolProvider'
import LoadingContext from '@/context/LoadingContext'
import useLogout from '@/hooks/useLogout'
import { useRouter } from 'next/navigation'
import { redirect } from 'next/navigation'



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function GoBack() {
    const router = useRouter();



    return (
        <>
            <div className="fixed items-center bg-transparent justify-between p-3 pt-[90px]">

                <button
                    type="button"
                    className="hover:bg-gray-200 flex-none rounded "
                    onClick={ () => (router.back()) }

                >
                    <span className="sr-only">Dismiss</span>
                    <ArrowLeftIcon className="sm:h-8 sm:w-8 text-pink-400 h-6 w-6 transition-all" aria-hidden="true" />

                </button>
            </div >
        </>
    )
}