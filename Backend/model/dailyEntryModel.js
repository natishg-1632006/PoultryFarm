const mongoose = require("mongoose");

const dailyEntrySchema = new mongoose.Schema({
    mortality: {
        type: Number,
        required: true
    },
    feedcount: {
        type: Number,
        required: true
    },
    feedtype: {
        type: String,
        enum: ["Pre-starter", "Starter", "Finisher"],
        required: true
    },
    avgweight: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        enum: ["g", "kg"],
        required: true
    },
    feedback: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    batchid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Batch"
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps:true});

module.exports=mongoose.model("DailyEntry",dailyEntrySchema);