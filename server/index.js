import express from "express";
import {registeruser,loginuser} from "./Controller/Registration_control.js";
import Connection from "./Connection/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";



const app=express();
const PORT=8000;

//using middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors());



app.get("/",(req,res)=>{
    res.status(200).send("you are active");
})

app.post("/regestration",registeruser);
app.post("/login",loginuser);


Connection();
// const UserModel=mongoose.Schema({
//     name:String,
//     location:String,
//     email:String,
//     phone:String
// });
// mongoose.model('registeruser',UserModel);

//creating collection


app.listen(PORT,()=>{
    console.log("server is working");
})