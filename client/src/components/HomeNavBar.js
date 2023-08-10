"use client"


import { Fragment, useState } from 'react'
import { Menu, Popover, Transition, Combobox, Disclosure } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, BellIcon, XMarkIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
const user = {
    name: 'Chelsea Hagon',
    email: 'chelsea.hagon@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const items = [
    { id: 'Dashboard', href: '#', current: true },
    { id: 'Calendar', href: '#', current: false },
    { id: 'Teams', href: '#', current: false },
    { id: 'Directory', href: '#', current: false },
]
const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
]


const people = [
    { id: 1, name: 'Leslie Alexander' },
    // More users...
]



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function HomeNavBar() {
    const [query, setQuery] = useState('')
    const [selectedPerson, setSelectedPerson] = useState(null)
    const filteredPeople =
        query === ''
            ? people
            : people.filter((person) => {
                return person.name.toLowerCase().includes(query.toLowerCase())
            })


    return (
        <>
            <Disclosure as="nav" className="bg-white shadow">
                { ({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                            <div className="relative flex h-20 justify-between">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    {/* Mobile menu button */ }
                                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Open main menu</span>
                                        { open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        ) }
                                    </Disclosure.Button>
                                </div>
                                <div className=" flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                    <div className="hidden sm:flex flex-shrink-0 items-center">
                                        <img
                                            className="h-16 w-auto"
                                            src="/CJ_Logo1.png"
                                            alt="Your Company"
                                        />

                                    </div>
                                    <div className='flex items-center  '>
                                        <h2 className=" font-bold text-transparent tracking-tight text-3xl sm:text-4xl bg-clip-text bg-gradient-to-r from-pink-300 to-pink-600">Course Judger</h2>

                                    </div>

                                    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">

                                    </div>
                                </div>


                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">


                                    {/* Profile dropdown */ }
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                                <span className="absolute -inset-1.5" />
                                                <span className="sr-only">Open user menu</span>
                                                <img
                                                    className="h-8 w-8 rounded-full"
                                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                    alt=""
                                                />
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={ Fragment }
                                            enter="transition ease-out duration-200"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <Menu.Item>
                                                    { ({ active }) => (
                                                        <a
                                                            href="#"
                                                            className={ classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700') }
                                                        >
                                                            Your Profile
                                                        </a>
                                                    ) }
                                                </Menu.Item>
                                                <Menu.Item>
                                                    { ({ active }) => (
                                                        <a
                                                            href="#"
                                                            className={ classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700') }
                                                        >
                                                            Settings
                                                        </a>
                                                    ) }
                                                </Menu.Item>
                                                <Menu.Item>
                                                    { ({ active }) => (
                                                        <a
                                                            href="#"
                                                            className={ classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700') }
                                                        >
                                                            Sign out
                                                        </a>
                                                    ) }
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className="sm:hidden">
                            <div className="space-y-1 pb-4 pt-2">
                                {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */ }
                                <Link
                                    href="/"
                                >
                                    <Disclosure.Button

                                        className="block border-l-4 border-pink-400 bg-pink-50 py-2 pl-3 pr-4 text-base font-medium text-pink-700"
                                    >
                                        School Search
                                    </Disclosure.Button>
                                </Link>
                                <Link
                                    href="/policies"
                                >
                                    <Disclosure.Button

                                        className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                                    >
                                        Policies
                                    </Disclosure.Button>
                                </Link>

                                <Link
                                    href="/socials"
                                >
                                    <Disclosure.Button

                                        className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                                    >
                                        Socials
                                    </Disclosure.Button>
                                </Link>


                            </div>
                        </Disclosure.Panel>
                    </>
                ) }
            </Disclosure>
        </>
    )
}