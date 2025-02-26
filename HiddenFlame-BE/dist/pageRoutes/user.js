"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter = express_1.default.Router();
userRouter.use(express_1.default.json());
userRouter.get("/dashboard", function (req, res) {
    res.json({
        msg: "This is the Dashboard"
    });
});
