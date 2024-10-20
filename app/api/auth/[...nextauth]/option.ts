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
import EmailProvider from 'next-auth/providers/email';


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
      _id: string;
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
            // LinkedIn OAuth provider
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
    }),
    
        
 // Credentials provider for phone authentication or custom credentials

 CredentialsProvider({
  name: 'Phone or Username',
  credentials: {
    phone: { label: 'Phone', type: 'text', placeholder: 'Enter your phone' },
    password: { label: 'Password', type: 'password' },
  },
  async authorize(credentials) {
    // Here, validate the user's phone number and password against your backend API
    const user = { id: '1', name: 'User', phone: credentials?.phone };
    if (user) return user;
    return null;
  },
})  

        
        ],
        pages: {
          signIn: '/auth/signIn', // Customize the sign-in page path
        },
    

  

    
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
