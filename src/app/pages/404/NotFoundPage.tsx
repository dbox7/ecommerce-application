import { Link } from 'react-router-dom';
import cat from '../../assets/cat.png';

import './NotFoundPage.css';

export function NotFoundPage() {

  return (
    <div className="container">
      <div className="content not-found">
        <div className="not-found-poster-wrap"></div>
        <div className="not-found-title">Interplanetary Oops:<br/> sneakers on a another planet...</div>
        <p className="not-found-sub-title">back to <Link to="/" className="link"><b>Home</b></Link></p>
      </div>
    </div>

  );

}