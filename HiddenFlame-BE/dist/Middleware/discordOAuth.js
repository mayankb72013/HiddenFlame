"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DiscordOAuth;
const passport_1 = __importDefault(require("passport"));
const passport_discord_1 = require("passport-discord");
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
const client = new client_1.PrismaClient();
dotenv_1.default.config();
function DiscordOAuth() {
    passport_1.default.use(new passport_discord_1.Strategy({
        clientID: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/discord/callback",
        scope: ['identify', 'email', 'guilds', 'guilds.join']
    }, (accessToken, refreshToken, profile, done) => __awaiter(this, void 0, void 0, function* () {
        try {
            let user;
            try {
                user = yield client.user.findUnique({
                    where: {
                        email: profile.email
                    }
                });
            }
            catch (e) {
                done(e, false);
            }
            if (user) {
                done(null, user);
            }
            else {
                user = yield client.user.create({
                    data: {
                        name: profile.global_name,
                        email: profile.email,
                        password: null,
                    }
                });
            }
            done(null, user);
        }
        catch (e) {
            done(e, false);
        }
    })));
}
