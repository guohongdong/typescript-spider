"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_session_1 = __importDefault(require("cookie-session"));
require("./controller/LoginController");
var decorator_1 = require("./controller/decorator");
var app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(cookie_session_1.default({
    name: 'session',
    keys: ['isLogin'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.use(decorator_1.router);
app.use(function (req, res, next) {
    req.nickName = 'dd';
    next();
});
app.listen(3000, function () {
    console.log('服务已启动');
});
