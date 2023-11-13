import { Request } from "express";
import multer, { Multer } from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    console.log("Saving file...")
    const uploadFolderPath = path.join(__dirname, "../public/uploads/");

    if (!fs.existsSync(uploadFolderPath)) {
      fs.mkdirSync(uploadFolderPath, { recursive: true });
    }
    cb(null, uploadFolderPath);
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);

    cb(null, uniqueSuffix + fileExtension);

    return true;
  },
});

const upload: Multer = multer({ storage: storage });

export default upload;
