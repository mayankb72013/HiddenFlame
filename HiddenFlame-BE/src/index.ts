import express from "express"
import authRouter from "./pageRoutes/auth";
import cors from "cors"
const app = express();

app.use(express.json(),cors());
app.get("/",function (req,res){
    res.status(200).json({
        msg : "Reached Successfully"
    })
})

app.use("/auth",authRouter);

app.post("/signup",function (req,res){
    
})
app.post("/signin",function (req,res){
    
})



app.listen(3000);