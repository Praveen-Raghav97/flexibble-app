import { ProjectInterface } from '@/commom.types';
import Model from '@/components/Model'
import ProjectForm from '@/components/ProjectForm'
import { getCurrentUser, fetchProjectById } from '@/lib/Session';
import { redirect } from 'next/navigation';
import React from 'react'

const EditProject = async ({params}:any) => {
  // asynchronous access of `params.id`.
  const { id } = await params;
  console.log(id , "i am id")
    
        const session = await getCurrentUser();
      
       // if (!session?.user) redirect("/")
      
        const result = await fetchProjectById(id) as { project?: ProjectInterface };
        
        if (!result?.project) return (
          <p className="no-result-text">Failed to fetch project info</p>
        )

  return (
    <Model>
    <h3 className="modal-head-text">Edit Project</h3>

    <ProjectForm type="edit" session={session} project={result?.project} />
  </Model>
  )
}

export default EditProject
