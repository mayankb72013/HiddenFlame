"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuthMiddleware = userAuthMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function userAuthMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.json({
            msg: "Token Not found"
        });
        return;
    }
    const token = authHeader.split(" ")[1];
    try {
        const decode = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_CLIENT);
        req.user = decode.user;
        next();
    }
    catch (e) {
        res.json({
            msg: "Token is invalid"
        });
    }
}
