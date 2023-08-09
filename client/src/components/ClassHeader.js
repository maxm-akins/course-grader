"use client"

import { Fragment, useContext, useEffect } from 'react'
import {
    CheckIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    MapPinIcon,
    XMarkIcon,
    StarIcon,
} from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import SchoolContext from '@/context/SchoolProvider'
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ClassHeader() {
    const pathname = usePathname();
    let { school, course } = useContext(SchoolContext);

    const handleNewReviewClick = () => {
        console.log("new review clicked")
        console.log(pathname)

    }



    return (

        <>

            <div className="lg:flex lg:items-center lg:justify-between">
                <div className="min-w-0 flex-1">
                    <nav className="flex" aria-label="Breadcrumb">
                        <ol role="list" className="flex items-center space-x-4">
                            <li>
                                <div className="flex">
                                    <Link href="/" className="text-sm font-medium text-gray-500 hover:text-gray-700">
                                        Schools
                                    </Link>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                    <Link href={ `/${school?.trunkName}` } className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                                        { school?.name }
                                    </Link>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                    <Link href={ `${pathname}` } className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                                        { course?.name }
                                    </Link>
                                </div>
                            </li>
                        </ol>
                    </nav>
                    <h2 className="mt-2 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        { school?.name }
                    </h2>
                    <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                            <StarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                            { school?.rating }
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                            <MapPinIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                            { `${school?.city}, ${school?.state}` }
                        </div>

                    </div>
                </div>
                <div className="mt-5 flex lg:ml-4 lg:mt-0">

                    { (pathname.slice(-3) == "new") ? (
                        <span className="sm:ml-3">
                            <Link
                                href={ pathname.slice(0, -3) }
                            >
                                <button
                                    type="button"
                                    className="inline-flex items-center rounded-md bg-pink-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    <XMarkIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                                    Cancel
                                </button>
                            </Link>

                        </span>
                    ) : (
                        <span className="sm:ml-3">
                            <Link
                                href={ pathname + "/new" }
                            >
                                <button
                                    onClick={ handleNewReviewClick }
                                    type="button"
                                    className="inline-flex items-center rounded-md bg-pink-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    <CheckIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                                    New Review
                                </button>
                            </Link>

                        </span>
                    )
                    }




                </div >
            </div >

            <div className="relative my-5">
                <div className=" inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-300" />
                </div>

            </div>

            <div className="grid grid-cols-4  md:items-end md:justify-between gap-5 ">
                <h2 className="md:col-span-2 sm:col-span-4 text-3xl font-bold leading-7 text-pink-400  ">
                    { course?.name }
                </h2>
                <div className='flex gap-2 justify-start md:col-span-1 sm:col-span-2 '>
                    <h2 className="text-xl font-bold leading-7 text-gray-600 sm:text-xl ">
                        { course?.descripCode }
                    </h2>
                    <h2 className="text-xl font-bold leading-7 text-gray-600 sm:text-xl ">
                        { course?.classCode }
                    </h2>


                </div>
                <div>
                    <select
                        id="prof"
                        name="prof"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue="All professors"
                    >
                        <option >All Professors</option>
                        { course?.profs?.map((prof) => (
                            <option value={ prof.ref }>{ prof.name }</option>
                        )) }
                    </select>
                </div>
            </div>

        </>

    )
}