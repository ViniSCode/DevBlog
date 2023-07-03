import { motion } from "framer-motion";
import { RichText } from "prismic-dom";
import { useEffect, useState } from "react";
import kid from "../../assets/images/kid.png";
import speaker from "../../assets/images/speaker.png";
import { Ellipse, drawVariant } from "../../components/Ellipse";
import { getPrismicClient } from "../../services/prismic";
import "./styles.scss";

export function Home() {
  const [lastPosts, setLastPosts] = useState([]);

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
          title: RichText.asText(post.data.title),
          image: post.data?.image?.url,
          text:
            post.data.content
              .find((content) => content.type === "paragraph")
              ?.text.slice(0, 70) + "..." ?? "",
          updatedAt: new Date(post.last_publication_date).toLocaleDateString(
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

        <section className="last-news">
          <h2 className="title">Last News</h2>
          <p className="description yellow">
            Stay Informed, Fascinated, and Entertained with the World of
            Technology
          </p>

          <div className="last-news-card-container">
            {lastPosts.map((post) => (
              <div className="last-news-card" key={post.slug}>
                <div className="post-image">
                  <img src={post.image} alt="post image" />
                </div>
                <div className="post-text">
                  <h4>AI Evolution</h4>
                  <p>{post.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="contact">
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
              animate="visible"
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
        </section>
      </main>
    </div>
  );
}
