import { Link } from 'react-router-dom';

import './MainPage.css';

export const MainPage = () => {

  return (
    <>
      <div className="poster-wrap"></div>
      <div className="link-main-wrap">
        <Link to="/" className="link-main">Home</Link>
        <Link to="/login" className="link-main">Log in</Link>
        <Link to="/signup" className="link-main">Sign up</Link>
        <Link to="/catalog" className="link-main">Catalog</Link>
        <Link to="/hi-reviewer-1" className="link-main">404</Link>
      </div>
    </>

  );

};