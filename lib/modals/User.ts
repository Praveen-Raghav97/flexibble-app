import { url } from 'inspector';
import mongoose, { Schema, model, models, Document } from 'mongoose';
import { Url } from 'url';
import Project from './Project';

export interface IUsers extends Document {
  name: string;
  email: string;
  image: Url;
  description:string;
  githubUrl:Url,
  linkedinUrl:Url,
  projects:string,
}

const userSchema:any = new Schema<IUsers>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  description:{type:String},
  githubUrl:{type:String},
  linkedinUrl:{type:String},
  projects:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Project"
    }
  ]
 
});

const  Users = models?.Users || model<IUsers>('Users', userSchema);

export default Users
