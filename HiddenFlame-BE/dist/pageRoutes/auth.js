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
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const zod_1 = require("zod");
const authRouter = express_1.default.Router();
authRouter.use(express_1.default.json());
const client = new client_1.PrismaClient();
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
passport_1.default.authenticate("google", {
    scope: ["profile", "email"],
    // prompt: "consent"
}));
authRouter.get("/google/callback", passport_1.default.authenticate("google"), (req, res) => {
    res.redirect("http://localhost:5173/user/dashboard");
    // res.json("Call back URL reached");
});
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
, passport_1.default.authenticate('discord', {
// prompt: "consent"
}));
authRouter.get("/discord/callback", passport_1.default.authenticate("discord"), (req, res) => {
    res.redirect("http://localhost:5173/user/dashboard");
    // res.json("Successfull OAuth for discord");
});
const inputSchema = zod_1.z.object({
    username: zod_1.z.string().min(3, "Name mininum 3 characters").max(25, "Name max limit 25 characters").optional(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string()
        .min(8, "Password should contain at least 8 characters")
        .refine((val) => /[a-z]/.test(val) &&
        /[A-Z]/.test(val) &&
        /\d/.test(val) &&
        /[@$!%*?&]/.test(val), {
        message: "Password should contain at least 8 characters with at least one uppercase letter, lowercase letter, number, and one special character (@$!%*?&)"
    })
});
//Normal signin and signup
authRouter.post("/signup", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const check = inputSchema.safeParse(req.body);
        if (check.success) {
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            try {
                yield client.user.create({
                    data: {
                        name: username,
                        email: email,
                        password: hashedPassword
                    }
                });
            }
            catch (e) {
                res.status(500).json({
                    msg: e
                });
                return;
            }
            res.json({
                success: "You've been signed up successfully"
            });
            return;
        }
        else {
            res.status(400).json({
                msg: check.error.message
            });
            return;
        }
    });
});
authRouter.post("/signin", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const email = req.body.email;
        const password = req.body.passport;
        const check = inputSchema.safeParse(req.body);
        if (check.success) {
            const user = yield client.user.findUnique({
                where: {
                    email: email
                }
            });
            if (user) {
                if (user.password != null) {
                    const check = yield bcrypt_1.default.compare(password, user.password);
                    if (check === true) {
                        const token = jsonwebtoken_1.default.sign({
                            id: user.id
                        }, process.env.JWT_SECRET_CLIENT);
                        res.json({
                            token: token
                        });
                    }
                    else {
                        res.status(401).json({
                            msg: "Invalid Password"
                        });
                    }
                }
                else {
                    res.status(403).json({
                        msg: "User has signed up with either Google or Discord"
                    });
                }
            }
            else {
                res.status(404).json({
                    msg: "No such user exists"
                });
            }
        }
        else {
            res.json({
                msg: check.error.message
            });
        }
    });
});
exports.default = authRouter;
