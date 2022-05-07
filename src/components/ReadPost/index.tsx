import { useParams } from "react-router-dom";

type RoomParams = {
  id: string;
}

export function ReadPost () {
  const params = useParams<RoomParams>();
  const postId = params.id;

  return (
    <>
      <h1>POstsreadw</h1>
    </>
  )
}