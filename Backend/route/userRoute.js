const express=require("express");
const { userRegister, userLogin } = require("../controller/userController");
const authMiddleware=require("../middleware/authMiddleware");
const { verify } = require("jsonwebtoken");

const route=express.Router();

route.post("/register",userRegister);
route.post("/login",userLogin);
route.get("/verify",authMiddleware,verify);

module.exports=route;