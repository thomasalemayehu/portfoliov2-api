import { Request, Response, NextFunction, RequestHandler } from "express";
import multer, { Field, Multer, MulterError } from "multer";
import path from "path";
import upload from "../config/multer.config";
import { FileUploadArguments } from "../types";



const fileProcessorMiddleware = (identifiers:Field[]): RequestHandler => {
  console.log("Here..... At File Multiple Processor");

  return async (req: Request, res: Response, next: NextFunction) => {
    upload.fields(identifiers)(req, res, (err) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ error: "File upload failed." });
      } else {
        console.log("Done");
      }
      next();
    });
  };
};
export default fileProcessorMiddleware;
