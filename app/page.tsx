
import { ProjectInterface } from "@/commom.types";
import Categories from "@/components/Categories";
import LoadMore from "@/components/LoadMore";
import ProjectCard from "@/components/ProjectCard";
import Image from "next/image";
import { useSession } from "next-auth/react";

import { fetchToken, getAllProject, getAllProjects } from "@/lib/Session";
import { getAllProjectDetails } from "@/lib/Session";
import toast, { Toaster } from 'react-hot-toast';


type SearchParams = {
  category?: string | null;
  
}

type Props = {
  searchParams: SearchParams
}

type ProjectSearch = {
  length: number;
  projectSearch: {
    edges: { node: ProjectInterface }[];
   
  },
}

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;


const  Home = async ({ searchParams}: Props) => {
  const resolvedSearchParams = await searchParams; 
  const category = resolvedSearchParams?.category;

let data;

   data = await getAllProjectDetails(category) ;
//console.log(data)

let res;
 //res = await getAllProjects();
 
//console.log(res, "i am res")
/*if (res) {
  return (
    <section className="flexStart flex-col paddings">
      <Categories />

      <section className="projects-grid mt-30" >
        {res?.map((data:any) => (
            <ProjectCard
            key={data._id}
            id={data._id}
            image={data?.image}
            title={data.title}
            name={data?.createdBy?.name}
            avatarUrl={data?.createdBy?.image}
            userId={data?.createdBy?._id}
          />
        ))}


      </section>
    </section>
  )
}*/
  
  if ( !data ) {
    return (
      <section className="flexStart flex-col paddings">
        <Categories />

        <p className="no-result-text text-center">No projects found, go create some first.</p>
      </section>
    )
  }




  return (
  <section className="flex-start flex-col paddings mb-36">
    <Categories/>

    <section className="projects-grid mt-30" >
      
        {

        data.map((data:any) => (
            <ProjectCard
            key={data._id}
            id={data._id}
            image={data.image}
            title={data.title}
            name={data?.createdBy?.name}
            avatarUrl={data?.createdBy?.image}
            userId={data?.createdBy?._id}
          />
        ))}


      </section>

      <Toaster />
  </section>
  );
}

export default Home