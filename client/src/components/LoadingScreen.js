"use client"
import { Triangle } from 'react-loader-spinner'


import { useContext, useEffect } from 'react';
import LoadingContext from '@/context/LoadingContext';
export default function LoadingScreen() {
    const { loading } = useContext(LoadingContext);
    return (
        <>

            <div className='w-screen h-screen m-auto flex justify-center items-center'>
                {/* <LinearProgress /> */ }
                <Triangle
                    height="200"
                    width="200"
                    color="#f471b5"
                    ariaLabel="triangle-loading"
                    wrapperStyle={ {} }
                    wrapperClassName=""
                    visible={ true }
                />

            </div>



        </>
    )
}