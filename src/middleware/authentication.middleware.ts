import { Request, Response, NextFunction } from "express";

const authenticationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");

    const bearerToken = bearer[1];

    // verify token

    // add user id to request

    // req.token = bearerToken;

    next();
  } else {
    res.status(401).json({ message: "Please Login" });
  }
};

export default authenticationMiddleware;
