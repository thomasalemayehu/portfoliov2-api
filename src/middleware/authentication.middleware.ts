import { Request, Response, NextFunction } from "express";
import { JsonWebToken } from "../util/Token.util";
import { UnAuthenticatedError } from "../errors";

const authenticationMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");

    const bearerToken = bearer[1];

    if (!bearerToken) throw new UnAuthenticatedError("Please Login");

    const data = await JsonWebToken.verifyToken(bearerToken);

    if (!data) throw new UnAuthenticatedError("Please Login");

    req.verifiedUserId = data.id;

    next();
  } else throw new UnAuthenticatedError("Please Login");
};

export default authenticationMiddleware;
