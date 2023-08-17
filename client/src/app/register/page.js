"use client"

import { useRouter } from 'next/navigation'
import { UsersIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useState } from 'react'
import { register } from '@/apis/users'
import SuccessNotif from '@/components/SuccessNotif'
import ErrorNotif from '@/components/ErrorNotif'





export default function Register() {

    const router = useRouter();
    const [err, setErr] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [success, setSuccess] = useState(false);
    const [success2, setSuccess2] = useState(false);


    const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
    const passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);

    const [first, setFirst] = useState("");
    const [middle, setMiddle] = useState("");
    const [last, setLast] = useState("");
    const [email, setEmail] = useState("");
    const [confirmedEmail, setConfirmedEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [confirmedEmailErr, setConfirmedEmailErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const [confirmedPasswordErr, setConfirmedPasswordErr] = useState("");


    const validate = async () => {


        const isValidEmail = emailRegex.test(email);
        if (!isValidEmail) {
            setEmailErr("Not a valid email");
            return;
        }
        else {
            setEmailErr(false);
        }

        if (email !== confirmedEmail) {
            setConfirmedEmailErr("Emails do not match");
            return;
        }
        else {
            setConfirmedEmailErr(false);
        }

        const isValidPassword = passwordRegex.test(password);
        if (!isValidPassword) {
            setPasswordErr("Not a valid password.");
            return;
        }
        else {
            setPasswordErr(false);
        }

        if (password !== confirmedPassword) {
            setConfirmedPasswordErr("Passwords do not match");
            return;
        }
        else {
            setConfirmedPasswordErr(false);
        }

        const data = {
            email,
            password,
            first,
            middle,
            last
        }

        const res = await register(data);
        console.log(res);
        if (res?.status === 201) {
            // setShowSuccess(true)
            // setSuccess(res?.data?.message);
            // setSuccess2("Redirecting to login...");
            // setEmail("")
            // setPassword("")
            // setConfirmedEmail("")
            // setConfirmedPassword("")
            // setTimeout(() => {
            //     setShowSuccess(false);
            router.push("/login");
            // }
            //     , 3000);

        }
        else {
            const errors = res?.response?.data?.err?.errors;
            const keys = Object.keys(errors);

            setShowError(true);
            console.log(errors);
            setErr(errors[keys[0]]?.message);
            setTimeout(() => {
                setShowError(false)
            }
                , 10000);
            return;
        }



    }

    return (
        <>
            <SuccessNotif show={ showSuccess } setShow={ setShowSuccess } success={ success } success2={ success2 } />
            <ErrorNotif show={ showError } setShow={ setShowError } err={ err } />

            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-2 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="h-16 w-auto m-auto "
                        src="/CJ_Logo1.png"
                        alt="CourseJudge"
                    />
                    <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Register your account
                    </h2>
                </div>

                <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="space-y-6" >

                        <div>
                            <label htmlFor="first" className="block text-sm font-medium leading-6 text-gray-900">
                                First Name
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={ (event) => {
                                        setFirst(event?.target?.value)
                                    } }
                                    id="first"
                                    name="first"
                                    type="text"
                                    value={ first }
                                    className="block w-full rounded-md border-0 p-1.5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-400 sm:text-sm sm:leading-6"
                                />

                            </div>
                        </div>
                        <div>
                            <label htmlFor="middle" className="block text-sm font-medium leading-6 text-gray-900">
                                Middle Name <span className='text-xs text-gray-400'> optional </span>
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={ (event) => {
                                        setMiddle(event?.target?.value)
                                    } }
                                    id="middle"
                                    name="middle"
                                    type="text"
                                    value={ middle }
                                    className="block w-full rounded-md border-0 p-1.5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-400 sm:text-sm sm:leading-6"
                                />

                            </div>
                        </div>
                        <div>
                            <label htmlFor="last" className="block text-sm font-medium leading-6 text-gray-900">
                                Last Name
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={ (event) => {
                                        setLast(event?.target?.value)
                                    } }
                                    id="last"
                                    name="last"
                                    type="test"
                                    value={ last }
                                    className="block w-full rounded-md border-0 p-1.5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-400 sm:text-sm sm:leading-6"
                                />

                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email Address
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={ (event) => {
                                        setEmail(event?.target?.value)
                                    } }
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={ email }
                                    className="block w-full rounded-md border-0 p-1.5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-400 sm:text-sm sm:leading-6"
                                />
                                { emailErr && <span className="text-xs text-red-500" >  { emailErr } </span> }

                            </div>
                        </div>
                        <div>
                            <label htmlFor="confirmedEmail" className="block text-sm font-medium leading-6 text-gray-900">
                                Confirm Email Address
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={ (event) => {
                                        setConfirmedEmail(event?.target?.value)
                                    } }
                                    id="confirmedEmail"
                                    name="confirmedEmail"
                                    type="email"
                                    value={ confirmedEmail }
                                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-400 sm:text-sm sm:leading-6"
                                />
                                { confirmedEmailErr && <span className="text-xs text-red-500" >  { confirmedEmailErr } </span> }

                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                            </div>

                            <div className="mt-2">
                                <input
                                    onChange={ (event) => {
                                        setPassword(event?.target?.value)
                                    } }
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    value={ password }
                                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-400 sm:text-sm sm:leading-6"
                                />
                                <span className="text-xs text-pink-400 tracking-tight	" >  Passwords must be at least 8 characters long and contain at least one: uppercase letter, lowercase letter, number, and special character. </span>

                                { passwordErr && <div className="text-xs text-red-500 mt-2" >  { passwordErr } </div> }
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="confirmedPassword" className="block text-sm font-medium leading-6 text-gray-900">
                                    Confirm Password
                                </label>

                            </div>
                            <div className="mt-2">
                                <input
                                    onChange={ (event) => {
                                        setConfirmedPassword(event?.target?.value)
                                    } }
                                    id="confirmedPassword"
                                    name="confirmedPassword"
                                    type="password"
                                    value={ confirmedPassword }
                                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-400 sm:text-sm sm:leading-6"
                                />
                                { confirmedPasswordErr && <span className="text-xs text-red-500" >  { confirmedPasswordErr } </span> }

                            </div>
                        </div>

                        <div>
                            <button
                                onClick={ validate }
                                className="flex w-full justify-center rounded-md bg-pink-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-400"
                            >
                                Register
                            </button>
                        </div>
                    </div>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already have an account?{ ' ' }
                        <Link href="/login" className="font-semibold leading-6 text-pink-400 hover:text-pink-500">
                            Login here!
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}

