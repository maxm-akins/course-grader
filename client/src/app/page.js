'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { UsersIcon } from '@heroicons/react/24/outline'
import { Combobox, } from '@headlessui/react'
import Link from 'next/link'
import useSchoolsApi from '@/api/schools'
const searchSchools = useSchoolsApi();


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function Home() {
  const router = useRouter()
  const [schools, setSchools] = useState([]);
  const [query, setQuery] = useState("");


  const handleQueryChange = async (q) => {
    await setQuery(q);
    setSchools((await searchSchools(q)));
  }

  useEffect(() => {

  }, [schools])



  return (

    <>

      <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-20 text-4xl font-bold tracking-tight text-pink-400 sm:text-9xl">Course Grader</h2>

          <Combobox onChange={ (value) => (router.push(`/${value}`)) } >

            <Combobox.Input
              className="w-full rounded-t-lg  bg-gray-100 px-4 py-2.5 text-pink-400 border-none focus:ring-0 sm:text-xl hover:drop-shadow-md transition-all"
              placeholder="Search for your school..."
              onChange={ (event) => {
                handleQueryChange(event.target.value);
              } }
            />

            { schools?.length > 0 && (
              <Combobox.Options
                static
                className=" -mb-2 max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800 bg-gray-100 rounded-b-lg  text-left "
              >
                { schools?.map((school) => (
                  <Combobox.Option
                    key={ school?.trunkName }
                    value={ school?.trunkName }
                    className={ ({ active }) =>
                      classNames(
                        'cursor-default select-none rounded-md px-4 py-2 ',
                        active && 'bg-pink-400 text-white'
                      )
                    }
                  >
                    { school?.name }
                  </Combobox.Option>
                )) }
              </Combobox.Options>
            ) }

            { schools?.length === 0 && query && (
              <div className="px-4 py-14 text-center sm:px-14 ">
                <UsersIcon className="mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
                <p className="mt-4 text-sm text-gray-900">No schools found using that search term.</p>
                <Link
                  className="mt-4 text-sm text-pink-400 hover:text-blue-400"
                  href="/"
                >
                  Click here to request to add a school!

                </Link>
              </div>
            ) }
          </Combobox>

        </div>
      </div>
      {/* <div className="container mx-auto sm:px-6 lg:px-8 grid justify-center content-center w-full h-full ease-linear  ">

        <Combobox onChange={ (person) => (window.location = person.url) } >

          <Combobox.Input
            className="w-full rounded-md border-0 bg-gray-100 px-4 py-2.5 text-gray-900 focus:ring-0 sm:text-sm "
            placeholder="Search..."
            onChange={ (event) => setQuery(event.target.value) }
          />

          { filteredPeople.length > 0 && (
            <Combobox.Options
              static
              className=" -mb-2 max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800 "
            >
              { filteredPeople.map((person) => (
                <Combobox.Option
                  key={ person.id }
                  value={ person }
                  className={ ({ active }) =>
                    classNames(
                      'cursor-default select-none rounded-md px-4 py-2 ',
                      active && 'bg-indigo-600 text-white'
                    )
                  }
                >
                  { person.name }
                </Combobox.Option>
              )) }
            </Combobox.Options>
          ) }

          { query !== '' && filteredPeople.length === 0 && (
            <div className="px-4 py-14 text-center sm:px-14 ">
              <UsersIcon className="mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
              <p className="mt-4 text-sm text-gray-900">No people found using that search term.</p>
            </div>
          ) }
        </Combobox>
      </div> */}
    </>











    // <div className='grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8'>


    //   <div className="bg-white px-6 py-24 sm:py-32 lg:px-8 ">
    //     <div className="mx-auto max-w-2xl text-center">
    //       <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Support center</h2>
    //       <p className="mt-6 text-lg leading-8 text-gray-600">
    //         Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
    //         fugiat veniam occaecat fugiat aliqua.
    //       </p>
    //     </div>
    //   </div>


    //   <Combobox onChange={ (person) => (window.location = person.url) }>
    //     <Combobox.Input
    //       className="w-6/12 rounded-md border-0 bg-gray-100 px-4 py-2.5 text-gray-900 focus:ring-0 sm:text-sm fixed "
    //       placeholder="Search..."
    //       onChange={ (event) => setQuery(event.target.value) }
    //     />

    //     { filteredPeople.length > 0 && (
    //       <Combobox.Options
    //         static
    //         className=" w-6/12 -mb-2 max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800 fixed"
    //       >
    //         { filteredPeople.map((person) => (
    //           <Combobox.Option
    //             key={ person.id }
    //             value={ person }
    //             className={ ({ active }) =>
    //               classNames(
    //                 'cursor-default select-none rounded-md px-4 py-2 mt-20',
    //                 active && 'bg-indigo-600 text-white'
    //               )
    //             }
    //           >
    //             { person.name }
    //           </Combobox.Option>
    //         )) }
    //       </Combobox.Options>
    //     ) }

    //     { query !== '' && filteredPeople.length === 0 && (
    //       <div className="px-4 py-14 text-center sm:px-14 mt-40">
    //         <UsersIcon className="mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
    //         <p className="mt-4 text-sm text-gray-900">No people found using that search term.</p>
    //       </div>
    //     ) }
    //   </Combobox>
    // </div>



  )
}


