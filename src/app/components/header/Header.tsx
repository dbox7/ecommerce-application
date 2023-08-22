import { Link } from 'react-router-dom';

import './Header.css';
import CProfileMenu from '../profileMenu/CProfileMenu';

export function Header(): JSX.Element {

  return (
    <header className="header">
      <div className="header-container">
        <nav className="nav">
          <ul className="menu">
            <li className="menu-item">
              <Link to="/" className="link">Home</Link>
            </li>
            <li className="menu-item">
              <Link to="/catalog" className="link">Catalog</Link>
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
