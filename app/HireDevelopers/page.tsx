import ProjectCard from '@/components/ProjectCard'
import React from 'react'
import { userdata } from './DeveloperData'
import { link } from 'fs'
const page = () => {
  return (
    <section className="flex-start flex-col paddings mb-36">
      <section className="projects-grid mt-30" >
        {userdata.map((data:any) => (

        
            <ProjectCard
            key={data.id}
            id={""}
            image={data.profileImg}
            title={data.email}
            name={data.name}
            avatarUrl={""}
            userId={data.id}
          />
        ))}


      </section>
    </section>
  )
}

export default page
