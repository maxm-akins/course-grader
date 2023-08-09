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
import { useState, useContext, useEffect } from "react"


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

    const router = useRouter()
    const pathname = usePathname()
    const [classes, setClasses] = useState([]);
    const params = useParams();
    const courseParam = params?.class;
    const school = params?.school;
    let { setCourse, setSchool, course } = useContext(SchoolContext);



    useEffect(() => {

    }, [classes])


    const getClassInfo = async () => {
        setCourse((await getClass(courseParam)))
    }
    const getSchoolInfo = async () => {
        setSchool((await getSchool(school)))
    }


    useEffect(() => {
        getClassInfo();
        getSchoolInfo();
    }, [])



    return (
        <>

            <NewReviewSlide open={ open } setOpen={ setOpen } />


            <div className="relative my-5">
                <div className=" inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-300" />
                </div>

            </div>

            <div className="bg-white">
                <div className="lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8  ">
                    <div className="lg:col-span-4">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Student Reviews</h2>

                        <div className="mt-3 flex items-center">
                            <div>
                                <div className="flex items-center">
                                    <p className="text-6xl">
                                        { course.rating / 10 } / 10
                                    </p>
                                </div>
                            </div>
                        </div>
                        <p className="ml-2 mt-3 text-sm text-gray-900">Based on { reviews.totalCount } reviews</p>



                        <div className="mt-10">
                            <h3 className="text-lg font-medium text-gray-900">Share your thoughts</h3>
                            <p className="mt-1 text-sm text-gray-600">
                                If you’ve used this product, share your thoughts with other customers
                            </p>

                            <button
                                onClick={ () => setOpen(true) }
                                className="mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full"
                            >
                                Write a review
                            </button>
                        </div>
                    </div>

                    <div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
                        <h3 className="sr-only">Recent reviews</h3>

                        <div className="flow-root">
                            <div className="-my-12 divide-y divide-gray-200">
                                { reviews.featured.map((review) => (
                                    <div key={ review.id } className="py-12">
                                        <div className="flex items-center">
                                            <img src={ review.avatarSrc } alt={ `${review.author}.` } className="h-12 w-12 rounded-full" />
                                            <div className="ml-4">
                                                <h4 className="text-sm font-bold text-gray-900">{ review.author }</h4>
                                                <div className="mt-1 flex items-center">
                                                    { [0, 1, 2, 3, 4].map((rating) => (
                                                        <StarIcon
                                                            key={ rating }
                                                            className={ classNames(
                                                                review.rating > rating ? 'text-yellow-400' : 'text-gray-300',
                                                                'h-5 w-5 flex-shrink-0'
                                                            ) }
                                                            aria-hidden="true"
                                                        />
                                                    )) }
                                                </div>
                                                <p className="sr-only">{ review.rating } out of 5 stars</p>
                                            </div>
                                        </div>

                                        <div
                                            className="mt-4 space-y-6 text-base italic text-gray-600"
                                            dangerouslySetInnerHTML={ { __html: review.content } }
                                        />
                                    </div>
                                )) }
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}