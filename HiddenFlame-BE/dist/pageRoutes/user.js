"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter = express_1.default.Router();
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
userRouter.get("/dashboard", function (req, res) {
    res.json(req.user);
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
