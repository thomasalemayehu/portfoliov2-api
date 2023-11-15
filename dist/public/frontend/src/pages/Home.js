"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Home_module_css_1 = __importDefault(require("../assets/styles/Home.module.css"));
const Button_1 = __importDefault(require("../components/Button"));
const content_json_1 = __importDefault(require("../content.json"));
function Home() {
    return (<section className={Home_module_css_1.default.container} id="LandingSection">
      <div className={Home_module_css_1.default.left__container}>
        <p>{content_json_1.default.homePageIntroduction}</p>
        <h1>
          <span>&lt;</span>
          {content_json_1.default.fullName} <span>/&gt;</span>
        </h1>
        <h2>{content_json_1.default.homePageLabel}</h2>
        <p>{content_json_1.default.homePageDescription}</p>
        <Button_1.default callback={() => {
            window.location.hash = "ContactSection";
        }} label="Hire Me"/>
      </div>

      <div className={Home_module_css_1.default.right__container}></div>
    </section>);
}
exports.default = Home;
