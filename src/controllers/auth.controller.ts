import { Request, Response } from "express";

class AuthController {
  private static INSTANCE: AuthController | null = null;

  public static getInstance() {
    if (this.INSTANCE) return this.INSTANCE;

    return new AuthController();
  }
  public registerUser(req: Request, res: Response): void {
    res.status(200).json({ message: "Register User" });
  }
  public loginUser(req: Request, res: Response): void {
    res.status(200).json({ message: "Login User" });
  }
  public resetPassword(req: Request, res: Response): void {
    res.status(200).json({ message: "Reset Password" });
  }
  public requestReset(req: Request, res: Response): void {
    res.status(200).json({ message: "Request Reset" });
  }
  public forgotPassword(req: Request, res: Response): void {
    res.status(200).json({ message: "Forgot Password" });
  }
}

export default AuthController;
