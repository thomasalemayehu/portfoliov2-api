import express, { Router } from "express";
import AuthController from "../controllers/auth.controller";
const router: Router = express.Router();
const authController = AuthController.getInstance();

router.post("/register",authController.registerUser)
router.post("/login",authController.loginUser)
router.put("/reset",authController.resetPassword)
router.post("/request-reset",authController.requestReset)
router.post("/forgot-password",authController.resetPassword)

export default router;
