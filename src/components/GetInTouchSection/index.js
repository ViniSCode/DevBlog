import { motion } from "framer-motion";
import { drawVariant } from "../../components/Ellipse";
import "../../pages/Home/styles.scss";

export function GetInTouchSection({ section3View }) {
  return (
    <>
      <motion.svg viewBox="0 0 612 603" fill="none" className="contact-ellipse">
        <motion.path
          d="M82.9117 246.615C119.881 324.085 178.396 400.025 243.082 460.17C307.767 520.316 378.57 564.622 440.209 578.965C501.848 593.308 542.77 574.999 559.042 533.692C575.313 492.384 566.915 428.106 529.945 350.636C492.976 273.165 434.461 197.225 369.775 137.08C305.09 76.9345 234.287 32.6281 172.648 18.2853C111.009 3.94246 70.0871 22.2514 53.8155 63.5587C37.5439 104.866 45.9423 169.144 82.9117 246.615Z"
          stroke="#A8A8A8"
          strokeWidth="1.48936"
          variants={drawVariant}
          initial="hidden"
          animate={section3View ? "visible" : ""}
          custom={2}
        />
      </motion.svg>

      <div className="get-in-touch-container">
        <div>
          <h2 className="title">Get in touch</h2>
          <p className="description">
            Reach out to me for any inquiries, collaborations, or just to chat
            about technology - Vinícius Rodrigues
          </p>
        </div>
        <button className="get-in-touch-btn">Contact</button>
      </div>
    </>
  );
}
