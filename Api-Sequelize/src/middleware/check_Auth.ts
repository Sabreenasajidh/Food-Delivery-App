// //import  * as Request  from 'express';
// import  {Request,Response,NextFunction}  from 'express';
// import jwt from "jsonwebtoken"
// //import config  from '../../config'


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




import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const SECRET_KEY: Secret = 'secret';

export interface CustomRequest extends Request {
 token: string | JwtPayload;
}

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
 try {   
   const token = req.header('x-access-token');
   console.log(token);
   
  // const token = req.headers['x-access-token']

   if (!token) {
     throw new Error();
   }

   const decoded = jwt.verify(token, SECRET_KEY);
   (req as CustomRequest).token = decoded;
  // (req as user) = decoded

   next();
 } catch (err) {
   res.status(401).send('Please authenticate');
 }
};