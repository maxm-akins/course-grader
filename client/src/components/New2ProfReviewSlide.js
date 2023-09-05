

"use client"
import { Fragment } from 'react'
import { Dialog, Transition, Switch } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import SchoolContext from '@/context/SchoolProvider'
import { useState, useContext, useEffect } from "react"
import ProfSearch from './ProfSearch'
import { postProfPlusReview } from '@/apis/reviews'
import AddNewProf from './AddNewProf'
import ErrorNotif from './ErrorNotif'
import SuccessNotif from './SuccessNotif'
import { useRouter } from 'next/navigation'
import ResponseContext from '@/context/ResponseContext'
import ClassSearch from './ClassSearch'
import SmallClassSearch from './SmallClassSearch'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}



export default function New2ProfReviewSlide({ open, setOpen }) {
    const router = useRouter();
    let { prof, school } = useContext(SchoolContext);
    const [overallRating, setOverallRating] = useState(5);
    const [difficultyRating, setDifficultyRating] = useState(5);
    const [newProfShow, setNewProfShow] = useState(false);
    const [term, setTerm] = useState("");
    const [year, setYear] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("");
    // const [prof, setProf] = useState("");
    const [newProf, setNewProf] = useState("");
    const [addProf, setAddProf] = useState(false);
    const [description, setDescription] = useState("");
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [department, setDepartment] = useState("");

    const { err, setErr, showError, setShowError, success, setSuccess, showSuccess, setShowSuccess, success2, setSuccess2 } = useContext(ResponseContext);




    const handleSubmitReview = async () => {
        const data = {
            term: term,
            year: year,
            overallRating: overallRating,
            difficultyRating: difficultyRating,
            description: description,
            schoolRef: school?.uuid,
            courseRef: selectedCourse?.uuid,
            department: department,
            firstName: firstName,
            lastName: lastName,
            middleName: middleName,
        }

        console.log(data);

        const keys = Object.keys(data);
        let missing = false;
        keys.forEach((key) => {
            if (key === "middleName") return;
            if (!data[key]) {
                console.log("key missing")
                setErr(`All fields are required`)
                setShowError(true);
                missing = true;
                return true;
            }
            return true;
        })

        if (missing) {
            setTimeout(() => {
                setShowError(false)
            }
                , 3000);
            return;
        }
        else {

            const res = await postProfPlusReview(data);
            console.log(res);
            console.log(res.response);

            if (res?.status === 200) {
                setShowSuccess(true)
                setSuccess(res?.data?.message);
                setOpen(false);

                setTimeout(() => {
                    setShowSuccess(false);
                }
                    , 3000);

            }
            else {
                setShowError(true);
                setErr(res?.response?.data?.message)
                setTimeout(() => {
                    setShowError(false)
                }
                    , 3000);
                return;
            }
        }


    }



    return (
        <>
            <Transition.Root show={ open } as={ Fragment }>

                <Dialog as="div" className="relative z-10" onClose={ setOpen }>
                    <Transition.Child
                        as={ Fragment }
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>
                    <div className="fixed inset-0" />


                    <div className="fixed inset-0 overflow-hidden">
                        <ErrorNotif show={ showError } setShow={ setShowError } err={ err } />


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
                                                <div className="bg-gray-50 px-4 py-3 sm:px-6">
                                                    <div className="flex items-start justify-between space-x-3">
                                                        <div className="space-y-1">
                                                            <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                                                                <span className='text-4xl font-black block'> Add Professor </span> at <span className='text-pink-400'>{ school?.name }</span>
                                                            </Dialog.Title>
                                                            {/* <p className="text-sm text-gray-500">
                                                                Get started by filling in the information below to publish your latest review!
                                                            </p> */}
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









                                                <div className=" px-4  sm:px-6">
                                                    {/* <h2 className="text-2xl mb-5 font-bold leading-7 text-gray-900">New professor information</h2> */ }
                                                    <AddNewProf firstName={ firstName } middleName={ middleName } lastName={ lastName } department={ department } setFirstName={ setFirstName } setMiddleName={ setMiddleName } setLastName={ setLastName } setDepartment={ setDepartment } />
                                                </div>








                                                {/* Divider container */ }
                                                <div className="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">


                                                    <div className="space-y-2 px-4 sm:grid  sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                        <SmallClassSearch selectedCourse={ selectedCourse } setSelectedCourse={ setSelectedCourse } />
                                                    </div>


                                                    <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                        <h2 className="text-2xl  font-bold leading-7 text-gray-900 col-span-3">Review</h2>
                                                        {/* Warning */ }
                                                        <div className=" col-span-3 border-l-4 border-yellow-400 bg-yellow-50 p-4 ">
                                                            <div className="flex">
                                                                <div className="flex-shrink-0">
                                                                    <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                                                                </div>
                                                                <div className="ml-3">
                                                                    <div className="text-xs text-yellow-700">
                                                                        Please do not expose any sensitve class material and refrain from using explict language. { " " }
                                                                        <div className="font-medium text-sm text-yellow-700 underline ">
                                                                            Any reviews which violate our policy will be removed.
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label
                                                                htmlFor="courseRating"
                                                                className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                                                            >
                                                                Overall Rating
                                                            </label>
                                                        </div>
                                                        <div className="sm:col-span-1">
                                                            <input
                                                                onChange={ (event) => setOverallRating(event?.target?.value) }
                                                                type="range"
                                                                name="courseRating"
                                                                id="courseRating"
                                                                min="0" max="10" step="0.5"
                                                                className="block w-full rounded-md  py-1.5 text-gray-900 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                                            />

                                                        </div>
                                                        <div className="sm:col-span-1">
                                                            <span className='text-pink-400'>{ overallRating }</span>  / 10

                                                        </div>
                                                        <div>
                                                            <label
                                                                htmlFor="courseRating"
                                                                className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                                                            >
                                                                Difficulty Rating
                                                            </label>
                                                        </div>
                                                        <div className="sm:col-span-1">
                                                            <input
                                                                onChange={ (event) => setDifficultyRating(event?.target?.value) }
                                                                type="range"
                                                                name="courseRating"
                                                                id="courseRating"
                                                                min="0" max="10" step="0.5"
                                                                className="block w-full rounded-md  py-1.5 text-gray-900 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                                            />

                                                        </div>
                                                        <div className="sm:col-span-1">
                                                            <span className='text-pink-400'>{ difficultyRating }</span>  / 10

                                                        </div>



                                                    </div>

                                                    {/* Project description */ }
                                                    <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">


                                                        <div>
                                                            <label
                                                                htmlFor="project-description"
                                                                className="block text-sm font-normal leading-6 text-gray-900 sm:mt-1.5"
                                                            >
                                                                <span className='font-medium'> Description </span>
                                                                <div className="text-xs text-gray-500">
                                                                    Tell us about your experience with this  professor, class, etc!
                                                                    Other students will benefit greatly from your helpful insight.
                                                                </div>
                                                            </label>
                                                        </div>

                                                        <div className="sm:col-span-2">
                                                            <textarea
                                                                onChange={ (event) => setDescription(event?.target?.value) }
                                                                id="project-description"
                                                                name="project-description"
                                                                rows={ 6 }
                                                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                defaultValue={ '' }
                                                            />
                                                        </div>

                                                        <div className='col-span-3 flex gap-1'>
                                                            <select
                                                                required
                                                                onChange={ (event) => setTerm(event?.target?.value) }
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
                                                                onChange={ (event) => setYear(event?.target?.value) }
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
                                                        onClick={ handleSubmitReview }
                                                        type="button"
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
        </>

    )
}