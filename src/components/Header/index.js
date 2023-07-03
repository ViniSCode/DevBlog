import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import "./styles.scss";
export function Header() {
  const { user, handleSignInWithGoogle, handleSignOut } = useAuth();
  const { pathname } = useLocation();
  const [isMenuActive, setIsMenuActive] = useState(false);

  async function handleLogOut() {
    await handleSignOut();
    window.location.reload();
  }

  return (
    <header className="header">
      <nav className="nav">
        <div className="logoImg">
          {user ? (
            <div className="userContainer" onClick={handleLogOut}>
              <img
                src={user.avatar}
                alt="user image"
                referrerPolicy="no-referrer"
                className="userImage"
              />
              <span className="logout">Logout</span>
            </div>
          ) : (
            <button onClick={handleSignInWithGoogle} className="loginBtn">
              Login
            </button>
          )}
        </div>

        <div className="menu">
          <ul className="ul">
            <li className="li">
              <Link to="/" className={pathname === "/" ? "active" : ""}>
                Home
              </Link>
            </li>

            <li className="li">
              <Link
                to="/posts"
                className={
                  pathname === "/posts"
                    ? "active"
                    : pathname.slice(0, 6) === "/posts"
                    ? "active"
                    : ""
                }
              >
                Posts
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
