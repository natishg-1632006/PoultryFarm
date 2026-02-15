const User = require("../model/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRegister = async (req, res) => {
    try {
        const {
            username,
            email,
            password,
            role
        } = req.body;
        const isUserFound = await User.findOne({
            $or: [{
                username
            }, {
                email
            }]
        });
        if (isUserFound) {
            res.status(400).json({
                success: false,
                message: "username or email is already found"
            })
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const newlyCreatedUser = await User.create({
            username,
            email,
            password: hashedPassword,
            role: role || "user"
        })

        if (!newlyCreatedUser) {
            res.status(400).json({
                success: false,
                message: "username not created"
            })
        }

        res.status(201).json({
            success: true,
            message: "username created successfully",
            data: newlyCreatedUser
        })

    } catch (error) {
        console.log(error.message);
    }
}

const userLogin = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        const userData = await User.findOne({
            email
        });

        if (!userData) {
            return res.status(200).json({
                success: false,
                message: "incorrect email"
            })
        }

        const isPasswordMatch = await bcryptjs.compare(password, userData.password);

        if (!isPasswordMatch) {
            return res.status(200).json({
                success: false,
                message: "incorrect password"
            })
        }

        const token = jwt.sign({
            userid: userData._id,
            username: userData.username,
            email: userData.email,
            role: userData.role
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1d"
        });

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "token not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Token created successfully",
            token: token,
            user:{
                userId:userData._id,
                email: userData.email,
                role: userData.role
            }
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }

}

const verify=()=>{
    res.status({
        success:true,
        message:"valid user",
        user:req.userInfo
    })
}

module.exports = {
    userRegister,
    userLogin,
    verify
}