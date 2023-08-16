"use client"

import { Disclosure, Menu, Transition, } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import AuthContext from '@/context/AuthProvider'
import { useContext, Fragment } from 'react'
import SchoolContext from '@/context/SchoolProvider'
import LoadingContext from '@/context/LoadingContext'
import useLogout from '@/hooks/useLogout'
import { useRouter } from 'next/navigation'



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function HomeNavBar() {
    const router = useRouter();
    const { school } = useContext(SchoolContext);
    const { auth } = useContext(AuthContext);
    const { setLoading } = useContext(LoadingContext);
    const logout = useLogout();

    const handleLogout = async () => {
        setLoading(true);
        const res = await logout();
        if (res?.status === 204) {
            router.push("/");
            setTimeout(() => {
                // setShowSuccess(false);
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
            <Disclosure as="nav" className="bg-black shadow">
                { ({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                            <div className="relative flex h-20 justify-between">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    {/* Mobile menu button */ }
                                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-pink-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
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
                                        <Link href="/">

                                            <img
                                                className="h-16 w-auto"
                                                src="/CJ_Logo1.png"
                                                alt="Your Company"
                                            />
                                        </Link>

                                    </div>

                                    <div className='flex items-center  '>
                                        <Link href="/">

                                            <h2 className=" font-bold text-transparent tracking-tight text-3xl sm:text-4xl bg-clip-text bg-gradient-to-r from-pink-300 to-pink-600">Course Judge</h2>
                                        </Link>

                                    </div>

                                    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">

                                    </div>
                                </div>


                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">


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
                                                                onClick={ handleLogout }
                                                                className={ classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700') }
                                                            >
                                                                Sign out
                                                            </button>
                                                        ) }
                                                    </Menu.Item>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    ) : (
                                        <Link
                                            href={ `/login` }
                                        >
                                            <button className='bg-pink-400 py-2 px-4 text-sm font-black rounded-md text-white hover:bg-black hover:text-pink-400 hover:border-pink-400 border-2 border-black'> Login </button>

                                        </Link>
                                    ) }





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

                                        className="block border-l-4  py-2 pl-3 pr-4 text-base font-medium text-pink-400"
                                    >
                                        School Search
                                    </Disclosure.Button>
                                </Link>
                                <Link
                                    href="/policies"
                                >
                                    <Disclosure.Button

                                        className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500  hover:text-pink-600"
                                    >
                                        Policies
                                    </Disclosure.Button>
                                </Link>

                                <Link
                                    href="/socials"
                                >
                                    <Disclosure.Button

                                        className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:text-pink-600"
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