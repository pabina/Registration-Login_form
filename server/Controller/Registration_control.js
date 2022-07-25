import mycollection from "../Model/Schema.js";
// import pkg from "jsonwebtoken";
// import  pkg2 from "bcrypt";

import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

// const {JWT}=pkg;
// const {bcrypt}=pkg2;





//for registration
export const registeruser=async(req,res,next)=>{
try{
// const data=await req.body;
const hashedPassword = await bcrypt.hash(req.body.password, 10);
//username check
const user = await mycollection.findOne({ username: req.body.username });
    if (user) {
      return res.status(400).json({
        error: "Username already exist",
      });
    }

    //email check
    const email = await mycollection.findOne({ email: req.body.email });
    if (email) {
      return res.status(400).json({
        error: "Email already exist",
      });
    }
    //creating new user
    const newUser = new mycollection({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
        // password: req.body.password
      });
      //to save into collection
      const user1 = await newUser.save();
    res.status(200).json(user1);
  } catch (error) {
    next(error);
  }
}

// res.status(200).send(data);
// registeruser.save();
// const newdata=new mycollection(data);
// newdata.save();
// }catch(err){
//     console.log(err);
// }
// }

export const loginuser =async(req,res,next)=>{
   
   try{
    const user = await mycollection.findOne({ username: req.body.username });
    if (user) {
        const validPassword = await bcrypt.compare(
          req.body.password,
          user.password
        );

        if (validPassword) {
            //create token
            const token = Jwt.sign(
              {
                id: user._id,
                username: user.username,
                
              },
            //   process.env.JWT_SECRET,
            "123456jhgfdsxcvbnmmnbvxcvbnjhg",
              { expiresIn: "3d" }
            );

            //now saving the token in the cookies
        const { password, ...others } = user._doc;
        res
          .cookie("access_token", token, { httpOnly: true })
          .status(200)
          .json(others);
      } else {
        return next(createError(401, "Invalid password"));
      }
    } else {
      return next(createError(401, "User not found "));
    }



        

   }catch(err){
   console.log(err)
   }


        }
          
    













    // const logindata=await req.body;
    // const {username,email,password}=logindata;

//for validation
    // mycollection.findOne({email:email},(err,logindata)=>{
    //     if(logindata){
    //         if(password===logindata.password){
    //             console.log("login successfull",logindata);
    //         }
    //         else{
    //             console.log("password didnt match");
    //         }}
    //         else{
    //             console.log("user is not resigsterd");
    //         }
    //     }
    // );
    
   
