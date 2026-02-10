const Medicine = require("../model/medicineModel");

const createNewMedicine = async (req, res) => {
    try {
        const result = await Medicine.create(req.body);
        if (!result) {
            res.status(400).json({
                success: false,
                message: "Medicine data will not found"
            })
        }

        res.status(201).json({
            success: true,
            message: "Medicine data stored in database",
            data: result
        })
    } catch (error) {
        console.log(error.message);
    }
}

const getCurrentMedicine = async (req, res) => {
    try {
        const batchid = req.params.id;
        const result = await Medicine.find({
            batchid
        });

        if (!result) {
            res.status(400).json({
                success: false,
                message: "Medicine data will not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Fetched medicine data from database",
            data: result
        })
    } catch (error) {
        console.log(error.message);
    }
}

const updateMedicine=async (req,res)=>{
    try {
        const medicineid=req.params.id;
        const result=await Medicine.findByIdAndUpdate(medicineid,req.body,{new:true});

        if (!result) {
            res.status(400).json({
                success: false,
                message: "Medicine data will not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Medicine data updated",
            data: result
        })
    } catch (error) {
        console.log(error.message);
    }
}

const deleteMedicine=async(req,res)=>{
    try {
        const medicineid=req.params.id;
        const result=await Medicine.findByIdAndDelete(medicineid);

        if (!result) {
            res.status(400).json({
                success: false,
                message: "Medicine data will not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Medicine data deleted",
        })

    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    createNewMedicine,
    getCurrentMedicine,
    updateMedicine,
    deleteMedicine
};