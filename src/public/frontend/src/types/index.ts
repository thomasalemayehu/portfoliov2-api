export interface UserInfo{
    email?:string,
    token?:string,
    id?:string,
    name?:string,
}

export interface ProjectInfo {
  id: string;
  title: string;
  shortDescription?: string,
  description: string,
  techStack: string[];
  leadImage?: string;
  githubLink: string;
  imageLinks: string[];
  liveLink: string;
  projectType:string,
  ownerId:string,
}