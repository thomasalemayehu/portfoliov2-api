import { Request, Response, NextFunction } from "express";
import { type } from "os";
import {
  BcryptError,
  ErrorProcessingFile,
  InvalidCredentials,
  JWTError,
  MissingRequiredAttribute,
  RequiredEntityNotFound,
  UnAuthenticatedError,
  UnAuthorizedError,
  ValidationError,
} from "../errors";

import { PrismaClientValidationError } from "@prisma/client/runtime/library";
const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    err instanceof UnAuthenticatedError ||
    err instanceof JWTError ||
    err instanceof InvalidCredentials
  ) {
    res.status(401).json({ message: "Please Login" });
    return;
  } else if (err instanceof UnAuthorizedError) {
    res.status(403).json({ message: "Please Login" });
    return;
  } else if (err instanceof MissingRequiredAttribute) {
    res.status(400).json({ message: err.message });
    return;
  } else if (err instanceof RequiredEntityNotFound) {
    res.status(404).json({ message: err.message });
    return;
  } else if (err instanceof ErrorProcessingFile) {
    res.status(400).json({ message: "Bad file try again" });
    return;
  } else if (err instanceof BcryptError) {
    res
      .status(500)
      .json({ message: "We are having issues. Please try again later!" });
    return;
  } else if (err instanceof ValidationError) {
    res.status(400).json({ message: err.message });
    return;
  } else if (err.name === "PrismaClientKnownRequestError") {
    res.status(400).json({ message: err.message });
    return;
  } else {
    console.log(err.name);
  }

  res
    .status(500)
    .json({ message: "We are having issues. Please try again later!" });
};

export default errorMiddleware;
