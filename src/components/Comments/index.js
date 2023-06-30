import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { database } from "../../services/firebase";
import { useAuth } from "./../../hooks/useAuth";
import "./styles.scss";

export function Comments({ slug }) {
  const { user, handleSignInWithGoogle } = useAuth();
  const databaseSlug = slug.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
  const [postComments, setPostComments] = useState();

  useEffect(() => {
    const commentsRef = database.ref(`posts/${databaseSlug}`);
    commentsRef.on("value", (comment) => {
      // transforma obj em array
      const databaseComments = comment.val();
      const firebaseComments = databaseComments?.comments ?? {};

      const parsedComments = Object.entries(firebaseComments).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            likeCount: Object.values(value.likes ?? {}).length,
            likeId: Object.entries(value.likes ?? {}).find(
              ([key, like]) => like.authorId === user?.id
            )?.[0],
          };
        }
      );

      setPostComments(parsedComments.reverse());
    });

    return () => {
      commentsRef.off("value");
    };
  }, [databaseSlug, user?.id]);

  async function handleLikeQuestion(commentId, likeId) {
    if (!user) {
      toast.info("You must be logged in to like a post");
      handleSignInWithGoogle();
    }
    if (likeId) {
      await database
        .ref(`posts/${databaseSlug}/comments/${commentId}/likes/${likeId}`)
        .remove();
    } else {
      await database
        .ref(`posts/${databaseSlug}/comments/${commentId}/likes`)
        .push({
          authorId: user.id,
        });
    }
  }

  return (
    <>
      {postComments ? (
        postComments.map((comment) => {
          return (
            <div key={comment.id} className="comment">
              <p>{comment.content}</p>
              <footer>
                <div className="user-info">
                  <img
                    src={comment.author.avatar}
                    alt={comment.author.name}
                    referrerPolicy="no-referrer"
                  />
                  <span>{comment.author.name}</span>
                </div>

                <button
                  className={`like-button ${comment.likeId ? "liked" : ""}`}
                  type="button"
                  aria-label="Marcar como gostei"
                  onClick={() => handleLikeQuestion(comment.id, comment.likeId)}
                >
                  {comment.likeCount > 0 && <span>{comment.likeCount}</span>}
                  <div className="likeIcon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z"
                        stroke="#737380"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </button>
              </footer>
            </div>
          );
        })
      ) : (
        <h2>Not Comments yet.</h2>
      )}
    </>
  );
}
