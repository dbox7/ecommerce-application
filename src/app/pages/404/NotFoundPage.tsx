import { Link } from 'react-router-dom';
import cat from '../../assets/cat.png';

import './NotFoundPage.css';

export function NotFoundPage() {

  return (
    <div className="container">
      <div className="content not-found">
        <img src={cat} alt="sad cat" className="cat"></img>
        <h1>Oops! You seem to be lost...</h1>
        <p className="text">Bring sadly cat on <Link to="/" className="link"><b>home page</b></Link></p>
      </div>
    </div>

  );

}