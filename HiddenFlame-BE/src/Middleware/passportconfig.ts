import passport = require("passport");
import { PrismaClient } from "@prisma/client";
import GoogleOAuth from "./googleOAuth";
import DiscordOAuth from "./discordOAuth";

const client = new PrismaClient();

GoogleOAuth();
DiscordOAuth();

passport.serializeUser(function (user,done){
    done(null,user.email);
})

passport.deserializeUser(async function (email,done){
    try{
        const user = await client.user.findUnique({
            where:{
                email: email as string
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

export default passport;