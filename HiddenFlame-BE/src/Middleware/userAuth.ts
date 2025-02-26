import {Request,Response,NextFunction} from "express"
import jwt from "jsonwebtoken"
import { User } from "@prisma/client";


export function userAuthMiddleware(req: Request,res: Response,next: NextFunction){
   const authHeader = req.headers.authorization;
   if(!authHeader){
       res.json({
        msg: "Token Not found"
       })
       return;
   }
    const token = authHeader.split(" ")[1];
   try{
      const decode = jwt.verify(token, process.env.JWT_SECRET_CLIENT as string) as {user: User};
      req.user = decode.user
      next();
   }
   catch (e){
      res.json({
        msg: "Token is invalid"
      })
   }
}