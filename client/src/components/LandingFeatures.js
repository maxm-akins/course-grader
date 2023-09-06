import { PlusIcon, AcademicCapIcon, ArrowPathIcon, CloudArrowUpIcon, LockClosedIcon } from '@heroicons/react/20/solid'

const features = [
    {
        name: 'Course and Professor Reviews',
        description:
            'Easily find or add reviews for specific courses or professors. After navigating to your intended university you will be able to search through all of the courses and professors we have on record. ',
        href: '#',
        icon: AcademicCapIcon,
    },
    {
        name: 'Complete Anonymity',
        description:
            'While you may register for an account with us (and we encourage you to do so), it is not a requirement to do anything on the site. Additionaly, no submissions or reviews will ever contain information about the author. Ever.',
        href: '#',
        icon: LockClosedIcon,
    },
    {
        name: 'Simple Expansion',
        description:
            "Don't see your school, course, or professor? Easily follow the links provided to add your missing item. You don't even need to register for an account. ",
        href: '#',
        icon: PlusIcon,
    },
]

export default function LandingFeatures() {
    return (
        <div className="bg-white py-12 sm:py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-pink-400">Features</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Everything you need to prepare for your upcoming semester
                    </p>
                    {/* <p className="mt-6 text-lg leading-8 text-gray-400">
                        Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum
                        pulvinar et feugiat blandit at. In mi viverra elit nunc.
                    </p> */}
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                        { features.map((feature) => (
                            <div key={ feature.name } className="flex flex-col">
                                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                                    <feature.icon className="h-5 w-5 flex-none text-pink-400" aria-hidden="true" />
                                    { feature.name }
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-400">
                                    <p className="flex-auto">{ feature.description }</p>
                                    <p className="mt-6">
                                        {/* <a href={ feature.href } className="text-sm font-semibold leading-6 text-pink-400">
                                            Learn more <span aria-hidden="true">→</span>
                                        </a> */}
                                    </p>
                                </dd>
                            </div>
                        )) }
                    </dl>
                </div>
            </div>
        </div>
    )
}