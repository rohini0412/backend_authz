const User = require("../models/User") ;
const bcrypt = require("bcrypt") ;
const jwt = require("jsonwebtoken") ;
require("dotenv").config() ;

exports.signup=async(req,res)=>{
    try{
        const{name , email ,password , role} = req.body ;
        const existingUser = await User.findOne({email}) ;
        if(existingUser){
            return res.status(400).json({
                success : false ,
                message : "already existing user" ,
            })
        }

        let hashedpassword ;
        try{
            hashedpassword = await  bcrypt.hash(password , 10)
        }

        catch(error){
            return res.status(400).json({
                success :false ,
                message :"password is not hashed" ,
            })
        }

        const user = await User.create({
            name , email , password :hashedpassword , role
        })

        return res.status(200).json({
            success :true ,
            message :"successfully signed up"
        })
    }

    catch(error){
        return res.status(400).json({
            success:false ,
            message : "not able to signup" ,
        })
    }
}


exports.login=async(req ,res)=>{
    try{
          const {email , password} = req.body ;
          if(!email || !password){
            return res.status(400).json({
             success: false ,
             message :"Fill the details properly" ,
            })
          }

          const user = await User.findOne({email}) ;
          if(!user){
            return res.status(401).json({
                return : false ,
                message:"no user found with such email" ,
            })
          }

           const payload ={
            email :user.email ,
            role :user.role ,
            id:user._id ,
           } 

          if(await bcrypt.compare(password , user.password)){

            let token = jwt.sign(payload , process.env.JWT_SECRET ,{
                expiresIn : "2h",
            }) ;

            

            const options={
                expires :new Date(Date.now()+ 3*24*60*60*1000) ,
                httpOnly :true ,
            }
            let updatedUser = user.toObject();
      updatedUser.token = token;
      updatedUser.password = undefined;

            res.cookie("rohiniToken" , token , options).status(200).json({
                success :true ,
                token ,
                user: updatedUser,
                 message:"user logged-in successfully",
            })
          }

          else {
            return res.status(403).json({
                success :false ,
                message :"incorrect password"
            })
          }
    }

    catch(error){
          return res.status(400).json({
            success :false ,
            message : "error in login you in try again later : ( "
          })
    }
}