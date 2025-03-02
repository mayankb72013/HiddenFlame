"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const googleOAuth_1 = __importDefault(require("../Middleware/googleOAuth"));
const authRouter = express_1.default.Router();
(0, googleOAuth_1.default)();
authRouter.get("/google", passport_1.default.authenticate("google", {
    scope: ["profile", "email"]
}));
authRouter.get("/google/callback", passport_1.default.authenticate("google"), (req, res) => {
    res.redirect("http://localhost:5173/user/dashboard");
    // res.json("Call back URL reached");
});
exports.default = authRouter;
