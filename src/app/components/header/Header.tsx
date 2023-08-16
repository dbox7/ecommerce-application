import { useContext } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';
import { Link } from 'react-router-dom';
import { Logout } from '../../components/logout/CLogout';

import './Header.css';
  

export function Header(): JSX.Element {
  
  const [globalStore, setGlobalStore] = useContext(GlobalContext);

  return (
    <header className="header">
      <div className="header-container">
        <div>
          <Link to="/">Main</Link>
        </div>
        <nav className="nav">
          {!globalStore.currentUser.id ?
            <ul className="menu-list">
              <li className="menu-item">
                <Link to="/login">Log in</Link>
              </li>
              <li className="menu-item">
                <Link to="/signup">Sign up</Link>
              </li>
            </ul>
            :
            <ul className="menu-list">
              <li className="menu-item">
                <Link to="/logout">Log out</Link>
              </li>
            </ul>
          }
        </nav>
      </div>
    </header>
  );

}
