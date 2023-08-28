"use client"
import { useParams } from 'next/navigation'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Fragment, useEffect, useContext } from 'react'
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
import { getSchool } from '@/apis/schools'
import SchoolContext from '@/context/SchoolProvider'
import { searchClasses } from '@/apis/classes'
import { useRouter } from 'next/navigation'
import { redirect } from 'next/navigation'
import { BuildingOfficeIcon, AcademicCapIcon, BuildingLibraryIcon } from '@heroicons/react/20/solid'
import FindClass from '@/components/FindClass'

import FindProf from '@/components/FindProf'


const tabs = [
    { name: 'Find a class', href: '#', icon: BuildingLibraryIcon, current: false },
    { name: 'Find a professor', href: '#', icon: AcademicCapIcon, current: false },

]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function School() {
    const router = useRouter()
    const pathname = usePathname()
    const [query, setQuery] = useState('');
    const [classes, setClasses] = useState([]);
    const [schoolInfo, setSchoolInfo] = useState({})
    const params = useParams();
    const schoolParam = params?.school;
    let { school, setSchool } = useContext(SchoolContext);
    const [value, setValue] = useState(1);


    const handleQueryChange = async (q) => {
        await setQuery(q);
        setClasses((await searchClasses(school.uuid, q)));
    }

    useEffect(() => {

    }, [classes])


    const getSchoolInfo = async () => {
        const data = await getSchool(schoolParam);
        if (!data) {
            console.log("bad");
            router.replace("/404");
        }
        else setSchool((data))

    }

    useEffect(() => {
        const res = getSchoolInfo();

    }, [])




    return (
        <>
            <SchoolHeader />

            {/* 
            <Tabs className='text-sm' value={ value } aria-label="basic tabs example">
                <Tab label="Find a Class" value={ 0 } />
                <Tab label="Find a Professor" value={ 1 } />

            </Tabs> */}


            <div className='my-8'>
                <div className="sm:hidden">
                    <label htmlFor="tabs" className="sr-only">
                        Select a tab
                    </label>
                    {/* Use an "onChange" listener to redirect the user to the selected tab URL. */ }
                    <select
                        value={ value }
                        onChange={ (e) => {
                            setValue(e?.target?.value)
                        } }
                        id="tabs"
                        name="tabs"
                        className="block w-full bg-gray-100 p-2 rounded-md border-gray-300 focus:border-pink-500 focus:ring-pink-500"
                    >

                        <option key={ 1 } value={ 1 }>{ `Find a Class` }</option>
                        <option key={ 2 } value={ 2 }>{ `Find a Professor` }</option>
                    </select>
                </div>
                <div className="hidden sm:block">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                            <button
                                onClick={ () => setValue(1) }
                                className={ classNames(
                                    value === 1
                                        ? 'border-pink-400 text-pink-500'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                    'group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium'
                                ) }
                                aria-current={ value === 1 ? 'page' : undefined }
                            >
                                <BuildingLibraryIcon
                                    className={ classNames(
                                        value === 1 ? 'text-pink-400' : 'text-gray-400 group-hover:text-gray-500',
                                        '-ml-0.5 mr-2 h-5 w-5'
                                    ) }
                                    aria-hidden="true"
                                />
                                <span>{ 'Find a Class' }</span>
                            </button>
                            <button
                                onClick={ () => setValue(2) }
                                className={ classNames(
                                    value === 2
                                        ? 'border-pink-400 text-pink-400'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                    'group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium'
                                ) }
                                aria-current={ value === 2 ? 'page' : undefined }
                            >
                                <AcademicCapIcon
                                    className={ classNames(
                                        value === 2 ? 'text-pink-500' : 'text-gray-400 group-hover:text-gray-500',
                                        '-ml-0.5 mr-2 h-5 w-5'
                                    ) }
                                    aria-hidden="true"
                                />
                                <span>{ 'Find a Professor' }</span>
                            </button>
                        </nav>
                    </div>
                </div>
            </div>

            { value === 1 ? (
                <FindClass />

            ) : (
                <FindProf />
            ) }


            {/* <div className="mt-3 ">
                <div className=" ">
                    <div className='flex justify-between items-end'>
                        <h2 className="mb-3 text-3xl font-bold  text-pink-400 sm:text-5xl">Find a class <span className='sm:text-xl sm:inline block text-sm text-black'>  at { school?.name } </span> </h2>
                        <Link
                            href={ `/${school?.trunkName}/newcourse/` }
                        >
                            <button
                                type="button"
                                className=" mb-3 inline-flex items-center rounded-md bg-pink-400 px-3 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
                            >New Course
                            </button>
                        </Link>

                    </div>

                    <Combobox

                        onChange={ (value) => (router.push(`${pathname}/${value}`)) } >

                        <Combobox.Input
                            className="w-full rounded-md  bg-gray-100 px-4 py-2.5 text-gray-400 border-none focus:ring-0 sm:text-xl hover:drop-shadow-md transition-all"
                            placeholder="Search"
                            onChange={ (event) => handleQueryChange(event?.target?.value) }
                        />

                        { classes?.length > 0 && (
                            <Combobox.Options
                                static
                                className=" -mb-2 max-h-84 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800 text-left  border-pink-400"
                            >
                                <Combobox.Option
                                    disabled
                                    key={ 0 }
                                    value={ 0 }
                                    className={ ({ active }) =>
                                        classNames(
                                            'cursor-default select-none rounded-md px-2 py-2 font-bold text-xl grid grid-cols-3 gap-4 text-black ',
                                            active && 'bg-pink-400 text-white'
                                        )
                                    }
                                >
                                    <p>
                                        Class Name

                                    </p>
                                    <p>
                                        Subject Code

                                    </p>
                                    <p>
                                        Class Code

                                    </p>

                                </Combobox.Option>
                                { classes.map((item) => (


                                    <Combobox.Option
                                        key={ item?.uuid }
                                        value={ item?.uuid }
                                        className={ ({ active }) =>
                                            classNames(
                                                'cursor-default select-none font-base text-gray-600 md:text-base text-sm border-b-2 px-2 py-2 grid grid-cols-3 gap-4  ',
                                                active && 'bg-gray-100 text-black'
                                            )
                                        }
                                    >
                                        <p>
                                            { item?.name }

                                        </p>
                                        <p>
                                            { item?.descripCode }

                                        </p>
                                        <p>
                                            { item?.classCode }

                                        </p>


                                    </Combobox.Option>

                                )) }
                            </Combobox.Options>
                        ) }

                        { query && classes?.length === 0 && (
                            <div className="px-4 py-14 text-center sm:px-14 ">
                                <UsersIcon className="mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
                                <p className="mt-4 text-sm text-gray-900">No classes found?</p>
                                <Link
                                    className="mt-4 text-sm text-pink-400 hover:text-blue-400"
                                    href={ `/${school?.trunkName}/newcourse` }
                                >
                                    Click here to submit a new class!

                                </Link>
                            </div>
                        ) }
                    </Combobox>



                </div>
            </div> */}



        </>
    )
}