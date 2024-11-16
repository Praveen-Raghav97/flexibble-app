import type { NextAuthOptions, User } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google';
import LinkedInProvider from 'next-auth/providers/linkedin';
import img from './pic4.png'
import jsonwebtoken from 'jsonwebtoken'
import { JWT } from "next-auth/jwt";
import { SessionInterface, UserProfiles } from "@/commom.types";
import dbConnect from '@/lib/mongodb';
import EmailProvider from 'next-auth/providers/email';
SignIn
import bcrypt, { compare } from 'bcryptjs'
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { AdapterUser } from 'next-auth/adapters';
import { NextResponse } from 'next/server';
import Users from '@/lib/modals/User';
import SignIn from '../../../../components/signin';
SignIn





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

// Credentials provider for phone authentication or custom credentials
      CredentialsProvider({
        name: 'Email',
        credentials: {
          email: { label: 'Email', type: 'email', placeholder: 'Enter your Email' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials) {
          if (!credentials) return null;

          await dbConnect();
          // Here, validate the user's phone number and password against your backend API
             console.log(credentials)

       // Logic for authenticating the user
       const user = await Users.findOne({ email: credentials.email });

       if (!user) {
        throw new Error("No user found with the entered email");
      }

      const isValidPassword = await compare(credentials.password, user.password);
      if (!isValidPassword) {
        throw new Error("Invalid password");
      }

      return  {_id: user._id,
      name: user.name,
      email: user.email,
     // image: user.image || '', // optional field;
      }
    },
  }),

  

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
    
        
 



        
        ],

        pages:{
          signIn:'/signin'
       //   signup:'/signup'
        },
      
theme:{
  colorScheme:'light',
  brandColor: 'black',


  
}
, 
        callbacks: {
          async jwt({ token, account }) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
              token.accessToken = account.access_token
            }
            return token
          },
          async session({ session, token , user }) {
            // Send properties to the client, like an access_token from a provider.
            const email = session?.user?.email as string;
            let data = await Users.findOne({email}).lean() as {
              _id: string; user?: UserProfiles 
}
           
             
           //console.log("i am data" , data)

            const newSession = {
              ...session,
              user:{
               // data
                _id: data._id.toString(),
               ...session.user
              }
        
           
            };
      
          return newSession;
          },

          async signIn({ user }: {
            user: AdapterUser | User
          }) {
         
         
            try {
              const userExists = await getUser(user?.email as string) as { user?: UserProfiles }
              
              if (!userExists.user) {
                await createUser(user.name as string, user.email as string, user.image as string)
              }
      
              return true;
            } catch (error: any) {
              console.log("Error checking if user exists: ", error.message);
              return false;
            }
          },
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
    existsUser = await Users.findOne({email:email}).lean()
   
 }
  catch (error) {
   console.log(error)
 }
 if (!existsUser) {
  return NextResponse.json("User Not Found")
 }
 return NextResponse.json({existsUser})
}
