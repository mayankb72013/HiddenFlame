import {Request,Response,NextFunction} from "express"
import jwt from "jsonwebtoken"

interface AuthRequest extends Request{
   id?: number
}

export function userAuthMiddleware(req: AuthRequest,res: Response,next: NextFunction){
   const authHeader = req.headers.authorization;
   if(!authHeader){
       res.status(400).json({
        msg: "Token Not found"
       })
       return;
   }
    const token = authHeader.split(" ")[1];
   try{
      const decode = jwt.verify(token, process.env.JWT_SECRET_CLIENT as string) as {id: number};
      req.id = decode.id
      next();
   }
   catch (e){
      res.status(401).json({
        msg: "Token is invalid"
      })
   }
}