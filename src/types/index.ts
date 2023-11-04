import { Request } from "express"

export interface RequestWithUserId extends Request{
    verifiedUserId?:string,
}
export interface RequestWithUploadFile extends Request{
    files?:Array<any>,
}

export interface RequestWithUserIdAndUploadFile extends Request {
    verifiedUserId?: string,
    files?:any,
}