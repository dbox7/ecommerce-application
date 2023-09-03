import { Link } from 'react-router-dom';

import CProfileMenu from '../profileMenu/CProfileMenu';

import { BsCart2 } from 'react-icons/bs';

import './CHeader.css';

export const Header = () => {

  return (
    <header className="header">
      <div className="header-container">
        <nav className="nav">
          <ul className="menu">
            <li className="menu-item">
              <Link to="/catalog" className="link">Catalog</Link>
            </li>
            <li className="menu-item">
              <Link to="/about" className="link">About us</Link>
            </li>
          </ul>
          <div className="logo">
            <Link to="/" className="link">SNEAKERS STORE</Link>
          </div>
          <ul className="menu right">
            <li className="menu-item">
              <CProfileMenu/>
            </li>
            <li className="menu-item">
              <Link to="/cart" className="link header__cart">
                Cart <BsCart2 className="cart-icon menu-cart-icon"/>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );

};
