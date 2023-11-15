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
require("mocha");
const Database_util_1 = __importDefault(require("../util/Database.util"));
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const index_1 = __importDefault(require("../index"));
chai_1.default.use(chai_http_1.default);
chai_1.default.should();
describe("User Authentication Tests", () => {
    /**
     * Register User Test
     */
    describe("Register user /auth/register", () => {
        const registerRoute = "/auth/register";
        before(() => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, Database_util_1.default)();
        }));
        it("Register User with Empty Body", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield chai_1.default.request(index_1.default).post(registerRoute);
            response.should.have.status(400);
            response.body.should.be.eql({
                message: "Email is required to register",
            });
        }));
        it("Register User with Email only", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield chai_1.default
                .request(index_1.default)
                .post(registerRoute)
                .send({ email: "test@gmail.com" });
            response.should.have.status(400);
            response.body.should.be.eql({
                message: "Password is required to register",
            });
        }));
        it("Register User with  Email & Password", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield chai_1.default
                .request(index_1.default)
                .post(registerRoute)
                .send({ email: "test@gmail.com", password: "StrongPass@123" });
            response.should.have.status(400);
            response.body.should.be.eql({
                message: "Name is required to register",
            });
        }));
        it("Register User with  invalid Email", () => __awaiter(void 0, void 0, void 0, function* () {
            const email = "testgmail.com";
            const response = yield chai_1.default
                .request(index_1.default)
                .post(registerRoute)
                .send({ email: email, password: "StrongPass@123", name: "Test User" });
            response.should.have.status(400);
            response.body.should.be.eql({
                message: `${email} is not a valid email`,
            });
        }));
        it("Register User with  invalid Password", () => __awaiter(void 0, void 0, void 0, function* () {
            const password = "Password";
            const response = yield chai_1.default.request(index_1.default).post(registerRoute).send({
                email: "test@gmail.com",
                password: password,
                name: "Test User",
            });
            response.should.have.status(400);
            response.body.should.be.eql({
                message: "Password must have at least 8 characters, 1 capital, 1 small, 1 number and 1 special character",
            });
        }));
        it("Register User with  invalid Name", () => __awaiter(void 0, void 0, void 0, function* () {
            const name = "A";
            const response = yield chai_1.default.request(index_1.default).post(registerRoute).send({
                email: "test@gmail.com",
                password: "StrongPass@123",
                name: name,
            });
            response.should.have.status(400);
            response.body.should.be.eql({
                message: `${name} is not a valid name`,
            });
        }));
        it("Register User with  valid info", () => __awaiter(void 0, void 0, void 0, function* () {
            const userObject = {
                email: "test@gmail.com",
                password: "StrongPass@123",
                name: "User one",
            };
            const response = yield chai_1.default
                .request(index_1.default)
                .post(registerRoute)
                .send(userObject);
            response.should.have.status(201);
            response.body.email.should.be.eql(userObject.email);
            response.body.name.should.be.eql(userObject.name);
            response.body.token.should.not.be.eql(null);
            response.body.id.should.not.be.eql(null);
        }));
        it("Register duplicate User with  valid info", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield chai_1.default.request(index_1.default).post(registerRoute).send({
                email: "test@gmail.com",
                password: "StrongPass@123",
                name: "User one",
            });
            response.should.have.status(400);
        }));
    });
    /**
     * Login User Test
     */
    describe("Login user /auth/login", () => {
        const loginRoute = "/auth/login";
        before(() => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, Database_util_1.default)();
            yield chai_1.default.request(index_1.default).post("/auth/register").send({
                email: "test@gmail.com",
                password: "StrongPass@123",
                name: "User one",
            });
            yield chai_1.default.request(index_1.default).post("/auth/register").send({
                email: "test2@gmail.com",
                password: "StrongPass@1234",
                name: "User Two",
            });
        }));
        it("Login User with Empty Body", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield chai_1.default.request(index_1.default).post(loginRoute);
            response.should.have.status(400);
            response.body.should.be.eql({
                message: "Email is required to login",
            });
        }));
        it("Login User with Email only", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield chai_1.default
                .request(index_1.default)
                .post(loginRoute)
                .send({ email: "test@gmail.com" });
            response.should.have.status(400);
            response.body.should.be.eql({
                message: "Password is required to login",
            });
        }));
        it("Login User with  incorrect Email", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield chai_1.default
                .request(index_1.default)
                .post(loginRoute)
                .send({ email: "test3@gmail.com", password: "MyPassword@1234" });
            response.should.have.status(401);
        }));
        it("Login User with  invalid password", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield chai_1.default
                .request(index_1.default)
                .post(loginRoute)
                .send({ email: "test@gmail.com", password: "StrongPass@1234" });
            response.should.have.status(401);
        }));
        it("Login User with existing email & password(wrong combination)", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield chai_1.default.request(index_1.default).post(loginRoute).send({
                email: "test@gmail.com",
                password: "StrongPass@1234",
            });
            response.should.have.status(401);
        }));
        it("Login User with  valid info", () => __awaiter(void 0, void 0, void 0, function* () {
            const userObject = {
                email: "test@gmail.com",
                password: "StrongPass@123",
            };
            const response = yield chai_1.default
                .request(index_1.default)
                .post(loginRoute)
                .send(userObject);
            response.should.have.status(200);
            response.body.email.should.be.eql(userObject.email);
            response.body.token.should.not.be.eql(null);
            response.body.id.should.not.be.eql(null);
        }));
    });
});
