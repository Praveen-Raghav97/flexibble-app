import SignUp from '@/components/Signup'
import Image from 'next/image'
import React from 'react'
import panda from '@/public/Animation.gif'
import Video from '@/components/video';

const Page = () => {
  return (
    <div className=" min-h-screen flex flex-col lg:flex-row items-center justify-center p-4 gap-10 lg:gap-20 shadow-lg rounded-lg">
      
      {/* Image Section */}
      <div className="">
    <Video/>
      </div>

      {/* Sign Up Form Section */}
      <div className="w-full lg:w-1/2 max-w-lg">
        <SignUp />
      </div>
      
    </div>
  );
};

export default Page;
