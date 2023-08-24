"use client"

import { useRouter } from 'next/navigation'
import { Fragment, useState, useContext, useEffect } from 'react'
import { Menu, Popover, Transition, Combobox, } from '@headlessui/react'
import { MagnifyingGlassIcon, StarIcon, MapPinIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, BellIcon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import SchoolContext from '@/context/SchoolProvider'
import Link from 'next/link'
import AuthContext from '@/context/AuthProvider'
import LoadingContext from '@/context/LoadingContext'
import useLogout from '@/hooks/useLogout'

const items = [
    { name: 'Login', href: '/login' },
    { name: 'Sign Up', href: '/register' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function NavBar() {
    const router = useRouter();
    const { school } = useContext(SchoolContext);
    const { auth } = useContext(AuthContext);
    const { setLoading } = useContext(LoadingContext);
    const logout = useLogout();

    const handleLogout = async () => {
        const res = await logout();
        setLoading(true);
        if (res?.status === 204) {
            router.push("/");
            setTimeout(() => {
                setLoading(false);
            }
                , 1000);

        }
        else {
            setLoading(false);
        }
    }



    return (
        <>
            {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */ }
            <Popover
                as="header"
                className={ ({ open }) =>
                    classNames(
                        open ? 'fixed inset-0  z-40 overflow-y-auto ' : '',
                        'bg-white fixed w-full top-0 lg:overflow-y-visible'
                    )
                }
            >
                { ({ open }) => (
                    <>
                        <div className="relative bg-black">
                            <div className=" mx-auto max-w-7xl  px-4 sm:px-6 pt-3 sm:pt-0 lg:px-8 justify-between gap-8 gap-y-0 grid grid-cols-12">

                                <div className="flex order-1 inset-y-0 left-0 lg:static col-span-2 sm:col-span-1 mr-2">
                                    <div className="flex flex-shrink-0 items-center">
                                        <Link href="/">
                                            <img
                                                className="h-12 w-auto "
                                                src="/CJ_Logo1.png"
                                                alt="Your Company"
                                            />
                                        </Link>
                                    </div>
                                </div>

                                <div className='sm:hidden flex justify-center col-span-8 order-2 text-center items-center  '>
                                    <h2 className=" font-bold text-transparent tracking-tight text-3xl sm:text-4xl bg-clip-text bg-gradient-to-r from-pink-300 to-pink-600">Course Judge</h2>

                                </div>


                                <div className="min-w-0 flex-1 order-3 sm:order-2  col-span-12 sm:col-span-10 ">
                                    <div className="flex flex-wrap justify-center items-center px-6 sm:py-4 py-0 pb-2 md:mx-auto lg:mx-0 gap-6 gap-y-0 xl:px-0">

                                        <div className="mt-2 flex  text-center	flex-wrap justify-center lg:text-xl text-lg font-bold text-white  tranistion-all ">
                                            <Link href={ `/${school?.trunkName}` }> { school?.name } </Link>
                                        </div>
                                        <div className='hidden sm:flex sm:mt-0  space-x-6 w-full justify-center sm:w-auto'>
                                            {/* <div className="mt-2  flex items-center text-sm text-white">
                                                <StarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-yellow-400" aria-hidden="true" />
                                                { school?.rating } / 10
                                            </div> */}
                                            <div className="mt-2 flex items-center text-center text-sm text-white">
                                                <MapPinIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-red-400" aria-hidden="true" />
                                                { `${school?.city}, ${school?.state}` }
                                            </div>


                                        </div>

                                    </div>
                                </div>


                                <div className="col-span-2 order-2 sm:order-3 sm:col-start-12 col-start-11 sm:col-span-1 sm flex items-center  inset-y-0 right-0 md:hidden">
                                    {/* Mobile menu button */ }
                                    <Popover.Button className="relative -mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-pink-400 hover:text-gray-900  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Open menu</span>
                                        { open ? (
                                            <XMarkIcon className="block h-8 w-8" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-8 w-8" aria-hidden="true" />
                                        ) }
                                    </Popover.Button>
                                </div>
                                <div className="hidden md:flex md:items-center md:justify-end col-span-2 sm:col-span-1 order-2 sm:order-3 sm:col-start-12 col-start-11">



                                    {/* Profile dropdown */ }
                                    { JSON.stringify(auth) !== "{}" ? (
                                        <Menu as="div" className="relative ml-3">
                                            <div>
                                                <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                                    <span className="absolute -inset-1.5" />
                                                    <span className="sr-only">Open user menu</span>
                                                    <span className="inline-block h-10 w-10 overflow-hidden rounded-full bg-pink-400">
                                                        <svg className="h-full w-full text-white" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                                        </svg>
                                                    </span>
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
                                                            <Link
                                                                href="/profile"
                                                                className={ classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700') }
                                                            >
                                                                Your Profile
                                                            </Link>
                                                        ) }
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        { ({ active }) => (
                                                            <button
                                                                onClick={ handleLogout } className={ classNames(active ? 'bg-gray-100' : '', 'w-full text-left block px-4 py-2 text-sm text-gray-700') }
                                                            >
                                                                Sign out
                                                            </button>
                                                        ) }
                                                    </Menu.Item>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    ) : (
                                        <div className="inline-flex rounded-md shadow-sm">
                                            <Link
                                                href="/login"
                                                type="button"
                                                className="relative inline-flex items-center rounded-l-md bg-black text-pink-400 px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-black hover:text-white focus:z-10"
                                            >
                                                Login
                                            </Link>
                                            <Menu as="div" className="relative -ml-px block">
                                                <Menu.Button className="relative inline-flex items-center rounded-r-md bg-black px-2 py-2 text-pink-400 hover:text-white focus:z-10">
                                                    <span className="sr-only">Open options</span>
                                                    <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                                                </Menu.Button>
                                                <Transition
                                                    as={ Fragment }
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items className="absolute right-0 z-10 -mr-1 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg  focus:outline-none">
                                                        <div className="py-1">
                                                            { items.map((item) => (
                                                                <Menu.Item key={ item.name }>
                                                                    { ({ active }) => (
                                                                        <Link
                                                                            href={ item.href }
                                                                            className={ classNames(
                                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                'block px-4 py-2 text-sm'
                                                                            ) }
                                                                        >
                                                                            { item.name }
                                                                        </Link>
                                                                    ) }
                                                                </Menu.Item>
                                                            )) }
                                                        </div>
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </div>
                                    ) }

                                </div>



                            </div>

                        </div>



                        <Popover.Panel as="nav" className="md:hidden" aria-label="Global">

                            <div className="border-t border-gray-200 pb-3 pt-4">

                                <div className="mx-auto mt-3 max-w-3xl space-y-1 px-2 sm:px-4">
                                    <Popover.Button
                                        as={ Link }
                                        key={ "schools" }
                                        href={ `/` }
                                        className="block rounded-md px-3 py-2 text-base font-medium text-pink-400 hover:bg-gray-50 hover:text-gray-900"
                                    >
                                        School Search

                                    </Popover.Button>
                                    <Popover.Button

                                        as={ Link }
                                        key={ "courses" }
                                        href={ `/${school?.trunkName}` }
                                        className="block rounded-md px-3 py-2 text-base font-medium text-pink-400 hover:bg-gray-50 hover:text-gray-900"
                                    >
                                        Course Search

                                    </Popover.Button>

                                    { JSON.stringify(auth) !== "{}" ? (
                                        <>
                                            <Popover.Button

                                                as={ Link }
                                                key={ "profile" }
                                                href={ `/profile` }
                                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                            >
                                                Profile

                                            </Popover.Button>
                                            <Popover.Button

                                                o onClick={ () => (handleLogout()) }

                                                key={ "signout" }
                                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                            >
                                                Sign Out

                                            </Popover.Button>
                                        </>
                                    ) : (
                                        <>
                                            <Popover.Button

                                                as={ Link }
                                                key={ "login" }
                                                href={ `/login` }
                                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                            >
                                                Login

                                            </Popover.Button>
                                            <Popover.Button

                                                as={ Link }
                                                key={ "register" }
                                                href={ `/register` }
                                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                            >
                                                Sign Up

                                            </Popover.Button>
                                        </>
                                    ) }







                                </div>
                            </div>
                        </Popover.Panel>
                    </>
                ) }
            </Popover>
        </>
    )
}