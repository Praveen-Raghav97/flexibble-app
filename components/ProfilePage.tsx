import { ProjectInterface, UserProfiles } from '@/commom.types'
import Image from 'next/image'

import Link from 'next/link'
import Button from "./Button";
import ProjectCard from './ProjectCard';


type Props = {
    user: UserProfiles;
}


const ProfilePage = ({ user }: Props) =>{


    const processedProjects = user?.projects?.map((project: any) => ({
        ...project,
        _id: project._id.toString(), // Convert ObjectId to string
        createdBy: {
          ...project.createdBy,
          _id: project.createdBy._id?.toString(),
        },
      }));


  let userId = user._id.toString()

    return(


  
    <section className='flexCenter flex-col max-w-10xl w-full mx-auto paddings'>
        <section className="flexBetween max-lg:flex-col gap-10 w-full">
            <div className='flex items-start flex-col w-full'>
            {user?.image && (
      <Image 
        src={user.image} 
        width={80} 
        height={80} 
        className="rounded-full" 
        alt="user image" 
      />
    )}
                <p className="text-4xl font-bold mt-10">{user?.name}</p>
                <p className="md:text-5xl text-3xl font-extrabold md:mt-10 mt-5 max-w-lg">I’m Software Engineer at Google 👋</p>
                
                <div className="flex mt-8 gap-5 w-full flex-wrap">
                    <Button 
                        title="Follow" 
                        leftIcon="/plus-round.svg" 
                        bgColor="bg-light-white-400 !w-max" 
                        textColor="text-black-100" 
                    />
                    <Link href={`mailto:${user?.email}`}>
                        <Button title="Hire Me" leftIcon="/email.svg" />
                    </Link>
                </div>
            </div>

            {user? (
                <Image
                    src={"/profile-post.png"}
                    alt="project image"
                    width={739}
                    height={554}
                    className='rounded-xl object-contain'
                />
            ) : (
                <Image
                    src="/profile-post.png"
                    width={739}
                    height={554}
                    alt="project image"
                    className='rounded-xl'
                />
            )}
       </section>

       <section className="flexStart flex-col lg:mt-28 mt-16 w-full">
           <p className="w-full text-left text-lg font-semibold">Recent Work</p>
           
           <div className="profile_projects">
           {processedProjects.map((data:any) => (

<ProjectCard
key={data._id}
id={data._id}
image={data.image}
title={data.title}
name={user?.name}
avatarUrl={user?.image|| '/default-avatar.png'}
userId={userId}
/>
))}
            </div>
       </section>
   </section>
)
}
export default ProfilePage