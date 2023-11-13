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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonWebToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_1 = require("../errors");
class JsonWebToken {
    static getToken(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.SECRET == null || this.SECRET == undefined)
                throw new Error("Secret Token for JWT not setup in ENV");
            return jsonwebtoken_1.default.sign(data, this.SECRET);
        });
    }
    static verifyToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.SECRET)
                throw new Error("Secret Token for JWT not setup in ENV");
            try {
                const data = jsonwebtoken_1.default.verify(token, this.SECRET);
                return data;
            }
            catch (e) {
                throw new errors_1.JWTError("Malformed JWT");
            }
        });
    }
}
exports.JsonWebToken = JsonWebToken;
JsonWebToken.SECRET = process.env.SECRET;
