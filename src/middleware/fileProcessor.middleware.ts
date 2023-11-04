import { Request, Response, NextFunction } from "express";

const fileProcessorMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Processing File....");

  next();
};

export default fileProcessorMiddleware;
