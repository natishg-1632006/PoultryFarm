const express=require("express");
const { userRegister, userLogin } = require("../controller/userController");

const route=express.Router();

route.post("/register",userRegister);
route.post("/login",userLogin);

module.exports=route;