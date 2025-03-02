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
exports.default = GoogleOAuth;
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
const client = new client_1.PrismaClient();
dotenv_1.default.config();
function GoogleOAuth() {
    passport_1.default.use(new passport_google_oauth20_1.Strategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        scope: ["profile", "email"]
    }, (accessToken, refreshToken, profile, done) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (profile.emails == undefined || profile.emails == null) {
                throw new Error("Email is Undefined or Null");
            }
            let user = yield client.user.findUnique({
                where: {
                    email: profile.emails[0].value
                }
            });
            if (user) {
                done(null, user);
            }
            else {
                user = yield client.user.create({
                    data: {
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: null
                    }
                });
                done(null, user);
            }
        }
        catch (e) {
            done(e, false);
        }
    })));
    passport_1.default.serializeUser(function (user, done) {
        done(null, String(user.id));
    });
    passport_1.default.deserializeUser(function (id, done) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield client.user.findUnique({
                    where: {
                        id: Number(id)
                    }
                });
                if (user) {
                    done(null, user);
                }
                else {
                    throw new Error("No such user exists");
                }
            }
            catch (e) {
                done(e, false);
            }
        });
    });
}
