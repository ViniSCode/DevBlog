import { useState } from 'react';
import { AiOutlineLogin } from 'react-icons/ai';
import { BiHome, BiNews } from 'react-icons/bi';
import { FiLogOut } from 'react-icons/fi';
import { HiMenuAlt1 } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../../assets/images/logo.svg';
import { useAuth } from '../../hooks/useAuth';
import './styles.scss';
export function Header () {
  const {user, handleSignInWithGoogle} = useAuth();
  const {pathname} = useLocation();  
  const [isMenuActive, setIsMenuActive] = useState(false);

  function handleOpenMenu() {
    setIsMenuActive(!isMenuActive);
    document.body.style.overflowY = "hidden";
  }

  function handleCloseMenu () {
    setIsMenuActive(false);
    document.body.style.overflowY = "auto";
  }

 return ( 
  <header className="header">
      <nav className="nav">
        <div className="logoImg">
          <Link to="/">
            <img src={logoImg} alt="devblog" />
          </Link>
        </div>
        
        <div className={"menu " + (isMenuActive ? "active" : "")}>
          
          <ul className={"ul " + (isMenuActive ? "active" : "")}>
            <li className="li" onClick={handleCloseMenu}>
              <Link to="/" className={pathname === "/" ? "active" : ''}>
              {isMenuActive && <BiHome className='homeIcon'/>}
              Home
            </Link></li>

            <li className="li" onClick={handleCloseMenu}>
              <Link to="/posts" className={pathname === "/posts" ? "active" : ''}>
              {isMenuActive && <BiNews className='newsIcon'/>}
              Posts
            </Link></li>
            
            { 
              user ? (
                !isMenuActive ? (
                  <button 
                    className="username"
                  >
                    {user.name}
                  </button>   
                ) :
                (
                    <button 
                      className="logOut"
                    >
                      <FiLogOut className="logoutIcon"/>
                      Logout
                  </button>   
                )
              )
              :
              (
                isMenuActive ? (
                  <button onClick={handleSignInWithGoogle} className="loginBtn">
                    <AiOutlineLogin className="loginIcon"/>
                    Login 
                  </button>
                ) : 
                (
                  <button onClick={handleSignInWithGoogle} className="loginBtn">
                    Login 
                  </button>
                )
              )
            }         
          </ul>
        </div>

        <div className="mobileMenuContainer">
          <HiMenuAlt1 className={"menuIcon " + (isMenuActive ? "active" : "")} onClick={handleOpenMenu}/> 
          { 
             isMenuActive &&
            <IoClose className={"closeMenuIcon " + (isMenuActive ? "active" : "")}  onClick={handleCloseMenu}/> 
          } 
        </div>
      </nav>
    </header>
  );
}