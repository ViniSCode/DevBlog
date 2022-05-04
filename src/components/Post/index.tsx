import { Link } from 'react-router-dom';
import { Divider } from '../Divider';
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
      <div className="user-info">
        <img src={user.avatar} alt="user.name" />
        <p>{user.name}</p>
        <small></small>
      </div>
      <div className="post">
        <h2>{title}</h2>
        <Divider />
      </div>
      <Link to={`/posts/${postId}`}>
        <button>Ler Mais</button>
      </Link>
    </div>
  );
}