require("dotenv").config();
const express=require("express");
const cors = require("cors");
const connetDb = require("./database/db");
const userRoute=require("./route/userRoute");
const batchRoute=require("./route/batchRoute");
const dailyEntryRoute=require("./route/dailyEntryRoute");
const feedRoute=require("./route/feedRoute");
const medicineRoute=require("./route/medicineRoute");

const app=express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true               
}));



connetDb();

app.use("/api/auth/",userRoute);
app.use("/api/batch/",batchRoute);
app.use("/api/dailyentry/",dailyEntryRoute);
app.use("/api/feed/",feedRoute);
app.use("/api/medicine/",medicineRoute);

const PORT=process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Server connected successfully ${PORT}`); 
});