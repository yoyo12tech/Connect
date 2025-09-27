import React from 'react'
import {Link} from 'react-router-dom'

export default function notFoundPage() {
  return (
    <section className="bg-white dark:bg-black py-10">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center gradient-color">
                <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl ">404</h1>
                <p className="mb-4 text-3xl tracking-tight font-bold md:text-4xl ">Something's missing.</p>
                <p className="mb-4 text-lg font-light ">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
                <Link to="/" className="block text-white bg-gradient-to-r from-blue-500 to-pink-500 w-fit mx-auto  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gray-300 dark:bg-gray-800  my-4">Back to Homepage</Link>

            </div>   
        </div>
    </section>

  )
}
