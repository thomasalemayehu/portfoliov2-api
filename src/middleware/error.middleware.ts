import { Request, Response, NextFunction } from "express";

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("here");
  console.log(err);

  res.status(500).json(err);
};

export default errorMiddleware;
