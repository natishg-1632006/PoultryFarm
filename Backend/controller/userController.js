const User=require("../model/userModel");
const bcryptjs=require("bcryptjs");
const jwt=require("jsonwebtoken");
const userRegister=async (req,res)=>{
    try {
        const {username,email,password,role}=req.body;
        const isUserFound=await User.findOne({$or:[{username},{email}]});
        if(isUserFound){
            res.status(400).json({
                success:false,
                message:"username or email is already found"
            })
        }

        const hashedPassword=await bcryptjs.hash(password,10);

        const newlyCreatedUser=await User.create({
            username,
            email,
            password:hashedPassword,
            role:role || "user"
        })

        if(!newlyCreatedUser){
            res.status(400).json({
                success:false,
                message:"username not created"
            })
        }

        res.status(201).json({
            success:true,
            message:"username created successfully",
            data:newlyCreatedUser
        })

    } catch (error) {
        console.log(error.message);
    }
}

const userLogin=async (req,res)=>{
    try {
    const {username,password}=req.body;

    const userData=await User.findOne({username});

    if(!userData){
        res.status(400).json({
            success:false,
            message:"username not found"
        })
    }

    const isPasswordMatch=await bcryptjs.compare(password, userData.password);

    if(!isPasswordMatch){
         res.status(400).json({
            success:false,
            message:"incorrect password"
        })
    }

    const token=await jwt.sign({
        userid:userData._id,
        username:userData.username,
        email:userData.email,
        role:userData.role
    },process.env.JWT_SECRET_KEY,{expiresIn:"1d"});

    if(!token){
         res.status(400).json({
            success:false,
            message:"token not found"
        })
    }

    res.status(200).json({
        success:true,
        message:"Token created successfully",
        token:token
    })
    } catch (error) {
        console.log(error.message);
    }

}

module.exports={userRegister,userLogin}