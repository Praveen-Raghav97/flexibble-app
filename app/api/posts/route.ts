// /pages/api/post.js

import { ProjectInterface } from "@/commom.types";
import Project from "@/lib/modals/Project";
import Users from "@/lib/modals/User";
import dbConnect from "@/lib/mongodb";
import { request } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import { headers } from "next/headers";

import { NextRequest, NextResponse } from "next/server";

interface Post {
    createdBy: string;
    title: string;
    description: string;
    livesiteUrl: string;
    githubUrl: string;
    category: string;
  }
/*
const handler= async(req:NextRequest , res:NextResponse) => {
  if (req.method === 'POST') {
   await dbConnect()
    try {
       
      const Post= req.body ;
 console.log(req.body)
    // Validate the incoming data
    if (//!postData || !postData.title || !postData.description || !postData.livesiteUrl || !postData.githubUrl || !postData.category || !postData.createdBy
        !Post) {
        return NextResponse.json({
          error: 'All fields are required.',
        } , {status:400});
      }
   
      // Insert post into collection
      const result = await Project.create({
  Post
      });

      // Respond with success
    return  NextResponse.json({ message: 'Post created', postId: result}, {status:200});
    } catch (error) {
        console.log(error)
     return NextResponse.json({error} , {status:500});
    }
  } else {
  return  NextResponse.json({ message: 'Method not allowed'  }, {status:405});
  }
}*/



interface Project {
  title: string,
  description: string,
  image:string,
  livesiteUrl:string,
  githubUrl:string,
  

  // Add other project fields as necessary
}

const handler = async (req:NextRequest) => {
  if (req.method === 'POST') {
    try {
        const {title, description , image , githubUrl , livesiteUrl ,category , userId} = await req.json();
        console.log(req.json)
        await dbConnect()
        const user = await Users.findById(userId);
        if (!user) {
          return NextResponse.json({ message: 'User not found' },{status:400});
        }

        const newproject = await Project.create({title,description , image , githubUrl , livesiteUrl ,category , createdBy:user._id})
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
       const projects = await Project.find({category});
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
