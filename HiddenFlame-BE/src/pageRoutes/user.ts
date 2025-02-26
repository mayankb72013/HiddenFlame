
import express from "express"
const userRouter = express.Router();
userRouter.use(express.json())
userRouter.get("/dashboard",function (req,res){
    res.json({
        msg: "This is the Dashboard"
    })
})