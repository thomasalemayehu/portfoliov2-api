"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const LeadProject_module_css_1 = __importDefault(require("../assets/styles/component/LeadProject.module.css"));
// interface ProjectInfo {
//   projectId: string;
// }
function LeadProjectCard({ projectInfo }) {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { id, title, leadImage, shortDescription, githubLink, liveLink } = projectInfo;
    return (<section className={LeadProject_module_css_1.default.container}>
      <div className={LeadProject_module_css_1.default.image__container} style={{
            background: `url(${leadImage})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
        }}></div>
      <div className={LeadProject_module_css_1.default.content__container}>
        <h4>{title}</h4>
        <p>{shortDescription}</p>

        <div className={LeadProject_module_css_1.default.links__container}>
          {/* Case Icon */}
          <div onClick={() => {
            navigate(`/project/detail/${id}`);
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 512.4">
              <path d="M330.6 302.5c8.2 0 14.9 6.6 14.9 14.8 0 8.1-6.7 14.7-15 14.7H109.9c-8.2 0-15-6.6-15-14.7 0-8.2 6.8-14.8 15-14.8h220.8zM440.3 61.3h19c11.2 0 21.4 4.6 28.7 12l1 1c6.8 7.3 11 17 11 27.7v369.7a40.6 40.6 0 0 1-40.7 40.7h-359a40.6 40.6 0 0 1-28.6-12h-.1a40.7 40.7 0 0 1-12-28.7v-20.6H40.8A40.7 40.7 0 0 1 0 410.4V40.7A40.6 40.6 0 0 1 40.7 0h359c11.1 0 21.3 4.6 28.7 12l1 1c6.7 7.3 11 17 11 27.7v20.6zm-369.5 360a14.8 14.8 0 0 1 3.8-.6c1.3 0 2.6.2 3.8.5h321.2c3 0 5.7-1.2 7.6-3.2 2-1.9 3.2-4.6 3.2-7.6V40.7c0-2.7-1-5.2-2.6-7l-.6-.6c-2-2-4.6-3.2-7.6-3.2H40.7c-3 0-5.7 1.2-7.6 3.2a10.7 10.7 0 0 0-3.2 7.6v369.7c0 3 1.2 5.7 3.2 7.6a10.7 10.7 0 0 0 7.6 3.2h30.1zM89.6 451v20.6a10.7 10.7 0 0 0 10.8 10.8h358.9c3 0 5.6-1.2 7.6-3.2 2-1.9 3.2-4.6 3.2-7.6V102c0-2.7-1-5.2-2.7-7l-.5-.6c-2-2-4.7-3.2-7.6-3.2h-19v319.2a40.7 40.7 0 0 1-40.7 40.8h-310zm241-332c8.2 0 14.9 6.6 14.9 14.8 0 8.1-6.7 14.7-15 14.7H109.9c-8.2 0-15-6.6-15-14.7 0-8.2 6.8-14.8 15-14.8h220.8zm0 91.7a14.8 14.8 0 1 1 0 29.5H109.8c-8.2 0-15-6.6-15-14.7s6.8-14.8 15-14.8h220.8z"/>
            </svg>
          </div>

          {/* Github Icon */}
          <a href={githubLink} target="__blank">
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 249.7">
              <path d="M128 0a128 128 0 0 0-40.5 249.5c6.4 1.2 8.7-2.8 8.7-6.2l-.2-23.8c-35.5 7.7-43-15.1-43-15.1-5.8-14.8-14.2-18.7-14.2-18.7-11.6-7.9.9-7.8.9-7.8 12.9.9 19.6 13.2 19.6 13.2 11.4 19.6 29.9 13.9 37.2 10.6a27.2 27.2 0 0 1 8.1-17.1c-28.4-3.2-58.3-14.2-58.3-63.3 0-14 5-25.4 13.2-34.4A46.4 46.4 0 0 1 60.7 53s10.7-3.4 35.2 13.1a122.2 122.2 0 0 1 64.1 0C184.4 49.5 195.2 53 195.2 53c7 17.6 2.6 30.7 1.3 33.9 8.2 9 13.2 20.4 13.2 34.4 0 49.2-29.9 60-58.4 63.2 4.6 4 8.7 11.8 8.7 23.7l-.1 35.1c0 3.4 2.3 7.4 8.8 6.1A128 128 0 0 0 128 0zM47.9 182.3c-.3.6-1.3.8-2.2.4-.9-.4-1.4-1.3-1.1-1.9.3-.7 1.3-.8 2.2-.4.9.4 1.5 1.3 1.1 1.9zm6.3 5.7c-.6.6-1.8.3-2.6-.6-.8-.9-1-2.1-.4-2.7.6-.6 1.8-.3 2.6.6.9.9 1.1 2.1.4 2.7zm4.4 7.1c-.8.5-2.1 0-2.9-1.1-.8-1.1-.8-2.5 0-3.1.8-.5 2.1-.1 2.9 1.1.8 1.2.8 2.6 0 3.1zm7.3 8.4c-.7.8-2.2.6-3.3-.5-1.1-1-1.4-2.5-.7-3.3.7-.8 2.2-.6 3.3.5 1.1 1 1.4 2.5.7 3.3zm9.4 2.8c-.3 1-1.7 1.5-3.2 1-1.4-.4-2.4-1.6-2.1-2.6.3-1 1.7-1.5 3.2-1 1.5.4 2.4 1.6 2.1 2.6zm10.7 1.2c0 1.1-1.2 1.9-2.7 2-1.5 0-2.8-.8-2.8-1.9 0-1.1 1.2-1.9 2.7-2 1.6 0 2.8.8 2.8 1.9zm10.6-.4c.2 1-.9 2.1-2.4 2.4-1.5.3-2.9-.4-3.1-1.4-.2-1.1.9-2.1 2.4-2.4 1.6-.3 2.9.3 3.1 1.4z"/>
            </svg>
          </a>

          {/* Link Icon */}
          {liveLink && (<a href={liveLink} target="__blank">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -256 1850 1850">
                <path d="M1438.4 819v320q0 119-84.5 203.4-84.5 84.5-203.5 84.5h-832q-119 0-203.5-84.5T30.4 1139V307q0-119 84.5-203.5T318.4 19h704q14 0 23 9t9 23v64q0 14-9 23t-23 9h-704q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113V819q0-14 9-23t23-9h64q14 0 23 9t9 23zm384-864v512q0 26-19 45t-45 19q-26 0-45-19l-176-176-652 652q-10 10-23 10t-23-10l-114-114q-10-10-10-23t10-23l652-652-176-176q-19-19-19-45t19-45q19-19 45-19h512q26 0 45 19t19 45z" fill="currentColor"/>
              </svg>
            </a>)}
        </div>
      </div>
    </section>);
}
exports.default = LeadProjectCard;
