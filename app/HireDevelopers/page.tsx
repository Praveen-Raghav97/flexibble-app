import ProjectCard from '@/components/ProjectCard'
import React from 'react'
import { userdata } from './DeveloperData'
import { link } from 'fs'
import Card from '@/components/Card'
const page = () => {
  return (
    <section className="flex-start flex-col paddings mb-36">
       <h1 className=" mt-1 text-xl font-extrabold text-black sm:text-2xl md:text-3xl">
      <span className="block">Hire Developer's</span>
    </h1>
      <section className="projects-grid mt-30" >
        {userdata.map((data:any) => (

        
            <Card
            key={data.id}
            id={""}
            image={data.profileImg}
            title={data.email}
            name={data.name}
            avatarUrl={data.profileImg}
            userId={data.id}
            channelLink={data.linkedin}
          />
        ))}


      </section>
    </section>
  )
}

export default page
