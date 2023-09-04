import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useResize } from '../../services/useResize';

import CProfileMenu from '../profileMenu/CProfileMenu';
import CBurgerMenu from '../burger/CBurgerMenu';

import { BsCart2 } from 'react-icons/bs';

import './CHeader.css';

export const Header = () => {

  const width = useResize();
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <aside 
        className={'burger-menu__sidebar' + (openMenu ? ' open' : '')} 
        onClick={() => setOpenMenu(false)}>
        <ul className="burger-menu__list">
          <Link to="/catalog" className="link burger-menu__list-item">Catalog</Link>
          <Link to="/about" className="link burger-menu__list-item">About us</Link>
          <li className="burger-menu__list-item">
            <CProfileMenu/>
          </li>
          <Link to="/cart" className="link header__cart burger-menu__list-item">
            Cart <BsCart2 className="cart-icon menu-cart-icon"/>
          </Link>
        </ul>
      </aside>
      <header className="header">
        <div className="header-container">
          <nav className={ width >= 700 ? 'nav' : 'nav nav_mobile'}>
            {
              width >= 700 ?
                <>
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
                </>
                :
                <>
                  <div className="logo">
                    <Link to="/" className="link">SNEAKERS STORE</Link>
                  </div>
                  <CBurgerMenu openMenu={openMenu} setOpenMenu={setOpenMenu}/>
                </>
            } 
          </nav>
        </div>
      </header>
    </>
  );

};
