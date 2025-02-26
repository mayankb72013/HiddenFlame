"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const googleOAuth_1 = require("../Middleware/googleOAuth");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cors_1 = __importDefault(require("cors"));
(0, googleOAuth_1.googleAuth)();
const authRouter = express_1.default.Router();
authRouter.use((0, cookie_parser_1.default)(), express_1.default.json(), (0, cors_1.default)());
//Google OAuth 2.0
authRouter.get("/test", function (req, res) {
    res.json("Reached Auth Router");
});
authRouter.get("/google", passport_1.default.authenticate("google", {
    scope: ["profile", "email"], prompt: "consent"
}));
authRouter.get("/google/callback", passport_1.default.authenticate("google", { session: false }), function (req, res, next) {
    console.log("got /auth/google/callback");
    if (!req.user) {
        res.status(401).json({
            msg: "Authentication failed"
        });
        return;
    }
    const { token } = req.user;
    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });
    console.log("Redirecting to Dashboard");
    res.redirect("http://localhost:5173/dashboard");
});
authRouter.get("/check-auth", function (req, res) {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({
            msg: "Not Authenticated"
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_CLIENT);
        res.json({
            user: decoded.user,
            token: token
        });
    }
    catch (e) {
        res.status(401).json({
            msg: "Invalid Token"
        });
    }
});
exports.default = authRouter;
