const jwt=require("jsonwebtoken");
const User=require("../model/userModel");

const authMiddleware=async (req,res,next)=>{
    const authHeader=req.headers["authorization"];

    const token=authHeader && authHeader.split(" ")[1];

    if(!token){
        return res.status(400).json({
            success:false,
            message:"Access denide no JWT token found"
        })
    }

    try {
        const decodeData=jwt.verify(token,process.env.JWT_SECRET_KEY);
        if(!decodeData){
            return res.status(200).json({
                success:false,
                message:"Invalid token"
            })
        }
        
        const userFound=await User.findById({_id:decodeData.userid});
        
        if(!userFound){
            return res.status(200).josn({
                success:false,
                message:"user not found"
            })
        }
        req.userInfo=decodeData;
        res.status(200).json({
            success:true,
            message:"Valid users",
            user:req.userInfo
        })
        next();
    } catch (error) {
       res.status(500).json({
        success:false,
        message:"Server side error"
       })
    }
}

module.exports=authMiddleware;