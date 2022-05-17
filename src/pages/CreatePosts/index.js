import { EditorState } from 'draft-js';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";
import "./styles.scss";



export function CreatePosts () {
  const state = EditorState;

  const { user, handleSignInWithGoogle } = useAuth();
  const [title, setTitle] = useState("");
  const [textContent, setTextContent] = useState("");

  let navigate = useNavigate();

  async function handleCreatePost(event) {
    event.preventDefault();

    if (!user) {
      toast.warning("You need to be logged in to create a post");
      handleSignInWithGoogle();

      return;
    }

    if (title.trim() === "") {
      return;
    }

    if (textContent.trim() === "") {
      return;
    }

    await database.ref(`posts/`).push({
      title: title,
      text: textContent,
      user: {
        authorId: user?.id,
        avatar: user?.avatar,
        name: user?.name,
      },
      createdAt: new Date(),
    });

    setTextContent("");
    setTitle("");
    navigate("/posts");
  }

  return (
    <div className="create-post-container">
      <h1>Create a post</h1>
      <form>
        <input 
          type="text" 
          placeholder="Title..." 
          onChange={(event) => setTitle(event.target.value)}
          value={title}  
        />
        <div id="text-editor-container">
        </div>
      <div className="actions">
        <Button type="button" onClick={() => navigate("/")}>Cancel</Button>
        <Button type="submit" onClick={handleCreatePost}>Create</Button>
      </div>
      </form>
    </div>
  )
}