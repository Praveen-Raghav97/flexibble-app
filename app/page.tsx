import '@/app/globals.css';
import { ProjectInterface } from "@/commom.types";
import Categories from "@/components/Categories";
import LoadMore from "@/components/LoadMore";
import ProjectCard from "@/components/ProjectCard";
import Image from "next/image";
import { useSession } from "next-auth/react";

import { fetchToken, getAllProject } from "@/lib/ActionControler";
import { getAllProjectDetails } from "@/lib/ActionControler";
import toast, { Toaster } from 'react-hot-toast';
import Head from 'next/head';

import { useSearchParams } from 'next/navigation';

type SearchParams = {
  category?: string | null;
}

type Props = {
  searchParams:  Promise<SearchParams>;
}

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

const Home = async ({ searchParams }: Props) => {
  
  const resolvedSearchParams = await searchParams; // Await the promise
  const category = resolvedSearchParams?.category;
  let data;

  if (category) {
    data = await getAllProjectDetails(category);
  } else {
    data = await getAllProject();
  }

  if (!data) {
    return (
      <>
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <section className="flexStart flex-col paddings">
          <Categories />
          <p className="no-result-text text-center">No projects found, go create some first.</p>
        </section>
      </>
    );
  }

  return (
    <section className="flex-start flex-col paddings mb-36">
      <Categories />
      <section className="projects-grid mt-30">
        {data.map((project: any) => (
          <ProjectCard
            key={project._id.toString()}
            id={project._id.toString()}
            image={project.image}
            title={project.title}
            name={project?.createdBy?.name}
            avatarUrl={project?.createdBy?.image}
            userId={project?.createdBy?._id.toString()}
          />
        ))}
      </section>
      <Toaster />
    </section>
  );
};

export default Home;
