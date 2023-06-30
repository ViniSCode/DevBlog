import { Ellipse } from "../../components/Ellipse";
import "./styles.scss";

export function Home() {
  return (
    <div className="home">
      <main>
        <div className="hero">
          <div className="main-container">
            <div className="ellipse-container">
              {/* <img src={girlImg} alt="Menina segurando o planeta terra" /> */}
              <Ellipse />
            </div>
          </div>
        </div>

        <div></div>
      </main>
    </div>
  );
}
