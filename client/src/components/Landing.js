import { ChevronRightIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

export default function Landing() {
    return (
        <div className="relative isolate overflow-hidden bg-white">
            <svg
                className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                aria-hidden="true"
            >
                <defs>
                    <pattern
                        id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
                        width={ 200 }
                        height={ 200 }
                        x="50%"
                        y={ -1 }
                        patternUnits="userSpaceOnUse"
                    >
                        <path d="M.5 200V.5H200" fill="none" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" strokeWidth={ 0 } fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)" />
            </svg>
            <div className="mx-auto max-w-7xl px-6 pb-12 pt-10 sm:pb-12 lg:flex lg:px-8 lg:py-12">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
                    {/* <img
                        className="h-24 w-auto"
                        src="/CJ_Logo1.png"
                        alt="Your Company"
                    /> */}
                    {/* <div className="mt-24 sm:mt-32 lg:mt-16">
                        <a href="#" className="inline-flex space-x-6">
                            <span className="rounded-full bg-pink-400/10 px-3 py-1 text-sm font-semibold leading-6 text-pink-400 ring-1 ring-inset ring-pink-400/10">
                                What's new
                            </span>
                            <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
                                <span>Just shipped v1.0</span>
                                <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                        </a>
                    </div> */}
                    <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                        Your home for  <span className='text-pink-400'>  course </span> reviews
                        {/* <span className='mt-2 text-sm block tracking-normal font-normal'> and professors</span> */ }
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Course Judge is a platform <span className='text-pink-400'> made by students for students </span> to give others valuable
                        insights into upcoming or current semesters. We unqiuely offer the ability to review both individual courses
                        and professors.
                    </p>
                    <div className="mt-10 flex items-center gap-x-6">
                        <Link
                            href="/?search=true"
                            className="rounded-md bg-pink-400 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
                        >
                            Get started
                        </Link>
                        {/* <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                            Learn more <span aria-hidden="true">→</span>
                        </a> */}
                    </div>
                </div>
                <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
                    <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                        <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                            <img
                                src="/coursejudge.png"
                                alt="App screenshot"
                                width={ 2432 }
                                height={ 1442 }
                                className="w-[76rem] rounded-md shadow-2xl ring-1 ring-gray-900/10"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}