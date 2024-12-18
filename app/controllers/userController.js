import UserModel from "../models/UserModel.js";
import { EncodeToken } from "../utility/tokenUtility.js";

// User Registration api
export const Registration = async (req, res) => {

    try {
        let reqBody = req.body;
        await UserModel.create(reqBody);
        return res.json({status : "success", "Message" : "User registered successfully."})
    } catch(err) {
        return res.json({status : "fail", "Message" : err.toString()})
    }
}

// User login api
export const Login = async (req, res) => {

    try {
        let reqBody = req.body;
        let data = await UserModel.findOne(reqBody);
        if (data===null) {
            return res.json({status : "fail", "Message" : err.toString()})
        }else {
            let token = EncodeToken(data["phoneNumber"], data["_id"]);

            let cookieOption = {expires : new Date(Date.now() + 24*60*60*1000), httpOnly : false};
            res.cookie("token", token, cookieOption);
            return res.json({status : "success", Token : token, "Message" : "User login successfully."})

        }

    } catch(err) {
        return res.json({status : "fail", "Message" : err.toString()})

    }

}

// User single profile read api
export const ProfileDetails = async (req, res) => {

    try {
        let userId = req.headers["userId"];
        let data = await UserModel.findOne({"_id" : userId});
        return res.json({status : "success", "Message" : "Single User details show successfully.", data : data})
    } catch(err) {
        return res.json({status : "fail", "Message" : err.toString()})
    }
    
}

// All User profile read api
export const AllProfileDetails = async (req, res) => {

    try {
        let data = await UserModel.find();
        return res.json({status : "success", "Message" : "All User details show successfully.", data : data})
    } catch(err) {
        return res.json({status : "fail", "Message" : err.toString()})
    }
    
}

// Single User profile update api
export const ProfileUpdate = async (req, res) => {

    try {
        let reqBody = req.body;
        let userId = req.headers["userId"];
        await UserModel.updateOne({"_id" : userId}, reqBody)
        return res.json({status : "success", "Message" : "User updated successfully."})

    } catch(err) {
        return res.json({status : "fail", "Message" : err.toString()})
    }
}

// Delete Single user api
export const ProfileDelete = async (req, res) => {

    try {
        let id = req.params.id;
        // let userId = req.headers["userId"];
        await UserModel.deleteOne({"_id" : id});
        return res.json({status : "success", "Message" : "User deleted successfully."})
    } catch(err) {
        return res.json({status : "fail", "Message" : err.toString()})
    }
}