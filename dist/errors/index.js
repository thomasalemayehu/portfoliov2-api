"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = exports.InvalidCredentials = exports.BcryptError = exports.JWTError = exports.ErrorProcessingFile = exports.RequiredEntityNotFound = exports.MissingRequiredAttribute = exports.UnAuthorizedError = exports.UnAuthenticatedError = void 0;
class UnAuthenticatedError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.UnAuthenticatedError = UnAuthenticatedError;
class UnAuthorizedError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.UnAuthorizedError = UnAuthorizedError;
class MissingRequiredAttribute extends Error {
    constructor(message) {
        super(message);
    }
}
exports.MissingRequiredAttribute = MissingRequiredAttribute;
class RequiredEntityNotFound extends Error {
    constructor(message) {
        super(message);
    }
}
exports.RequiredEntityNotFound = RequiredEntityNotFound;
class ErrorProcessingFile extends Error {
    constructor(message) {
        super(message);
    }
}
exports.ErrorProcessingFile = ErrorProcessingFile;
class JWTError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.JWTError = JWTError;
class BcryptError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.BcryptError = BcryptError;
class InvalidCredentials extends Error {
    constructor(message) {
        super(message);
    }
}
exports.InvalidCredentials = InvalidCredentials;
class ValidationError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.ValidationError = ValidationError;
