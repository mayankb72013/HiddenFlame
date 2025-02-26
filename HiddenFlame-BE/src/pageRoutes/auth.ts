import express from "express"
import passport from "passport"
import { googleAuth } from "../Middleware/googleOAuth";
import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken"
import { User } from "@prisma/client";
import cors from "cors"

googleAuth();
const authRouter = express.Router();

authRouter.use(cookieParser(),express.json(),cors());
//Google OAuth 2.0

authRouter.get("/test",function (req,res){
    res.json("Reached Auth Router")
})

authRouter.get("/google",passport.authenticate("google",{
    scope: ["profile","email"],prompt: "consent"
}))

authRouter.get("/google/callback",passport.authenticate("google",{ session: false }),function (req,res,next){
    console.log("got /auth/google/callback")
    if(!req.user){
        res.status(401).json({
            msg: "Authentication failed"
        })
        return;
    }
    
    
    const {token} = req.user as any;
    res.cookie("token",token,{
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })
    // res.json({token})
    console.log("Redirecting to Dashboard");
    res.redirect("http://localhost:5173/dashboard");
})

authRouter.get("/check-auth",function (req,res){
    const token = req.cookies.token;
    if(!token){
        res.status(401).json({
            msg : "Not Authenticated"
        })
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET_CLIENT as string) as {user: User};
        res.json({
            user: decoded.user,
            token: token
        })
        
    }
    catch (e){
        res.status(401).json({
            msg: "Invalid Token"
        })
    }
})

export default authRouter