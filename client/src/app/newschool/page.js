
'use client'

import { PhotoIcon, UserCircleIcon, InformationCircleIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { postSchool } from '@/apis/schools'
import { useState } from 'react'
import { useRouter } from 'next/navigation'


import ErrorNotif from '@/components/ErrorNotif'
import SuccessNotif from '@/components/SuccessNotif'
const states = [

    {
        "name": "Alabama",
        "abbreviation": "AL"
    },
    {
        "name": "Alaska",
        "abbreviation": "AK"
    },
    {
        "name": "American Samoa",
        "abbreviation": "AS"
    },
    {
        "name": "Arizona",
        "abbreviation": "AZ"
    },
    {
        "name": "Arkansas",
        "abbreviation": "AR"
    },
    {
        "name": "California",
        "abbreviation": "CA"
    },
    {
        "name": "Colorado",
        "abbreviation": "CO"
    },
    {
        "name": "Connecticut",
        "abbreviation": "CT"
    },
    {
        "name": "Delaware",
        "abbreviation": "DE"
    },
    {
        "name": "District Of Columbia",
        "abbreviation": "DC"
    },
    {
        "name": "Federated States Of Micronesia",
        "abbreviation": "FM"
    },
    {
        "name": "Florida",
        "abbreviation": "FL"
    },
    {
        "name": "Georgia",
        "abbreviation": "GA"
    },
    {
        "name": "Guam",
        "abbreviation": "GU"
    },
    {
        "name": "Hawaii",
        "abbreviation": "HI"
    },
    {
        "name": "Idaho",
        "abbreviation": "ID"
    },
    {
        "name": "Illinois",
        "abbreviation": "IL"
    },
    {
        "name": "Indiana",
        "abbreviation": "IN"
    },
    {
        "name": "Iowa",
        "abbreviation": "IA"
    },
    {
        "name": "Kansas",
        "abbreviation": "KS"
    },
    {
        "name": "Kentucky",
        "abbreviation": "KY"
    },
    {
        "name": "Louisiana",
        "abbreviation": "LA"
    },
    {
        "name": "Maine",
        "abbreviation": "ME"
    },
    {
        "name": "Marshall Islands",
        "abbreviation": "MH"
    },
    {
        "name": "Maryland",
        "abbreviation": "MD"
    },
    {
        "name": "Massachusetts",
        "abbreviation": "MA"
    },
    {
        "name": "Michigan",
        "abbreviation": "MI"
    },
    {
        "name": "Minnesota",
        "abbreviation": "MN"
    },
    {
        "name": "Mississippi",
        "abbreviation": "MS"
    },
    {
        "name": "Missouri",
        "abbreviation": "MO"
    },
    {
        "name": "Montana",
        "abbreviation": "MT"
    },
    {
        "name": "Nebraska",
        "abbreviation": "NE"
    },
    {
        "name": "Nevada",
        "abbreviation": "NV"
    },
    {
        "name": "New Hampshire",
        "abbreviation": "NH"
    },
    {
        "name": "New Jersey",
        "abbreviation": "NJ"
    },
    {
        "name": "New Mexico",
        "abbreviation": "NM"
    },
    {
        "name": "New York",
        "abbreviation": "NY"
    },
    {
        "name": "North Carolina",
        "abbreviation": "NC"
    },
    {
        "name": "North Dakota",
        "abbreviation": "ND"
    },
    {
        "name": "Northern Mariana Islands",
        "abbreviation": "MP"
    },
    {
        "name": "Ohio",
        "abbreviation": "OH"
    },
    {
        "name": "Oklahoma",
        "abbreviation": "OK"
    },
    {
        "name": "Oregon",
        "abbreviation": "OR"
    },
    {
        "name": "Palau",
        "abbreviation": "PW"
    },
    {
        "name": "Pennsylvania",
        "abbreviation": "PA"
    },
    {
        "name": "Puerto Rico",
        "abbreviation": "PR"
    },
    {
        "name": "Rhode Island",
        "abbreviation": "RI"
    },
    {
        "name": "South Carolina",
        "abbreviation": "SC"
    },
    {
        "name": "South Dakota",
        "abbreviation": "SD"
    },
    {
        "name": "Tennessee",
        "abbreviation": "TN"
    },
    {
        "name": "Texas",
        "abbreviation": "TX"
    },
    {
        "name": "Utah",
        "abbreviation": "UT"
    },
    {
        "name": "Vermont",
        "abbreviation": "VT"
    },
    {
        "name": "Virgin Islands",
        "abbreviation": "VI"
    },
    {
        "name": "Virginia",
        "abbreviation": "VA"
    },
    {
        "name": "Washington",
        "abbreviation": "WA"
    },
    {
        "name": "West Virginia",
        "abbreviation": "WV"
    },
    {
        "name": "Wisconsin",
        "abbreviation": "WI"
    },
    {
        "name": "Wyoming",
        "abbreviation": "WY"
    }
]





export default function NewSchool() {
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
                    <div className="grid gap-y-5 border-b border-gray-900/10 pb-12 grid-cols-3">




                        <div className='col-span-3'>
                            <h2 className="text-3xl mb-5 font-black leading-7 text-gray-900">Add a school</h2>

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




                        <div className="grid max-w-2xl gap-x-6 gap-y-8 grid-cols-1 md:col-span-1 col-span-3">
                            <div className="col-span-1">
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Name of School
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 lg:max-w-lg">
                                        <input
                                            required
                                            type="text"
                                            name="name"
                                            id="name"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 lg:max-w-lg"
                                            placeholder="School name"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-1">

                                <div className="mt-2">
                                    <div className="">
                                        <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                                            State
                                        </label>
                                        <select
                                            required
                                            id="state"
                                            name="state"
                                            className="mt-2 block w-full rounded-md border-0 py-2 pl-1 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 text-sm sm:leading-6 lg:max-w-lg"
                                            defaultValue={ "" }
                                        >
                                            <option value={ "" } disabled >Select a state</option>
                                            { states.map((state) => {
                                                return <option value={ state?.name }>{ state?.name }</option>
                                            }) }
                                        </select>
                                    </div>
                                </div>
                            </div>


                            <div className="col-span-1">
                                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                    City
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 lg:max-w-lg">
                                        <input
                                            required
                                            type="text"
                                            name="city"
                                            id="city"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 "
                                            placeholder="City"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-1">
                                <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900">
                                    School Website
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 lg:max-w-lg">
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