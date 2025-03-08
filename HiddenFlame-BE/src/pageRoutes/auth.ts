import express from 'express'
import passport from 'passport';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { z } from 'zod'
import errorMap from 'zod/lib/locales/en';

const authRouter = express.Router();
authRouter.use(express.json())
const client = new PrismaClient();


//Google OAuth 2.0 routes
authRouter.get("/google",
    //     function (req,res,next) {
    //     req.logout((err)=>{
    //         if(err){
    //             console.log("This is google route  1 error : "+err);
    //         }
    //         else{
    //             next()
    //         }
    //     })
    // }
    // ,
    passport.authenticate("google", {
        scope: ["profile", "email"],
        // prompt: "consent"
    }))

authRouter.get("/google/callback", passport.authenticate("google"), (req, res) => {
    res.redirect("http://localhost:5173/user/dashboard");
    // res.json("Call back URL reached");
})

//Discord OAuth routes
authRouter.get("/discord"
    //     ,function (req,res,next) {
    //     req.logout((err)=>{
    //         if(err){
    //             console.log("This is discord route  1 error : "+err);
    //         }
    //         else{
    //             next()
    //         }
    //     })
    // }
    , passport.authenticate('discord', {
        // prompt: "consent"
    }))

authRouter.get("/discord/callback", passport.authenticate("discord"), (req, res) => {
    res.redirect("http://localhost:5173/user/dashboard");
    // res.json("Successfull OAuth for discord");
})




const inputSchema = z.object({
    username: z.string().min(3, "Name mininum 3 characters").max(25, "Name max limit 25 characters").optional(),
    email: z.string().email(),
    password: z.string()
        .min(8, "Password should contain at least 8 characters")
        .refine((val) => /[a-z]/.test(val) &&
            /[A-Z]/.test(val) &&
            /\d/.test(val) &&
            /[@$!%*?&]/.test(val), {
            message: "Password should contain at least 8 characters with at least one uppercase letter, lowercase letter, number, and one special character (@$!%*?&)"
        })

})

//Normal signin and signup
authRouter.post("/signup", async function (req, res) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const check = inputSchema.safeParse(req.body);


    if (check.success) {
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            await client.user.create({
                data: {
                    name: username,
                    email: email,
                    password: hashedPassword
                }
            })
        }
        catch (e) {
            res.status(500).json({
                msg: e
            });
            return;
        }
        res.json({
            success: "You've been signed up successfully"
        })
        return;
    }
    else {
        res.status(400).json({
            msg: check.error.message
        })
        return;
    }
})

authRouter.post("/signin", async function (req, res) {
    const email = req.body.email;
    const password = req.body.passport;

    const check = inputSchema.safeParse(req.body);

    if (check.success) {
        const user = await client.user.findUnique({
            where: {
                email: email
            }
        })
        if (user) {
            if (user.password != null) {
                const check = await bcrypt.compare(password, user.password);
                if (check === true) {
                    const token = jwt.sign({
                        id: user.id
                    }, process.env.JWT_SECRET_CLIENT as string);

                    res.json({
                        token: token
                    })
                }
                else {
                    res.status(401).json({
                        msg: "Invalid Password"
                    })
                }
            }
            else {
                res.status(403).json({
                    msg: "User has signed up with either Google or Discord"
                })
            }
        }
        else {
            res.status(404).json({
                msg: "No such user exists"
            })
        }
    }
    else {
        res.json({
            msg: check.error.message
        })
    }
})

export default authRouter