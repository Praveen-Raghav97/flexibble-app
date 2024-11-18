import { UserProfiles  } from '@/commom.types';
import ProfilePage from '@/components/ProfilePage'
import { getUserbyID, getUserProjects } from '@/lib/ActionControler'



type Props = {
   
  params: Promise<{ id: string }>  // Ensure params is a Promise
}
const UserProfile = async ({ params }: Props)=> {
 
  let {id} = await params;
 // console.log(params.id)
    const result = await getUserbyID(id)  as {user : UserProfiles}
  //console.log(result.user , "result")
    if (!result?.user) return (
        <p className="no-result-text">Failed to fetch user info</p>
    )
   
  return (
    <ProfilePage user={result?.user}  />
  )
}

export default UserProfile
