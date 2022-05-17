import { RichText } from 'prismic-dom';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loading } from './../../components/Loading/index';
import { getPrismicClient } from './../../services/prismic';
import styles from './post.module.scss';

export function Post () {
  const params = useParams();
  const slug = params.id;
  const [post, setPost] = useState();

  //get post by UID - slug
  useEffect(() => {

    const getPostsFromPrismic  = async () => {
      const client = await getPrismicClient();
      
      const response = await client.getByUID('post', String(slug), {});
      console.log(response);
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
    
  }, [])
  
  return (
    <div className={styles.container}>
      {!post ? <Loading/> : 
      (
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          {post.image && <img src={post.image} />}
          <div 
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </article>
      )}
    </div>
  )
}