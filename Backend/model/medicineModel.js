const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
    medicinetype: {
        type: String,
        enum: ["vaccination", "medicine"],
        required: true
    },
    medicinename: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    unit: {
      type: String,
      enum: ["ml", "gm", "l", "kg", "tablet", "dose"],
      required: true
    },
    deliveredDate: {
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
}, {
    timestamps: true
});

module.exports = mongoose.model("Medicine", medicineSchema);