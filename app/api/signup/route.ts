import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import Users from "@/lib/modals/User";
import { NextRequest, NextResponse } from "next/server";







export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json({ message: "Method Not Allowed" },{status:405});
  }

  const { name, email, password , image } = await req.json();
  console.log(req.json ,"req")
  if (!name || !email || !password || !image) {
    return NextResponse.json({ message: "All fields are required." },{status:400});
  }

  try {
   await dbConnect();
    

    // Check if the user already exists
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists." },{status:409});
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password as string, 10);
 console.log(hashedPassword  , "i am password")
    // Create the new user in the database
    const newUser = new Users({
      email,
      name,
      password:hashedPassword,
      image,
    });
    const result = await newUser.save();
    console.log(newUser , " user saved in b")
     if (!result) {
       return NextResponse.json({ message: "Internal server error to user create." },{ status:500});
     }
   

   return NextResponse.json({ message: "User created successfully!", userId: result.insertedId },{status:201});
  } catch (error) {
    console.error("Error during signup:", error);
  return  NextResponse.json({ message: "Internal server error." }, {status:500});
  }
}


