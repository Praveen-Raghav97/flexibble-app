'use client'

import SignIn from '@/components/signin'
import React from 'react'
import img from '../../public/logo-purple.svg'
import Image from 'next/image'
const page = () => {
  return (
    <div className=' flex font-sans bg h-fit bg-white items-center justify-center gap-8 p-5 flex-col sm:flex-row '>
        <div className='bg-slate-900 h-[630px] w-[500px] items-center justify-center  pt-28  p-16 shadow-lg rounded-s-xl '>
            <Image src={img} alt='img'
            width={80}
            className='mb-7 mt-3'
            />
            
            <h5 className='text-3xl font-semibold text-blue-50 mb-2'>Welcome To Our </h5>
            <h5 className='text-2xl text-blue-50 font-semibold mb-2'>Project Sharing Platform</h5>
            <p className='text-md text-blue-50 mt-2 mb-5'>Flex is a project sharing platform.your hub for sharing and discovering innovative projects. connect with like-minded creators , get feedback , and take your ideas to the next level.</p>
            <h5 className='text-xl  mt-100 font-serif text-gray mb-2'>Powered By <span className='text-blue-50'>Flexibble...</span>  </h5>
        </div>
        <div className=''>
        <SignIn/>
        </div>
     
    </div>
  )
}

export default page
