import { UserProfiles  } from '@/commom.types';
import ProfilePage from '@/components/ProfilePage'
import { getUserbyID, getUserProjects } from '@/lib/Session'



type Props = {
    params: {
        id: string,
    },
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
