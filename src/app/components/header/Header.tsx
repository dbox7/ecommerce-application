import { useContext } from 'react';
import { GlobalContext } from '../../store/GlobalContext';
import { Link } from 'react-router-dom';
import { useLogout } from '../../services/login/useLogout';

import './Header.css';
  

export function Header(): JSX.Element {
  
  const [globalStore] = useContext(GlobalContext);  

  return (
    <header className="header">
      <div className="header-container">
        <nav className="nav">
          <ul className="menu">
            <li className="menu-item">
              <Link to="/" className="link">Main</Link>
            </li>
            <li className="menu-item">
              <Link to="/catalog" className="link">Catalog</Link>
            </li>
          </ul>
          <div className="logo">
            <Link to="/" className="link">SNEAKERS STORE</Link>
          </div>
          <ul className="menu right">
            {!globalStore.currentUser.id ?
              <>
                <li className="menu-item">
                  <Link to="/login" className="link">Log in</Link>
                </li>
                <li className="menu-item">
                  <Link to="/signup" className="link">Sign up</Link>
                </li>
              </>
              :
              <li className="menu-item">
                <Link 
                  to="/" 
                  onClick={useLogout} 
                  className="link"
                >
                  Log out
                </Link>
              </li>
            }
          </ul>
        </nav>
      </div>
    </header>
  );

}
