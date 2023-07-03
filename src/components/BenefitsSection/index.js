import { motion } from "framer-motion";
import kid from "../../assets/images/kid.png";
import speaker from "../../assets/images/speaker.png";
import "../../pages/Home/styles.scss";

export function BenefitsSection({
  inViewFadeOut,
  opacitySection1,
  section1Ref,
}) {
  return (
    <motion.section
      initial={inViewFadeOut}
      animate={opacitySection1}
      className="benefits"
      ref={section1Ref}
    >
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
    </motion.section>
  );
}
