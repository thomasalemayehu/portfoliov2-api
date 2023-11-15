"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Token_util_1 = require("../util/Token.util");
const errors_1 = require("../errors");
const authenticationMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        if (!bearerToken)
            throw new errors_1.UnAuthenticatedError("Please Login");
        const data = yield Token_util_1.JsonWebToken.verifyToken(bearerToken);
        if (!data)
            throw new errors_1.UnAuthenticatedError("Please Login");
        req.verifiedUserId = data.id;
        next();
    }
    else
        throw new errors_1.UnAuthenticatedError("Please Login");
});
exports.default = authenticationMiddleware;
