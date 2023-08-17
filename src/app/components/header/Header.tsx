import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { anonUser } from '../../utils/constants';
import './Header.css';

export default function Header(): JSX.Element {

  const [user, setUser] = useContext(UserContext);


  const handleLogout = (): void => {

    localStorage.removeItem('currentUser');
    setUser(anonUser);

  };


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
            {!user.id ?
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
                  onClick={handleLogout} 
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