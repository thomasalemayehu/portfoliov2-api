import { Request, Response } from "express";
import { Prisma } from "../util/Prisma.util";

class ProjectController {
  private static INSTANCE: ProjectController | null = null;

  public static getInstance() {
    if (this.INSTANCE == null || this.INSTANCE == undefined)
      this.INSTANCE = new ProjectController();

    return this.INSTANCE;
  }

  public async getProjects(req: Request, res: Response): Promise<void> {
    const { userId } = req.params;

    if (!userId) throw new Error("User Id is required to get projects");

    const projects = await Prisma.getInstance().project.findMany({
      where: {
        ownerId: userId,
      },
    });

    res.status(200).json(projects);
  }

  public async addProject(req: any, res: Response): Promise<void> {
   
    const { userId } = req.params;

    const imageFiles = req.files;

    let imageLinks:Array<string> = [];
    if(imageFiles){
      imageLinks = imageFiles.map((image: any) => `uploads/${image.filename}`);
    }
    if (!userId) throw new Error("User Id is required to add projects");

    const { title, description, techStack, githubLink, liveLink } =
      req.body;

    if (!title) throw new Error("Title is required to add projects");
    else if (!description)
      throw new Error("Description is required to add projects");
    else if (!techStack)
      throw new Error("Tech Stack is required to add projects");
    else if (!githubLink)
      throw new Error("Github Repo Link is required to add projects");
    

    const newProject = await Prisma.getInstance().project.create({
      data: {
        title,
        description,
        techStack,
        githubLink,
        imageLinks,
        liveLink,
        ownerId: userId,
      },
    });

    res.status(201).json(newProject);
  }

  public async getProject(req: Request, res: Response): Promise<void> {
    const { userId, projectId } = req.params;

    if (!userId) throw new Error("User Id is required to get projects");
    else if (!projectId)
      throw new Error("Project Id is required to get projects");

    const project = await Prisma.getInstance().project.findFirst({
      where: {
        id: projectId,
        ownerId: userId,
      },
    });

    if (!project) throw new Error("Project not found");

    res.status(200).json(project);
  }

  public async updateProject(req: any, res: Response): Promise<void> {
    const { userId, projectId } = req.params;

    if (!userId) throw new Error("User Id is required to get projects");
    else if (!projectId)
      throw new Error("Project Id is required to get projects");

       const imageFiles = req.files;

       let imageLinks: Array<string> = [];
       if (imageFiles) {
         imageLinks = imageFiles.map(
           (image: any) => `uploads/${image.filename}`
         );
       }

    const { title, description, techStack, githubLink, liveLink } =
      req.body;

    const updateProjectInfo: Record<string, any> = {};
    if (title) updateProjectInfo.title = title;
    if (description) updateProjectInfo.description = description;
    if (techStack) updateProjectInfo.techStack = techStack;
    if (githubLink) updateProjectInfo.githubLink = githubLink;
    if (imageLinks) updateProjectInfo.imageLinks = imageLinks;
    if (liveLink) updateProjectInfo.liveLink = liveLink;

    const updatedProject = await Prisma.getInstance().project.update({
      where: { id: projectId, ownerId: userId },
      data: updateProjectInfo,
    });

    res.status(200).json(updatedProject);
  }
  
  public async deleteProject(req: Request, res: Response): Promise<void> {
    const { userId, projectId } = req.params;

    if (!userId) throw new Error("User Id is required to get projects");
    else if (!projectId)
      throw new Error("Project Id is required to get projects");

    const project = await Prisma.getInstance().project.findFirst({
      where: {
        id: projectId,
        ownerId: userId,
      },
    });

    if (!project) throw new Error("Project not found");

    await Prisma.getInstance().project.delete({
      where: { id: projectId, ownerId: userId },
    });

    res.status(200).json(project);
  }
}

export default ProjectController;
