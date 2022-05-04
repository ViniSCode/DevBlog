import { useEffect, useState } from "react";
import { Post } from "../../components/Post";
import { database } from "../../services/firebase";
import './styles.scss';

type FirebasePosts = Record<string, { 
  text: string;
  title: string;
  user: {
    authorId: string;
    avatar: string;
    name: string;
  }
}>

type Posts = {
  id: string;
  text: string;
  title: string;
  user: {
    authorId: string;
    avatar: string;
    name: string;
  }
}

export function Posts () {
  const [posts, setPosts] = useState<Posts[]>([]);

  useEffect( () => {
    const postRef = database.ref("posts");

    postRef.on('value', posts => {
      const databasePosts =  posts.val();
      const firebasePosts: FirebasePosts = databasePosts ?? {};
      const parsedPost = Object.entries(firebasePosts).map(([key, value]) => {
        return {
          id: key,
          text: value.text,
          title: value.title,
          user: {
            authorId: value.user.authorId,
            avatar: value.user.avatar,
            name: value.user.name,
          }
        }
      });

      setPosts(parsedPost);
    })

    return () => {
      postRef.off('value');
    }
   
  }, [])
  
  return (
    <div className="posts-container">
    {
      posts.map(post => {
        return(
          <Post 
          key={post.id}
          postId={post.id}
          text={post.text}
          title={post.title}
          user={post.user}
        />
        )
      })
    }
    </div>
  );
}