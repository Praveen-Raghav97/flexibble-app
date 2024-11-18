import Link from 'next/link'

import { getUserbyID, getUserProjects } from '@/lib/ActionControler'
import { ProjectInterface, UserProfiles } from '@/commom.types'
import Image from 'next/image'
import ProjectCard from './ProjectCard'
import { user } from '@nextui-org/react'

type Props = {
    userId: string
    projectId: string
}

const RelatedProjects = async ({ userId, projectId }: Props) => {
    const result = await getUserbyID(userId) as {user : UserProfiles}
       

 // console.log(result , "result of reledted")
     let projects = result.user.projects
 
     const processedProjects = result?.user?.projects?.map((project: any) => ({
        ...project,
        _id: project._id.toString(), // Convert ObjectId to string
        createdBy: {
          ...project.createdBy,
          _id: project.createdBy._id?.toString(),
        },
      }));
      //console.log(processedProjects)
    return (
        <section className="flex flex-col mt-32 w-full">
            <div className="flexBetween">
                <p className=" text-left text-lg font-semibold">
                    More by {result?.user?.name}
                </p>
                <Link
                    href={`/profile/${result?.user?._id}`}
                    className="text-primary-purple text-base"
                >
                    View All
                </Link>
            </div>

            <div className="related_projects-grid">
            {processedProjects.slice(0,4).map((data:any) => (

            <ProjectCard
            key={data._id}
            id={data._id}
            image={data.image}
            title={data.title}
            name={result?.user?.name}
            avatarUrl={result?.user?.image}
            userId={userId}
          />
        ))}
            </div>
        </section>
    )
}

export default RelatedProjects