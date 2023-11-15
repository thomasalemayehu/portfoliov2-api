"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const router = express_1.default.Router();
const authController = auth_controller_1.default.getInstance();
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.put("/reset", authController.resetPassword);
router.post("/request-reset", authController.requestReset);
router.post("/forgot-password", authController.resetPassword);
exports.default = router;
