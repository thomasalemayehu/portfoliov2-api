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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LeadProject_1 = __importDefault(require("../components/LeadProject"));
const Projects_module_css_1 = __importDefault(require("../assets/styles/Projects.module.css"));
const SideProject_1 = __importDefault(require("../components/SideProject"));
// import { useStorage } from "../hooks";
const axios_1 = __importDefault(require("axios"));
const react_1 = require("react");
const hostURL = "http://localhost:3000/";
function Projects() {
    const [projects, setProjects] = (0, react_1.useState)([]);
    const loadProjects = () => __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.get("http://localhost:3000/projects/");
        if (response.status == 200) {
            let result = response.data;
            result = result.map((info) => {
                return Object.assign(Object.assign({}, info), { leadImage: `${hostURL}${info.leadImage}`, shortDescription: info.description.slice(0, 200) + " ..." });
            });
            setProjects(result);
        }
    });
    (0, react_1.useEffect)(() => {
        loadProjects();
    }, []);
    return (<main className={Projects_module_css_1.default.container} id="WorkSection">
      <h3>My Projects</h3>

      <div className={Projects_module_css_1.default.cards__container}>
        {projects.map((project) => project.projectType.toLowerCase() == "main" ? (<LeadProject_1.default key={project.id} projectInfo={project}/>) : (<></>
        // <SideProject key={project.id} projectInfo={project}/>
        ))}
      </div>

      <h4>Noteworthy Project Mentions</h4>
      <div className={Projects_module_css_1.default.mentionContainer}>
        {projects.map((project) => project.projectType.toLowerCase() == "side" ? (<SideProject_1.default key={project.id} projectInfo={project}/>) : (<></>))}
      </div>
    </main>);
}
exports.default = Projects;
