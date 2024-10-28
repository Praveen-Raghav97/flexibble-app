import Model from '@/components/Model'
import ProjectForm from '@/components/ProjectForm'
import { getCurrentUser } from '@/lib/Session'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {
  const session = await getCurrentUser();
  console.log(session)
  if (!session?.user) redirect("/")
    
  return (
    <Model>
      <h3 className='modal-head-text'>Create A New Proeject</h3>
      <ProjectForm type='create' session={session}/>
    </Model>
  )
}

export default page
