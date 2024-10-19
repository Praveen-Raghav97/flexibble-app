import type { NextAuthOptions, User } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google';
import LinkedInProvider from 'next-auth/providers/linkedin';
import img from './pic4.png'
import jsonwebtoken from 'jsonwebtoken'
import { JWT } from "next-auth/jwt";
import { SessionInterface, UserProfile } from "@/commom.types";
import dbConnect from '@/lib/mongodb';



import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { AdapterUser } from 'next-auth/adapters';
import { NextResponse } from 'next/server';
import Users from '@/lib/modals/User';




// Type for session callback
interface CustomSession {
  user: {
    id: string;
  };
}
interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
      image?: string;
    };
}
export const options: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
          }),

        
        ],
    
   // adapter: MongoDBAdapter(clientPromise),
   jwt: {
    encode: ({ secret, token }) => {
      const encodedToken = jsonwebtoken.sign(
        {
          ...token,
          iss: "grafbase",
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        secret
      );
      
      return encodedToken;
    },
    decode: async ({ secret, token }) => {
      const decodedToken = jsonwebtoken.verify(token!, secret);
      return decodedToken as JWT;
    },
  },
    theme:{
      logo:'https://w7.pngwing.com/pngs/741/124/png-transparent-flexibility-symbol-logo-classroom-physical-flexibility-miscellaneous-purple-violet-thumbnail.png',
        colorScheme:"light",
       
    }, 

    callbacks:{
      async session({session}){
       await dbConnect();
        const email = session?.user?.email as string;
        try {
          const data = await Users.findOne({email})as{user?: UserProfile}
         console.log("i am data" , data)
    // console.log(data)
          const newSession = {
            ...session,
       
            user: {
             ...data?.user,
              ...session.user,
              
            },
          };
  //console.log(newSession)
          return newSession;
        } catch (error:any) {
          console.error("Error retrieving user data: ", error.message);
          return session;
        }
       
      },
      async signIn({user}:
        {user:AdapterUser | User} )
      {
        await dbConnect();
        try {

          const existsUser = await Users.findOne({email:user.email})

          if(!existsUser){
            console.log("no exists user");
         //   create new user
             const newUser = await Users.create({
             
          name: user.name,
          email: user.email,
          image: user.image,
             })
          }
          return true;
        } catch (error:any) {
          console.log("Error checking if user exists: ", error.message);
          return false;
        }
      }
    }

    ,
      secret: process.env.NEXTAUTH_SECRET!,

}

export const createUser = async (name: string, email: string, avatarUrl: string) => {
 // client.setHeader("x-api-key", apiKey);

  const variables = {
    input: {
      name: name,
      email: email,
      avatarUrl: avatarUrl
    },
  };


 try {
   const user = await Users.create({variables});
   if (!user) {
    return NextResponse.json("something went wrong create user")
   }
   return NextResponse.json({user});
 } catch (error) {
 return Response.json({error})
 };


};

export const getUser = async(email: string) => {
 // client.setHeader("x-api-key", apiKey);
 let existsUser
 try {
    existsUser = await Users.findOne({email:email})
   
 }
  catch (error) {
   console.log(error)
 }
 if (!existsUser) {
  return NextResponse.json("User Not Found")
 }
 return NextResponse.json({existsUser})
}
