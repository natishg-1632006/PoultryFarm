const DailyEntry = require("../model/dailyEntryModel");

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
        const newlyCretedEntry = await DailyEntry.create(req.body);
        if (!newlyCretedEntry) {
            res.status(400).json({
                success: false,
                message: "Data not stored"
            });
        }

        res.status(201).json({
            success: true,
            message: "New daily data stored",
            data: newlyCretedEntry
        })
    } catch (error) {
        console.log(error.message);
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