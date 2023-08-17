
"use client"
import { PaperClipIcon } from "@heroicons/react/20/solid"
import { useContext, useEffect, useState } from "react"
import AuthContext from "@/context/AuthProvider"
import { getUser } from "@/apis/users"
import useRefreshToken from "@/hooks/useRefreshToken"


export default function Profile({ children }) {
    const refresh = useRefreshToken();
    const { auth, setAuth } = useContext(AuthContext);
    const [user, setUser] = useState({})


    const handleGetUser = async () => {
        const res = await getUser(auth);
        if (res?.toggleAuth) {
            setUser(res?.res?.data);
            const accessToken = res?.res?.config?.headers?.Authorization?.split(' ')[1];
            setAuth(prev => {
                return {
                    ...prev,
                    accessToken: accessToken,
                }
            });
        }
        else {
            setUser(res?.data);
        }
    }

    useEffect(() => {
        handleGetUser();
    }, [])

    return (
        <>
            <div className="sm:p-20 p-10">

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


            </div>




        </>



    )
}
