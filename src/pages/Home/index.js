import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { BenefitsSection } from "../../components/BenefitsSection";
import { Ellipse } from "../../components/Ellipse";
import { GetInTouchSection } from "../../components/GetInTouchSection";
import { LastNewsSection } from "../../components/LastNewsSection";
import "./styles.scss";

export const inViewFadeIn = {
  transition: { duration: 0.5, ease: "easeInOut", delay: 0.2 },
  opacity: 1,
};
export const inViewFadeOut = {
  transition: { duration: 0.3, ease: "easeInOut" },
  opacity: 0,
};

export function Home() {
  const { ref: section1Ref, inView: section1View } = useInView({
    triggerOnce: true,
  });
  const { ref: section2Ref, inView: section2View } = useInView({
    triggerOnce: true,
  });
  const { ref: section3Ref, inView: section3View } = useInView({
    triggerOnce: true,
  });

  const opacitySection1 = useAnimation();
  const opacitySection2 = useAnimation();
  const opacitySection3 = useAnimation();

  useEffect(() => {
    if (section1View) {
      opacitySection1.start(inViewFadeIn);
    }
    if (section2View) {
      opacitySection2.start(inViewFadeIn);
    }
    if (section3View) {
      opacitySection3.start(inViewFadeIn);
    }
  }, [section1View, section2View, section3View]);

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

        <motion.section
          initial={inViewFadeOut}
          animate={opacitySection1}
          className="benefits"
          ref={section1Ref}
        >
          <BenefitsSection />
        </motion.section>

        <motion.section
          initial={inViewFadeOut}
          animate={opacitySection2}
          className="last-news"
          ref={section2Ref}
        >
          <LastNewsSection />
        </motion.section>

        <motion.section
          initial={inViewFadeOut}
          animate={opacitySection3}
          className="contact"
          ref={section3Ref}
        >
          <GetInTouchSection section3View={section3View} />
        </motion.section>
      </main>
    </div>
  );
}
