import { FormEvent, useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";
import "./styles.scss";

export function AdminCreatePosts () {
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [textContent, setTextContent] = useState("");
  const [admin, setAdmin] = useState("");

  async function handleCreatePost(event: FormEvent) {
    event.preventDefault();

    if (title.trim() === "") {
      return;
    }

    if (textContent.trim() === "") {
      return;
    }

    await database.ref(`posts/`).push({
      title: title,
      text: textContent,
      authorId: user?.id,
      avatar: user?.avatar,
      createdAt: new Date(),
    });

    setTextContent("");
    setTitle("");
  }

  
  useEffect( () => {
    const fetchData = async () => {
      const { adminId } = await (await (database.ref(`admin`).get())).val();
      setAdmin(adminId);
    }
        
    fetchData();
  }, []);
  

  return admin === user?.id ? (
    <div className="create-post-container">
      <h1>Create a post</h1>
      <form>
        <input 
          type="text" 
          placeholder="Title..." 
          onChange={(event) => setTitle(event.target.value)}
          value={title}  
        />
        <textarea 
          placeholder="Post..." 
          onChange={(event) => setTextContent(event.target.value)}
          value={textContent}  
        />
        <Button type="submit" onClick={handleCreatePost}>Create</Button>
      </form>
    </div>
  ) : (
    <h1>You don't have permission to access this page</h1>
  );
}