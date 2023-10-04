import { Link } from 'react-router-dom';

import './NotFoundPage.css';

export const NotFoundPage = () => {

  return (
    <>
      <div className="poster-wrap not-found">
        <div className="not-found-title">Interplanetary Oops:<br/> sneakers on an another planet...</div>
        <p className="not-found-sub-title">back to <Link to="/" className="link"><b>Home</b></Link></p>
      </div>
    </>
  );

};