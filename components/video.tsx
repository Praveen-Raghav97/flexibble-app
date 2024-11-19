import React from 'react'
import videoSrc from '@/public/video.mp4';

const Video = () => {
  return (

    <video autoPlay loop muted className=" w-full h-full ">
      <source src='video.mp4' type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  
  )
}

export default Video
