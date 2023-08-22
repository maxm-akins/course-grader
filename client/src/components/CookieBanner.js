"use client"



export default function CookieBanner() {




    return (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 px-6 pb-6">
            <div className="pointer-events-auto ml-auto max-w-xl rounded-xl bg-white p-6 shadow-lg ring-1 ring-gray-900/10">
                <p className="text-sm leading-6 text-gray-900">
                    This website uses cookies to deliever the best possible user experience,
                    serve personalized ads, and interpret our traffic. By clicking "Accept all",
                    you consent to our use of cookies. If you select "Reject all", your user experience will likely be effected. See our{ ' ' }
                    <a href="#" className="font-semibold text-indigo-600">
                        cookie policy
                    </a>
                    .
                </p>
                <div className="mt-4 flex items-center gap-x-5">
                    <button
                        type="button"
                        className="rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                    >
                        Accept all
                    </button>
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Custom
                    </button>
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Reject all
                    </button>
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}