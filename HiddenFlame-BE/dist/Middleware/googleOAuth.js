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
exports.googleAuth = googleAuth;
const client_1 = require("@prisma/client");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client = new client_1.PrismaClient();
function googleAuth() {
    passport_1.default.use(new passport_google_oauth20_1.Strategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",
        scope: ["profile", "email"]
    }, (accessToken, refreshToken, profile, done) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (profile.emails === undefined || profile.emails === null) {
                throw new Error("No email found");
            }
            let user = yield client.user.findUnique({
                where: {
                    email: profile.emails[0].value
                }
            });
            if (!user) {
                user = yield client.user.create({
                    data: {
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: null
                    }
                });
            }
            const token = jsonwebtoken_1.default.sign({
                user: user,
            }, process.env.JWT_SECRET_CLIENT);
            done(null, { user, token });
        }
        catch (e) {
            done(e, false);
        }
    })));
}
