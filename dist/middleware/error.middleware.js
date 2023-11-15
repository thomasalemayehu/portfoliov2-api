"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const errorMiddleware = (err, req, res, next) => {
    console.log(err);
    if (err instanceof errors_1.UnAuthenticatedError ||
        err instanceof errors_1.JWTError) {
        res.status(401).json({ message: "Please Login" });
        return;
    }
    else if (err instanceof errors_1.InvalidCredentials) {
        res.status(401).json({ message: "Invalid Credentials" });
    }
    else if (err instanceof errors_1.UnAuthorizedError) {
        res.status(403).json({ message: "Please Login" });
        return;
    }
    else if (err instanceof errors_1.MissingRequiredAttribute) {
        res.status(400).json({ message: err.message });
        return;
    }
    else if (err instanceof errors_1.RequiredEntityNotFound) {
        res.status(404).json({ message: err.message });
        return;
    }
    else if (err instanceof errors_1.ErrorProcessingFile) {
        res.status(400).json({ message: "Bad file try again" });
        return;
    }
    else if (err instanceof errors_1.BcryptError) {
        res
            .status(500)
            .json({ message: "We are having issues. Please try again later!" });
        return;
    }
    else if (err instanceof errors_1.ValidationError) {
        res.status(400).json({ message: err.message });
        return;
    }
    else if (err.name === "PrismaClientKnownRequestError") {
        res.status(400).json({ message: err.message });
        return;
    }
    else {
        console.log(err);
    }
    res
        .status(500)
        .json({ message: "We are having issues. Please try again later!" });
};
exports.default = errorMiddleware;
