import LeadProjectCard from "../components/LeadProject";

import projectStyles from "../assets/styles/Projects.module.css";
import SideProject from "../components/SideProject";
// import { useStorage } from "../hooks";
import axios from "axios";
import { ProjectInfo } from "../types";
import { useEffect, useState } from "react";
const hostURL = "http://localhost:3000/";

function Projects() {
  const [projects, setProjects] = useState<ProjectInfo[]>([]);

  const loadProjects = async () => {
    const response = await axios.get("http://localhost:3000/projects/");

    if (response.status == 200) {
      let result: ProjectInfo[] = response.data as ProjectInfo[];
      result = result.map((info: ProjectInfo) => {
        return {
          ...info,
          leadImage: `${hostURL}${info.leadImage}`,
          shortDescription: info.description.slice(0, 200) + " ...",
        };
      });
      setProjects(result);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);
  return (
    <main className={projectStyles.container} id="WorkSection">
      <h3>My Projects</h3>

      <div className={projectStyles.cards__container}>
        {projects.map((project) =>
          project.projectType.toLowerCase() == "main" ? (
            <LeadProjectCard key={project.id} projectInfo={project} />
          ) : (
            <></>
            // <SideProject key={project.id} projectInfo={project}/>
          )
        )}
      </div>

      <h4>Noteworthy Project Mentions</h4>
      <div className={projectStyles.mentionContainer}>
        {projects.map((project) =>
          project.projectType.toLowerCase() == "side" ? (
            <SideProject key={project.id} projectInfo={project} />
          ) : (
            <></>
          )
        )}
      </div>
    </main>
  );
}

export default Projects;
