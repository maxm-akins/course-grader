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
import { validateConfig } from 'next/dist/server/config-shared'
import { InformationCircleIcon } from '@heroicons/react/20/solid'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function SmallClassSearch({ selectedCourse, setSelectedCourse }) {
    const router = useRouter()
    const pathname = usePathname()
    const [query, setQuery] = useState('');
    const [classes, setClasses] = useState([]);
    const params = useParams();
    let { school, setSchool, prof } = useContext(SchoolContext);



    const getClassInfo = async (q) => {
        setClasses((await searchClasses(school?.uuid, q)));
    }

    useEffect(() => {
        getClassInfo();
    }, [])




    return (
        <>


            <div className='col-span-1'>
                <label htmlFor="prof" className="block text-sm font-medium leading-6 text-gray-900">
                    Classes
                </label>
                <select
                    onChange={ (event) => {
                        setSelectedCourse(event?.target?.value)
                    } }

                    id="prof"
                    name="prof"
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue=""
                >
                    <option value={ "" } disabled>Select a course</option>
                    { classes?.map((course) => <option key={ course?.uuid } value={ course?.uuid }> { course?.descripCode + " " + course?.classCode }</option>) }
                </select>
            </div>
            <div className="rounded-md bg-blue-50 p-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3 flex-1 md:flex md:justify-between">
                        <p className="text-sm text-blue-700">If you cannot find the class you are looking for please add it here.</p>
                        <p className="mt-3 text-sm md:ml-6 md:mt-0">
                            <Link href={ `/${school?.trunkName}/newcourse` } className="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600">
                                Add Class
                                <span aria-hidden="true"> &rarr;</span>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>


        </>
    )
}