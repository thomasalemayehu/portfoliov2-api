import express, { Router } from "express";
import ProjectController from "../controllers/project.controller";
import fileProcessorMiddleware from "../middleware/fileProcessor.middleware";
const multer = require("multer");
const upload = multer();


const router: Router = express.Router();
const projectController = ProjectController.getInstance();

router.get("/", projectController.getProjects);
router.post(
  "/",
  fileProcessorMiddleware([{ name: "leadImage" }, { name: "selectedImages" }]),
  projectController.addProject
);
router.get("/:projectId", projectController.getProject);
router.patch(
  "/:projectId",
  // fileProcessorMiddleware(upload,"images"),
  projectController.updateProject
);
router.delete("/:projectId", projectController.deleteProject);

export default router;
