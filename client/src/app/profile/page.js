
"use client"
import { useContext, useEffect, useState } from "react"
import AuthContext from "@/context/AuthProvider"
import { GetUser, UpdateUser } from "@/apis/users"
import ResponseContext from "@/context/ResponseContext";

export default function Profile({ children }) {
    const { err, setErr, showError, setShowError, success, setSuccess, showSuccess, setShowSuccess, success2, setSuccess2 } = useContext(ResponseContext);
    const { auth, setAuth } = useContext(AuthContext);
    const [user, setUser] = useState({})
    const [edit, setEdit] = useState(false);
    const [first, setFirst] = useState("");
    const [middle, setMiddle] = useState("");
    const [last, setLast] = useState("");

    const handleGetUser = async () => {
        const res = await GetUser(auth);
        if (res?.toggleAuth) {
            setUser(res?.res?.data);
            const accessToken = res?.res?.config?.headers?.Authorization?.split(' ')[1];
            setAuth(prev => {
                return {
                    ...prev,
                    accessToken: accessToken,
                }
            });
            setFirst(res?.res?.data?.firstName);
            setMiddle(res?.res?.data?.middleName);
            setLast(res?.res?.data?.lastName);
        }
        else {
            setUser(res?.data);
            setFirst(res?.data?.firstName);
            setMiddle(res?.data?.middleName);
            setLast(res?.data?.lastName);
        }
    }

    useEffect(() => {
        handleGetUser();
    }, [edit])


    const handleUpdateUser = async () => {
        const data = {
            first,
            middle,
            last
        };
        const res = await UpdateUser(data, auth);
        console.log(res);
        if (res?.status === 204) {
            setShowSuccess(true)
            setSuccess(res?.data?.message);
            setEdit(false);
            setTimeout(() => {
                setShowSuccess(false)
            }
                , 3000);
        }
        else {

            setShowError(true);
            setErr(res?.response?.data?.message);
            setTimeout(() => {
                setShowError(false)
            }
                , 5000);
            return;









        }

    }


    return (
        <>
            <div className="sm:p-20 p-10">

                <div className="overflow-hidden bg-white shadow-lg sm:rounded-lg">
                    <div className="px-4 py-6 sm:px-6 grid grid-cols-2">
                        <div className="col-span-1">
                            <h3 className="text-base font-semibold leading-7 text-gray-900">User Information</h3>
                            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and settings.</p>
                        </div>
                        <div className="col-span-1 flex justify-end items-center">
                            { edit ? (
                                <>
                                    <button
                                        onClick={ () => setEdit(false) }
                                        type="button"
                                        className=" inline-flex items-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
                                    >Cancel
                                    </button>
                                    <button
                                        onClick={ handleUpdateUser }
                                        type="button"
                                        className=" ml-2 inline-flex items-center rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
                                    >Save
                                    </button>
                                </>

                            ) : (
                                <button
                                    onClick={ () => setEdit(true) }
                                    type="button"
                                    className=" inline-flex items-center rounded-md bg-pink-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
                                >Edit Profile
                                </button>
                            ) }

                        </div>

                    </div>

                    { edit ? (
                        <div className="border-t border-gray-100">
                            <dl className="divide-y divide-gray-100">
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-900">First Name</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        <div className="mt-2">
                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-600 lg:max-w-lg">
                                                <input
                                                    onChange={ (event) => setFirst(event?.target?.value) }
                                                    value={ first }
                                                    type="text"
                                                    name="first"
                                                    id="first"
                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 lg:max-w-lg"
                                                    placeholder="First Name"
                                                />
                                            </div>
                                        </div>
                                    </dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-900">Middle Name</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">

                                        <div className="mt-2">
                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-600 lg:max-w-lg">
                                                <input
                                                    onChange={ (event) => setMiddle(event?.target?.value) }
                                                    value={ middle }
                                                    type="text"
                                                    name="middle"
                                                    id="middle"
                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 lg:max-w-lg"
                                                    placeholder="Middle Name"
                                                />
                                            </div>
                                        </div>

                                    </dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-900">Last Name</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        <div className="mt-2">
                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-600 lg:max-w-lg">
                                                <input
                                                    onChange={ (event) => setLast(event?.target?.value) }
                                                    value={ last }
                                                    type="text"
                                                    name="last"
                                                    id="last"
                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 lg:max-w-lg"
                                                    placeholder="Last Name"
                                                />
                                            </div>
                                        </div>
                                    </dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-900">Email address</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{ user?.email }</dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-900">Joined </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{ new Date(user?.joined).toLocaleDateString("en-US") }</dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-900">Reviews </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{ user?.reviewRefs?.length }</dd>
                                </div>

                            </dl>
                        </div>
                    ) : (
                        <div className="border-t border-gray-100">
                            <dl className="divide-y divide-gray-100">
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-900">Full name</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{ user?.fullName || "empty" }</dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-900">Email address</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{ user?.email }</dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-900">Joined </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{ new Date(user?.joined).toLocaleDateString("en-US") }</dd>
                                </div>
                                {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-900">Reviews </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{ user?.reviewRefs?.length }</dd>
                                </div> */}

                            </dl>
                        </div>
                    ) }




                </div>


            </div>




        </>



    )
}
