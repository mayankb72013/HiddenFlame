"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter = express_1.default.Router();
function checkAuth(req, res, next) {
    if (req.user) {
        next();
    }
    else {
        res.redirect("http://localhost:5173/signin");
    }
}
userRouter.get("/dashboard", checkAuth, function (req, res) {
    res.json(req.user);
});
userRouter.get("/logout", function (req, res, next) {
    req.logout((err) => {
        if (err) {
            next(err);
        }
        res.redirect("http://localhost:5173/signin");
    });
});
exports.default = userRouter;
