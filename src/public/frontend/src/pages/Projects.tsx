import LeadProjectCard from "../components/LeadProject";

import projectStyles from "../assets/styles/Projects.module.css";
import SideProject from "../components/SideProject";

const hostURL = "https://thomas-alemayehum.web.app/assets/projects";

function Projects() {
  const projectInfo = [
    {
      id: 1,
      title: "Airbnb Clone",
      description_short:
        "A clone Airbnb website that can be used to view and book rooms/stays in different locations",
      header_image_path: `${hostURL}/Airbnb-Clone.png`,
      github_link: "https://github.com/thomasalemayehu/Airbnb-Clone.git",
      external_link: "https://airbnb-clone-kappa-wine.vercel.app/",
    },
    {
      id: 2,
      title: "Amazon Clone",
      description_short:
        "A clone E-Commerce website that allows purchase of different items",
      header_image_path: `${hostURL}/Amazon-Clone.png`,
      github_link: "https://github.com/thomasalemayehu/Amazon-Clone",
      external_link: "https://amazon-clone-two-gold.vercel.app/",
    },
    {
      id: 3,
      title: "Ethiopian Fantasy Premier League - Admin",
      description_short:
        "A point based competitive platform that rewards users based on real world player performance of selected players. Web application allows admins to maintain teams in league, players, fixtures , fixtures scheduling and lineups.",
      header_image_path: `${hostURL}/EFPL.png`,
      github_link: "https://github.com/thomasalemayehu/EFPL",
      external_link: "https://efpl-app.web.app",
    },
    {
      id: 4,
      title: "Ethiopian Fantasy Premier League - User",
      description_short:
        "A point based competitive platform that rewards users based on real world player performance of selected players. Mobile application allows users to select teams, view player information, view fixtures , view points gained ..",
      header_image_path: `${hostURL}/EFPL-User.jpg`,
      github_link: "https://github.com/thomasalemayehu/EFPL",
    },
    {
      id: 5,
      title: "Addis Complaints",
      description_short:
        "A web based complaint system made free from common web vulnerabilities such as XSS, SQLi, CSRF and automation etc.",
      header_image_path: `${hostURL}/Addis-Complaints.png`,
      github_link: "https://github.com/thomasalemayehu/Addis-Complaints",
    },
  ];

    const mentions = [
      {
        id: 1,
        title: "Malware Collection",
        description_short:
          "A collection of python based malware including ransomware, backdoor and backdoor with clustering.",
        github_link: "https://github.com/thomasalemayehu/FITS-Project",
      },
      {
        id: 2,
        title: "Dice Game",
        description_short:
          " A web based game that is based on chance. (Based on a famous real world game called “Pass the Pigs”)",
        github_link: "https://github.com/thomasalemayehu/FITS-Project",
        external_link: "https://thomasalemayehu.github.io/Dice-Game/",
      },
      {
        id: 3,
        title: "Tailwind Personal Website",
        description_short: " A personal website made with tailwindcss",
        github_link: "https://github.com/thomasalemayehu/Tailwind-Portfolio",
        external_link: "https://thomasalemayehu.github.io/Tailwind-Portfolio/",
      },
      {
        id: 4,
        title: "Cinema Plus",
        description_short: "A wordpress theme developed from scratch.",
        github_link: "https://github.com/thomasalemayehu/cinema-plus",
      },
      {
        id: 5,
        title: "Follow Socials Widget",
        description_short: "A wordpress widget developed from scratch.",
        github_link: "https://github.com/thomasalemayehu/FollowSocialsWidget",
      },
      {
        id: 6,
        title: "Restaurant Website",
        description_short:
          "An html,css and js based restaurant website that is fully responsive.",
        github_link:
          "https://github.com/thomasalemayehu/Restaurant-Website-Colored",
        external_link:
          "https://thomasalemayehu.github.io/Restaurant-Website-Colored/",
      },
      {
        id: 7,
        title: "The Scholars",
        description_short:
          "A mobile app for applying to Scholarship opportunities.",
        github_link: "https://github.com/thomasalemayehu/the-scholars",
      },
      {
        id: 8,
        title: "Network Port Scanner",
        description_short:
          "A python based port scanner usable for reconnaissance of a network.",
        github_link: "https://github.com/thomasalemayehu/port-scanner",
      },
    ];
  return (
    <main className={projectStyles.container} id="WorkSection">
      <h3>My Projects</h3>

      <div className={projectStyles.cards__container}>
        {projectInfo.map((project, index) => (
          <LeadProjectCard key={index} projectInfo={project}></LeadProjectCard>
        ))}
      </div>

      <h4>Noteworthy Project Mentions</h4>
      <div className={projectStyles.mentionContainer}>
        {mentions.map(
          ({ id, title, description_short, github_link, external_link }) => (
            <SideProject
              key={id}
              title={title}
              description={description_short}
              github={github_link}
              external_link={external_link}
            />
          )
        )}
      </div>
    </main>
  );
}

export default Projects;
