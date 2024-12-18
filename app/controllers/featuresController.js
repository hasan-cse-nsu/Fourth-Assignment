import {DecodeToken, EncodeToken} from "../utility/tokenUtility.js";
import {EmailSend} from "../utility/emailUtility.js";
import * as path from "path";

export const TokenEncode = async (req, res) => {

    let result = EncodeToken("hasan.cse.nsu@gmail.com", "123");

    res.json({token : result});

}

export const TokenDecode = async (req, res) => {

    let result = DecodeToken(    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imhhc2FuLmNzZS5uc3VAZ21haWwuY29tIiwidXNlcklkIjoiMTIzIiwiaWF0IjoxNzMwOTYxOTYwLCJleHAiOjE3MzM1NTM5NjB9.kXtBuKxsLbzFOzexTZrDRLd8Qf6pGqkLTW_4-vNAlf4");

    res.json({Plain_text : result});

}

export const Email = async (req, res) => {

    let EmailTo = "rashidul.hasan76@gmail.com";
    let EmailText = "Demo Demo";
    let EmailSubject = "First email send using smtp host";
    let EmailHTMLBody = "Name - Rashidul Hasan";

    let result = await EmailSend(EmailTo, EmailText, EmailSubject, EmailHTMLBody);

    res.json({Email_Status : result});
}

export const Profile = async (req, res) => {
    res.json({status : "active"});
}


export const CreateCookies = async (req, res) => {

    let cookieOptions = {
        expires: new Date(Date.now() + 3600 * 1000),
        httpOnly: true,
        sameSite: true
    }
    let data = "hasan.cse.nsu@gmail.com";
    let cookieName = "Mern07_Batch";

    res.cookie(cookieName, data, cookieOptions);

    res.json({status : "active"});
}


export const RemoveCookies = async (req, res) => {

    let cookieOptions = {
        expires: new Date(Date.now() - 3600 * 1000),
        httpOnly: true,
        sameSite: true
    }
    let data;
    let cookieName = "Mern07_Batch";

    res.cookie(cookieName, data, cookieOptions);

    res.json({status : "active"});
}


export const DocUpload = async (req, res) => {

    let myFile = req.files['imageFiles'];
    let myFileName = myFile.name;

    //Prepare the file storage path
    let myFilePath = path.resolve(process.cwd(), 'storage',  myFileName);

    //Move the file
    await myFile.mv(myFilePath, (err) => {
        if (err) {
            res.json({message: "UnSuccessful"});
        } else {
            res.json({message: "Successfully moved file"});
        }

    });


}


