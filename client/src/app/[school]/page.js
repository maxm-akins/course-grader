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
import { getSchool } from '@/api/schools'
import SchoolContext from '@/context/SchoolProvider'
import { searchClasses } from '@/api/classes'
import { useRouter } from 'next/navigation'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const people = [
    { id: 1, name: 'Computer Assembly and Organization', classCode: "0447", schoolCode: "CS", prof: "Jarret Billingsly", url: "1234567" },
    // More people...
]



export default function School() {
    const router = useRouter()
    const pathname = usePathname()
    const [query, setQuery] = useState('');
    const [classes, setClasses] = useState([]);
    const [schoolInfo, setSchoolInfo] = useState({})
    const params = useParams();
    const schoolParam = params?.school;
    let { school, setSchool } = useContext(SchoolContext);



    const handleQueryChange = async (q) => {
        await setQuery(q);
        setClasses((await searchClasses(school.uuid, q)));
    }

    useEffect(() => {

    }, [classes])


    const getSchoolInfo = async () => {
        setSchool((await getSchool(schoolParam)))
    }

    useEffect(() => {
        getSchoolInfo();
    }, [])




    return (
        <>
            <SchoolHeader school={ schoolInfo } />

            <div className="mt-9">
                <div className=" ">
                    <h2 className="mb-3 text-2xl font-medium tracking-tight text-pink-400 sm:text-base">Search by class name, codes, or professor</h2>

                    <Combobox onChange={ (value) => (router.push(`${pathname}/${value}`)) } >

                        <Combobox.Input
                            className="w-full rounded-md  bg-gray-100 px-4 py-2.5 text-gray-400 border-none focus:ring-0 sm:text-xl hover:drop-shadow-md transition-all"
                            placeholder="Search for a class..."
                            onChange={ (event) => handleQueryChange(event?.target?.value) }
                        />

                        { classes?.length > 0 && (
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
                                            'cursor-default select-none rounded-md px-2 py-2 font-medium grid grid-cols-3 gap-4 text-pink-400 ',
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
                                                'cursor-default select-none rounded-md px-2 py-2 grid grid-cols-3 gap-4  ',
                                                active && 'bg-pink-400 text-white'
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