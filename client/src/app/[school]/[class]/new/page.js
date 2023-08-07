/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/

"use client"
import Rating from '@mui/material/Rating';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useState } from 'react';

export default function New() {
    const [value, setValue] = useState();




    return (
        <form className=' static mt-5 bg-gray-100 p-4 rounded-lg shadow-inner'>
            <h2 className="text-2xl font-semibold leading-7 mb-5 text-gray-900">New Review</h2>

            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">

                    <div className='grid grid-cols-2 gap-10'>
                        <div className=''>
                            <label htmlFor="term" className="block text-sm font-medium leading-6 text-gray-900">
                                Term
                            </label>
                            <div className='flex gap-1'>
                                <select
                                    defaultValue={ "Select a term" }
                                    id="term"
                                    name="term"
                                    className="mt-2 inline w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                >
                                    <option disabled>Select a term</option>
                                    <option>Fall</option>
                                    <option>Spring</option>
                                    <option>Summer</option>
                                    <option>Tri 1</option>
                                    <option>Tri 2</option>
                                    <option>Tri 3</option>
                                    <option>Q 1</option>
                                    <option>Q 2</option>
                                    <option>Q 3</option>
                                    <option>Q 4</option>
                                </select>
                                <select
                                    defaultValue={ "Select a year" }
                                    id="year"
                                    name="year"
                                    className="mt-2 inline w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                >
                                    <option disabled>Select a year</option>

                                    <option>2030</option>
                                    <option>2029</option>
                                    <option>2028</option>
                                    <option>2027</option>
                                    <option>2026</option>
                                    <option>2025</option>
                                    <option>2024</option>
                                    <option>2023</option>
                                    <option>2022</option>
                                    <option>2021</option>
                                    <option>2020</option>
                                    <option>2019</option>
                                    <option>2018</option>
                                    <option>2017</option>
                                    <option>2016</option>
                                    <option>2015</option>
                                    <option>2014</option>
                                    <option>2013</option>
                                    <option>2012</option>
                                    <option>2011</option>
                                    <option>2010</option>
                                </select>

                            </div>

                        </div>

                        <div>
                            <label htmlFor="prof" className="block text-sm font-medium leading-6 text-gray-900">
                                Professor
                            </label>
                            <select
                                id="prof"
                                name="prof"
                                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                defaultValue="Select a professor"
                            >
                                <option disabled>Select a professor</option>
                                <option>Canada</option>
                                <option>Mexico</option>
                            </select>
                        </div>
                    </div>



                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4 ">
                            <label htmlFor="courseRating" className="block text-lg font-medium leading-6 text-gray-900 mb-2">
                                Course Rating
                            </label>
                            <Rating
                                name="courseRating"
                                value={ value }
                                precision={ 0.5 }
                                size='large'
                                onChange={ (event, newValue) => {
                                    setValue(newValue);
                                } }
                            />


                        </div>
                        <div className="sm:col-span-4 ">
                            <label htmlFor="profRating" className="block text-lg font-medium leading-6 text-gray-900 mb-2">
                                Professor Rating (based on this course)
                            </label>
                            <Rating
                                name="profRating"
                                value={ value }
                                precision={ 0.5 }
                                size='large'
                                onChange={ (event, newValue) => {
                                    setValue(newValue);
                                } }
                            />


                        </div>
                        <div className="col-span-full">
                            <label htmlFor="review" className="block text-sm font-medium leading-6 text-gray-500">
                                Tell us about this class. Feel free to provide as much or as little detail as you like. However, keep in mind, this is not a place to share
                                course materials, quizzes, exams, etc. Any reviews which disclose sensitive course information will be removed.
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="review"
                                    name="review"
                                    rows={ 3 }
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={ '' }
                                />
                            </div>
                        </div>




                    </div>
                </div>


                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Options</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                    </p>

                    <div className="mt-3">
                        <fieldset>
                            <div className="mt-1">
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="private"
                                            name="private"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="private" className="font-medium text-gray-900">
                                            Include username?
                                        </label>
                                        <p className="text-gray-500">By selecting this option you agree to display your username and profile information alongside your review.</p>
                                    </div>
                                </div>

                            </div>
                        </fieldset>

                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                </button>
                <button
                    type="submit"
                    className="rounded-md bg-pink-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Save
                </button>
            </div>
        </form>
    )
}