"use strict";
// //import  * as Request  from 'express';
// import  {Request,Response,NextFunction}  from 'express';
// import jwt from "jsonwebtoken"
// //import config  from '../../config'
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = exports.SECRET_KEY = void 0;
//   declare global {
//     namespace Express {
//         interface Request {
//             user: any,
//             headers:any
//           } 
//     }
//   }
// export const checkAuth= (req:Request,res:Response,next:NextFunction)=>{
//      try{ 
//         // console.log(req);
//         const token = req.headers['x-access-token']
//         console.log(token);
//         const decodedToken:any = jwt.verify(token ,'secret')
//         req.user = decodedToken
//         next();
//     }catch(e){
//         console.log(e);
//         return res.status(401).json({
//             'message':'Invalid or expired token!!',
//             'error':e
//         })
//     }
// }
// //export default {checkAuth}
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.SECRET_KEY = 'secret';
const checkAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.header('x-access-token');
        console.log(token);
        // const token = req.headers['x-access-token']
        if (!token) {
            throw new Error();
        }
        const decoded = jsonwebtoken_1.default.verify(token, exports.SECRET_KEY);
        req.token = decoded;
        // (req as user) = decoded
        next();
    }
    catch (err) {
        res.status(401).send('Please authenticate');
    }
});
exports.checkAuth = checkAuth;
