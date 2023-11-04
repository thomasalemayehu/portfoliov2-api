import { Request, Response, NextFunction } from "express";

const routeNotFoundMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).json({ message: "Route not found" });
};

export default routeNotFoundMiddleware;
