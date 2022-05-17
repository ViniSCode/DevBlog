import * as prismic from '@prismicio/client';
import { RichText } from "prismic-dom";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Loading } from './../../components/Loading/index';
import { getPrismicClient } from './../../services/prismic';
import './styles.scss';


export function Posts () {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPostsFromPrismic  = async () => {
      const client = getPrismicClient();
  
      const response = await client.get(
       [ prismic.predicate.at('document.type', 'post')],
       {
         fetch: ['Post.title', 'Post.content'],
         pageSize: 5,
       }
      );

      const formattedPosts = response.results.map(post => {
        return {
          slug: post.uid,
          title: RichText.asText(post.data.title),
          text: post.data.content.find(content => content.type === 'paragraph')?.text ?? "",
          updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
          })
        }
      })
      
  
      setPosts(formattedPosts);
    }
    
    getPostsFromPrismic();

  }, [])
  
  const displayPosts = posts
  .map((post) => {

    return(
      <Link to={`/posts/${post.slug}`} key={post.slug}>
        <time>{post.updatedAt}</time>
        <strong>{post.title}</strong>
        <p>{post.text}</p>
      </Link>
    )
  });

  return (
    <div className="posts-container">
      <div className="posts">
      { !displayPosts ? <Loading /> : displayPosts}
      </div>
    </div>
  );
}