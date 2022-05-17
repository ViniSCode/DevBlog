import { Link } from 'react-router-dom';
import girlImg from '../../assets/images/avatar.svg';
import { Button } from '../../components/Button';
import './styles.scss';

export function Home () {

  
  return (
    <div className="home">
      <main>
        <div className="main-container">
          <div className="home-text">
            <h1>Dev Blog <br/> All in one place</h1>
            <ul className="home-list">
              <li>Technology news.</li>
              <li>Learn something.</li>
              <li>Share something.</li>
              <li>All for free.</li>
            </ul>
            <Link to="/posts">
              <Button>All Posts</Button>
            </Link>
          </div>

          <div>
            <img src={girlImg} alt="Menina segurando o planeta terra" />
          </div>
        </div>
      </main>
    </div>
  );
}