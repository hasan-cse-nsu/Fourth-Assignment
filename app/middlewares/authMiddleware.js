import { DecodeToken } from "../utility/tokenUtility.js";

export default (req, res, next) => {

    let token = req.headers["token"];
    let decoded = DecodeToken(token);
    if (decoded===null) {
        res.status(401).send({status : "fail", message : "unathorized" })
    } else {
        let phoneNumber = decoded.phoneNumber;
        let userId = decoded.userId;

        req.headers.phoneNumber = phoneNumber;
        req.headers.userId = userId;

        next(); // if validation ok then do the next work.
    }

}