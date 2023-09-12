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
import { searchProfs } from '@/apis/profs'
import { useRouter } from 'next/navigation'
import { redirect } from 'next/navigation'
import { BuildingOfficeIcon, AcademicCapIcon, BuildingLibraryIcon } from '@heroicons/react/20/solid'
import New2ProfReviewSlide from './New2ProfReviewSlide'

const tabs = [
    { name: 'Find a class', href: '#', icon: BuildingLibraryIcon, current: false },
    { name: 'Find a professor', href: '#', icon: AcademicCapIcon, current: false },

]

function classNames(...profs) {
    return profs.filter(Boolean).join(' ')
}


export default function FindProf() {
    const router = useRouter()
    const pathname = usePathname()
    const [query, setQuery] = useState('');
    const [profs, setProfs] = useState([]);
    const [schoolInfo, setSchoolInfo] = useState({})
    const params = useParams();
    const schoolParam = params?.school;
    let { school, setSchool } = useContext(SchoolContext);
    const [open, setOpen] = useState(false);


    const handleQueryChange = async (q) => {
        await setQuery(q);
        setProfs((await searchProfs(school.uuid, q)));
    }

    useEffect(() => {

    }, [profs])


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

            <New2ProfReviewSlide open={ open } setOpen={ setOpen } />


            <div className="mt-3 ">
                <div className=" ">
                    <div className='flex justify-between items-end'>
                        <h2 className="mb-3 text-3xl font-bold  text-pink-400 sm:text-5xl">Find a Professor <span className='sm:text-xl sm:inline block text-sm text-black'>  at { school?.name } </span> </h2>

                        <button
                            onClick={ () => setOpen(true) }
                            type="button"
                            className=" mb-3 inline-flex items-center rounded-md bg-pink-400 px-3 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >New Professor
                        </button>

                    </div>

                    <Combobox

                        onChange={ (value) => (router.push(`${pathname}/prof/${value?.uuid}`)) } >

                        <Combobox.Input
                            className="w-full rounded-md  bg-gray-100 px-4 py-2.5 text-gray-400 border-none focus:ring-0 sm:text-xl hover:drop-shadow-md transition-all"
                            placeholder="Search"
                            onChange={ (event) => handleQueryChange(event?.target?.value) }
                            displayValue={ (value) => value?.fullName }
                        />


                        { profs?.length > 0 && (
                            <Combobox.Options
                                static
                                className=" -mb-2 max-h-96 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800 text-left  border-pink-400"
                            >
                                { profs.map((item) => (

                                    <Combobox.Option
                                        key={ item?.uuid }
                                        value={ item }
                                        className={ ({ active }) =>
                                            classNames(
                                                'cursor-default select-none font-base text-gray-600 md:text-base text-sm border-b-2 px-2 py-2 grid grid-cols-2 gap-4 ',
                                                active && 'bg-gray-100 text-black'
                                            )
                                        }
                                    >
                                        <p className='text-left'>
                                            { item?.fullName }

                                        </p>
                                        <p className='text-right text-sm text-black'>
                                            { item?.department }

                                        </p>

                                    </Combobox.Option>
                                )) }
                            </Combobox.Options>
                        ) }

                        { query && profs?.length === 0 && (
                            <div className="px-4 py-14 text-center sm:px-14 ">
                                <UsersIcon className="mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
                                <p className="mt-4 text-sm text-gray-900">No profs found?</p>
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
            </div>



        </>
    )
}