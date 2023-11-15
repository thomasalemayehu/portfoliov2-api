"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Prisma_util_1 = require("../util/Prisma.util");
const errors_1 = require("../errors");
const Validator_util_1 = require("../util/Validator.util");
// import upload from "../config/multer.config";
class ProjectController {
    static getInstance() {
        if (this.INSTANCE == null || this.INSTANCE == undefined)
            this.INSTANCE = new ProjectController();
        return this.INSTANCE;
    }
    getProjects(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { verifiedUserId } = req;
            let projects;
            if (!verifiedUserId) {
                projects = yield Prisma_util_1.Prisma.getInstance().project.findMany({});
            }
            else {
                projects = yield Prisma_util_1.Prisma.getInstance().project.findMany({
                    where: {
                        ownerId: verifiedUserId,
                    },
                });
            }
            res.status(200).json(projects);
        });
    }
    addProject(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let { verifiedUserId } = req;
            const imageFiles = req.files;
            let imageLinks = [];
            let leadImage = "";
            if (imageFiles.leadImage) {
                leadImage = `uploads/${imageFiles.leadImage[0].filename}`;
            }
            if (imageFiles.selectedImages) {
                imageLinks = imageFiles.selectedImages.map((image) => `uploads/${image.filename}`);
            }
            if (!verifiedUserId)
                throw new errors_1.MissingRequiredAttribute("User Id is required to add projects");
            const { title, description, techStack, githubLink, liveLink, projectType } = req.body;
            if (!title)
                throw new errors_1.MissingRequiredAttribute("Title is required to add projects");
            else if (!description)
                throw new errors_1.MissingRequiredAttribute("Description is required to add projects");
            else if (!techStack)
                throw new errors_1.MissingRequiredAttribute("Tech Stack is required to add projects");
            else if (!githubLink)
                throw new errors_1.MissingRequiredAttribute("Github Repo Link is required to add projects");
            // const techStackArr = techStack.split(",");
            Validator_util_1.Validator.validateURL(githubLink);
            Validator_util_1.Validator.validateURL(liveLink);
            const newProject = yield Prisma_util_1.Prisma.getInstance().project.create({
                data: {
                    title,
                    description,
                    leadImage,
                    techStack: techStack.split(","),
                    githubLink,
                    imageLinks,
                    liveLink,
                    projectType,
                    ownerId: verifiedUserId,
                },
            });
            res.status(201).json("newProject");
        });
    }
    getProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { verifiedUserId } = req;
            const { projectId } = req.params;
            console.log(projectId);
            let project;
            if (!verifiedUserId)
                project = yield Prisma_util_1.Prisma.getInstance().project.findFirst({
                    where: {
                        id: projectId,
                    },
                });
            else if (!projectId)
                throw new errors_1.MissingRequiredAttribute("Project Id is required to get projects");
            else {
                project = yield Prisma_util_1.Prisma.getInstance().project.findFirst({
                    where: {
                        id: projectId,
                        ownerId: verifiedUserId,
                    },
                });
            }
            res.status(200).json(project);
        });
    }
    updateProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { projectId } = req.params;
            const { verifiedUserId } = req;
            if (!verifiedUserId)
                throw new errors_1.MissingRequiredAttribute("User Id is required to get projects");
            else if (!projectId)
                throw new errors_1.MissingRequiredAttribute("Project Id is required to get projects");
            const imageFiles = req.selectedImages;
            let imageLinks = [];
            if (imageFiles) {
                imageLinks = imageFiles.map((image) => `uploads/${image.filename}`);
            }
            const { title, description, techStack, githubLink, liveLink, leadImage, projectType, } = req.body;
            const updateProjectInfo = {};
            if (title)
                updateProjectInfo.title = title;
            if (description)
                updateProjectInfo.description = description;
            if (techStack)
                updateProjectInfo.techStack = techStack;
            if (githubLink) {
                updateProjectInfo.githubLink = githubLink;
                Validator_util_1.Validator.validateURL(githubLink);
            }
            if (imageLinks)
                updateProjectInfo.imageLinks = imageLinks;
            if (liveLink) {
                updateProjectInfo.liveLink = liveLink;
                Validator_util_1.Validator.validateURL(liveLink);
            }
            if (leadImage)
                updateProjectInfo.leadImage = leadImage;
            if (projectType)
                updateProjectInfo.projectType = projectType;
            const updatedProject = yield Prisma_util_1.Prisma.getInstance().project.update({
                where: { id: projectId, ownerId: verifiedUserId },
                data: updateProjectInfo,
            });
            res.status(200).json(updatedProject);
        });
    }
    deleteProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { projectId } = req.params;
            const { verifiedUserId } = req;
            if (!verifiedUserId)
                throw new errors_1.MissingRequiredAttribute("User Id is required to get projects");
            else if (!projectId)
                throw new errors_1.MissingRequiredAttribute("Project Id is required to get projects");
            const project = yield Prisma_util_1.Prisma.getInstance().project.findFirst({
                where: {
                    id: projectId,
                    ownerId: verifiedUserId,
                },
            });
            if (!project)
                throw new errors_1.RequiredEntityNotFound("Project not found");
            yield Prisma_util_1.Prisma.getInstance().project.delete({
                where: { id: projectId, ownerId: verifiedUserId },
            });
            res.status(200).json(project);
        });
    }
}
ProjectController.INSTANCE = null;
exports.default = ProjectController;
