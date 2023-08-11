"use client"

import { usePathname } from "next/navigation";
import HomeNavBar from "./HomeNavBar";
import NavBar from "./NavBar";



export default function NavBarRender() {
    const pathname = usePathname();



    return (
        <>

            { pathname === "/" || pathname === "/newschool" || pathname.includes("/newcourse") ? (

                <HomeNavBar />

            ) : (

                <NavBar />
            )

            }

        </>
    )
}