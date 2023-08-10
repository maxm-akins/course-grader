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
// import classNames from "classnames"

const reviews = {
    average: 4,
    totalCount: 1624,
    counts: [
        { rating: 5, count: 1019 },
        { rating: 4, count: 162 },
        { rating: 3, count: 97 },
        { rating: 2, count: 199 },
        { rating: 1, count: 147 },
    ],
    featured: [
        {
            id: 1,
            rating: 5,
            content: `
        <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
      `,
            author: 'Emily Selman',
            avatarSrc:
                'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
        },
        // More reviews...
    ],
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Class() {
    const [open, setOpen] = useState(false)
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
                <div key={ review?.uuid } className="rounded-lg bg-gray-100 mb-2 hover:shadow-xl transition-all">
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