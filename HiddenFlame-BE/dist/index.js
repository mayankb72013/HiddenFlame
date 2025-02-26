"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./pageRoutes/auth"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json(), (0, cors_1.default)());
app.get("/", function (req, res) {
    res.status(200).json({
        msg: "Reached Successfully"
    });
});
app.use("/auth", auth_1.default);
app.post("/signup", function (req, res) {
});
app.post("/signin", function (req, res) {
});
app.listen(3000);
