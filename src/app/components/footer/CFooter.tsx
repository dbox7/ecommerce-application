import { FC } from 'react';
import { Link } from 'react-router-dom';

import { SOCIAL_LINKS } from '../../utils/constants';

import './CFooter.css';

export const Footer: FC = () => {

  return (

    <footer className="footer">
      <div className="footer-container">
        <div className="footer-outer-links">
          <div className="footer-icons">
            { SOCIAL_LINKS.map((item, index) => (
              <Link key={index} to={item.link} className="link" target="_blank">
                {item.icon}
              </Link>
            ))}
          </div>
        </div>
        <div className="footer-logo">
          <Link to="/" className="link">SNEAKERS STORE</Link>
        </div> 
        <div className="footer-inner-links">
          <Link to="/about" className="footer-link">About Us</Link>
          <Link to="/contacts" className="footer-link">Contacts</Link>
        </div>
      </div>
    </footer>

  );

};