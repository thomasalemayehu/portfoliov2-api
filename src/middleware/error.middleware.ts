import { Request, Response, NextFunction } from "express";
import { type } from "os";
import { BcryptError, ErrorProcessingFile, InvalidCredentials, JWTError, MissingRequiredAttribute, RequiredEntityNotFound, UnAuthenticatedError, UnAuthorizedError } from "../errors";

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof UnAuthenticatedError) {
    console.log("Unauthenticated");
  } else if (err instanceof UnAuthorizedError) {
    console.log("Unauthorized");
  } else if (err instanceof MissingRequiredAttribute) {
    console.log("MissingRequiredAttribute");
  } else if (err instanceof RequiredEntityNotFound) {
    console.log("RequiredEntityNotFound");
  } else if (err instanceof ErrorProcessingFile) {
    console.log("ErrorProcessingFile");
  } else if (err instanceof JWTError) {
    console.log("JWTError");
  } else if (err instanceof BcryptError) {
    console.log("BcryptError");
  } else if (err instanceof InvalidCredentials) {
    console.log("InvalidCredentials");
  }

  res.status(500).json();
};

export default errorMiddleware;
