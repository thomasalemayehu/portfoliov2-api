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
const Prisma_util_1 = require("../util/Prisma.util");
const Token_util_1 = require("../util/Token.util");
const Bcyrpt_util_1 = require("../util/Bcyrpt.util");
const errors_1 = require("../errors");
const Validator_util_1 = require("../util/Validator.util");
class AuthController {
    static getInstance() {
        if (this.INSTANCE == null || this.INSTANCE == undefined)
            this.INSTANCE = new AuthController();
        return this.INSTANCE;
    }
    registerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, name, } = req.body;
            if (!email)
                throw new errors_1.MissingRequiredAttribute("Email is required to register");
            else if (!password)
                throw new errors_1.MissingRequiredAttribute("Password is required to register");
            else if (!name)
                throw new errors_1.MissingRequiredAttribute("Name is required to register");
            Validator_util_1.Validator.validateEmail(email);
            Validator_util_1.Validator.validatePassword(password);
            Validator_util_1.Validator.validateName(name);
            const hashedPassword = yield Bcyrpt_util_1.Bcrypt.hashValue(password);
            const newUser = yield Prisma_util_1.Prisma.getInstance().user.create({
                data: {
                    email,
                    password: hashedPassword,
                    name,
                },
            });
            const token = yield Token_util_1.JsonWebToken.getToken({ id: newUser.id, email, name });
            res.status(201).json({ id: newUser.id, email, name, token });
        });
    }
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (!email)
                throw new errors_1.MissingRequiredAttribute("Email is required to login");
            else if (!password)
                throw new errors_1.MissingRequiredAttribute("Password is required to login");
            Validator_util_1.Validator.validateEmail(email);
            Validator_util_1.Validator.validatePassword(password);
            const possibleUser = yield Prisma_util_1.Prisma.getInstance().user.findFirst({
                where: { email: email },
            });
            if (!possibleUser)
                throw new errors_1.InvalidCredentials("Invalid email and/or password");
            const passwordMatch = yield Bcyrpt_util_1.Bcrypt.compare(password, possibleUser.password);
            console.log("Heree Login");
            if (!passwordMatch)
                throw new errors_1.InvalidCredentials("Invalid email and/or password");
            const token = yield Token_util_1.JsonWebToken.getToken({
                id: possibleUser.id,
                email: possibleUser.email,
                name: possibleUser.name,
            });
            res.status(200).json({
                id: possibleUser.id,
                email: possibleUser.email,
                name: possibleUser.name,
                token,
            });
        });
    }
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, newPassword, } = req.body;
            if (!email)
                throw new errors_1.MissingRequiredAttribute("Email is required to change");
            else if (!password)
                throw new errors_1.MissingRequiredAttribute("Password is required to change");
            else if (!newPassword)
                throw new errors_1.MissingRequiredAttribute("New Password is required to change");
            Validator_util_1.Validator.validateEmail(email);
            Validator_util_1.Validator.validatePassword(password);
            Validator_util_1.Validator.validatePassword(newPassword);
            const possibleUser = yield Prisma_util_1.Prisma.getInstance().user.findFirst({
                where: { email: email },
            });
            if (!possibleUser)
                throw new errors_1.InvalidCredentials("Invalid email and/or password");
            const passwordMatch = yield Bcyrpt_util_1.Bcrypt.compare(password, possibleUser.password);
            if (!passwordMatch)
                throw new errors_1.InvalidCredentials("Invalid email and/or password");
            const hashedPassword = yield Bcyrpt_util_1.Bcrypt.hashValue(newPassword);
            yield Prisma_util_1.Prisma.getInstance().user.update({
                where: { id: possibleUser.id },
                data: { password: hashedPassword },
            });
            const token = yield Token_util_1.JsonWebToken.getToken({
                id: possibleUser.id,
                email: possibleUser.email,
                name: possibleUser.name,
            });
            res.status(200).json({
                id: possibleUser.id,
                email: possibleUser.email,
                name: possibleUser.name,
                token,
            });
        });
    }
    requestReset(req, res) {
        res.status(200).json({ message: "Request Reset" });
    }
    forgotPassword(req, res) {
        res.status(200).json({ message: "Forgot Password" });
    }
}
AuthController.INSTANCE = null;
exports.default = AuthController;
