const express=require("express");
const {createNewFeed,currentBatchFeed, updateFeed, deleteFeed}=require("../controller/feedController");

const route=express.Router();

route.post("/addFeed",createNewFeed);
route.get("/:id",currentBatchFeed);
route.put("/:id",updateFeed);
route.delete("/:id",deleteFeed);

module.exports=route;