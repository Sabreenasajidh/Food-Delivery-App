import jwt from "jsonwebtoken"
import config  from '../config/dbConfig.js';


const checkAuth= (req,res,next)=>{
     try{ 
        // console.log(req);
        const token = req.headers['x-access-token']
        const decodedToken = jwt.verify(token,config.JWT_TOKEN)
        req.user = decodedToken
        next();

    }catch(e){
        console.log(e);
        return res.status(401).json({
            'message':'Invalid or expired token!!',
            'error':e
        })
    }
}
export default checkAuth