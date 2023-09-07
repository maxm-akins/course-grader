
'use client'

import { PhotoIcon, UserCircleIcon, InformationCircleIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { postClass } from '@/apis/classes'
import { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import SchoolContext from '@/context/SchoolProvider'
import { useParams } from 'next/navigation'
import { getSchool } from '@/apis/schools'

import ResponseContext from '@/context/ResponseContext'






export default function NewCourse() {
    const router = useRouter();
    const params = useParams();

    const { err, setErr, showError, setShowError, success, setSuccess, showSuccess, setShowSuccess, success2, setSuccess2 } = useContext(ResponseContext);

    let { school, setSchool } = useContext(SchoolContext);
    const schoolParam = params?.school;


    const getSchoolInfo = async () => {
        const data = await getSchool(schoolParam);
        if (!data) return notFound();
        else setSchool((data))

    }

    useEffect(() => {
        getSchoolInfo();
    }, [])


    const handleNewSchoolSubmit = async () => {
        const schoolRef = school?.uuid;
        const courseName = document.getElementById("courseName")?.value;
        const subjectCode = document.getElementById("subjectCode")?.value;
        const classCode = document.getElementById("classCode")?.value;


        const data = {
            schoolRef: schoolRef,
            courseName: courseName,
            subjectCode: subjectCode,
            classCode: classCode,
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
            data.trunkName = courseName.replace(/\s+/g, '').toLowerCase();
            const res = await postClass(data);
            if (res.status === 200) {
                setShowSuccess(true)
                setSuccess(res?.data?.message);
                setSuccess2("You will be redirected shortly.");
                document.getElementById("courseName").value = "";
                document.getElementById("subjectCode").value = "";
                document.getElementById("classCode").value = "";
                setTimeout(() => {
                    router.push(`/${school?.trunkName}/${res?.data?.uuid}`)
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


            <div>
                <div className="space-y-12">
                    <div className="grid gap-y-5 border-b border-gray-900/10 pb-12 grid-cols-3">




                        <div className='col-span-3'>
                            <h2 className="text-3xl mb-5 font-black leading-7 text-gray-900">Add a course</h2>

                            <div className="rounded-md bg-blue-50 p-4">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
                                    </div>
                                    <div className="ml-3 flex-1 md:flex md:justify-between">
                                        <p className="text-sm text-blue-700">Please search first to ensure that this course does not already exist.</p>
                                        <p className="mt-3 text-sm md:ml-6 md:mt-0">
                                            <Link href={ `/${school?.trunkName}` } className="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600">
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
                                Please fill out each field with accurate information. Reference your school's documention
                                for exact names and codes.
                            </p>
                        </div>




                        <div className="grid max-w-2xl gap-x-6 gap-y-8 grid-cols-1 md:col-span-1 col-span-3">
                            <div className="col-span-1">
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                    School Name
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 lg:max-w-lg">
                                        <input
                                            disabled
                                            required
                                            type="text"
                                            name="name"
                                            id="name"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 lg:max-w-lg"
                                            value={ `${school?.name || "Loading..."} ` }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1">
                                <label htmlFor="courseName" className="block text-sm font-medium leading-6 text-gray-900">
                                    Course Name
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 lg:max-w-lg">
                                        <input
                                            required
                                            type="text"
                                            name="courseName"
                                            id="courseName"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 lg:max-w-lg"
                                            placeholder="Course name"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1">
                                <label htmlFor="subjectCode" className="block text-sm font-medium leading-6 text-gray-900">
                                    Subject Code
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 lg:max-w-lg">
                                        <input
                                            required
                                            type="text"
                                            name="subjectCode"
                                            id="subjectCode"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 lg:max-w-lg"
                                            placeholder='(Ex: "BIOSC")'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1">
                                <label htmlFor="classCode" className="block text-sm font-medium leading-6 text-gray-900">
                                    Class Code
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 lg:max-w-lg">
                                        <input
                                            required
                                            type="text"
                                            name="classCode"
                                            id="classCode"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 lg:max-w-lg"
                                            placeholder='(Ex: "0150")'
                                        />
                                    </div>
                                </div>
                            </div>






                        </div>




                        <div className="mt-6 col-span-3 flex items-center justify-end gap-x-6">
                            <Link
                                href={ `/${school?.trunkName}` }
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