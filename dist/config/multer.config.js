"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        console.log("Saving file...");
        const uploadFolderPath = path_1.default.join(__dirname, "../public/uploads/");
        if (!fs_1.default.existsSync(uploadFolderPath)) {
            fs_1.default.mkdirSync(uploadFolderPath, { recursive: true });
        }
        cb(null, uploadFolderPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const fileExtension = path_1.default.extname(file.originalname);
        cb(null, uniqueSuffix + fileExtension);
        return true;
    },
});
const upload = (0, multer_1.default)({ storage: storage });
exports.default = upload;
