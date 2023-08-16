


"use client"

import { useContext, useEffect, useState } from "react"
import AuthContext from "@/context/AuthProvider"
import { useRouter } from "next/navigation";


export default function LoginLayout({ children }) {

    const { auth } = useContext(AuthContext);
    const router = useRouter();
    const [authed, setAuthed] = useState(false);


    useEffect(() => {
        if (JSON.stringify(auth) !== "{}") {
            setAuthed(true);
            router.push('/profile')

        }
        else {
            setAuthed(false);
        }

    }, [auth])
    return (
        <>
            <div className="">

                { !authed && children }
            </div>

        </>



    )
}
