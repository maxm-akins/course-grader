
"use client"
import { PaperClipIcon } from "@heroicons/react/20/solid"
import { useContext, useState } from "react"
import AuthContext from "@/context/AuthProvider"
import { getUser } from "@/apis/users"
import useRefreshToken from "@/hooks/useRefreshToken"


export default function Profile({ children }) {
    const refresh = useRefreshToken();
    const { auth } = useContext(AuthContext);
    const [user, setUser] = useState({})


    const handleGetUser = async () => {
        const res = await getUser(auth);
        setUser(res?.data);
    }

    const handleRefresh = async () => {
        const res = await refresh();
    }

    return (
        <>
            <div className="p-20">

                <div className="overflow-hidden bg-white shadow-lg sm:rounded-lg">
                    <div className="px-4 py-6 sm:px-6">
                        <h3 className="text-base font-semibold leading-7 text-gray-900">User Information</h3>
                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and settings.</p>
                    </div>
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
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-900">Reviews </dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{ user?.reviewRefs?.length }</dd>
                            </div>

                        </dl>
                    </div>
                </div>
                <button
                    onClick={ handleGetUser }

                    className='bg-pink-400 py-2 px-4 text-sm font-black rounded-md text-white hover:bg-black hover:text-pink-400 hover:border-pink-400 border-2 border-black'>
                    Get User
                </button>
                <button
                    onClick={ handleRefresh }

                    className='bg-pink-400 py-2 px-4 text-sm font-black rounded-md text-white hover:bg-black hover:text-pink-400 hover:border-pink-400 border-2 border-black'>
                    Refresh
                </button>

            </div>




        </>



    )
}
