import Users from "@/lib/modals/User";
import dbConnect from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";



 const handler = async(req: NextRequest) => {
  if (req.method !== 'GET') {
    return NextResponse.json({message:'Method not allowed' }  ,{status:405} );
  }

  try {
    const  email  = req.nextUrl.searchParams.get('email')
   // console.log(req.query)
   
  console.log(email , "email ")
        await dbConnect()
    

    const user = await Users.findOne({ email: email });

    if (!user) {
        return NextResponse.json({message:'User not found' }  ,{status:404} );
    }

    return NextResponse.json(user   ,{status:200} );
  } catch (error) {
    console.log(error)
    return NextResponse.json({message:'Internal server error' , error:error }  ,{status:500} );
  }
}

export { handler as GET, handler as POST }
