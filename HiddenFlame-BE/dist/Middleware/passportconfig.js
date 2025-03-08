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
const passport = require("passport");
const client_1 = require("@prisma/client");
const googleOAuth_1 = __importDefault(require("./googleOAuth"));
const discordOAuth_1 = __importDefault(require("./discordOAuth"));
const client = new client_1.PrismaClient();
(0, googleOAuth_1.default)();
(0, discordOAuth_1.default)();
passport.serializeUser(function (user, done) {
    done(null, user.email);
});
passport.deserializeUser(function (email, done) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield client.user.findUnique({
                where: {
                    email: email
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
exports.default = passport;
