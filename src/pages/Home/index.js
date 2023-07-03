import { motion, useAnimation } from "framer-motion";
import { RichText } from "prismic-dom";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { BenefitsSection } from "../../components/BenefitsSection";
import { Ellipse, drawVariant } from "../../components/Ellipse";
import { getPrismicClient } from "../../services/prismic";
// import "./styles.scss";

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

        <BenefitsSection
          inViewFadeOut={inViewFadeOut}
          opacitySection1={opacitySection1}
          section1Ref={section1Ref}
        />

        <motion.section
          initial={inViewFadeOut}
          animate={opacitySection2}
          className="last-news"
          ref={section2Ref}
        >
          <h2 className="title">Last News</h2>
          <p className="description yellow">
            Stay Informed, Fascinated, and Entertained with the World of
            Technology
          </p>

          <div className="last-news-card-container">
            {lastPosts.map((post) => (
              <Link
                to={`posts/${post.slug}`}
                className="last-news-card"
                key={post.slug}
              >
                <div className="post-image">
                  <img src={post.image} alt="post image" />
                </div>
                <div className="post-text">
                  <h4>{post.writer}</h4>
                  <p>{post.text}</p>
                </div>
              </Link>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={inViewFadeOut}
          animate={opacitySection3}
          className="contact"
          ref={section3Ref}
        >
          <motion.svg
            viewBox="0 0 612 603"
            fill="none"
            className="contact-ellipse"
          >
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
                Reach out to me for any inquiries, collaborations, or just to
                chat about technology - Vinícius Rodrigues
              </p>
            </div>
            <button className="get-in-touch-btn">Contact</button>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
