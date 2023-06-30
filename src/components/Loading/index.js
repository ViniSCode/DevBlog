import { BeatLoader } from "react-spinners";
import "./styles.scss";

export function Loading() {
  return (
    <div className="loading">
      <div className="loader">
        <BeatLoader color="#f0c808" size={20} />
      </div>
    </div>
  );
}
