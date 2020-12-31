"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio_1 = __importDefault(require("cheerio"));
var fs_1 = __importDefault(require("fs"));
var KeAnalyzer = /** @class */ (function () {
    function KeAnalyzer() {
    }
    KeAnalyzer.getInstance = function () {
        if (!KeAnalyzer.instance) {
            KeAnalyzer.instance = new KeAnalyzer();
        }
        return KeAnalyzer.instance;
    };
    KeAnalyzer.prototype.getJSONInfos = function (houseInfo, filePath) {
        var fileContent = {};
        if (fs_1.default.existsSync(filePath)) {
            fileContent = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
        }
        fileContent[houseInfo.time] = houseInfo.data;
        return fileContent;
    };
    KeAnalyzer.prototype.getHouseInfo = function (html) {
        var houses = [];
        var $ = cheerio_1.default.load(html);
        $('li.clear').map(function (index, element) {
            var title = $(element).find('a.maidian-detail').text().trim();
            var address = $(element).find('.positionInfo a').text().trim();
            var houseInfos = $(element).find('.houseInfo').text().split('|');
            var floor = houseInfos[0].trim().replace(/\s+/g, '');
            var size = houseInfos[1].trim();
            var direction = houseInfos[2].trim();
            var follow = +$(element).find('div.followInfo').text().split('/')[0].trim().split('人')[0];
            var time = $(element).find('div.followInfo').text().split('/')[1].trim();
            houses.push({
                title: title,
                address: address,
                floor: floor,
                size: size,
                direction: direction,
                follow: follow,
                time: time
            });
        });
        return {
            time: new Date().getTime(),
            data: houses
        };
    };
    KeAnalyzer.prototype.analyze = function (html, filePath) {
        var houses = this.getHouseInfo(html);
        var fileContent = this.getJSONInfos(houses, filePath);
        return JSON.stringify(fileContent);
    };
    return KeAnalyzer;
}());
exports.default = KeAnalyzer;
