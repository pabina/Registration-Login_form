import mongoose from "mongoose";

const Connection= async()=>{
const url=`mongodb://localhost:27017/register_db`;
 await mongoose.connect(url,{useunifiedTopology:true,useNewurlparser:true})
 console.log("database connected");
}

export default Connection;