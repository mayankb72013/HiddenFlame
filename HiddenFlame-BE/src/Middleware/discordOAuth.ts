import passport from "passport";
import { Strategy as discordStrategy } from "passport-discord";
import dotenv from "dotenv"
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

dotenv.config();

export default function DiscordOAuth() {
    passport.use(new discordStrategy({
        clientID: process.env.DISCORD_CLIENT_ID as string,
        clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
        callbackURL: "http://localhost:3000/auth/discord/callback",
        scope: ['identify', 'email', 'guilds', 'guilds.join']
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let user;
            try {
                user = await client.user.findUnique({
                    where: {
                        email: profile.email
                    }
                })
            }
            catch (e) {
                done(e, false);
            }
            if (user) {
                done(null, user);
            }
            else {
                user = await client.user.create({
                    data: {
                        name: profile.global_name,
                        email: profile.email as string,
                        password: null,
                    }
                })
            }

            done(null, user);
        }
        catch (e) {
            done(e, false);
        }
    }))

}