import { RichText } from "prismic-dom";
import { useEffect, useState } from "react";
import kid from "../../assets/images/kid.png";
import speaker from "../../assets/images/speaker.png";
import { Ellipse } from "../../components/Ellipse";
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
          <h2 className="last-news-title">Last News</h2>
          <p className="last-news-description">
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
      </main>
    </div>
  );
}
