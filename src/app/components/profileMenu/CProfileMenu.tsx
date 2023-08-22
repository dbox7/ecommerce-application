import { useContext, useState } from 'react';
import { GlobalContext } from '../../store/GlobalContext';
import { Link } from 'react-router-dom';
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
                    onClick={logout} 
                    className="link"
                  >
                    Log out
                  </Link>
                </li>
                <li className="profile-nav-item">
                  <Link to="/signup" className="link">Profile</Link>
                </li>
              </>
              :
              <>
                <li className="profile-nav-item">
                  <Link to="/login" className="link">Log in</Link>
                </li>
                <li className="profile-nav-item">
                  <Link to="/signup" className="link">Sign up</Link>
                </li>
              </>
          }
        </ul>
      }

    </div>
  );

};
 
export default CProfileMenu;