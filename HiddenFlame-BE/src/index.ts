import express from "express"
import authRouter from "./pageRoutes/auth";
import cors from "cors"
import cookieSession from 'cookie-session'
import passport from "passport";
import userRouter from "./pageRoutes/user";

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.options("*",cors())
app.use(express.json());


app.use(cookieSession({
    name:"session",
    maxAge: 3 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_SESSION_KEY as string]
}))
app.use(function(request, response, next) {
    if (request.session && !request.session.regenerate) {
      request.session.regenerate = (cb:any) => {
        cb()
      }
    }
    if (request.session && !request.session.save) {
      request.session.save = (cb:any) => {
        cb()
      }
    }
    next()
  })
app.use(passport.initialize());
app.use(passport.session());


app.use("/auth",authRouter);
app.use("/user",userRouter);

app.get("/",function (req,res){
    res.status(200).json({
        msg : "Reached Successfully"
    })
})
app.post("/signup",function (req,res){
    
})
app.post("/signin",function (req,res){
    
})

app.get("/privacy-policy", function(req,res){
    res.json("here")
})
app.get("/delete-user", function(req,res){
    res.json("here")
})



app.listen(3000);