const express=require("express");
const { createNewBatch, updateBatch, getAllBatch, deleteBatch } = require("../controller/batchController");
const authMiddleware=require("../middleware/authMiddleware")
const adminMiddleware=require("../middleware/adminMiddleware");
const route=express.Router();

route.get("/allbatch",getAllBatch);
route.post("/newbatch",authMiddleware,adminMiddleware,createNewBatch);
route.put("/:id",authMiddleware,adminMiddleware,updateBatch);
route.delete("/:id",authMiddleware,adminMiddleware,deleteBatch);

module.exports=route;