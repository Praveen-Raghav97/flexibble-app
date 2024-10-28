import { User, Session } from 'next-auth'

export type FormState = {
    title: string;
    description: string;
    image: string;
    livesiteUrl: string;
    githubUrl: string;
    category: string;
};

export interface ProjectInterface {
    title: string;
    description: string;
    image: string;
    livesiteUrl: string;
    githubUrl: string;
    category: string;
    _id: string;
    createdBy: {
      name: string;
      email: string;
      avatarUrl: string;
      id: string;
    };
}

export interface UserProfiles {
  [key: string]: string | null; // Allow null values
    
    id: string;
    name: string;
    email: string;
    description: string | null;
    avatarUrl: string;
    githubUrl: string | null;
    linkedinUrl: string | null;
   
      
    };


export interface SessionInterface extends Session {
  user: User & {
    _id: string ;
    name: string ;
    email: string  ;
    image?: string ; 
  };
}

export interface ProjectForm {
  title: string;
  description: string;
  image: string;
  livesiteUrl: string;
  githubUrl: string;
  category: string;
}