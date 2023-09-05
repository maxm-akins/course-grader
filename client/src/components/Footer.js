
import Link from "next/link";

const navigation = {
    nav: [
        { name: 'School Search', href: '/' },
        { name: 'Add New School', href: '/newschool' },
        { name: 'Login', href: '/login' },
        { name: 'Sign Up', href: '/register' },
        { name: 'Profile', href: '/profile' },
    ],

    legal: [
        { name: 'Cookies', href: '#' },
        { name: 'Privacy', href: '#' },
        { name: 'Terms', href: '#' },
    ],
}

export default function Footer() {
    return (
        <footer className="bg-black" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8 lg:py-32">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <Link href="/">

                        <img
                            className="h-24 w-auto"
                            src="/CJ_Logo1.png"
                            alt="Your Company"
                        />
                    </Link>
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">


                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-pink-400">Navigation</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    { navigation.nav.map((item) => (
                                        <li key={ item.name }>
                                            <Link href={ item.href } className="text-sm leading-6 text-gray-300 hover:text-pink-400">
                                                { item.name }
                                            </Link>
                                        </li>
                                    )) }
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6 text-pink-400">Legal</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    { navigation.legal.map((item) => (
                                        <li key={ item.name }>
                                            <Link href={ item.href } className="text-sm leading-6 text-gray-300 hover:text-pink-400">
                                                { item.name }
                                            </Link>
                                        </li>
                                    )) }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-16 border-t border-white pt-8 sm:mt-20 lg:mt-24">
                    <p className="text-xs leading-5 text-white">&copy; 2023 Course Judge LLC</p>
                </div>
            </div>
        </footer>
    )
}

