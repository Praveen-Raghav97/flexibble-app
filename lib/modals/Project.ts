import mongoose, { Schema, model, models, Document } from 'mongoose';
import Users from './User';

export interface IProject extends Document {
  title: string;
  description: string;
  image: string;
  livesiteUrl:string;
  githubUrl:string;
  category:string;
  createdBy:String;

}

const projectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  description: { type: String, required: true, unique: true },
  image: { type: String },
  livesiteUrl: { type: String, required: true },
  githubUrl: { type: String, required: true },
  category: { type: String, required: true },
  createdBy: { 
  type:mongoose.Types.ObjectId,
  ref:"Users"
  },
});

const Project = models?.Project || model<IProject>('Project', projectSchema);

export default Project;
