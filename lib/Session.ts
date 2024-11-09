import { getServerSession } from "next-auth";
import { ProjectForm, SessionInterface } from "@/commom.types";
import { options } from "@/app/api/auth/[...nextauth]/option";
import Users from "./modals/User";
import dbConnect from "./mongodb";
import Project from "./modals/Project";


const isProduction = process.env.NODE_ENV === 'production';
const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : 'http://localhost:3000';

export async function getCurrentUser() {
const session = await getServerSession(options) as SessionInterface
//console.log( "i am session on frontend " ,session)
 return session
}
export const getUserbyID =async (id:string) =>{
  await dbConnect()
 try {
    let user = await Users.findById(id).lean().populate('projects');
    if (!user) {
      alert("User Not Found")
      console.log("user not found")
    }
    return {user}
 } catch (error) {
  return (error)
 }

}


export const getUserProjects = (id: string, last?: number) => {
   
  };
 

 

export const fetchToken = async () => {
    try {
      const response = await fetch(`${serverUrl}/api/auth/token`);
      return response.json();
      console.log(response.json())
    } catch (err) {
      throw err;
    }
  };

export const uploadImage = async (imagePath: string) => {
    try {
      const response = await fetch(`${serverUrl}/api/upload`, {
        method: "POST",
        body: JSON.stringify({
          path: imagePath,
        }),
      });
      return response.json();
    } catch (err) {
      throw err;
    }
  };


export async function CreateProject(form: ProjectForm, creatorId: string, token: string) {
     console.log(creatorId , "id on frontend")
     let userId = creatorId;
  try {
    const res = await fetch(`${serverUrl}/api/posts`,{
      method:'POST',
      headers:{
        'Content-Type': 'application/json', // Important for JSON parsing
        userId,
         token,
      },

      body:JSON.stringify(form)

    })

    const result = await res.json();
    console.log(result)
  } catch (error) {
    console.log(error)
  }


  const imageUrl = await uploadImage(form.image);

    if (imageUrl.url) {
       
        const variables = {
          input: { 
            ...form, 
            image: imageUrl.url, 
            createdBy: { 
              link: creatorId 
            }
          }
        };
    }
}
export const updateProject = async (form: ProjectForm, projectId: string, token: string) => {
    function isBase64DataURL(value: string) {
      const base64Regex = /^data:image\/[a-z]+;base64,/;
      return base64Regex.test(value);
    }
  
    let updatedForm = { ...form };
  
    const isUploadingNewImage = isBase64DataURL(form.image);
  
    if (isUploadingNewImage) {
      const imageUrl = await uploadImage(form.image);
  
      if (imageUrl.url) {
        updatedForm = { ...updatedForm, image: imageUrl.url };
      }
    }
  
   
  
    const variables = {
      id: projectId,
      input: updatedForm,
    };


    try {
     
      const response = await fetch(`${serverUrl}/api/posts/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedForm),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
      } else {
        console.log(data.error);
      }
    } catch (error) {
      console.log('Failed to update project');
    }
  
   
  };

  export const deleteProject = async (id: string) => {
    const res = await fetch(`${serverUrl}/api/posts/${id}`, {
      method: 'DELETE',
    });
  
    if (res.ok) {
      const data = await res.json();
      console.log('Project deleted:', data.message);
    } else {
      console.error('Failed to delete project');
    }
  };
  
  export const getAllProjectDetails = async (category?: string | null,) => {
    let data;
   
    try {
      const response = await fetch(`${serverUrl}/api/posts?category=${category}`);
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
       data = await response.json();
     // console.log(data)
      return data
    } catch (error: any) {
     console.log(error)
    }
  return data
  };
  export const getAllProjects = async () => {
    let data;
   
    try {
      const response = await fetch(`${serverUrl}/api/posts`);
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
       data = await response.json();
     // console.log(data)
      return data
    } catch (error: any) {
     console.log(error)
    }
  return data
  };
  export const getAllProject = async () => {
   
    let data;
   
    try {
      await dbConnect()
      data = await  Project.find({});
      return data
    } catch (error) {
      console.log(error)
      
    }
  
return data
  };

 export const fetchProjectById = async (id:any) => {
    let data;
    try {
      const res = await fetch(`${serverUrl}/api/posts/${id}`);
       data = await res.json();
      
      //console.log(data);
    } catch (error) {
      console.error('Failed to fetch project', error);
    }

    return data;
  };
 
 export const fetchUserByEmail = async (email:string) => {
    try {
      const response = await fetch(`/api/user/${email}`);
      if (!response.ok) {
        throw new Error('User not found');
      }
      const user = await response.json();
      console.log('Fetched User:', user);
      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };
