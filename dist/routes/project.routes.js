"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const project_controller_1 = __importDefault(require("../controllers/project.controller"));
const fileProcessor_middleware_1 = __importDefault(require("../middleware/fileProcessor.middleware"));
const authentication_middleware_1 = __importDefault(require("../middleware/authentication.middleware"));
const multer = require("multer");
const upload = multer();
const router = express_1.default.Router();
const projectController = project_controller_1.default.getInstance();
router.get("/", projectController.getProjects);
router.post("/", authentication_middleware_1.default, (0, fileProcessor_middleware_1.default)([{ name: "leadImage" }, { name: "selectedImages" }]), projectController.addProject);
router.get("/:projectId", projectController.getProject);
router.patch("/:projectId", 
// fileProcessorMiddleware(upload,"images"),
projectController.updateProject);
router.delete("/:projectId", projectController.deleteProject);
exports.default = router;
