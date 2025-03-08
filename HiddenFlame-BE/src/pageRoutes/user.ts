import express, { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const userRouter = express.Router();

interface AuthRequest extends Request {
    id?: number;
    user?: any; // Extend to support OAuth
    authType?: "oauth" | "normal"
}

function checkAuth(req: AuthRequest, res: Response, next: NextFunction) {
    if (req.user) {
        req.authType = "oauth"
        next();
    }
    else if (req.id) {
        req.authType = "normal"
        next()
    }
    else {
        res.redirect("http://localhost:5173/signin");
    }
}

userRouter.use(checkAuth);

userRouter.get("/dashboard", function (req, res) {
    res.json(req.user);
})

userRouter.get("/logout", function (req: AuthRequest, res, next) {
    if(req.authType === "oauth"){
        req.logout((err) => {
            if (err) {
                res.json({
                    msg: err
                })
            }
            res.redirect("http://localhost:5173/signin");
        });
    }
    else if(req.authType === "normal"){
        //Since i am using localStorage it can only be cleared from frontEnd
        res.json({
            msg: "clear it"
        })
    }
    
})

export default userRouter;