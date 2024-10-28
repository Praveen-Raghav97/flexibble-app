import mongoose from "mongoose";


  const  dbConnect = async  () =>{
   await mongoose.connect(process.env.MONGODB_URI as string)
    //console.log("db Connected");
} 
export default dbConnect