import Project from "@/lib/modals/Project";
import dbConnect from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";



// GET PROJECT BY Id request handler to remove a project by ID
export async function GET(req: NextRequest) {
  const id = req.nextUrl.pathname.split('/').pop();
  console.log(id)
    // Simulated data fetch based on ID
    const project = await Project.findById(id).populate('createdBy'); // Replace this with your actual database fetching logic
   
    if (project) {
      return NextResponse.json({project:project},{status:200});
    } else {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }
  }  
 // DELETE request handler to remove a project by ID
export async function DELETE(req: NextRequest) {
  // Extract the 'id' from the URL query
  const id = req.nextUrl.pathname.split('/').pop();
console.log(id)
if (!id) {
       return NextResponse.json({ error: "ID parameter is missing" }, { status: 400 });
}
try {
    // Find index of project with matching ID
    await dbConnect()
    let existProject = await Project.findByIdAndDelete(id)
  
    if (!existProject) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }
  
  
    return NextResponse.json({ message: 'Project deleted successfully' }, { status: 200 });
} catch (error) {
  console.log(error)
}
}

// EDIT request handler to remove a project by ID
export async function PUT(req: NextRequest ) {
  const id = req.nextUrl.pathname.split('/').pop();
  
    try {
      
      const updatedProjectData = await req.json();
  
      // Find and update the project in MongoDB
      const result = await Project.findByIdAndUpdate(id ,updatedProjectData)
  console.log(result)
      if (!result) {
        return NextResponse.json({ message: 'Project not found' }, { status: 404 });
      }
  
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: 'Error updating project', error }, { status: 500 });
    }
  }