const Batch=require("../model/batchModel");
const User=require("../model/userModel");
const DailyEntry=require("../model/dailyEntryModel");
const Feed=require("../model/feedModel");
const Medicine=require("../model/medicineModel");

const getAllBatch=async (req,res)=>{
    try {
        const batchData=await Batch.find({});
        if(!batchData){
            return res.status(400).json({
                success:false,
                message:"No batch found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Featched all data",
            data:batchData
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const getUserBatch=async (req,res)=>{
try {
    const id=req.params.id;
    console.log(id);
    
    const batchData=await Batch.findOne({userid:id,batchStatus:"Active"});
    if(!batchData){
         return res.status(200).json({
        success:false,
        message:"Batch not found",
    })
    }
    return res.status(200).json({
        success:true,
        message:"Batch data fetched",
        batch:batchData
    })
} catch (error) {
    console.log(error.message);
    return res.status(500).json({
        success:false,
        message:error.message
    })
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
            return res.status(400).json({
                success:false,
                message:"Batch data will not updated"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Batch data updated successfully",
            updatedData:updatedData
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const deleteBatch=async (req,res)=>{
    try {
        const batchId=req.params.id;
        const deletedData=await Batch.findByIdAndDelete(batchId);
        if(!deletedData){
            return res.status(400).json({
                success:false,
                message:"Batch data not found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Batch data deleted successfull",
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const getDashboardData = async (req, res) => {
    try {
        const { userid } = req.params;
        
        const activeBatch = await Batch.findOne({ userid, batchStatus: "Active" });
        
        if (!activeBatch) {
            return res.status(200).json({
                success: false,
                message: "No active batch found"
            });
        }

        const dailyEntries = await DailyEntry.find({ batchid: activeBatch._id }).sort({ createdAt: -1 });
        const feedEntries = await Feed.find({ batchid: activeBatch._id }).sort({ createdAt: -1 });
        const medicineEntries = await Medicine.find({ batchid: activeBatch._id }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Dashboard data fetched successfully",
            data: {
                batch: activeBatch,
                entries: dailyEntries,
                feeds: feedEntries,
                medicines: medicineEntries
            }
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const getAllUsersDashboard = async (req, res) => {
    try {
        const users = await User.find({ role: "user" }).select("-password");
        const allData = [];

        for (const user of users) {
            const activeBatch = await Batch.findOne({ userid: user._id, batchStatus: "Active" });
            if (activeBatch) {
                const dailyEntries = await DailyEntry.find({ batchid: activeBatch._id }).sort({ createdAt: -1 });
                const feedEntries = await Feed.find({ batchid: activeBatch._id }).sort({ createdAt: -1 });
                const medicineEntries = await Medicine.find({ batchid: activeBatch._id }).sort({ createdAt: -1 });
                
                allData.push({
                    user: { _id: user._id, username: user.username, email: user.email },
                    batch: activeBatch,
                    entries: dailyEntries,
                    feeds: feedEntries,
                    medicines: medicineEntries
                });
            }
        }

        return res.status(200).json({
            success: true,
            data: allData
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const getBatchDashboard = async (req, res) => {
    try {
        const { batchid } = req.params;
        
        const batch = await Batch.findById(batchid);
        if (!batch) {
            return res.status(404).json({
                success: false,
                message: "Batch not found"
            });
        }

        const dailyEntries = await DailyEntry.find({ batchid }).sort({ createdAt: -1 });
        const feedEntries = await Feed.find({ batchid }).sort({ createdAt: -1 });
        const medicineEntries = await Medicine.find({ batchid }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: {
                batch,
                entries: dailyEntries,
                feeds: feedEntries,
                medicines: medicineEntries
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const getUserHistory = async (req, res) => {
    try {
        const { userid } = req.params;
        
        const batches = await Batch.find({ userid }).sort({ createdAt: -1 });
        
        let totalChicks = 0;
        let totalMortality = 0;
        let chicksDelivered = 0;
        
        for (const batch of batches) {
            totalChicks += batch.totalchick;
            const entries = await DailyEntry.find({ batchid: batch._id });
            const mortality = entries.reduce((sum, entry) => sum + (entry.mortality || 0), 0);
            totalMortality += mortality;
            if (batch.batchStatus === "Completed") {
                chicksDelivered += (batch.totalchick - mortality);
            }
        }
        
        const allFeeds = await Feed.find({ userid });
        const totalFeed = allFeeds.reduce((sum, feed) => sum + (feed.feedpack || 0), 0);

        return res.status(200).json({
            success: true,
            data: {
                batches,
                stats: {
                    totalChicks,
                    totalBatches: batches.length,
                    totalMortality,
                    chicksDelivered,
                    totalFeed
                }
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const getAllUsersHistory = async (req, res) => {
    try {
        const users = await User.find({ role: "user" }).select("-password");
        
        let totalChicks = 0;
        let totalBatches = 0;
        let totalMortality = 0;
        let chicksDelivered = 0;
        let totalFeed = 0;
        const allBatches = [];
        
        for (const user of users) {
            const batches = await Batch.find({ userid: user._id }).sort({ createdAt: -1 });
            totalBatches += batches.length;
            
            for (const batch of batches) {
                totalChicks += batch.totalchick;
                const entries = await DailyEntry.find({ batchid: batch._id });
                const mortality = entries.reduce((sum, entry) => sum + (entry.mortality || 0), 0);
                totalMortality += mortality;
                if (batch.batchStatus === "Completed") {
                    chicksDelivered += (batch.totalchick - mortality);
                }
                allBatches.push({ ...batch.toObject(), username: user.username });
            }
            
            const feeds = await Feed.find({ userid: user._id });
            totalFeed += feeds.reduce((sum, feed) => sum + (feed.feedpack || 0), 0);
        }

        return res.status(200).json({
            success: true,
            data: {
                batches: allBatches,
                stats: {
                    totalChicks,
                    totalBatches,
                    totalMortality,
                    chicksDelivered,
                    totalFeed
                }
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const completeBatch = async (req, res) => {
    try {
        const { batchid } = req.params;
        const { overallweight, feedback } = req.body;

        if (!overallweight) {
            return res.status(400).json({
                success: false,
                message: "Overall weight is required"
            });
        }

        const batch = await Batch.findById(batchid);
        if (!batch) {
            return res.status(404).json({
                success: false,
                message: "Batch not found"
            });
        }

        if (batch.batchStatus === "Completed") {
            return res.status(400).json({
                success: false,
                message: "Batch is already completed"
            });
        }

        batch.batchStatus = "Completed";
        batch.completedate = new Date();
        batch.overallweight = overallweight;
        batch.feedback = feedback || "";
        await batch.save();

        return res.status(200).json({
            success: true,
            message: "Batch completed successfully",
            data: batch
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports={getAllBatch,createNewBatch,updateBatch,deleteBatch,getUserBatch,getDashboardData,getBatchDashboard,getUserHistory,getAllUsersDashboard,getAllUsersHistory,completeBatch};