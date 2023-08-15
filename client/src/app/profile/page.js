
"use client"
import { PaperClipIcon } from "@heroicons/react/20/solid"
import { useContext } from "react"
import AuthContext from "@/context/AuthProvider"

export default function Profile({ children }) {

    const { auth } = useContext(AuthContext);
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
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{ auth?.fullName }</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-900">Email address</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{ auth?.email }</dd>
                            </div>

                        </dl>
                    </div>
                </div>
            </div>

        </>



    )
}
