import { BeatLoader } from 'react-spinners';
import './styles.scss';

export function Loading () {
  return (
    <div className="loading">
      <div className="loader">
        <BeatLoader color="#459BFF" size={20} />
      </div>
    </div>
  );
}