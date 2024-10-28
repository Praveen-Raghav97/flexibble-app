import ProjectCard from '@/components/ProjectCard'
import React from 'react'
import { Development } from './DevelopmentData'
import Card from '@/components/Card'

const page = () => {
  return (
    <section className="flex-start flex-col paddings mb-36">
       <h1 className=" mt-1 text-xl font-extrabold text-black sm:text-2xl md:text-3xl">
      <span className="block">Learn Development</span>
    </h1>
    <section className="projects-grid mt-30" >
      {Development.map((data:any) => (
          <Card
          key={data.id}
          id={data.id}
          image={data.thumbnail_link}
          title={data.title}
          name={data.creator_name}
          avatarUrl={data.profile_img_url}
          userId={data.id}
          channelLink={data.channel_link}
        />
      ))}


    </section>
  </section>
  )
}

export default page
