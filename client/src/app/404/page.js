import Link from "next/link"

export default function NoSchoolFound({ error, reset }) {
    return (

        <>
            < main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8" >
                <div className="text-center">
                    <p className="text-base font-semibold text-pink-400">Error</p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">404</h1>
                    <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the school you’re looking for.</p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            href="/"
                            className="rounded-md bg-pink-400 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
                        >
                            Go back to search
                        </Link>

                    </div>
                </div>
            </main >
        </>
    )
}