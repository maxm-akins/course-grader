"use client"
import { Fragment, useState, useEffect, useContext } from 'react'
import { Link } from "next/link"
import {
    CheckIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    MapPinIcon,
    StarIcon,
} from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'
import { usePathname } from 'next/navigation'

import SchoolContext from "@/context/SchoolProvider";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}



export default function SchoolHeader({ }) {
    let { school } = useContext(SchoolContext)
    const pathname = usePathname();

    return (
        <div className="lg:flex lg:items-center lg:justify-between transition-all">
            <div className="min-w-0 flex-1">
                <nav className="flex" aria-label="Breadcrumb">
                    <ol role="list" className="flex items-center space-x-2">
                        <li>
                            <div className="flex">
                                <a href="/?search=true" className="text-sm font-medium text-gray-500 hover:text-gray-700">
                                    Schools
                                </a>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                <a href={ `/${school?.trunkName}` } className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                                    { school?.name }
                                </a>
                            </div>
                        </li>

                    </ol>
                </nav>

            </div>

        </div>
    )
}