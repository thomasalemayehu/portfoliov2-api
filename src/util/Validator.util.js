"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const index_1 = require("../errors/index");
class Validator {
    static validateEmail(email) {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(email))
            throw new index_1.ValidationError(`${email} is not a valid email`);
    }
    static validatePassword(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(password))
            throw new index_1.ValidationError(`Password must have at least 8 characters, 1 capital, 1 small, 1 number and 1 special character`);
    }
    static validateName(name) {
        const nameRegex = /^[A-Za-z]{3,}\s[A-Za-z]{3,}$/;
        if (!nameRegex.test(name))
            throw new index_1.ValidationError(`${name} is not a valid name`);
    }
    static validateURL(url) {
        const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
        if (!urlRegex.test(url))
            throw new index_1.ValidationError(`${url} is not a valid URL`);
    }
}
exports.Validator = Validator;
