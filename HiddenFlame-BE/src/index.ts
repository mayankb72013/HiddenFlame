import express from "express"

const app = express();

app.get("/",function (req,res){
    res.status(200).json({
        msg : "Reached Successfully"
    })
})

app.post("/signup",function (req,res){

})
app.post("/signin",function (req,res){
    
})

app.listen(3000);