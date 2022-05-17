import { Link } from 'react-router-dom';
import './styles.scss';

export function Post ({ postId, postContent, date, PostUid }) {
  console.log(postContent)
  return (
    <div className="post-container">
      <Link to={`/posts/${PostUid}`}>
      {/* <div className="user-info">
        <img src={user.avatar} alt={user.name} />
        <p>{user.name}</p>
        <small></small>
      </div> */}
      <div className="post">
        <h2>{postContent.title[0].text}</h2>
        <p>{}</p>
      </div>
      </Link>
    </div>
  );
}