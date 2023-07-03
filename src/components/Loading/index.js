import { PuffLoader } from "react-spinners";
import "./styles.scss";

export function Loading() {
  return (
    <div className="loading">
      <div className="loader">
        <PuffLoader color="#f0c808" size={100} />
      </div>
    </div>
  );
}
