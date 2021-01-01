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
    var url = 'https://hz.ke.com/ershoufang/';
    var analyze = keAnalyzer_1.default.getInstance();
    new spider_1.default(url, analyze);
    response.send('获取数据成功');
});
exports.default = router;
