import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <div className="py-20 px-20 min-h-screen bg-tuna-900">
      <div className="hero-overlay bg-opacity-0"></div>
      <div className="text-neutral-content text-center">
        <div>
          <h1 className="mb-20 text-5xl text-anakiwa-500">Stay Hydrated Daily</h1>
          <p className="mb-5 text-3xl text-black-haze-100 font-extralight">
            Monitor your hydration throughout the day and reach your health goals with our easy-to-use water intake tracker.
          </p>
          <Link href={"/tracker"} className="btn btn-md text-lg text-black-haze-100 mt-10 bg-anakiwa-600 font-medium hover:bg-anakiwa-700 shadow-xl border-transparent focus:border-transparent focus:ring-0 hover:border-transparent hover:ring-0">Start Today!</Link>
        </div>
      </div>

      <div className="join flex justify-center join-horizontal mt-20 space-x-10">

        <div className="card min-w-44 max-w-56 bg-shuttle-gray-800 shadow-xl">
          <div className="card-body">
            <Link href={"/tracker"}><h2 className="card-title text-anakiwa-500 hover:text-anakiwa-600">Water Tracker</h2></Link>
            <p>Track your water intake whenever you want</p>
          </div>
        </div>

        <div className="card min-w-44 max-w-56 bg-shuttle-gray-800 shadow-xl">
          <div className="card-body">
            <Link href={"/leaderboard"}><h2 className="card-title text-anakiwa-500 hover:text-anakiwa-600">Leaderboard</h2></Link>
            <p>Compete with your friends and other users</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Hero