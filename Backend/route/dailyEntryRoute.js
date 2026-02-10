const express=require("express");
const {createNewEntry,currentBatchEntry, updateDailyEntry, deleteDailyEntry}=require("../controller/dailyEntryController")

const route=express.Router();

route.get("/:id",currentBatchEntry);
route.post("/newentry",createNewEntry);
route.put("/:id",updateDailyEntry);
route.delete("/:id",deleteDailyEntry);

module.exports=route;