const Feed=require("../model/feedModel");

const currentBatchFeed=async(req,res)=>{
    try {
        const batchid=req.params.id;
        const result=await Feed.find({batchid});
        if(!result){
            res.status(400).json({
                success:false,
                message:"No feed data found"
            })
        }

        res.status(200).json({
            success:true,
            message:"Feed data fetched",
            data:result
        })
    } catch (error) {
        console.log(error.message);
    }
}

const createNewFeed=async(req,res)=>{
    try {
        const result=await Feed.create(req.body);

        if(!result){
            res.status(400).json({
                success:false,
                message:"New feed data will not found"
            })
        }

        res.status(201).json({
            success:true,
            message:"New feed data stored in database",
            data:result
        })
    } catch (error) {
        console.log(error.message);
    }
}

const updateFeed=async (req,res)=>{
    try {
        const entryid=req.params.id;
        const result=await Feed.findByIdAndUpdate(entryid,req.body,{new:true});
        if(!result){
            res.status(400).json({
                success:false,
                message:"feed data will not found"
            })
        }

        res.status(200).json({
            success:true,
            message:"Feed data updated in database",
            data:result
        })
    } catch (error) {
        console.log(error.message);
    }
}

const deleteFeed=async (req,res)=>{
    try {
        const entryid=req.params.id;
        const result=await Feed.findByIdAndDelete(entryid);
        if(!result){
            res.status(400).json({
                success:false,
                message:"Feed data will not found"
            })
        }

        res.status(200).json({
            success:true,
            message:"Feed data deleted in database"
        })
    } catch (error) {
        console.log(error.message);
    }
}

module.exports={createNewFeed,currentBatchFeed,updateFeed,deleteFeed}