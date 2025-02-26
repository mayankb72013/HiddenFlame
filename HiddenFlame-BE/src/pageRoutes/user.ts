import express from "express"
import { userAuthMiddleware } from "../Middleware/userAuth";
const userRouter = express.Router();

userRouter.use(express.json(),userAuthMiddleware)
userRouter.get("/dashboard",function (req,res){
    

    res.json({
        msg: "This is the Dashboard"
    })
})