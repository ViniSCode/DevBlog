import { Link } from 'react-router-dom';
import './styles.scss';

type PostProps = {
  key: string;
  postId: string;
  text: string;
  title: string;
  user: {
    authorId: string;
    avatar: string;
    name: string;
  }
}

export function Post ({text, title, user, postId}: PostProps) {
  return (
    <div className="post-container">
      <Link to={`/posts/${postId}`}>
      <div className="user-info">
        <img src={user.avatar} alt={user.name} />
        <p>{user.name}</p>
        <small></small>
      </div>
      <div className="post">
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      </Link>
    </div>
  );
}