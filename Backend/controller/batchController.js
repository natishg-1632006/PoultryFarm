const Batch=require("../model/batchModel");
const User=require("../model/userModel");

const getAllBatch=async (req,res)=>{
    try {
        const batchData=await Batch.find({});
        if(!batchData){
            res.status(400).json({
                success:false,
                message:"No batch found"
            })
        }
        res.status(200).json({
            success:true,
            message:"Featched all data",
            data:batchData
        })
    } catch (error) {
        console.log(error.message);
    }
}

const getUserBatch=async (req,res)=>{
try {
    const id=req.params.id;
    const batchData=await Batch.findOne({userid:id,batchStatus:"Active"});
    if(!batchData){
         res.status(200).json({
        success:false,
        message:"Batch not found",
    })
    }
    res.status(200).json({
        success:true,
        message:"Batch data fetched",
        batch:batchData
    })
} catch (error) {
    console.log(error.message);
}
}

const createNewBatch = async (req, res) => {
    try {

        const { userid } = req.body;

        if (!userid) {
            return res.status(400).json({
                success: false,
                message: "User id is required"
            });
        }

        const userData = await User.findById(userid);

        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const batchCount = await Batch.countDocuments({ userid });

        const batchName = `${userData.username}-batch-${batchCount + 1}`;   

        const newlycreatedBatch = await Batch.create({
            ...req.body,
            batchname: batchName,
            userid
        });

        return res.status(201).json({
            success: true,
            message: "New batch added successfully",
            data: newlycreatedBatch
        });

    } catch (error) {
   console.log("FULL ERROR:", error);
   return res.status(500).json({
      success: false,
      message: error.message
   });
}

};

const updateBatch=async (req,res)=>{
    try {
        const batchId=req.params.id;
        const updatedData=await Batch.findByIdAndUpdate(batchId,req.body,{new:true});
        if(!updatedData){
            res.status(400).json({
                success:false,
                message:"Batch data will not updated"
            })
        }
        res.status(200).json({
            success:true,
            message:"Batch data updated successfully",
            updatedData:updatedData
        })
    } catch (error) {
        console.log(error.message);
    }
}

const deleteBatch=async (req,res)=>{
    try {
        const batchId=req.params.id;
        const deletedData=await Batch.findByIdAndDelete(batchId);
        if(!deleteBatch){
            res.status(400).json({
                success:false,
                messagee:"Batch data deleted"
            })
        }
        res.status(200).json({
            success:true,
            message:"Batch data deleted successfull",
        })
    } catch (error) {
        console.log(error.message);
    }
}

module.exports={getAllBatch,createNewBatch,updateBatch,deleteBatch,getUserBatch};