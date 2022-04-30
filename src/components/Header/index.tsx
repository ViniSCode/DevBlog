import { useContext } from 'react';
import logoImg from '../../assets/images/logo.svg';
import { AuthContext } from '../../contexts/AuthContext';
import './styles.scss';


export function Header () {
  const {user, handleSignInWithGoogle} = useContext(AuthContext);

 return ( 
  <header>
      <nav>
        <div>
          <img src={logoImg} alt="devblog" />
        </div>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/posts">Posts</a></li>
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