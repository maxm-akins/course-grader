
"use client"
import '../app/globals.css'
import { useEffect, useContext, useState } from 'react'
import AuthContext from '@/context/AuthProvider'
import useRefreshToken from '@/hooks/useRefreshToken'
import LoadingContext from '@/context/LoadingContext'
import LoadingScreen from './LoadingScreen'

export default function PersistWrapper({ children }) {

    const refresh = useRefreshToken();
    const { auth } = useContext(AuthContext);
    const { loading, setLoading } = useContext(LoadingContext);

    useEffect(() => {
        let isMounted = true;
        // setLoading(true);

        const verifyRefreshToken = async () => {
            try {
                await refresh().then(res => {
                    setLoading(false);
                }).catch(err => {
                    console.log(err);
                });
            }
            catch (err) {
                console.log(err);
            }
            finally {
                // isMounted && setLoading(false);
            }
        }
        !auth?.accessToken ? verifyRefreshToken() : setLoading(false);

    }, [])


    return (
        <>
            {
                loading ? (
                    <LoadingScreen />
                ) : (
                    children
                )
            }

        </>

    )
}
