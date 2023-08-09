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
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { LinkIcon, PlusIcon, QuestionMarkCircleIcon } from '@heroicons/react/20/solid'
import { getClass } from "@/api/classes"
import { getSchool } from "@/api/schools"
import SchoolContext from '@/context/SchoolProvider'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useState, useContext, useEffect } from "react"

const team = [
    {
        name: 'Tom Cook',
        email: 'tom.cook@example.com',
        href: '#',
        imageUrl:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Whitney Francis',
        email: 'whitney.francis@example.com',
        href: '#',
        imageUrl:
            'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Leonard Krasner',
        email: 'leonard.krasner@example.com',
        href: '#',
        imageUrl:
            'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Floyd Miles',
        email: 'floyd.miles@example.com',
        href: '#',
        imageUrl:
            'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Emily Selman',
        email: 'emily.selman@example.com',
        href: '#',
        imageUrl:
            'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
]

export default function NewReviewSlide({ open, setOpen }) {
    const router = useRouter()
    const pathname = usePathname()
    const [classes, setClasses] = useState([]);
    const [courseRating, setCourseRating] = useState(5);
    const [profRating, setProfRating] = useState(5);
    const [newProf, setNewProf] = useState(false);
    const params = useParams();
    const courseParam = params?.class;
    const school = params?.school;
    let { setCourse, setSchool, course } = useContext(SchoolContext);

    // const getClassInfo = async () => {
    //     setCourse((await getClass(courseParam)))
    // }
    // const getSchoolInfo = async () => {
    //     setSchool((await getSchool(school)))
    // }


    // useEffect(() => {
    //     getClassInfo();
    //     getSchoolInfo();
    // }, [])


    return (
        <Transition.Root show={ open } as={ Fragment }>
            <Dialog as="div" className="relative z-10" onClose={ setOpen }>
                <div className="fixed inset-0" />

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                            <Transition.Child
                                as={ Fragment }
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                                    <form className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="flex-1">
                                            {/* Header */ }
                                            <div className="bg-gray-50 px-4 py-6 sm:px-6">
                                                <div className="flex items-start justify-between space-x-3">
                                                    <div className="space-y-1">
                                                        <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                                                            New Review for <span className='text-pink-400'>{ course.name }</span>
                                                        </Dialog.Title>
                                                        <p className="text-sm text-gray-500">
                                                            Get started by filling in the information below to publish your latest review!
                                                        </p>
                                                    </div>
                                                    <div className="flex h-7 items-center">
                                                        <button
                                                            type="button"
                                                            className="relative text-gray-400 hover:text-gray-500"
                                                            onClick={ () => setOpen(false) }
                                                        >
                                                            <span className="absolute -inset-2.5" />
                                                            <span className="sr-only">Close panel</span>
                                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Divider container */ }
                                            <div className="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
                                                {/* Project name */ }
                                                <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">

                                                    <div className='col-span-2'>
                                                        <div className='col-span-2'>
                                                            <label htmlFor="term" className="block text-sm font-medium leading-6 text-gray-900">
                                                                Term
                                                            </label>
                                                            <div className='flex gap-1'>
                                                                <select
                                                                    defaultValue={ "Select a term" }
                                                                    id="term"
                                                                    name="term"
                                                                    className="mt-2 inline w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                >
                                                                    <option disabled>Select a term</option>
                                                                    <option>Fall</option>
                                                                    <option>Spring</option>
                                                                    <option>Summer</option>
                                                                    <option>Tri 1</option>
                                                                    <option>Tri 2</option>
                                                                    <option>Tri 3</option>
                                                                    <option>Q 1</option>
                                                                    <option>Q 2</option>
                                                                    <option>Q 3</option>
                                                                    <option>Q 4</option>
                                                                </select>
                                                                <select
                                                                    defaultValue={ "Select a year" }
                                                                    id="year"
                                                                    name="year"
                                                                    className="mt-2 inline w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                >
                                                                    <option disabled>Select a year</option>

                                                                    <option>2030</option>
                                                                    <option>2029</option>
                                                                    <option>2028</option>
                                                                    <option>2027</option>
                                                                    <option>2026</option>
                                                                    <option>2025</option>
                                                                    <option>2024</option>
                                                                    <option>2023</option>
                                                                    <option>2022</option>
                                                                    <option>2021</option>
                                                                    <option>2020</option>
                                                                    <option>2019</option>
                                                                    <option>2018</option>
                                                                    <option>2017</option>
                                                                    <option>2016</option>
                                                                    <option>2015</option>
                                                                    <option>2014</option>
                                                                    <option>2013</option>
                                                                    <option>2012</option>
                                                                    <option>2011</option>
                                                                    <option>2010</option>
                                                                </select>

                                                            </div>

                                                        </div>


                                                    </div>

                                                    <div className='col-span-1'>
                                                        <label htmlFor="prof" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Professor
                                                        </label>
                                                        <select
                                                            onChange={ (event) => {
                                                                if (event?.target?.value === "Other") setNewProf(true);
                                                                else setNewProf(false);
                                                            } }
                                                            id="prof"
                                                            name="prof"
                                                            className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            defaultValue="Select a professor"
                                                        >
                                                            <option disabled>Select a professor</option>
                                                            <option>Other</option>
                                                        </select>
                                                    </div>



                                                    <div className='col-span-3'>
                                                        { newProf &&
                                                            <>
                                                                <label
                                                                    htmlFor="project-name"
                                                                    className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                                                                >
                                                                    New Professor Name
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="project-name"
                                                                    id="project-name"
                                                                    className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                />
                                                            </>
                                                        }
                                                    </div>





                                                </div>



                                                <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                    <div>
                                                        <label
                                                            htmlFor="courseRating"
                                                            className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                                                        >
                                                            Course Rating
                                                        </label>
                                                    </div>
                                                    <div className="sm:col-span-1">
                                                        <input
                                                            onChange={ (event) => setCourseRating(event?.target?.value) }
                                                            type="range"
                                                            name="courseRating"
                                                            id="courseRating"
                                                            min="0" max="10" step="0.5"
                                                            className="block w-full rounded-md  py-1.5 text-gray-900 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                                        />

                                                    </div>
                                                    <div className="sm:col-span-1">
                                                        <span className='text-pink-400'>{ courseRating }</span>  / 10

                                                    </div>
                                                    <div>
                                                        <label
                                                            htmlFor="profRating"
                                                            className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                                                        >
                                                            Professor Rating (based upon this course)
                                                        </label>
                                                    </div>
                                                    <div className="sm:col-span-1">
                                                        <input
                                                            onChange={ (event) => setProfRating(event?.target?.value) }
                                                            type="range"
                                                            name="profRating"
                                                            id="profRating"
                                                            min="0" max="10" step="0.5"
                                                            className="block w-full rounded-md  py-1.5 text-gray-900 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                                        />

                                                    </div>
                                                    <div className="sm:col-span-1">
                                                        <span className='text-pink-400'>{ profRating }</span>  / 10

                                                    </div>

                                                </div>

                                                {/* Project description */ }
                                                <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                    <div>
                                                        <label
                                                            htmlFor="project-description"
                                                            className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                                                        >
                                                            Review Title <span className='font-medium text-gray-500'>(optional)</span>
                                                        </label>
                                                    </div>
                                                    <div className="sm:col-span-2">
                                                        <input
                                                            type="text"
                                                            name="project-name"
                                                            id="project-name"
                                                            className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label
                                                            htmlFor="project-description"
                                                            className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                                                        >
                                                            Description
                                                        </label>
                                                    </div>
                                                    <div className="sm:col-span-2">
                                                        <textarea
                                                            id="project-description"
                                                            name="project-description"
                                                            rows={ 3 }
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            defaultValue={ '' }
                                                        />
                                                    </div>
                                                </div>



                                                {/* Privacy */ }
                                                <fieldset className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                    <legend className="sr-only">Privacy</legend>
                                                    <div className="text-sm font-medium leading-6 text-gray-900" aria-hidden="true">
                                                        Privacy
                                                    </div>
                                                    <div className="space-y-5 sm:col-span-2">
                                                        <div className="space-y-5 sm:mt-0">
                                                            <div className="relative flex items-start">
                                                                <div className="absolute flex h-6 items-center">
                                                                    <input
                                                                        id="public-access"
                                                                        name="privacy"
                                                                        aria-describedby="public-access-description"
                                                                        type="radio"
                                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                                        defaultChecked
                                                                    />
                                                                </div>
                                                                <div className="pl-7 text-sm leading-6">
                                                                    <label htmlFor="public-access" className="font-medium text-gray-900">
                                                                        Public
                                                                    </label>
                                                                    <p id="public-access-description" className="text-gray-500">
                                                                        Everyone who visits this page will see your profile associated with this review.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="relative flex items-start">
                                                                <div className="absolute flex h-6 items-center">
                                                                    <input
                                                                        id="restricted-access"
                                                                        name="privacy"
                                                                        aria-describedby="restricted-access-description"
                                                                        type="radio"
                                                                        className="h-4 w-4 border-gray-300 text-pink-600 focus:ring-pink-600"
                                                                    />
                                                                </div>
                                                                <div className="pl-7 text-sm leading-6">
                                                                    <label htmlFor="restricted-access" className="font-medium text-gray-900">
                                                                        Private
                                                                    </label>
                                                                    <p id="restricted-access-description" className="text-gray-500">
                                                                        No personal information accompanies this review when published.
                                                                    </p>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <hr className="border-gray-200" />
                                                        <div className="flex flex-col items-start space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                                                            <div>
                                                                <a
                                                                    href="#"
                                                                    className="group flex items-center space-x-2.5 text-sm font-medium text-indigo-600 hover:text-indigo-900"
                                                                >
                                                                    <LinkIcon
                                                                        className="h-5 w-5 text-pink-400 group-hover:text-indigo-900"
                                                                        aria-hidden="true"
                                                                    />
                                                                    <span className='text-pink-400'>Copy link to review</span>
                                                                </a>
                                                            </div>
                                                            <div>
                                                                <a
                                                                    href="#"
                                                                    className="group flex items-center space-x-2.5 text-sm text-gray-500 hover:text-gray-900"
                                                                >

                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </fieldset>
                                            </div>
                                        </div>

                                        {/* Action buttons */ }
                                        <div className="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
                                            <div className="flex justify-end space-x-3">
                                                <button
                                                    type="button"
                                                    className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                    onClick={ () => setOpen(false) }
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="inline-flex justify-center rounded-md bg-pink-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                >
                                                    Publish
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root >
    )
}