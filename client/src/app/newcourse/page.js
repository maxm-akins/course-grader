
'use client'

import { PhotoIcon, UserCircleIcon, InformationCircleIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { postSchool } from '@/api/schools'
import { useState } from 'react'
import { useRouter } from 'next/navigation'


import ErrorNotif from '@/components/ErrorNotif'
import SuccessNotif from '@/components/SuccessNotif'






export default function NewCourse() {
    const router = useRouter();
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [success, setSuccess] = useState(false);
    const [success2, setSuccess2] = useState(false);
    const [err, setErr] = useState(false);



    const handleNewSchoolSubmit = async () => {
        const name = document.getElementById("name")?.value;
        const state = document.getElementById("state")?.value;
        const city = document.getElementById("city")?.value;
        const website = document.getElementById("website")?.value;


        const data = {
            name: name,
            state: state,
            city: city,
            website: website,
        }

        const keys = Object.keys(data);

        let missing = false;
        keys.forEach((key) => {
            if (data[key] === "") {
                setErr(`"${key}" field is required`)
                setShowError(true);
                missing = true;
                return true;
            }
            return true;
        })

        console.log(missing)

        if (missing) {
            setTimeout(() => {
                setShowError(false)
            }
                , 3000);
            return;
        }
        else {
            const res = await postSchool(data);
            if (res.status === 200) {
                setShowSuccess(true)
                setSuccess(res?.data?.message);
                setSuccess2("You will be redirected shortly.");
                document.getElementById("name").value = "";
                document.getElementById("state").value = "";
                document.getElementById("city").value = "";
                document.getElementById("website").value = "";
                setTimeout(() => {
                    router.push(`/${name.replace(/\s+/g, '').toLowerCase()}`)
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

            <ErrorNotif show={ showError } setShow={ setShowError } err={ err } />
            <SuccessNotif show={ showSuccess } setShow={ setShowSuccess } success={ success } success2={ success2 } />
            <div>
                <div className="space-y-12">
                    <div className="grid grid-cols-1  gap-y-5 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                        <div className='col-span-3'>
                            <h2 className="text-3xl mb-5 font-black leading-7 text-gray-900">Add a course</h2>

                            <div className="rounded-md bg-blue-50 p-4">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
                                    </div>
                                    <div className="ml-3 flex-1 md:flex md:justify-between">
                                        <p className="text-sm text-blue-700">Please search first to ensure that this school does not already exist.</p>
                                        <p className="mt-3 text-sm md:ml-6 md:mt-0">
                                            <Link href="/" className="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600">
                                                Search
                                                <span aria-hidden="true"> &rarr;</span>
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='sm:col-span-1 col-span-3'>
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Details</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                            </p>
                        </div>

                        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2 ">
                            <div className="sm:col-span-4">
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Name of School
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            required
                                            type="text"
                                            name="name"
                                            id="name"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="School name"
                                        />
                                    </div>
                                </div>
                            </div>




                            <div className="sm:col-span-4">
                                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                    City
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            required
                                            type="text"
                                            name="city"
                                            id="city"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="City"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900">
                                    School Website
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            required
                                            type="website"
                                            name="website"
                                            id="website"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="Website"
                                        />
                                    </div>
                                </div>
                            </div>





                        </div>
                        <div className="mt-6 col-span-3 flex items-center justify-end gap-x-6">
                            <Link
                                href={ "/" }
                            >
                                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                    Cancel
                                </button>
                            </Link>

                            <button
                                onClick={ handleNewSchoolSubmit }
                                className="rounded-md bg-pink-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Submit
                            </button>
                        </div>
                    </div>



                </div>


            </div>
        </>

    )
}