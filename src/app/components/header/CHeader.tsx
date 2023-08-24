import { Link, useNavigate } from 'react-router-dom';
import CProfileMenu from '../profileMenu/CProfileMenu';

import './CHeader.css';

export function Header() {

  const navigate = useNavigate();

  const catalogClickHandler = (e: any) => {

    e.preventDefault();
    console.log('CLICK');
    navigate('/catalog', {state: {}});
  
  };

  return (
    <header className="header">
      <div className="header-container">
        <nav className="nav">
          <ul className="menu">
            <li className="menu-item">
              <Link to="/" className="link">Home</Link>
            </li>
            <li className="menu-item">
              <Link 
                to="/catalog" 
                className="link"
                onClick={catalogClickHandler}
              >Catalog</Link>
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
