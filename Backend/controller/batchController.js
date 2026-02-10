const Batch=require("../model/batchModel");

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

const createNewBatch=async (req,res)=>{
    try {
        const newlycreatedBatch=await Batch.create(req.body);
        if(!newlycreatedBatch){
            res.status(400).json({
                success:false,
                message:"Batch not created"
            })
        }
        res.status(201).json({
            success:true,
            message:"New batch added successfully",
            data:newlycreatedBatch
        })
    } catch (error) {
        console.log(error.message);
    }
}

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

module.exports={getAllBatch,createNewBatch,updateBatch,deleteBatch};