import { NextFunction, Request, Response } from "express";
import { Prisma } from "../util/Prisma.util";
import { RequestWithUserId, RequestWithUserIdAndUploadFile } from "../types";
import { MissingRequiredAttribute, RequiredEntityNotFound } from "../errors";
import { Validator } from "../util/Validator.util";

// import upload from "../config/multer.config";
class ProjectController {
  private static INSTANCE: ProjectController | null = null;

  public static getInstance() {
    if (this.INSTANCE == null || this.INSTANCE == undefined)
      this.INSTANCE = new ProjectController();

    return this.INSTANCE;
  }

  public async getProjects(
    req: RequestWithUserId,
    res: Response
  ): Promise<void> {
    const { verifiedUserId } = req;

    if (!verifiedUserId)
      throw new MissingRequiredAttribute("User Id is required to get projects");

    const projects = await Prisma.getInstance().project.findMany({
      where: {
        ownerId: verifiedUserId,
      },
    });

    res.status(200).json(projects);
  }

  public async addProject(
    req: RequestWithUserIdAndUploadFile,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    let { verifiedUserId } = req.params;
  
    const imageFiles = req.files as { selectedImages: any; leadImage: any };

    console.log(imageFiles);

    let imageLinks: Array<string> = [];
    let leadImage:string = "";
    if (imageFiles) {
      imageLinks = imageFiles.selectedImages.map((image: any) => `uploads/${image.filename}`);
      leadImage = `uploads/${imageFiles.leadImage.filename}`;
    }
    verifiedUserId = "closm76tm0000uv39nvwvbhjr";
    if (!verifiedUserId)
      throw new MissingRequiredAttribute("User Id is required to add projects");

    const {
      title,
      description,
      techStack,
      githubLink,
      liveLink,
      projectType,
    } = req.body;

    console.log(techStack);
    if (!title)
      throw new MissingRequiredAttribute("Title is required to add projects");
    else if (!description)
      throw new MissingRequiredAttribute(
        "Description is required to add projects"
      );
    else if (!techStack)
      throw new MissingRequiredAttribute(
        "Tech Stack is required to add projects"
      );
    else if (!githubLink)
      throw new MissingRequiredAttribute(
        "Github Repo Link is required to add projects"
      );

    // const techStackArr = techStack.split(",");

    Validator.validateURL(githubLink);
    Validator.validateURL(liveLink);

    const newProject = await Prisma.getInstance().project.create({
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

    res.status(201).json(newProject);
  }

  public async getProject(
    req: RequestWithUserId,
    res: Response
  ): Promise<void> {
    const { verifiedUserId } = req;
    const { projectId } = req.params;

    if (!verifiedUserId)
      throw new MissingRequiredAttribute("User Id is required to get projects");
    else if (!projectId)
      throw new MissingRequiredAttribute(
        "Project Id is required to get projects"
      );

    const project = await Prisma.getInstance().project.findFirst({
      where: {
        id: projectId,
        ownerId: verifiedUserId,
      },
    });

    res.status(200).json(project);
  }

  public async updateProject(
    req: RequestWithUserIdAndUploadFile,
    res: Response
  ): Promise<void> {
    const { projectId } = req.params;
    const { verifiedUserId } = req;

    if (!verifiedUserId)
      throw new MissingRequiredAttribute("User Id is required to get projects");
    else if (!projectId)
      throw new MissingRequiredAttribute(
        "Project Id is required to get projects"
      );

    const imageFiles = req.selectedImages;

    let imageLinks: Array<string> = [];
    if (imageFiles) {
      imageLinks = imageFiles.map((image: any) => `uploads/${image.filename}`);
    }

    const {
      title,
      description,
      techStack,
      githubLink,
      liveLink,
      leadImage,
      projectType,
    } = req.body;

    const updateProjectInfo: Record<string, any> = {};
    if (title) updateProjectInfo.title = title;
    if (description) updateProjectInfo.description = description;
    if (techStack) updateProjectInfo.techStack = techStack;
    if (githubLink) {
      updateProjectInfo.githubLink = githubLink;
      Validator.validateURL(githubLink);
    }
    if (imageLinks) updateProjectInfo.imageLinks = imageLinks;
    if (liveLink) {
      updateProjectInfo.liveLink = liveLink;
      Validator.validateURL(liveLink);
    }
    if (leadImage) updateProjectInfo.leadImage = leadImage;

    if (projectType) updateProjectInfo.projectType = projectType;

    const updatedProject = await Prisma.getInstance().project.update({
      where: { id: projectId, ownerId: verifiedUserId },
      data: updateProjectInfo,
    });

    res.status(200).json(updatedProject);
  }

  public async deleteProject(
    req: RequestWithUserId,
    res: Response
  ): Promise<void> {
    const { projectId } = req.params;

    const { verifiedUserId } = req;

    if (!verifiedUserId)
      throw new MissingRequiredAttribute("User Id is required to get projects");
    else if (!projectId)
      throw new MissingRequiredAttribute(
        "Project Id is required to get projects"
      );

    const project = await Prisma.getInstance().project.findFirst({
      where: {
        id: projectId,
        ownerId: verifiedUserId,
      },
    });

    if (!project) throw new RequiredEntityNotFound("Project not found");

    await Prisma.getInstance().project.delete({
      where: { id: projectId, ownerId: verifiedUserId },
    });

    res.status(200).json(project);
  }
}

export default ProjectController;
