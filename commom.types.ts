import { User, Session } from 'next-auth'
import { Project } from 'next/dist/build/swc/types';

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
      image: string;
      _id: string;
    };
}

export interface UserProfiles {
    [x: string]: any;
 // [key: string]: string | null; // Allow null values
    
    id: string;
    name: string;
    email: string;
    description: string | null;
    image: string | null ;
    githubUrl: string | null;
    linkedinUrl: string | null;
    projects: Project[];
      
    };


export interface SessionInterface extends Session {
  user: User & {
    _id: string ;
    name: string ;
    email: string  ;
    image: string ; 
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