const express=require("express");
const { createNewBatch, updateBatch, getAllBatch, deleteBatch, getUserBatch, getDashboardData, getBatchDashboard, getUserHistory, getAllUsersDashboard, getAllUsersHistory, completeBatch} = require("../controller/batchController");
const authMiddleware=require("../middleware/authMiddleware")
const adminMiddleware=require("../middleware/adminMiddleware");
const route=express.Router();

route.get("/allbatch",getAllBatch);
route.get("/dashboard/:userid",getDashboardData);
route.get("/admin-dashboard",getAllUsersDashboard);
route.get("/batch-dashboard/:batchid",getBatchDashboard);
route.get("/history/:userid",getUserHistory);
route.get("/admin-history",getAllUsersHistory);
route.get("/:id",getUserBatch);
route.post("/newbatch",createNewBatch);
route.put("/complete/:batchid",authMiddleware,adminMiddleware,completeBatch);
route.put("/:id",authMiddleware,adminMiddleware,updateBatch);
route.delete("/:id",authMiddleware,adminMiddleware,deleteBatch);

module.exports=route;