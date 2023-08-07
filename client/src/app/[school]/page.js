"use client"

import Link from 'next/link'
import { Fragment } from 'react'
import {
    BriefcaseIcon,
    CalendarIcon,
    CheckIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    CurrencyDollarIcon,
    LinkIcon,
    MapPinIcon,
    PencilIcon,
    UsersIcon
} from '@heroicons/react/20/solid'
import { Menu, Transition, Combobox } from '@headlessui/react'
import { useState } from 'react'
import SchoolHeader from '@/components/SchoolHeader'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const people = [
    { id: 1, name: 'Computer Assembly and Organization', classCode: "0447", schoolCode: "CS", prof: "Jarret Billingsly", url: "1234567" },
    // More people...
]

export default function School() {
    const [query, setQuery] = useState('')

    const filteredPeople =
        query === ''
            ? []
            : people.filter((person) => {
                return person.name.toLowerCase().includes(query.toLowerCase())
            })




    return (
        <>
            <SchoolHeader />

            <div className="mt-9">
                <div className=" ">
                    <h2 className="mb-3 text-2xl font-medium tracking-tight text-pink-400 sm:text-base">Search by class name, code, school, or professor</h2>

                    <Combobox onChange={ (person) => (window.location = `/universityofpittsburgh/${person.url}`) } >

                        <Combobox.Input
                            className="w-full rounded-md  bg-gray-100 px-4 py-2.5 text-gray-400 border-none focus:ring-0 sm:text-xl hover:drop-shadow-md transition-all"
                            placeholder="Search for a class..."
                            onChange={ (event) => setQuery(event.target.value) }
                        />

                        { filteredPeople.length > 0 && (
                            <Combobox.Options
                                static
                                className=" -mb-2 max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800 text-left "
                            >
                                <Combobox.Option
                                    disabled
                                    key={ 0 }
                                    value={ 0 }
                                    className={ ({ active }) =>
                                        classNames(
                                            'cursor-default select-none rounded-md px-2 py-2 grid grid-cols-4 text-pink-400 ',
                                            active && 'bg-pink-400 text-white'
                                        )
                                    }
                                >
                                    <p>
                                        Class Name

                                    </p>
                                    <p>
                                        School Code

                                    </p>
                                    <p>
                                        Class Code

                                    </p>
                                    <p>
                                        Professor

                                    </p>
                                </Combobox.Option>
                                { filteredPeople.map((person) => (


                                    <Combobox.Option
                                        key={ person.id }
                                        value={ person }
                                        className={ ({ active }) =>
                                            classNames(
                                                'cursor-default select-none rounded-md px-2 py-2 grid grid-cols-4 ',
                                                active && 'bg-pink-400 text-white'
                                            )
                                        }
                                    >
                                        <p>
                                            { person.name }

                                        </p>
                                        <p>
                                            { person.schoolCode }

                                        </p>
                                        <p>
                                            { person.classCode }

                                        </p>
                                        <p>
                                            { person.prof }

                                        </p>
                                    </Combobox.Option>

                                )) }
                            </Combobox.Options>
                        ) }

                        { query !== '' && filteredPeople.length === 0 && (
                            <div className="px-4 py-14 text-center sm:px-14 ">
                                <UsersIcon className="mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
                                <p className="mt-4 text-sm text-gray-900">No classes found?</p>
                                <Link
                                    className="mt-4 text-sm text-pink-400 hover:text-blue-400"
                                    href="/"
                                >
                                    Click here to submit a new class!

                                </Link>
                            </div>
                        ) }
                    </Combobox>



                </div>
            </div>



        </>
    )
}