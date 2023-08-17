"use client"

import { useContext, useEffect, useState } from "react"
import AuthContext from "@/context/AuthProvider"
import { useRouter } from "next/navigation";
import { redirect } from 'next/navigation'

export default function ProfileLayout({ children }) {
    const { auth } = useContext(AuthContext);
    const router = useRouter();
    const [authed, setAuthed] = useState(false);


    useEffect(() => {
        if (JSON.stringify(auth) !== "{}") {
            setAuthed(true);
        }
        else {
            setAuthed(false);
            redirect('/login')
        }

    }, [auth])

    return (
        <>
            <div className="">

                { authed && children }

            </div>

        </>



    )
}
