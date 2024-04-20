import jwt from "jsonwebtoken";

import { iRequest, iNextFunction, iResponse } from "../common/interfaces/types.interface";
import { HttpStatus } from "../common/enums/httpStatusCodes";

const secretKey = (process.env.JWT_SECRET + "");

// Verify JWT token using this middleware
export const auth = async (req: iRequest, res: iResponse, next: iNextFunction) => {

    const token: string | undefined = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.send({ res, code: HttpStatus.unauthorized, status: false, message: "Authorization failed, no token provided!", data: null });
    }
    try {
        let decoded: any = jwt.verify(token, secretKey);
        if (decoded) {
            // We will delete iat, exp and __v fields from the token
            delete decoded.iat && decoded.exp && decoded.__v;
            req.user = decoded;
            next();
        }
    }
    catch (error) {
        console.error("Catch Error:-", error);
        return res.send({ res, code: HttpStatus.forbidden, status: false, message: "Authorization failed, token is invalid!", data: null });
    }
};

// Generate JWT token for the users
export const genToken = async (params: any) => {
    const token: string = jwt.sign(params, secretKey, { expiresIn: "24h" });
    return token;
};

// Generate JWT token for the admin
export const genAdminToken = async (params: any) => {
    const token: string = jwt.sign(params, secretKey, { expiresIn: "1h" });
    return token;
}