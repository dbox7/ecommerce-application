import { Link, NavLink } from 'react-router-dom';
import { CiFacebook, CiInstagram, CiYoutube } from 'react-icons/ci';

import './CFooter.css';

export const Footer = () => {

  return (

    <footer className="footer">
      <div className="footer-container">
        <div className="footer-outer-links">
          <div className="footer-icons">
            <Link to="https://facebook.com/" className="link" target="_blank"><CiFacebook className="footer-icon"/></Link>
            <Link to="https://www.instagram.com/" className="link" target="_blank"><CiInstagram className="footer-icon"/></Link>
            <Link to="https://www.youtube.com/" className="link" target="_blank"><CiYoutube className="footer-icon"/></Link>
          </div>
        </div>
        <div className="footer-logo">
          <Link to="/" className="link">SNEAKERS STORE</Link>
        </div> 
        <div className="footer-inner-links">
          <NavLink to="/about" className="footer-link">About Us</NavLink>
          <NavLink to="/contacts" className="footer-link">Contacts</NavLink>
        </div>
      </div>
    </footer>

  );

};