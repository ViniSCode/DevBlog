import { motion, useAnimation } from "framer-motion";
import { RichText } from "prismic-dom";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { BenefitsSection } from "../../components/BenefitsSection";
import { Ellipse } from "../../components/Ellipse";
import { GetInTouchSection } from "../../components/GetInTouchSection";
import { LastNewsSection } from "../../components/LastNewsSection";
import { getPrismicClient } from "../../services/prismic";
import "./styles.scss";
export function Home() {
  const [lastPosts, setLastPosts] = useState([]);

  const { ref: section1Ref, inView: section1View } = useInView({
    triggerOnce: true,
  });
  const { ref: section2Ref, inView: section2View } = useInView({
    triggerOnce: true,
  });
  const { ref: section3Ref, inView: section3View } = useInView({
    triggerOnce: true,
  });

  const inViewFadeIn = {
    transition: { duration: 0.5, ease: "easeInOut", delay: 0.2 },
    opacity: 1,
  };
  const inViewFadeOut = {
    transition: { duration: 0.3, ease: "easeInOut" },
    opacity: 0,
  };

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

  useEffect(() => {
    const getPostsFromPrismic = async () => {
      const client = getPrismicClient();

      const response = await client.getByType("post", {
        fetch: ["Post.title", "Post.content"],
        pageSize: 6,
        orderings: {
          field: "document.first_publication_date",
          direction: "desc",
        },
      });

      const formattedPosts = response.results.map((post) => {
        return {
          slug: post.uid,
          writer: post.data.writer[0].text,
          title: RichText.asText(post.data.title),
          image: post.data?.image?.url,
          text:
            post.data.content
              .find((content) => content.type === "paragraph")
              ?.text.slice(0, 70) + "..." ?? "",
          date: new Date(post.first_publication_date).toLocaleDateString(
            "pt-BR",
            {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }
          ),
        };
      });

      setLastPosts(formattedPosts);
    };

    getPostsFromPrismic();
  }, []);

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
