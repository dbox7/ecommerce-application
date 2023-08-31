import { Link, NavLink } from 'react-router-dom';

import { 
  CiFacebook, 
  CiInstagram, 
  CiYoutube 
} from 'react-icons/ci';

import './CFooter.css';

export const Footer = () => {

  return (

    <footer className="footer">
      <div className="footer-container">
        <div className="footer-outer-links">
          <div className="footer-icons">
            <Link to="https://www.facebook.com/rickroll548?mibextid=LQQJ4d" 
              className="link" 
              target="_blank">
              <CiFacebook className="footer-icon"/>
            </Link>
            <Link to="https://www.instagram.com/p/BgSlRglAKBn/?igshid=MWZjMTM2ODFkZg%3D%3D" 
              className="link" 
              target="_blank">
              <CiInstagram className="footer-icon"/>
            </Link>
            <Link to="https://youtu.be/dQw4w9WgXcQ?si=EVR4Pmst23-IHIwy" 
              className="link" 
              target="_blank">
              <CiYoutube className="footer-icon"/>
            </Link>
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