const jwt=require("jsonwebtoken");

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
        req.userInfo=decodeData;
        next();
    } catch (error) {
        console.log(error.message);
    }
}

module.exports=authMiddleware;