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
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const userRouter = express_1.default.Router();
const client = new client_1.PrismaClient();
function checkAuth(req, res, next) {
    if (req.user) {
        req.authType = "oauth";
        next();
    }
    else if (req.id) {
        req.authType = "normal";
        next();
    }
    else {
        res.redirect("http://localhost:5173/signin");
    }
}
userRouter.use(checkAuth);
userRouter.get("/authSuccess", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        if ((_a = req.user) === null || _a === void 0 ? void 0 : _a.isOnboarded) {
            res.json({
                msg: "Onboarded already",
                redirectUrl: "http://localhost:5173/user/dashboard"
            });
        }
        else {
            res.json({
                msg: "Not Onboarded",
                redirectUrl: "http://localhost:5173/user/onboarding"
            });
        }
    });
});
const dataSchema = zod_1.z.object({
    username: zod_1.z.string().min(3, "must be within [3-25] characters").max(25, "must be within [3-25] characters"),
    age: zod_1.z.number().min(18, "must be greater than 18").max(130),
    gender: zod_1.z.string(),
    country: zod_1.z.string(),
    state: zod_1.z.string().optional(),
    city: zod_1.z.string().optional(),
    lookingFor: zod_1.z.string(),
    about: zod_1.z.string(),
    relStatus: zod_1.z.string(),
    youAreRather: zod_1.z.array(zod_1.z.string()),
    hobbies: zod_1.z.array(zod_1.z.string()),
    features: zod_1.z.array(zod_1.z.string())
});
userRouter.put("/onboarding", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
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
            const user = yield client.user.findUnique({
                where: {
                    email: (_a = req.user) === null || _a === void 0 ? void 0 : _a.email
                }
            });
            if (user !== null) {
                yield client.user.update({
                    where: {
                        email: (_b = req.user) === null || _b === void 0 ? void 0 : _b.email
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
                });
                res.json({
                    msg: "onboarding successful",
                    redirectUrl: "http://localhost:5173/user/dashboard"
                });
            }
            else {
                res.status(404).json({
                    msg: "User not found"
                });
            }
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
userRouter.get("/dashboard", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.json(req.user);
    });
});
userRouter.get("/logout", function (req, res, next) {
    if (req.authType === "oauth") {
        req.logout((err) => {
            if (err) {
                res.json({
                    msg: err
                });
            }
            res.redirect("http://localhost:5173/signin");
        });
    }
    else if (req.authType === "normal") {
        //Since i am using localStorage it can only be cleared from frontEnd
        res.json({
            msg: "clear it"
        });
    }
});
exports.default = userRouter;
