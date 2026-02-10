const mongoose=require("mongoose");

const feedSchema=new mongoose.Schema({
    feedpack:{
        type:Number,
        required:true,
        min:1
    },
    feedcategory:{
        type:String,
        enum:["New feed","Return feed"],
        default:"New feed"
    },
    feedtype:{
        type:String,
        enum:["Pre-starter","Starter","Finisher"],
        required:true
    },
     deliveredDate:{
        type:Date,
        default:Date.now()
    },
    deliveredby:{
        type:String,
        required:true
    },
    vehicleno:{
        type:String,
        required:true
    },
    batchid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Batch"
    },
     userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true});

module.exports=mongoose.model("Feed",feedSchema);   