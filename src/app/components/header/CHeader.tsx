import { Link, NavLink } from 'react-router-dom';
import CProfileMenu from '../profileMenu/CProfileMenu';

import './CHeader.css';

export function Header() {

  return (
    <header className="header">
      <div className="header-container">
        <nav className="nav">
          <ul className="menu">
            <li className="menu-item">

              <NavLink to="/" className="link">Home</NavLink>
            </li>
            <li className="menu-item">
              <NavLink to="/catalog" className="link">Catalog</NavLink>
            </li>
          </ul>
          <div className="logo">
            <Link to="/" className="link">SNEAKERS STORE</Link>
          </div>
          <ul className="menu right">
            <CProfileMenu/>
          </ul>
        </nav>
      </div>
    </header>
  );

}
