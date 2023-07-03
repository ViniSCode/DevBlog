import { RichText } from "prismic-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../pages/Home/styles.scss";
import { getPrismicClient } from "../../services/prismic";

export function LastNewsSection(inViewFadeOut, opacitySection2, section2Ref) {
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
    <>
      <h2 className="title">Last News</h2>
      <p className="description yellow">
        Stay Informed, Fascinated, and Entertained with the World of Technology
      </p>

      <div className="last-news-card-container">
        {lastPosts &&
          lastPosts.map((post) => (
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
    </>
  );
}
