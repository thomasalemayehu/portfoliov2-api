import { Request, Response } from "express";
import { Prisma } from "../util/Prisma.util";
import { JsonWebToken } from "../util/Token.util";
import { Bcrypt } from "../util/Bcyrpt.util";
import { InvalidCredentials, MissingRequiredAttribute } from "../errors";

class AuthController {
  private static INSTANCE: AuthController | null = null;

  public static getInstance() {
    if (this.INSTANCE == null || this.INSTANCE == undefined)
      this.INSTANCE = new AuthController();

    return this.INSTANCE;
  }

  public async registerUser(req: Request, res: Response): Promise<void> {
    const {
      email,
      password,
      name,
    }: { email: string; password: string; name: string } = req.body;

    if (!email)
      throw new MissingRequiredAttribute("Email is required to register");
    else if (!password)
      throw new MissingRequiredAttribute("Password is required to register");
    else if (!name)
      throw new MissingRequiredAttribute("Name is required to register");

    const hashedPassword = await Bcrypt.hashValue(password);
    const newUser = await Prisma.getInstance().user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    const token = await JsonWebToken.getToken({ id: newUser.id, email, name });

    res.status(201).json({ id: newUser.id, email, name, token });
  }

  public async loginUser(req: Request, res: Response): Promise<void> {
    const { email, password }: { email: string; password: string } = req.body;

    if (!email)
      throw new MissingRequiredAttribute("Email is required to login");
    else if (!password)
      throw new MissingRequiredAttribute("Password is required to login");

    const possibleUser = await Prisma.getInstance().user.findFirst({
      where: { email: email },
    });

    if (!possibleUser)
      throw new InvalidCredentials("Invalid email and/or password");

    const passwordMatch = await Bcrypt.compare(password, possibleUser.password);

    if (!passwordMatch)
      throw new InvalidCredentials("Invalid email and/or password");

    const token = await JsonWebToken.getToken({
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
  }

  public async resetPassword(req: Request, res: Response): Promise<void> {
    const {
      email,
      password,
      newPassword,
    }: { email: string; password: string; newPassword: string } = req.body;

    if (!email)
      throw new MissingRequiredAttribute("Email is required to change");
    else if (!password)
      throw new MissingRequiredAttribute("Password is required to change");
    else if (!newPassword)
      throw new MissingRequiredAttribute("New Password is required to change");

    const possibleUser = await Prisma.getInstance().user.findFirst({
      where: { email: email },
    });

    if (!possibleUser)
      throw new InvalidCredentials("Invalid email and/or password");

    const passwordMatch = await Bcrypt.compare(password, possibleUser.password);

    if (!passwordMatch)
      throw new InvalidCredentials("Invalid email and/or password");

    const hashedPassword = await Bcrypt.hashValue(newPassword);

    await Prisma.getInstance().user.update({
      where: { id: possibleUser.id },
      data: { password: hashedPassword },
    });

    const token = await JsonWebToken.getToken({
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
  }

  public requestReset(req: Request, res: Response): void {
    res.status(200).json({ message: "Request Reset" });
  }
  public forgotPassword(req: Request, res: Response): void {
    res.status(200).json({ message: "Forgot Password" });
  }
}

export default AuthController;
