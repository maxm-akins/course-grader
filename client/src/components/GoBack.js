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
            <div className="absolute items-center bg-transparent justify-between p-3 ">

                <button
                    type="button"
                    className="hover:bg-gray-200 flex-none rounded "
                    onClick={ () => (router.back()) }

                >
                    <span className="sr-only">Dismiss</span>
                    <ArrowLeftIcon className="h-8 w-8 text-pink-400 " aria-hidden="true" />

                </button>
            </div >
        </>
    )
}