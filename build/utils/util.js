"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResponseData = void 0;
/**
 * 格式化返回数据
 *
 * @param {*} data
 * @param {string} [msg]
 * @returns {Result}
 */
var getResponseData = function (data, msg) {
    if (msg) {
        return {
            success: false,
            msg: msg,
            data: data
        };
    }
    else {
        return {
            success: true,
            data: data
        };
    }
};
exports.getResponseData = getResponseData;
