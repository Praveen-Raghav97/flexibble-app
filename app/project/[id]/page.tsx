
import Image from "next/image"
import Link from "next/link"
import {fetchProjectById, getUserbyID} from '@/lib/ActionControler'
import { getCurrentUser } from "@/lib/ActionControler"
import { getAllProjectDetails } from "@/lib/ActionControler"
import Model from "@/components/Model"
import ProjectActions from "@/components/ProjectActions"
import RelatedProjects from "@/components/RelatedProjects"
import { ProjectInterface } from "@/commom.types"

const Project = async ({params}:any) => {
    
  
  // asynchronous access of `params.id`.
  const { id } = await params
  
  // Simulate awaiting `params.id`
    const session = await getCurrentUser()
    const result = await fetchProjectById(id) as { project?: ProjectInterface}
  //console.log(result , "i am result")
    if (!result?.project) return (
        <p className="no-result-text">Failed to fetch project info</p>
    )

    const projectDetails = result?.project

    const renderLink = () => `/profile/${projectDetails?.createdBy?._id}`
  let userId = projectDetails.createdBy._id
 // console.log(userId , "i am id")
    return (
        <Model>
            <section className="flexBetween gap-y-8 max-w-4xl max-xs:flex-col w-full">
                <div className="flex-1 flex items-start gap-5 w-full max-xs:flex-col">
                    <Link href={`/profile/${userId}`}>
                        <Image
                            src={projectDetails?.createdBy?.image}
                            width={50}
                            height={50}
                            alt="profile"
                            className="rounded-full"
                        />
                    </Link>
      
                    <div className="flex-1 flexStart flex-col gap-1">
                        <p className="self-start text-lg font-semibold">
                            {projectDetails?.title}
                        </p>
                        <div className="user-info">
                            <Link href={`/profile/${userId}`}>
                                {projectDetails?.createdBy?.name}
                            </Link>
                            <Image src="/dot.svg" width={4} height={4} alt="dot" />
                            <Link href={`/?category=${projectDetails.category}`} className="text-primary-purple font-semibold"> 
                                {projectDetails?.category}
                            </Link>
                        </div>
                    </div>
                </div>

                {session?.user?.email === projectDetails?.createdBy?.email && (
                    <div className="flex justify-end items-center gap-2">
                        <ProjectActions projectId={id} />
                    </div>
                )}
            </section>

            <section className="mt-14">
                <Image
                    src={`${projectDetails?.image}`}
                    className="object-cover rounded-2xl shadow-lg"
                    width={980}
                    height={790}
                    alt="poster"
                />
            </section>

            <section className="flexCenter flex-col mt-20">
                <p className="max-w-5xl text-xl font-normal">
                    {projectDetails?.description}
                </p>

                <div className="flex flex-wrap mt-5 gap-5">
                    <Link href={projectDetails?.githubUrl} target="_blank" rel="noreferrer" className="flexCenter gap-2 tex-sm font-medium text-primary-purple">
                        🖥 <span className="underline">Github</span> 
                    </Link>
                    <Image src="/dot.svg" width={4} height={4} alt="dot" />
                    <Link href={projectDetails?.livesiteUrl} target="_blank" rel="noreferrer" className="flexCenter gap-2 tex-sm font-medium text-primary-purple">
                        🚀 <span className="underline">Live Site</span> 
                    </Link>
                </div>
            </section>
      
            <section className="flexCenter w-full gap-8 mt-28">
                <span className="w-full h-0.5 bg-light-white-200" />
                <Link href={`/profile/${userId}`} className="min-w-[82px] h-[82px]">
                    <Image
                        src={projectDetails?.createdBy?.image}
                        className="rounded-full"
                        width={82}
                        height={82}
                        alt="profile image"
                    />
                </Link>
                <span className="w-full h-0.5 bg-light-white-200" />
            </section>

            <RelatedProjects userId={projectDetails?.createdBy?._id} projectId={projectDetails?._id} />
        </Model>
    )
}

export default Project