import { Link } from 'react-router-dom';
import logoImg from '../../assets/images/logo.svg';
import { useAuth } from '../../hooks/useAuth';
import './styles.scss';


export function Header () {
  const {user, handleSignInWithGoogle} = useAuth();

 return ( 
  <header>
      <nav>
        <div>
          <img src={logoImg} alt="devblog" />
        </div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/posts">Posts</Link></li>
          { 
            user ? 
            <button 
              className="username"
            >
              {user.name}
            </button> :
            
            <button onClick={handleSignInWithGoogle} className="login-btn">
              Login 
            </button>
          }         
        </ul>
      </nav>
    </header>
  );
}