import { PrismaClient } from '@prisma/client';
import express, { NextFunction, Request, Response } from 'express'
import { boolean, z } from 'zod'


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
    about: z.string(),
    relStatus: z.string(),
    youAreRather: z.array(z.string()),
    hobbies: z.array(z.string()),
    features: z.array(z.string())
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
    const relStatus = req.body.relStatus;
    const youAreRather = req.body.youAreRather;
    const hobbies = req.body.hobbies;
    const features = req.body.features;

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
                    relStatus: relStatus,
                    youAreRather: youAreRather,
                    hobbies: hobbies,
                    features: features
                }
            })
            res.json({
                msg: "onboarding successful",
                redirectUrl: "http://localhost:5173/user/dashboard"
            })
        }
        else {
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

userRouter.get("/profile", async function (req, res) {
    res.json(req.user);
})

userRouter.post("/getMatches",async function (req, res) {
    const lookingFor = req.body.lookingFor;
    const fromAge = req.body.fromAge;
    const toAge = req.body.toAge;
    const youAreRather = req.body.youAreRather;
    const hobbies = req.body.hobbies;
    const features = req.body.features;

    let users;
    try {
        users = await client.user.findMany({
            where: {
              AND: [
                { id: { not: req.user?.id } }, // Exclude the current user
                {gender: lookingFor},
                {
                  OR: [
                    { age: { gte: fromAge, lte: toAge } },
                    { youAreRather: { hasSome: youAreRather } },
                    { hobbies: { hasSome: hobbies } },
                    { features: { hasSome: features } }
                  ].filter(Boolean)
                }
              ]
            }
          });
          
          
    } catch (e) {
        console.error(e);
        res.status(503).json({
            msg: "Database is down",
            errorMsg: e
        });
    }

    // Create match score for each user
    const afterMatches = users?.map((user) => {
        let matches = 0;

        // Match based on provided criteria
        if (lookingFor && user.lookingFor === lookingFor) matches++;
        if (fromAge && toAge && user.age && user.age >= fromAge && user.age <= toAge) matches++;
        if (youAreRather && user.youAreRather.includes(youAreRather)) matches++; // Check if 'youAreRather' matches
        if (hobbies && hobbies.some((hobby: any) => user.hobbies.includes(hobby))) matches++; // Check for hobbies match
        if (features && features.some((feature: any) => user.features.includes(feature))) matches++; // Check for features match

        return { ...user, matches };
    }) || [];

    // Sort users based on match score
    const sorted = afterMatches.sort((a, b) => b.matches - a.matches);

    res.json({
        msg: "Success",
        matchedUsers: sorted
    });
});


userRouter.get("/logout", function (req: AuthRequest, res, next) {
    if (req.authType === "oauth") {
        req.logout((err) => {
            if (err) {
                return next(err)
            }
            res.json({
                msg: "Logged out",
                redirectUrl: "http://localhost:5173/signin"
            });
        });
    }
    else if (req.authType === "normal") {
        //Since i am using localStorage it can only be cleared from frontEnd
        res.json({
            msg: "clear it",
            redirectUrl: "http://localhost:5173/signin"
        })
    }

})

export default userRouter;