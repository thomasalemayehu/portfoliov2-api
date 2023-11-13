import { Request } from "express";

export interface RequestWithUserId extends Request {
  verifiedUserId?: string;
}
export interface RequestWithUploadFile extends Request {
  leadImage?: any;
  selectedImages?: Array<any>;
}

export interface RequestWithUserIdAndUploadFile extends Request {
  verifiedUserId?: string;
  leadImage?: any;
  selectedImages?: any;
}

export interface FileUploadArguments{
  name:string,
  maxCount?:number,
}