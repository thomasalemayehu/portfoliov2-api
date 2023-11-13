import homeStyles from "../assets/styles/Home.module.css";
import Button from "../components/Button";
import content from "../content.json";

function Home() {
  return (
    <section className={homeStyles.container} id="LandingSection">
      <div className={homeStyles.left__container}>
        <p>{content.homePageIntroduction}</p>
        <h1>
          <span>&lt;</span>
          {content.fullName} <span>/&gt;</span>
        </h1>
        <h2>{content.homePageLabel}</h2>
        <p>{content.homePageDescription}</p>
        <Button
          callback={() => {
            window.location.hash = "ContactSection";
          }}
          label="Hire Me"
        />
      </div>

      <div className={homeStyles.right__container}></div>
    </section>
  );
}

export default Home;
