import { Link } from 'react-router-dom';

import './NotFoundPage.css';

export const NotFoundPage = () => {

  return (
    <>
      <div className="not-found-poster-wrap"></div>
      <div className="not-found-title">Interplanetary Oops:<br/> sneakers on a another planet...</div>
      <p className="not-found-sub-title">back to <Link to="/" className="link"><b>Home</b></Link></p>
    </>
  );

};