import { RichText } from 'prismic-dom';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { database } from '../../services/firebase';
import { Button } from './../../components/Button/index';
import { Comments } from './../../components/Comments/index';
import { Loading } from './../../components/Loading/index';
import { useAuth } from './../../hooks/useAuth';
import { getPrismicClient } from './../../services/prismic';
import styles from './post.module.scss';

export function Post () {
  const params = useParams();
  const slug = params.id;
  const [post, setPost] = useState("");
  const { user, handleSignInWithGoogle} = useAuth();
  const [newComment, setNewComment] = useState("");
  const databaseSlug = slug.replace(/[.,#!$%^&*;:{}=\-_`~()]/g,"");
  
  //get post by UID - slug
  useEffect(() => {
    const getPostsFromPrismic  = async () => {
      const client = getPrismicClient();
      const response = await client.getByUID('post', String(slug), {});
      const formattedPosts = {
        slug,
        image:response.data?.image.url,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content),
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        })
      }
      
      setPost(formattedPosts);
    }

    getPostsFromPrismic()
  }, []);

  async function handleSendComment (event) {
    event.preventDefault();

    if (newComment.trim() === "") {
      return;
    }

    if (!user) {
      toast.error("You must be logged in to send a comment");
      throw new Error("You must be logged in");
    }
    
    const comment = {
      content: newComment,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
    }
    await database.ref(`posts/${databaseSlug}/comments`).push(comment);
    setNewComment('');
  }

  return (
    <div className={styles.container}>
      {!post ? <Loading/>: 
      (
        <>
          <article className={styles.post}>
            <h1>{post.title}</h1>
            <time>{post.updatedAt}</time>
            {post.image && <img src={post.image} alt=""/>}
            <div 
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
          </article>

          <div className="addComment">
            <form onSubmit={handleSendComment}>
            <textarea 
              placeholder="Comment something here..."
              onChange={event => setNewComment(event.target.value)}
              value={newComment}
              maxLength="360"
            />

            <div className={styles.formFooter}>
              { user ? (
              <>
                <div className={styles.userInfo}>
                  <img src={user?.avatar} alt={user.name}/>
                  <span>{user.name}</span>
                  </div>
                  <Button type="submit">Comment</Button>
                </>
              ) : (<span>Para enviar uma pergunta, <button type="button" onClick={handleSignInWithGoogle}>faça seu login</button>.</span>)}
            </div>
            </form>
          </div>
            <div className={styles.comments}>
              <Comments slug={slug}/>
            </div>
        </>
      )}
    </div>
  )
}