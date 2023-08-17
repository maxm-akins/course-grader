"use client"

import { usePathname } from "next/navigation";
import HomeNavBar from "./HomeNavBar";
import NavBar from "./NavBar";



export default function NavBarRender() {
    const pathname = usePathname();



    return (
        <>

            { pathname === "/" || pathname === "/404" || pathname === "/profile" || pathname === "/login" || pathname === "/register" || pathname === "/newschool" || pathname.includes("/newcourse") ? (

                <HomeNavBar />

            ) : (

                <NavBar />
            )

            }

        </>
    )
}