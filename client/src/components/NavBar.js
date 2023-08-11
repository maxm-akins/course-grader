"use client"


import { Fragment, useState, useContext } from 'react'
import { Menu, Popover, Transition, Combobox, } from '@headlessui/react'
import { MagnifyingGlassIcon, StarIcon, MapPinIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, BellIcon, XMarkIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline'
import SchoolContext from '@/context/SchoolProvider'
import Link from 'next/link'
const user = {
    name: 'Chelsea Hagon',
    email: 'chelsea.hagon@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

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

export default function NavBar() {
    const [query, setQuery] = useState('')
    const { school } = useContext(SchoolContext);
    const [selectedPerson, setSelectedPerson] = useState(null)
    const filteredPeople =
        query === ''
            ? people
            : people.filter((person) => {
                return person.name.toLowerCase().includes(query.toLowerCase())
            })


    return (
        <>
            {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */ }
            <Popover
                as="header"
                className={ ({ open }) =>
                    classNames(
                        open ? 'fixed inset-0  z-40 overflow-y-auto' : '',
                        'bg-white  lg:static lg:overflow-y-visible'
                    )
                }
            >
                { ({ open }) => (
                    <>
                        <div className="relative bg-black">
                            <div className=" mx-auto max-w-7xl  px-4 sm:px-6 pt-3 sm:pt-0 lg:px-8 justify-between gap-8 gap-y-0 grid grid-cols-12">

                                <div className="flex order-1 inset-y-0 left-0 lg:static col-span-2 sm:col-span-1 mr-2">
                                    <div className="flex flex-shrink-0 items-center">
                                        <a href="/">
                                            <img
                                                className="h-12 w-auto "
                                                src="/CJ_Logo1.png"
                                                alt="Your Company"
                                            />
                                        </a>
                                    </div>
                                </div>

                                <div className='sm:hidden flex justify-center col-span-8 order-2 text-center items-center  '>
                                    <h2 className=" font-bold text-transparent tracking-tight text-3xl sm:text-4xl bg-clip-text bg-gradient-to-r from-pink-300 to-pink-600">Course Judger</h2>

                                </div>

                                {/* <div className="sm:hidden relative pt-4 ml-[-15px] w-screen sm:order-6 order-3 col-span-12">
                                    <div className=" inset-0 flex items-center" aria-hidden="true">
                                        <div className="w-full border-t-2 border-gray-100" />
                                    </div>
                                    <div className="relative flex justify-center">
                                    </div>
                                </div> */}



                                <div className="min-w-0 flex-1 order-3 sm:order-2  col-span-12 sm:col-span-10 ">
                                    <div className="flex flex-wrap justify-center items-center px-6 sm:py-4 py-0 pb-2 md:mx-auto lg:mx-0 gap-6 gap-y-0 xl:px-0">

                                        <div className="mt-2 flex  text-center	flex-wrap justify-center lg:text-xl text-lg font-bold text-white  tranistion-all ">
                                            <Link href={ `/${school?.trunkName}` }> { school?.name } </Link>
                                        </div>
                                        <div className='hidden sm:flex sm:mt-0  space-x-6 w-full justify-center sm:w-auto'>
                                            <div className="mt-2  flex items-center text-sm text-white">
                                                <StarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-yellow-400" aria-hidden="true" />
                                                { school?.rating }
                                            </div>
                                            <div className="mt-2 flex items-center text-center text-sm text-white">
                                                <MapPinIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-red-400" aria-hidden="true" />
                                                { `${school?.city}, ${school?.state}` }
                                            </div>


                                        </div>

                                    </div>
                                </div>
                                {/* 
                                <div className="xl:ml-[-200px] ml-[-20px] left-0 w-[110vw] col-span-12 order-5 ">
                                    <div className=" inset-0 flex items-center" aria-hidden="true">
                                        <div className="w-full border-t-2 border-gray-100" />
                                    </div>
                                    <div className="relative flex justify-center">
                                    </div>
                                </div> */}

                                <div className="col-span-2 order-2 sm:order-3 sm:col-start-12 col-start-11 sm:col-span-1 sm flex items-center  inset-y-0 right-0 md:hidden">
                                    {/* Mobile menu button */ }
                                    <Popover.Button className="relative -mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Open menu</span>
                                        { open ? (
                                            <XMarkIcon className="block h-8 w-8" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-8 w-8" aria- hidden="true" />
                                        ) }
                                    </Popover.Button>
                                </div>
                                <div className="hidden md:flex md:items-center md:justify-end col-span-2 sm:col-span-1 order-2 sm:order-3 sm:col-start-12 col-start-11">



                                    {/* Profile dropdown */ }
                                    <Menu as="div" className="relative ml-5 flex-shrink-0">
                                        <div>
                                            <Menu.Button className="relative flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                                <span className="absolute -inset-1.5" />
                                                <span className="sr-only">Open user menu</span>
                                                <img className="h-8 w-8 rounded-full" src={ user.imageUrl } alt="" />
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={ Fragment }
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                { userNavigation.map((item) => (
                                                    <Menu.Item key={ item.name }>
                                                        { ({ active }) => (
                                                            <a
                                                                href={ item.href }
                                                                className={ classNames(
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block px-4 py-2 text-sm text-gray-700'
                                                                ) }
                                                            >
                                                                { item.name }
                                                            </a>
                                                        ) }
                                                    </Menu.Item>
                                                )) }


                                            </Menu.Items>

                                        </Transition>
                                    </Menu>


                                </div>



                            </div>

                        </div>



                        <Popover.Panel as="nav" className="md:hidden" aria-label="Global">

                            <div className="border-t border-gray-200 pb-3 pt-4">
                                <div className="mx-auto flex max-w-3xl items-center px-4 sm:px-6">
                                    <div className="flex-shrink-0">
                                        <img className="h-10 w-10 rounded-full" src={ user.imageUrl } alt="" />
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-base font-medium text-gray-800">{ user.name }</div>
                                        <div className="text-sm font-medium text-gray-500">{ user.email }</div>
                                    </div>
                                    <button
                                        type="button"
                                        className="relative ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">View notifications</span>
                                    </button>
                                </div>
                                <div className="mx-auto mt-3 max-w-3xl space-y-1 px-2 sm:px-4">
                                    <Popover.Button
                                        as={ Link }
                                        onClick={ () => (setOpen(false)) }
                                        key={ "schools" }
                                        href={ `/` }
                                        className="block rounded-md px-3 py-2 text-base font-medium text-pink-400 hover:bg-gray-50 hover:text-gray-900"
                                    >
                                        School Search

                                    </Popover.Button>
                                    <Popover.Button

                                        as={ Link }
                                        onClick={ () => (setOpen(false)) }
                                        key={ "courses" }
                                        href={ `/${school?.trunkName}` }
                                        className="block rounded-md px-3 py-2 text-base font-medium text-pink-400 hover:bg-gray-50 hover:text-gray-900"
                                    >
                                        Course Search

                                    </Popover.Button>



                                    { userNavigation.map((item) => (
                                        <a
                                            key={ item.name }
                                            href={ item.href }
                                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                        >
                                            { item.name }
                                        </a>
                                    )) }


                                </div>
                            </div>
                        </Popover.Panel>
                    </>
                ) }
            </Popover>
        </>
    )
}