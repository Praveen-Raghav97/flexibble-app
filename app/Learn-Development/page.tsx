import ProjectCard from '@/components/ProjectCard'
import React from 'react'
import { Development } from './DevelopmentData'

const page = () => {
  return (
    <section className="flex-start flex-col paddings mb-36">
    <section className="projects-grid mt-30" >
      {Development.map((data:any) => (
          <ProjectCard
          key={data.id}
          id={""}
          image={data.thumbnail_link}
          title={data.title}
          name={data.creator_name}
          avatarUrl={data.profile_img_url}
          userId={data.id}
        />
      ))}


    </section>
  </section>
  )
}

export default page
