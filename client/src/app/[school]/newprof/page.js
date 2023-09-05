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
import { Combobox } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import { LinkIcon, CheckIcon, ChevronUpDownIcon, InformationCircleIcon } from '@heroicons/react/20/solid'
import { getClass } from "@/apis/classes"
import { getSchool } from "@/apis/schools"
import SchoolContext from '@/context/SchoolProvider'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useState, useContext, useEffect } from "react"
import { postReview } from '@/apis/reviews'
import Link from 'next/link'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}



export default function AddNewProf({ firstName, middleName, lastName, department, setFirstName, setMiddleName, setLastName, setDepartment }) {


    let { course, school } = useContext(SchoolContext);

    const [courseRating, setCourseRating] = useState(5);
    const [profRating, setProfRating] = useState(5);
    const [difficultyRating, setDifficultyRating] = useState(5);
    const [newProfShow, setNewProfShow] = useState(false);
    const [profQuery, setProfQuery] = useState(false);
    const [term, setTerm] = useState("");
    const [year, setYear] = useState("");
    const [prof, setProf] = useState("");
    const [newProf, setNewProf] = useState("");
    const [addProf, setAddProf] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [privacy, setPrivacy] = useState(false);
    const [privateChecked, setPrivateChecked] = useState(false);
    const [publicChecked, setPublicChecked] = useState(true);





    return (
        <>

            <div className="grid gap-y-2 border-b border-gray-900/10 pb-6 grid-cols-3 mt-10">




                <div className='col-span-3'>
                    <h2 className="text-3xl mb-5 font-black leading-7 text-gray-900">Add a professor</h2>

                    <div className="rounded-md bg-blue-50 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
                            </div>
                            <div className="ml-3 flex-1 md:flex md:justify-between">
                                <p className="text-xs text-blue-700">Please search above first to ensure that this professor does not already exist in this school.</p>
                                <p className="text-xs text-blue-700"> If you are adding a new department please make sure it does not already exist.</p>
                                <p className="mt-3 text-sm md:ml-6 md:mt-0">

                                </p>
                            </div>
                        </div>
                    </div>
                </div>






                <div className="grid max-w-2xl gap-x-6 gap-y-4 grid-cols-3  col-span-3">
                    <div className="col-span-1">
                        <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                            First Name
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 lg:max-w-lg">
                                <input
                                    onChange={ (event) => {
                                        setFirstName(event?.target?.value)
                                    } }
                                    required
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 lg:max-w-lg"
                                    placeholder="First name"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <label htmlFor="middleName" className="block text-sm font-medium leading-6 text-gray-900">
                            Middle Name
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 lg:max-w-lg">
                                <input
                                    onChange={ (event) => {
                                        setMiddleName(event?.target?.value)
                                    } }
                                    required
                                    type="text"
                                    name="middleName"
                                    id="middleName"
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 lg:max-w-lg"
                                    placeholder="Middle name"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                            Last Name
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 lg:max-w-lg">
                                <input
                                    onChange={ (event) => {
                                        setLastName(event?.target?.value)
                                    } }
                                    required
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 lg:max-w-lg"
                                    placeholder="Last name"
                                />
                            </div>
                        </div>
                    </div>



                    <div className="col-span-3">


                        <div className="mt-2">
                            <Combobox as="div"
                                onChange={ (event) => {
                                    console.log(event);
                                    setDepartment(event);
                                } }
                            >
                                <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">Department</Combobox.Label>
                                <div className="relative mt-2">
                                    <Combobox.Input
                                        className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={ (event) => {
                                            setProfQuery(event?.target?.value);
                                            setDepartment(event?.target?.value);
                                        } }
                                    // displayValue={ (person) => person?.name }
                                    />
                                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </Combobox.Button>



                                    <Combobox.Options
                                        open={ profQuery.length > 0 }
                                        className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                    >


                                        <Combobox.Option
                                            value={ profQuery }
                                            className={ ({ active }) =>
                                                classNames(
                                                    'relative cursor-default select-none py-2 pl-3 pr-9 text-gray-400 font-bold',
                                                    active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                                )
                                            }
                                        >
                                            { profQuery?.length === 0 ? `Type to add new department` : ` Add "${profQuery}"` }
                                        </Combobox.Option>


                                        { school?.departments?.map((department) => {

                                            return (


                                                <Combobox.Option
                                                    key={ department }
                                                    value={ department }
                                                    className={ ({ active }) =>
                                                        classNames(
                                                            'relative cursor-default select-none py-2 pl-3 pr-9',
                                                            active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                                        )
                                                    }
                                                >
                                                    { ({ active, selected }) => (
                                                        <>
                                                            <span className={ classNames('block truncate', selected && 'font-semibold') }>{ department }</span>

                                                            { selected && (
                                                                <span
                                                                    className={ classNames(
                                                                        'absolute inset-y-0 right-0 flex items-center pr-4',
                                                                        active ? 'text-white' : 'text-indigo-600'
                                                                    ) }
                                                                >
                                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                </span>
                                                            ) }
                                                        </>
                                                    ) }
                                                </Combobox.Option>


                                            )


                                        }) }




                                    </Combobox.Options>

                                </div>
                            </Combobox>
                        </div>
                    </div>



                </div>




                {/* <div className="mt-6 col-span-3 flex items-center justify-end gap-x-6">
                    <Link
                        href={ "/" }
                    >
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                            Cancel
                        </button>
                    </Link>

                    <button
                        className="rounded-md bg-pink-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>
                </div> */}
            </div>
        </>
    )
}