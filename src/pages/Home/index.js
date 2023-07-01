import kid from "../../assets/images/kid.png";
import speaker from "../../assets/images/speaker.png";
import { Ellipse } from "../../components/Ellipse";
import "./styles.scss";

export function Home() {
  return (
    <div className="home">
      <main>
        <div className="hero">
          <div className="main-container">
            <div className="ellipse-container">
              <Ellipse />
            </div>
          </div>
        </div>

        <section className="benefits">
          <div className="benefits-card">
            <div className="text-container inverted">
              <h3>Your Source for Breaking Tech News</h3>
              <p>
                Get your daily dose of gadget releases, breakthroughs, and stay
                up-to-date with the latest technology news!
              </p>
            </div>
            <div className="img-container">
              <img src={speaker} alt="speaker" className="img" />
            </div>
          </div>

          <div className="benefits-card">
            <div className="text-container">
              <h3>Your Gateway to Tech's Latest Trends</h3>
              <p>
                Unveiling Innovations, Unraveling Insights, and Empowering
                Tomorrow's Tech Enthusiasts - Stay Informed, Stay Ahead!
              </p>
            </div>
            <div className="img-container">
              <img src={kid} alt=" kid with VR Glasses" className="img" />
            </div>
          </div>
        </section>

        <section className="popular-news">
          <h2 className="popular-news-title">Popular News</h2>
          <p className="popular-news-description">
            Stay Informed, Fascinated, and Entertained with the World of
            Technology
          </p>
        </section>
      </main>
    </div>
  );
}
