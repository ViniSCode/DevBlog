import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database } from "../../services/firebase";

type RoomParams = {
  id: string;
}

type Post = {
  text: string;
  title: string;
  user: {
    authorId: string;
    avatar: string;
    name: string;
  }
}

export function ReadPost () {
  const params = useParams<RoomParams>();
  const postId = params.id;
  const [post, setPost] = useState<Post>();

  useEffect( () => {
    const fetchPost = async () => {
      const getPost = await (await database.ref(`/posts/${postId}`).get()).val();
      setPost(getPost);
    }

    fetchPost();
   
  }, [])

  return (
    <>
      <h2>{post?.title}</h2>
      <p>{post?.text}</p>
    </>
  )
}