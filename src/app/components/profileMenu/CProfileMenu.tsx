import React, { useContext, useState } from 'react';
import { GlobalContext } from '../../store/GlobalContext';
import { Link, NavLink } from 'react-router-dom';
import { useLogout } from '../../services/login/useLogout';

import loginSVG from '../../assets/login.svg';
import logoutSVG from '../../assets/logout.svg';
import './CProfileMenu.css';


const CProfileMenu = () => {
  
  const [globalStore] = useContext(GlobalContext);  
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const user = globalStore.currentUser;

  const logout = useLogout();
  
  return ( 
    <div 
      className="profile-menu"
      onMouseEnter={() => setShowPopup(true)}
      onMouseLeave={() => setShowPopup(false)}
    >
      <div className="info-block">
        <span className="name">{user.id ? user.firstName : 'User'}</span>
        <img src={user.id ? loginSVG : logoutSVG} alt="Profile icon" className="profile-icon" />
      </div>
      
      {
        showPopup && 
        <ul className="profile-nav substrate">
          {
            user.id ?
              <>
                <li className="profile-nav-item">
                  <Link 
                    to="/" 
                    onClick={logout as React.MouseEventHandler} 
                    className="link"
                  >
                    Log out
                  </Link>
                </li>
                <li className="profile-nav-item">
                  <Link to="/profile" className="link">Profile</Link>
                </li>
              </>
              :
              <>
                <li className="profile-nav-item">
                  <NavLink to="/login" className="link">Log in</NavLink>
                </li>
                <li className="profile-nav-item">
                  <NavLink to="/signup" className="link">Sign up</NavLink>
                </li>
              </>
          }
        </ul>
      }

    </div>
  );

};
 
export default CProfileMenu;