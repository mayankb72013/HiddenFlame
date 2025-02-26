import { PrismaClient } from "@prisma/client";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import jwt from "jsonwebtoken";
const client = new PrismaClient();

export function googleAuth() {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: "http://localhost:3000/auth/google/callback",
        scope: ["profile","email"]
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                if (profile.emails === undefined || profile.emails === null) {
                    throw new Error("No email found");
                }
                let user = await client.user.findUnique({
                    where: {
                        email: profile.emails[0].value
                    }
                })
                if (!user) {
                    user = await client.user.create({
                        data:{
                            name: profile.displayName,
                            email: profile.emails[0].value,
                            password: null
                        }
                    })
                }
                
                const token = jwt.sign({
                    user: user,
                },process.env.JWT_SECRET_CLIENT as string)

                done(null,{user,token});
            }
            catch (e) {
                done(e, false);
            }
        }
    ))
}

