"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
// Allow local
const allowlist = ["::1"];
const rateLimiterConfig = (0, express_rate_limit_1.default)({
    windowMs: 60 * 1000,
    max: 1000,
    standardHeaders: true,
    legacyHeaders: false,
    message: "Maximum Request Limit Rate Reached.",
    skip: (request, response) => allowlist.includes(request.ip || "0.0.0.0"),
});
exports.default = rateLimiterConfig;
