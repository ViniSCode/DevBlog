import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database } from "../../services/firebase";


export function ReadPost () {
  const params = useParams();
  const postId = params.id;
  const [post, setPost] = useState();

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