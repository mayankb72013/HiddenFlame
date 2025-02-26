"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userAuth_1 = require("../Middleware/userAuth");
const userRouter = express_1.default.Router();
userRouter.use(express_1.default.json(), userAuth_1.userAuthMiddleware);
userRouter.get("/dashboard", function (req, res) {
    res.json({
        msg: "This is the Dashboard"
    });
});
