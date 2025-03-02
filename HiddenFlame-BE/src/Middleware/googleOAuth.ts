import passport from "passport";
import {Strategy as GoogleStrategy} from "passport-google-oauth20"
import dotenv from 'dotenv'
import { PrismaClient, User } from "@prisma/client";

const client = new PrismaClient();

dotenv.config();
export default function GoogleOAuth(){
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: "/auth/google/callback",
        scope: ["profile","email"]
    }, async (accessToken, refreshToken, profile, done)=>{
          try{
            if(profile.emails == undefined || profile.emails == null){
                throw new Error("Email is Undefined or Null");
            }
             let user = await client.user.findUnique({
                where:{
                    email: profile.emails[0].value
                }
             })

             if(user){
                done(null,user);
             }
             else{
                user = await client.user.create({
                    data:{
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: null
                    }
                })
                done(null,user);
             }
          }
          catch (e){
             done(e,false);
          }
    }))

    passport.serializeUser(function (user,done){
        done(null,String(user.id));
    })

    passport.deserializeUser(async function (id,done){
        try{
            const user = await client.user.findUnique({
                where:{
                    id: Number(id)
                }
            })
            if(user){
                done(null,user);
            }
            else{
                throw new Error("No such user exists");
            }
        }
        catch(e){
            done(e,false);
        }
    })
}