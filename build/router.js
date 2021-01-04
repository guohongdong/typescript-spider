"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var spider_1 = __importDefault(require("./utils/spider"));
var analyzer_1 = __importDefault(require("./utils/analyzer"));
var util_1 = require("./utils/util");
/**
 * 检查登录状态的中间件
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
var checkLogin = function (req, res, next) {
    var isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        next();
    }
    else {
        res.json(util_1.getResponseData(null, '请先登录'));
    }
};
var router = express_1.Router();
router.post('/login', function (request, response) {
    var password = request.body.password;
    var isLogin = request.session ? request.session.login : undefined;
    if (isLogin) {
        response.json(util_1.getResponseData(false, '已经成功'));
    }
    else {
        if (password === '1234' && request.session) {
            request.session.login = true;
            response.json(util_1.getResponseData(true));
        }
        else {
            response.json(util_1.getResponseData(false, '登录失败'));
        }
    }
});
router.get('/getData', checkLogin, function (request, response) {
    var url = 'https://hz.ke.com/ershoufang/';
    var analyze = analyzer_1.default.getInstance();
    new spider_1.default(url, analyze);
    response.json(util_1.getResponseData(true));
});
router.get('/showData', checkLogin, function (request, response) {
    try {
        var filePath = path_1.default.resolve(__dirname, '../data/house.json');
        var fileContent = {};
        if (fs_1.default.existsSync(filePath)) {
            fileContent = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
        }
        response.json(util_1.getResponseData(fileContent));
    }
    catch (error) {
        response.json(util_1.getResponseData(false, '尚未获取过数据'));
    }
});
exports.default = router;
