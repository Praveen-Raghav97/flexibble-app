'use client'

import Signin from '@/components/Signin'
import React from 'react'
import img from '@/public/logo-purple.svg'
import Image from 'next/image'

const page = () => {
  return (
    <div className="flex flex-wrap font-sans bg h-fit bg-white items-center justify-center gap-8 p-5 flex-col sm:flex-row">
      {/* Left Section */}
      <div className="bg-slate-900 h-auto sm:h-[630px] w-full sm:w-[500px] items-center justify-center pt-16 sm:pt-28 p-10 sm:p-16 shadow-lg rounded-xl sm:rounded-s-xl">
        <Image
          src={img}
          alt="img"
          width={80}
          className="mb-7 mt-3 mx-auto"
        />
        <h5 className="text-2xl sm:text-3xl font-semibold text-blue-50 mb-2 text-center sm:text-left">
          Welcome To Our
        </h5>
        <h5 className="text-xl sm:text-2xl text-blue-50 font-semibold mb-2 text-center sm:text-left">
          Project Sharing Platform
        </h5>
        <p className="text-sm sm:text-md text-blue-50 mt-2 mb-5 text-center sm:text-left">
          Flex is a project-sharing platform. Your hub for sharing and discovering innovative projects. Connect with like-minded creators, get feedback, and take your ideas to the next level.
        </p>
        <h5 className="text-md sm:text-xl mt-4 sm:mt-20 font-serif text-gray mb-2 text-center sm:text-left">
          Powered By <span className="text-blue-50">Flexibble...</span>
        </h5>
      </div>

      {/* Right Section */}
      <div className="w-full sm:w-auto flex items-center justify-center">
        <Signin />
      </div>
    </div>
  )
}

export default page
