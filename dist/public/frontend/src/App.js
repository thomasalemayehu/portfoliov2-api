"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const About_1 = __importDefault(require("./pages/About"));
const AddProjectPage_1 = __importDefault(require("./pages/AddProjectPage"));
const Contact_1 = __importDefault(require("./pages/Contact"));
const Home_1 = __importDefault(require("./pages/Home"));
const Login_1 = __importDefault(require("./pages/Login"));
const Navigation_1 = __importDefault(require("./pages/Navigation"));
const ProjectDetail_1 = __importDefault(require("./pages/ProjectDetail"));
const Projects_1 = __importDefault(require("./pages/Projects"));
const react_router_dom_1 = require("react-router-dom");
function App() {
    return (<react_router_dom_1.BrowserRouter>
      <react_router_dom_1.Routes>
        <react_router_dom_1.Route index element={<MainSite />}/>
        <react_router_dom_1.Route path="login" element={<Login_1.default />}/>
        <react_router_dom_1.Route path="project" element={<AddProjectPage_1.default />}/>
        <react_router_dom_1.Route path="project/detail/:id" element={<ProjectDetail_1.default />}/>
        {/* <Route path="*" element={<NoPage />} /> */}
      </react_router_dom_1.Routes>
    </react_router_dom_1.BrowserRouter>);
}
function MainSite() {
    return (<>
      <Navigation_1.default />
      <div style={{
            padding: "0 5%",
        }}>
        <Home_1.default />
        <About_1.default />
        <Projects_1.default />
        <Contact_1.default />
      </div>
    </>);
}
exports.default = App;
