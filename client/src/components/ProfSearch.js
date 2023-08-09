/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/

"use client"
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { UsersIcon } from '@heroicons/react/24/outline'
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import { LinkIcon, PlusIcon, QuestionMarkCircleIcon } from '@heroicons/react/20/solid'
import { getClass } from "@/api/classes"
import { getSchool } from "@/api/profs"
import SchoolContext from '@/context/SchoolProvider'
import { useRouter } from 'next/navigation'
import { Combobox, } from '@headlessui/react'
import { useParams } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useState, useContext, useEffect } from "react"
import { searchProfsBySchool } from '@/api/profs'
import Link from 'next/link'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProfSearch({ open, setOpen, setNewProf }) {
    const router = useRouter()
    const [profs, setProfs] = useState([]);
    const [selectedProf, setSelectedProf] = useState("");
    const [query, setQuery] = useState("");
    let { school } = useContext(SchoolContext);


    const handleQueryChange = async (q) => {
        await setQuery(q);
        setProfs((await searchProfsBySchool(school?.uuid, q)));
    }

    useEffect(() => {

    }, [profs])


    return (
        <>
            <Combobox value={ selectedProf }
                onChange={ (value) => {
                    setSelectedProf(value);
                    setNewProf(value);
                    setQuery("")
                } }  >

                <Combobox.Input
                    className="w-full rounded-lg  bg-gray-100 px-4 py-2.5 text-pink-400 border-none focus:ring-0 sm:text-sm hover:drop-shadow-md transition-all"
                    placeholder="Search a professor"
                    onChange={ (event) => {
                        handleQueryChange(event.target.value);
                    } }
                />

                { query !== "" && (
                    <Combobox.Options
                        static
                        className=" -mb-2 max-h-48 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800 bg-gray-100 rounded-b-lg  text-left "
                    >

                        { query.length > 0 && (
                            <Combobox.Option
                                value={ query }
                                className={ ({ active }) =>
                                    classNames(
                                        'cursor-default select-none rounded-md px-4 py-2 ',
                                        active && 'bg-pink-400 text-white'
                                    )
                                }
                            >
                                Add new "{ query }"
                            </Combobox.Option>
                        ) }
                        { profs?.map((prof) => (
                            <Combobox.Option
                                key={ prof?.uuid }
                                value={ prof?.name }
                                className={ ({ active }) =>
                                    classNames(
                                        'cursor-default select-none rounded-md px-4 py-2 ',
                                        active && 'bg-pink-400 text-white'
                                    )
                                }
                            >
                                <div className='grid grid-cols-2'>
                                    <div>
                                        { prof?.name }

                                    </div>

                                </div>
                            </Combobox.Option>
                        )) }
                    </Combobox.Options>
                ) }

                {/* { profs?.length === 0 && query && (
                    <div className="px-4 py-14 text-center sm:px-14 ">
                        <UsersIcon className="mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
                        <p className="mt-4 text-sm text-gray-900">No profs found using that search term.</p>
                        <Link
                            className="mt-4 text-sm text-pink-400 hover:text-blue-400"
                            href="/"
                        >
                            Click here to request to add a school!

                        </Link>
                    </div>
                ) } */}
            </Combobox>
        </>









    )
}