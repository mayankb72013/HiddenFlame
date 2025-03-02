import express from 'express'
import passport from 'passport';
import GoogleOAuth from '../Middleware/googleOAuth';

const authRouter = express.Router();
GoogleOAuth();

authRouter.get("/google",passport.authenticate("google",{
    scope: ["profile","email"]
}))

authRouter.get("/google/callback",passport.authenticate("google"),(req,res)=>{
    res.redirect("http://localhost:5173/user/dashboard");
    // res.json("Call back URL reached");
})

export default authRouter