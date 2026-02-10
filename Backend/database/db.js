const mongoose=require("mongoose");

const connetDb=async ()=>{
    try {
       await mongoose.connect(process.env.DB_URL);
       console.log("DataBase conneted successfully");
    } catch (error) {
     console.log(error.message);
    }
}
mongoose.connection.once("open", () => {
  console.log("Connected DB:", mongoose.connection.name);
});


module.exports=connetDb;