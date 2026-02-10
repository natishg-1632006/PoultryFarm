const adminMiddleware=(req,res,next)=>{
    if(req.userInfo.role!=="admin"){
        res.status(400).json({
            success:false,
            message:"Only admin can access"
        })
    }
    next();
}

module.exports=adminMiddleware;