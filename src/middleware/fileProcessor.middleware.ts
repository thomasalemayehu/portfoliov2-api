import { Request, Response, NextFunction, RequestHandler } from "express";
import multer, { Multer, MulterError } from "multer";
import path from "path";
import upload from "../config/multer.config";

const fileProcessorMiddleware = (
  upload: Multer,
  identifier: string
): RequestHandler => {
  return (req, res, next) => {
    const result = upload.array(identifier)(req, res, (err) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ error: "File upload failed." });
      }
      next();
    });
  };
};

export default fileProcessorMiddleware;
