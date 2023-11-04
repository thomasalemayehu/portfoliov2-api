import { Request, Response, NextFunction } from "express";
import { JsonWebToken } from "../util/Token.util";

const authenticationMiddleware = async(
  req: any,
  res: Response,
  next: NextFunction
) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");

    const bearerToken = bearer[1];

    const data = await JsonWebToken.verifyToken(bearerToken);

    if(!data) {
      res.status(401).json({ message: "Please Login" });
      return;
    }

    req.verifiedUserId= data.id;

    next();
  } else {
    res.status(401).json({ message: "Please Login" });
  }
};

export default authenticationMiddleware;
