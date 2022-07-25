import mongoose from "mongoose";

const UserModel=mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique: true
    },
    email:{
        type:String,
        require:true,
        unique: true
    },
    phone:{
        type:String,
        require:true,
        unique: true
    },
password:{
    type:String,
    require:true
},
   
},{timestamps:true});
 const mycollection=mongoose.model('registeruser',UserModel);
 export default mycollection;