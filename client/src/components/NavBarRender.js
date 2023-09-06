"use client"

import { usePathname } from "next/navigation";
import HomeNavBar from "./HomeNavBar";
import NavBar from "./NavBar";
import SuccessNotif from '@/components/SuccessNotif'
import ErrorNotif from '@/components/ErrorNotif'
import ResponseContext from "@/context/ResponseContext";
import { useContext } from "react";

export default function NavBarRender() {
    const pathname = usePathname();
    const { err, setErr, showError, setShowError, success, setSuccess, showSuccess, setShowSuccess, success2, setSuccess2 } = useContext(ResponseContext);



    return (
        <>

            { pathname === "/" || pathname === "/?search=true" || pathname === "/404" || pathname === "/profile" || pathname === "/login" || pathname === "/register" || pathname === "/newschool" || pathname.includes("/newcourse") ? (

                <HomeNavBar />

            ) : (

                <NavBar />
            )

            }

            <SuccessNotif show={ showSuccess } setShow={ setShowSuccess } success={ success } setSuccess={ setSuccess } success2={ success2 } setSuccess2={ setSuccess2 } />
            <ErrorNotif show={ showError } setErr={ setErr } setShow={ setShowError } err={ err } />

        </>
    )
}