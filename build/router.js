"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var spider_1 = __importDefault(require("./spider"));
var keAnalyzer_1 = __importDefault(require("./keAnalyzer"));
var router = express_1.Router();
router.get('/', function (request, response) {
    response.send("   \n        <html>\n        <body>\n            <form method=\"POST\" action=\"/getData\">\n            <input type=\"password\" name=\"password\">\n            <button type=\"submit\">\u63D0\u4EA4</button>\n            </form>\n        </body>\n        </html>\n    ");
});
router.post('/getData', function (request, response) {
    var password = request.body.password;
    if (password === '111') {
        var url = 'https://hz.ke.com/ershoufang/';
        var analyze = keAnalyzer_1.default.getInstance();
        new spider_1.default(url, analyze);
        response.send('获取数据成功');
    }
    else {
        response.send('获取数据失败');
    }
});
exports.default = router;
