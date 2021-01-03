"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var decorator_1 = require("./decorator");
var LoginController = /** @class */ (function () {
    function LoginController() {
    }
    LoginController.prototype.home = function (request, response) {
        var isLogin = request.session ? request.session.login : undefined;
        if (isLogin) {
            response.send("\n            <!DOCTYPE html>\n            <html lang=\"zh\">\n            <head>\n                <meta charset=\"UTF-8\">\n                <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n                <title>\u9000\u51FA</title>\n            </head>\n            <body>\n                <a href=\"/getData\">\u83B7\u53D6\u6570\u636E</a>\n                <a href=\"/showData\">\u5C55\u793A\u6570\u636E</a>\n                <a href=\"/logout\">\u9000\u51FA</a>\n            </body>\n            </html>");
        }
        else {
            response.send("   \n            <!DOCTYPE html>\n            <html lang=\"zh\">\n            <head>\n                <meta charset=\"UTF-8\">\n                <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n                <title>\u767B\u5F55</title>\n            </head>\n            <body>\n                <form method=\"POST\" action=\"/login\">\n                    <input type=\"password\" name=\"password\" autocomplete>\n                    <button type=\"submit\">\u767B\u5F55</button>\n                </form>\n            </body>\n            </html>\n        ");
        }
    };
    __decorate([
        decorator_1.get('/'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "home", null);
    LoginController = __decorate([
        decorator_1.controller
    ], LoginController);
    return LoginController;
}());
