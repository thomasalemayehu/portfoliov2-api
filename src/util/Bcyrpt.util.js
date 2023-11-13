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
exports.Bcrypt = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const errors_1 = require("../errors");
class Bcrypt {
    static hashValue(value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salt = yield bcrypt_1.default.genSalt();
                const hashedValue = yield bcrypt_1.default.hash(value, salt);
                return hashedValue;
            }
            catch (e) {
                throw new errors_1.BcryptError("Issues with Bcrypt");
            }
        });
    }
    static compare(value, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield bcrypt_1.default.compare(value, hash);
            }
            catch (error) {
                throw new errors_1.BcryptError("Values do not match");
            }
        });
    }
}
exports.Bcrypt = Bcrypt;
