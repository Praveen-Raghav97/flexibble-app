// /pages/api/post.js

import { ProjectInterface } from "@/commom.types";
import Project from "@/lib/modals/Project";
import Users from "@/lib/modals/User";
import dbConnect from "@/lib/mongodb";
import { request } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import { headers } from "next/headers";

import { NextRequest, NextResponse } from "next/server";

interface FormData {
    createdBy:string;
    title: string;
    description: string;
    livesiteUrl: string;
    githubUrl: string;
    category: string;
  }




interface Project {
  title: string,
  description: string,
  image:string,
  livesiteUrl:string,
  githubUrl:string,
  

  // Add other project fields as necessary
}



const handler = async (req:NextRequest,  res: NextApiResponse) => {
  if (req.method === 'POST') {

    try {

        // Get the user ID and token from headers
        const userId = req.headers.get('userId') as string;
        const token = req.headers.get('token') as string;
         
      
           // console.log(req.headers , "user id backend")
           //console.log(formData)
         //  console.log(userId , "id in back")
         
        // Ensure token and userId are present (you can add more validation as needed)
        if (!userId) {
          return NextResponse.json({ message: 'Missing userId or token' },{status:400});
        }
       
        const {title, description , image , githubUrl , livesiteUrl ,category } = await req.json();
        //console.log(formData)
        await dbConnect()
        const user = await Users.findById(userId);
        if (!user) {
          return NextResponse.json({ message: 'User not found' },{status:400});
        }

        const newproject = await Project.create({title,description , image , githubUrl , livesiteUrl ,category , createdBy:userId})
     //  const newproject = await Project.create(formData)
        if (!newproject) {
            return NextResponse.json({ message: 'Internal error' },{status:400}); 
        }

        const savedProject = await newproject.save();
        user.projects.push(savedProject._id);
        await user.save(); // Save the updated user
        
        
    
        // Respond with a success message
        return NextResponse.json({ message: 'Project created successfully', savedProject },{status:200});
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Internal Error' },{status:500});
    }
  } else {
    return NextResponse.json({ message: 'Method not allowed' },{status:405});
  }
};

const GetProjects = async (req:NextRequest) => {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
console.log(category)
    if (req.method === 'GET') {
    try {
       await dbConnect()
       const projects = await Project.find({category}).populate('createdBy' );
       if (!projects || projects.length === 0) {
        return NextResponse.json({message:"No Projects Found"},{status:400})
       }
       return NextResponse.json(projects,{status:200})
    } catch (error) {
        return NextResponse.json({error},{status:500})
    }
   
    } else {
      return NextResponse.json({ message: 'Method not allowed' },{status:405});
    }
  };
  
export {handler  as POST};
export {GetProjects  as GET};


//export { handler as POST };
