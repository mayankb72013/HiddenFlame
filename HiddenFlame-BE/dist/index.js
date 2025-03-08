"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./pageRoutes/auth"));
const cors_1 = __importDefault(require("cors"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const user_1 = __importDefault(require("./pageRoutes/user"));
const passportconfig_1 = __importDefault(require("./Middleware/passportconfig"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true
}));
// app.options("*",cors())
app.use(express_1.default.json());
app.use((0, cookie_session_1.default)({
    name: "session",
    maxAge: 3 * 60 * 60,
    keys: [process.env.COOKIE_SESSION_KEY]
}));
app.use(function (request, response, next) {
    if (request.session && !request.session.regenerate) {
        request.session.regenerate = (cb) => {
            cb();
        };
    }
    if (request.session && !request.session.save) {
        request.session.save = (cb) => {
            cb();
        };
    }
    next();
});
app.use(passportconfig_1.default.initialize());
app.use(passportconfig_1.default.session());
app.use("/auth", auth_1.default);
app.use("/user", user_1.default);
app.get("/", function (req, res) {
    res.status(200).json({
        msg: "Reached Successfully"
    });
});
app.get("/privacy-policy", function (req, res) {
    res.json("here");
});
app.get("/delete-user", function (req, res) {
    res.json("here");
});
app.listen(3000);
