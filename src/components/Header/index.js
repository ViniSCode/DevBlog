import { Link, useLocation } from 'react-router-dom';
import logoImg from '../../assets/images/logo.svg';
import { useAuth } from '../../hooks/useAuth';
import styles from './styles.module.scss';
export function Header () {
  const {user, handleSignInWithGoogle} = useAuth();

  const {pathname} = useLocation();  

 return ( 
  <header className={styles.header}>
      <nav className={styles.nav}>
        <div>
          <img src={logoImg} alt="devblog" />
        </div>
        <ul className={styles.ul}>
          <li><Link to="/" className={pathname === "/" ? styles.active : ''}>
            Home
          </Link></li>

          <li><Link to="/posts" className={pathname === "/posts" ? styles.active : ''}>
            Posts
          </Link></li>
          { 
            user ? 
            <button 
              className={styles.username}
            >
              {user.name}
            </button> :
            
            <button onClick={handleSignInWithGoogle} className={styles.loginBtn}>
              Login 
            </button>
          }         
        </ul>
      </nav>
    </header>
  );
}