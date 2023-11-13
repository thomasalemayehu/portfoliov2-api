import { useEffect } from "react";
import aboutStyles from "../assets/styles/About.module.css";
import Button from "../components/Button";
import content from "../content.json";
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

  useEffect(() => {
    loadTimeLine();
  });

  return (
    <section
      className={aboutStyles.about__page__container}
      id="AboutSection"
      onLoad={loadTimeLine}
    >
      <div className={aboutStyles.about__page__inner__container}>
        {/* Left Content */}
        <div className={aboutStyles.about__page__left}></div>
        {/* Right Content */}
        <div className={aboutStyles.about__page__right}>
          <h3> About Me </h3>
          <p>{content.aboutPageContent}</p>
          <Button
            label=" Download My CV"
            callback={() => {
              window.open("/docs/sample.pdf");
            }}
          />
        </div>
      </div>

      {/* Timeline */}
      <div className={`${aboutStyles.timeline} timeline`}>
        <div className={`${aboutStyles.line} line`}></div>

        {content.aboutPageTimeline.map((info) => (
          <AboutTimelineSection
            title={info.title}
            timeline={info.timeline}
            description={info.description}
          />
        ))}
      </div>
    </section>
  );
}

interface AboutTimelineSectionInfo {
  title: string;
  timeline: string;
  description: string;
}

function AboutTimelineSection({
  title,
  timeline,
  description,
}: AboutTimelineSectionInfo) {
  return (
    <div className={`${aboutStyles.section} section`}>
      <div className={`${aboutStyles.bead} bead`}></div>
      <div className={`${aboutStyles.content} content`}>
        <h1 className={`${aboutStyles.timeline__title} timeline__title`}>
          {title}
        </h1>
        <p
          className={`${aboutStyles.timeline__time__span} timeline__time__span`}
        >
          {timeline}
        </p>
        <p className={`${aboutStyles.timeline__content} timeline__content`}>
          {description}
        </p>
      </div>
    </div>
  );
}

export default About;
