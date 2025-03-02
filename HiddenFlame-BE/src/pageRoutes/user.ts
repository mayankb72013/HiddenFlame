import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
const userRouter = express.Router();

function checkAuth(req: Request,res: Response,next: NextFunction){
    if(req.user){
        next();
    }
    else{
        res.redirect("http://localhost:5173/signin");
    }
}

userRouter.get("/dashboard",checkAuth,function (req,res){
    res.json(req.user);
})

userRouter.get("/logout",function (req,res,next){
    req.logout((err)=>{
        if(err){
            next(err);
        }
        res.redirect("http://localhost:5173/signin");
    });
})

export default userRouter;