import express, { Router } from "express";
import ProjectController from "../controllers/project.controller";

const router: Router = express.Router();
const projectController = ProjectController.getInstance();

router.get("/:userId", projectController.getProjects);
router.post("/:userId", projectController.addProject);
router.get("/:userId/:projectId", projectController.getProject);
router.patch("/:userId/:projectId", projectController.updateProject);
router.delete("/:userId/:projectId", projectController.deleteProject);

export default router;
