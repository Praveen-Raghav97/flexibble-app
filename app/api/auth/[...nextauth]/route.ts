/*import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import LinkedInProvider from 'next-auth/providers/linkedin';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions , User } from 'next-auth';
import logo from "./logo.svg"
import { prisma } from '@/lib/prisma';
import { AdapterUser } from "next-auth/adapters";
import { PrismaClient } from '@prisma/client/extension';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID || '',
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET || '',
    }),
   /* CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'Email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });
        if (!user) {
          throw new Error('No user found');
        }
        const isValidPassword = await compare(credentials?.password, user.password);
        if (!isValidPassword) {
          throw new Error('Invalid password');
        }
        return user;
      },
    }),*/
 /* ],
  theme:{
    logo:'./logo.svg',
    colorScheme:"light",
    
  },
  callbacks:{
    async session({ session }) {
      console.log(session);
      return session;
    /*  const email = session?.user?.email as string;

      try { 
       // const data = await getUser(email) as { user?: UserProfile }

        const newSession = {
          ...session,
          user: {
            ...session.user,
            ...data?.user,
          },
        };

        return newSession;
      } catch (error: any) {
        console.error("Error retrieving user data: ", error.message);
        return session;
      }*/
  /*  },
  /*  async signIn({ user }: {

      user: AdapterUser | User
    }) {
      try {
      //  const userExists = await prisma(user?.email as string) as { user?: UserProfile }
        
        if (!userExists.user) {
          await createUser(user.name as string, user.email as string, user.image as string)
        }

        return true;
      } catch (error: any) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },*/

  /*},
  
  secret: process.env.NEXTAUTH_SECRET,
};


const handler = NextAuth(authOptions);

// Export the POST method
export { handler as POST };
export { handler as 
  GET
 };*/

// Optionally export other HTTP methods like GET if needed
// export { handler as GET };

import NextAuth from 'next-auth'
import { options } from './option'

const handler = NextAuth(options)

export { handler as GET, handler as POST }

