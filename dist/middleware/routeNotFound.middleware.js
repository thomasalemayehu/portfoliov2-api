"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routeNotFoundMiddleware = (req, res, next) => {
    res.status(404).json({ message: "Route not found" });
};
exports.default = routeNotFoundMiddleware;
