import { PrismaClient } from '@prisma/client';
import express, { NextFunction, Request, Response } from 'express'
import { z } from 'zod'


const userRouter = express.Router();
const client = new PrismaClient();

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

userRouter.get("/authSuccess", async function (req, res) {
    if (req.user?.isOnboarded) {
        res.json({
            msg: "Onboarded already",
            redirectUrl: "http://localhost:5173/user/dashboard"
        })
    }
    else {
        res.json({
            msg: "Not Onboarded",
            redirectUrl: "http://localhost:5173/user/onboarding"
        })
    }

})

const dataSchema = z.object({
    username: z.string().min(3, "must be within [3-25] characters").max(25, "must be within [3-25] characters"),
    age: z.number().min(18, "must be greater than 18").max(130),
    gender: z.string(),
    country: z.string(),
    state: z.string().optional(),
    city: z.string().optional(),
    lookingFor: z.string(),
    about: z.string()
})

userRouter.put("/onboarding", async function (req, res) {
    const username = req.body.username;
    const age = req.body.age;
    const gender = req.body.gender;
    const country = req.body.country;
    const state = req.body.state;
    const city = req.body.city;
    const lookingFor = req.body.lookingFor;
    const about = req.body.about;

    const check = dataSchema.safeParse(req.body);

    if (check.success) {
        const user = await client.user.findUnique({
            where: {
                email: req.user?.email
            }
        })
        if (user !== null) {
            await client.user.update({
                where: {
                    email: req.user?.email
                },
                data: {
                    age: age,
                    city: city,
                    country: country,
                    gender: gender,
                    isOnboarded: true,
                    lookingFor: lookingFor,
                    username: username,
                    state: state,
                    about: about,
                }
            })
            res.json({
                msg: "onboarding successful",
                redirectUrl: "http://localhost:5173/user/dashboard"
            })
        }
        else{
            res.status(404).json({
                msg: "User not found"
            })
        }
        return;
    }
    else {
        res.status(400).json({
            msg: check.error.message
        })
        return;
    }
})

userRouter.get("/dashboard", async function (req, res) {
    res.json(req.user);
})

userRouter.get("/logout", function (req: AuthRequest, res, next) {
    if (req.authType === "oauth") {
        req.logout((err) => {
            if (err) {
                res.json({
                    msg: err
                })
            }
            res.redirect("http://localhost:5173/signin");
        });
    }
    else if (req.authType === "normal") {
        //Since i am using localStorage it can only be cleared from frontEnd
        res.json({
            msg: "clear it"
        })
    }

})

export default userRouter;