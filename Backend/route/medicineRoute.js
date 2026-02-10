const express=require("express");
const { getCurrentMedicine, createNewMedicine, updateMedicine, deleteMedicine }=require("../controller/medicineController")

const route=express.Router();

route.get("/:id",getCurrentMedicine);
route.post("/addmedicine",createNewMedicine);
route.put("/:id",updateMedicine);
route.delete("/:id",deleteMedicine);

module.exports=route