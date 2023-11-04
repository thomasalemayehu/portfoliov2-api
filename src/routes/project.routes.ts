import express, { Router } from "express";
import ProjectController from "../controllers/project.controller";
import fileProcessorMiddleware from "../middleware/fileProcessor.middleware";

const router: Router = express.Router();
const projectController = ProjectController.getInstance();

router.get("/:userId", projectController.getProjects);
router.post("/:userId", fileProcessorMiddleware, projectController.addProject);
router.get("/:userId/:projectId", projectController.getProject);
router.patch(
  "/:userId/:projectId",
  fileProcessorMiddleware,
  projectController.updateProject
);
router.delete("/:userId/:projectId", projectController.deleteProject);

export default router;
