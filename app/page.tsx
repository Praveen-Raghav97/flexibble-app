
import { ProjectInterface } from "@/commom.types";
import Categories from "@/components/Categories";
import LoadMore from "@/components/LoadMore";
import ProjectCard from "@/components/ProjectCard";
import Image from "next/image";
import { useSession } from "next-auth/react";

import { fetchToken } from "@/lib/Session";
import { getAllProjectDetails } from "@/lib/Session";



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


const  Home = async ({ searchParams: { category } }: Props) => {
  
 
 const data = await getAllProjectDetails(category) ;
// console.log(data)
  
  if (!data) {
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
        {data.map((data:any) => (
            <ProjectCard
            key={data._id}
            id={data._id}
            image={data.image}
            title={data.title}
            name={""}
            avatarUrl={""}
            userId={""}
          />
        ))}


      </section>

      <LoadMore 
        startCursor={data?.projectSearch?.pageInfo?.startCursor} 
        endCursor={data?.projectSearch?.pageInfo?.endCursor} 
        hasPreviousPage={data?.projectSearch?.pageInfo?.hasPreviousPage} 
        hasNextPage={data?.projectSearch?.pageInfo.hasNextPage}
      />
  </section>
  );
}

export default Home