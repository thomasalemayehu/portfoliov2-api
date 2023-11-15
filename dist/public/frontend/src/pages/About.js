"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const About_module_css_1 = __importDefault(require("../assets/styles/About.module.css"));
const Button_1 = __importDefault(require("../components/Button"));
const content_json_1 = __importDefault(require("../content.json"));
function About() {
    function loadTimeLine() {
        console.log("Loading timeline...");
        function qs(selector, all = false) {
            return all
                ? document.querySelectorAll(selector)
                : document.querySelector(selector);
        }
        const sections = qs(".section", true);
        const timeline = qs(".timeline");
        const line = qs(".line");
        line.style.bottom = `calc(100% - 20px)`;
        let prevScrollY = window.scrollY;
        let up, down;
        let full = false;
        let set = 0;
        const targetY = window.innerHeight * 0.8;
        function scrollHandler() {
            const { scrollY } = window;
            up = scrollY < prevScrollY;
            down = !up;
            const timelineRect = timeline.getBoundingClientRect();
            const dist = targetY - timelineRect.top;
            if (down && !full) {
                set = Math.max(set, dist);
                line.style.bottom = `calc(100% - ${set}px)`;
            }
            if (dist > timeline.offsetHeight + 50 && !full) {
                full = true;
                line.style.bottom = `-50px`;
            }
            sections.forEach((item) => {
                const rect = item.getBoundingClientRect();
                if (rect.top + item.offsetHeight / 5 < targetY) {
                    item.classList.add("show-me");
                }
            });
            prevScrollY = window.scrollY;
        }
        scrollHandler();
        line.style.display = "block";
        window.addEventListener("scroll", scrollHandler);
    }
    (0, react_1.useEffect)(() => {
        loadTimeLine();
    });
    return (<section className={About_module_css_1.default.about__page__container} id="AboutSection" onLoad={loadTimeLine}>
      <div className={About_module_css_1.default.about__page__inner__container}>
        {/* Left Content */}
        <div className={About_module_css_1.default.about__page__left}></div>
        {/* Right Content */}
        <div className={About_module_css_1.default.about__page__right}>
          <h3> About Me </h3>
          <p>{content_json_1.default.aboutPageContent}</p>
          <Button_1.default label=" Download My CV" callback={() => {
            window.open("/docs/sample.pdf");
        }}/>
        </div>
      </div>

      {/* Timeline */}
      <div className={`${About_module_css_1.default.timeline} timeline`}>
        <div className={`${About_module_css_1.default.line} line`}></div>

        {content_json_1.default.aboutPageTimeline.map((info) => (<AboutTimelineSection key={info.title} title={info.title} timeline={info.timeline} description={info.description}/>))}
      </div>
    </section>);
}
function AboutTimelineSection({ title, timeline, description, }) {
    return (<div className={`${About_module_css_1.default.section} section`}>
      <div className={`${About_module_css_1.default.bead} bead`}></div>
      <div className={`${About_module_css_1.default.content} content`}>
        <h1 className={`${About_module_css_1.default.timeline__title} timeline__title`}>
          {title}
        </h1>
        <p className={`${About_module_css_1.default.timeline__time__span} timeline__time__span`}>
          {timeline}
        </p>
        <p className={`${About_module_css_1.default.timeline__content} timeline__content`}>
          {description}
        </p>
      </div>
    </div>);
}
exports.default = About;
