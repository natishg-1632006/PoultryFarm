const DailyEntry = require("../model/dailyEntryModel");
const Batch = require("../model/batchModel");

const currentBatchEntry = async (req, res) => {
    try {
        const batchid = req.params.id;
        const result = await DailyEntry.find({
            batchid: batchid
        });
        if (!result) {
            res.status(400).json({
                success: false,
                message: "No entry found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Current batch daily entrys",
            data: result
        })
    } catch (error) {
        console.log(error.message);
    }
}

const createNewEntry = async (req, res) => {
    try {
        const { batchid, userid } = req.body;
        
        // Check if user already created entry today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const existingEntry = await DailyEntry.findOne({
            batchid,
            userid,
            createdAt: { $gte: today, $lt: tomorrow }
        });
        
        if (existingEntry) {
            return res.status(400).json({
                success: false,
                message: "You have already created a daily entry today. Only admin can update or delete it."
            });
        }
        
        const newlyCretedEntry = await DailyEntry.create(req.body);
        if (!newlyCretedEntry) {
            return res.status(400).json({
                success: false,
                message: "Data not stored"
            });
        }

        const batch = await Batch.findById(batchid);
        if (batch) {
            const mortality = Number(req.body.mortality) || 0;
            const feedcount = Number(req.body.feedcount) || 0;
            const avgweight = Number(req.body.avgweight) || 0;
            
            batch.currentchick = Math.max(0, batch.currentchick - mortality);
            batch.totalmortality = (batch.totalmortality || 0) + mortality;
            batch.totalfeed = (batch.totalfeed || 0) + feedcount;
            batch.totalweight = avgweight * batch.currentchick;
            await batch.save();
        }

        return res.status(201).json({
            success: true,
            message: "New daily data stored",
            data: newlyCretedEntry
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const updateDailyEntry = async (req, res) => {
    try {
        const dailyEntryId = req.params.id;
        const result = await DailyEntry.findByIdAndUpdate(dailyEntryId, req.body, {
            new: true
        });
        if (!result) {
            res.status(400).json({
                success: false,
                message: "No entry found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Entry data updated successfully",
            data: result
        })
    } catch (error) {
        console.log(error.message);
    }
}

const deleteDailyEntry = async (req, res) => {
    try {
        const dailyEntryId = req.params.id;
        const result = await DailyEntry.findByIdAndDelete(dailyEntryId);
        if (!result) {
            res.status(400).json({
                success: false,
                message: "Problem in delete daily entry"
            })
        }

        res.status(200).json({
            success: true,
            message: "Daily entry deleted successfully"
        })
    } catch (error) {
        console.log(error.message);
    }
}


module.exports = {
    createNewEntry,
    currentBatchEntry,
    updateDailyEntry,
    deleteDailyEntry
};