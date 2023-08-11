"use client"

import NewReviewSlide from "@/components/NewReviewSlide"
import { StarIcon, } from "@heroicons/react/20/solid"
import { getClass } from "@/api/classes"
import { getSchool } from "@/api/schools"
import SchoolContext from '@/context/SchoolProvider'
import { searchClasses } from '@/api/classes'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { useState, useContext, useEffect } from "react"
import { getReviews } from "@/api/reviews"
import { Transition } from "@headlessui/react"
import { Fragment } from "react"
import { Dialog } from "@headlessui/react"
// import classNames from "classnames"

import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid'

const stats = [
    { name: 'Total Subscribers', stat: '71,897', previousStat: '70,946', change: '12%', changeType: 'increase' },
    { name: 'Avg. Open Rate', stat: '58.16%', previousStat: '56.14%', change: '2.02%', changeType: 'increase' },
    { name: 'Avg. Click Rate', stat: '24.57%', previousStat: '28.62%', change: '4.05%', changeType: 'decrease' },
]


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Class() {
    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(true)
    const [reviews, setReviews] = useState([])
    const [filteredReviews, setFilteredReviews] = useState([])

    const router = useRouter()
    const pathname = usePathname()
    const [classes, setClasses] = useState([]);
    const params = useParams();
    const searchParams = useSearchParams();
    const courseParam = params?.class;
    const school = params?.school;
    let { setCourse, setSchool, course } = useContext(SchoolContext);
    const [filter, setFilter] = useState(searchParams.get('filter'));


    useEffect(() => {

    }, [classes])

    useEffect(() => {
        setFilter(searchParams.get('filter'));

        const filtered = reviews.filter((review) => {
            console.log(review.profRef);
            console.log(searchParams.get('filter'));
            if (review.profRef === searchParams.get('filter')) return review;


        });
        setFilteredReviews(filtered);

    }, [searchParams]);


    const getClassInfo = async () => {
        setCourse((await getClass(courseParam)))
    }
    const getSchoolInfo = async () => {
        setSchool((await getSchool(school)))
    }
    const getReviewList = async () => {
        setReviews((await getReviews(courseParam)))
    }


    useEffect(() => {
        getClassInfo();
        getSchoolInfo();
        getReviewList();
    }, [])



    const returnReviews = (review) => {
        return (
            <>

















                <div key={ review?.uuid } className=" drop-shadow-xl rounded-lg bg-white mb-2 hover:drop-shadow-2xl transition-all">
                    <div className="grid grid-cols-3 p-3 gap-3 justifiy-end">

                        {/* <img src={ review.avatarSrc } alt={ `${review?.userRef}.` } className="h-12 w-12 rounded-full" /> */ }

                        <div className="col-span-1">
                            { review?.title && (
                                <div className="text-xl sm:text-3xl text-pink-400 font-bold">{ review?.title }</div>
                            ) }



                        </div>




                        <div className="col-span-2 grid grid-cols-3">
                            <div className="col-span-1 flex flex-wrap justify-center">
                                <div className="w-full flex justify-center text-xs sm:text-lg text-gray-600 font-semibold">Course</div>
                                <div className="mt-1  ">
                                    <div
                                        className={ `p-2 rounded-md ${review?.courseRating < 4 ? "bg-red-100" : review?.courseRating < 7 ? "bg-yellow-100" : "bg-emerald-100"} text-xl sm:text-4xl font-black items-end flex ` }
                                    >
                                        { review?.courseRating }
                                    </div>


                                </div>

                            </div>
                            <div className="col-span-1 flex flex-wrap  justify-center">

                                <div className="w-full flex justify-center text-xs sm:text-lg text-gray-600 font-semibold">Professor</div>
                                <div className="mt-1  ">
                                    <div className={ `p-2 rounded-md ${review?.profRating < 4 ? "bg-red-100" : review?.profRating < 7 ? "bg-yellow-100" : "bg-emerald-100"} text-xl sm:text-4xl font-black flex items-end ` }>
                                        <span>{ review?.profRating }</span>
                                    </div>


                                </div>
                            </div>
                            <div className="col-span-1 flex flex-wrap justify-center">

                                <div className="w-full flex justify-center items-end text-xs sm:text-lg text-gray-600 font-semibold">Difficulty</div>
                                <div className="mt-1  ">
                                    <div className={ `p-2 rounded-md ${review?.difficultyRating < 4 ? "bg-emerald-100" : review?.difficultyRating < 7 ? "bg-yellow-100" : "bg-red-100"} text-xl sm:text-4xl font-black flex items-end ` }>
                                        { review?.difficultyRating }
                                    </div>


                                </div>
                            </div>

                        </div>

                        <p className=" col-span-3 text-sm md:text-base font-medium my-5">{ review?.description }</p>



                        <div className="mt-5 col-span-1 flex flex-wrap justify-right items-end transition-all">
                            <div className="w-full text-gray-600 font-medium"> Term: <span className="text-pink-400">{ review?.term }{ " " }{ review?.year }</span> </div>

                            <div className="font-medium text-gray-600"> Professor:<span className="text-pink-400 hover:text-gray-400">{ " " }{ review?.profName } </span></div>


                        </div>

                        <div className="mt-2 col-span-2 flex flex-wrap justify-end items-end transition-all">
                            { review?.private ? (
                                <div className="text-gray-600 font-medium"> Posted by: <span className="text-pink-400">Course Judger User</span> on { new Date(review?.date).toLocaleDateString("en-US") } </div>
                            ) : (
                                <div className="text-gray-600 font-medium"> Posted by: <span className="text-pink-400">{ review?.userRef }</span> on { new Date(review?.date).toLocaleDateString("en-US") } </div>

                            ) }



                        </div>



                    </div>

                    <div
                        className="mt-4 space-y-6 text-base italic text-gray-600"
                        dangerouslySetInnerHTML={ { __html: review.content } }
                    />
                </div>
            </>
        )
    }


    return (
        <>

            <NewReviewSlide open={ open } setOpen={ setOpen } />

            <Transition.Root show={ open2 } as={ Fragment }>
                <Dialog as="div" className="relative z-10" onClose={ setOpen2 }>
                    <Transition.Child
                        as={ Fragment }
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
                    </Transition.Child>

                    <div className="fixed bg-white inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                            {/* This element is to trick the browser into centering the modal contents. */ }
                            <span className="hidden md:inline-block md:h-screen md:align-middle" aria-hidden="true">
                                &#8203;
                            </span>
                            <Transition.Child
                                as={ Fragment }
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                                enterTo="opacity-100 translate-y-0 md:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                                leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                            >
                                <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                                    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                            <img
                                                className="mx-auto h-10 w-auto"
                                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                                alt="Your Company"
                                            />
                                            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                                Sign in to your account
                                            </h2>
                                        </div>

                                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                                            <form className="space-y-6" action="#" method="POST">
                                                <div>
                                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Email address
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            id="email"
                                                            name="email"
                                                            type="email"
                                                            autoComplete="email"
                                                            required
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className="flex items-center justify-between">
                                                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Password
                                                        </label>
                                                        <div className="text-sm">
                                                            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                                                Forgot password?
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="mt-2">
                                                        <input
                                                            id="password"
                                                            name="password"
                                                            type="password"
                                                            autoComplete="current-password"
                                                            required
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <button
                                                        type="submit"
                                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                    >
                                                        Sign in
                                                    </button>
                                                </div>
                                            </form>

                                            <p className="mt-10 text-center text-sm text-gray-500">
                                                Not a member?{ ' ' }
                                                <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                                    Start a 14 day free trial
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>



            <div className="relative my-5">
                <div className=" inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-300" />
                </div>

            </div>

            <div className="bg-white">
                <div className="grid lg:max-w-7xl grid-cols-12 gap-x-5  ">




                    <div className="lg:col-span-2 col-span-12">
                        <div className="flex flex-wrap justify-stretch justify-items-stretch gap-4">


                            <div className={ `${course?.courseRating < 4 ? " bg-red-100" : course?.courseRating < 7 ? "bg-yellow-100" : "bg-emerald-100"} grow rounded-md lg:w-full p-2` }>
                                <h2 className="text-lg font-semibold tracking-tight text-gray-600"> Course </h2>

                                <div className="mt-3 flex items-center">
                                    <div>
                                        <div className="flex items-center">
                                            <p className="text-6xl sm:text-8xl lg:text-5xl font-black">
                                                { Math.round(course.courseRating * 100) / 100 } <span className="text-sm">/ 10                                             </span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div className={ `${course?.profRating < 4 ? " bg-red-100" : course?.profRating < 7 ? "bg-yellow-100" : "bg-emerald-100"} grow rounded-md lg:w-full p-2` }>
                                <h2 className="text-lg font-semibold tracking-tight text-gray-600"> Professor </h2>

                                <div className="mt-3 flex items-center">
                                    <div>
                                        <div className="flex items-center">
                                            <p className="text-6xl sm:text-8xl lg:text-5xl font-black">
                                                { Math.round(course.profRating * 100) / 100 } <span className="text-sm">/ 10                                             </span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className={ `${course?.difficultyRating < 4 ? " bg-emerald-100" : course?.difficultyRating < 7 ? "bg-yellow-100" : "bg-red-100"} grow rounded-md lg:w-full p-2` }>
                                <h2 className="text-lg font-semibold tracking-tight text-gray-600"> Difficulty </h2>

                                <div className="mt-3 flex items-center">
                                    <div>
                                        <div className="flex items-center">
                                            <p className=" text-6xl sm:text-8xl lg:text-5xl font-black">
                                                { Math.round(course.difficultyRating * 100) / 100 } <span className="text-sm">/ 10                                             </span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <p className=" mt-3 text-sm text-gray-900">Based on { course?.amount } review(s)</p>



                        <div className="mt-2 mb-5">
                            <h3 className="text-lg font-medium text-gray-900">Share your thoughts</h3>
                            <p className="mt-1 text-sm text-gray-600">
                                If you’ve taken this course, share your thoughts with other students.
                                Provide valuable insight into this class for your peers.
                            </p>

                            <button
                                onClick={ () => setOpen(true) }
                                className="mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full"
                            >
                                Write a review
                            </button>
                        </div>
                    </div>

                    <div className=" col-span-12 lg:col-span-10 mt-0">

                        <div className="flow-root">
                            <div className="  ">

                                { searchParams.get('filter') === "none" || !searchParams.get('filter') ? (
                                    <>
                                        { reviews?.map((review) => returnReviews(review)) }
                                    </>

                                ) : (
                                    <>
                                        { filteredReviews?.map((review) => returnReviews(review)) }
                                    </>
                                ) }

                            </div>
                        </div>
                    </div>
                </div>
            </div >



        </>
    )
}