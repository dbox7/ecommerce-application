import { 
  MouseEventHandler, 
  useContext, 
  useState 
} from 'react';
import { GlobalContext } from '../../store/GlobalContext';
import { Link } from 'react-router-dom';
import { useServerApi } from '../../services/useServerApi';

import { BsPerson, BsPersonFill } from 'react-icons/bs';

import './CProfileMenu.css';

const CProfileMenu = () => {
  
  const [globalStore] = useContext(GlobalContext);  
  const [showPopup, setShowPopup] = useState(false);
  const user = globalStore.currentUser;

  const server = useServerApi();

  const userName = user.firstName;
  
  return ( 
    <div 
      className="profile-menu"
      onMouseEnter={() => setShowPopup(true)}
      onMouseLeave={() => setShowPopup(false)}
    >
      <div className="info-block">
        <span className="name">{user.id ? user.firstName : 'User'}</span>
        {user.id ? 
          <BsPersonFill className="cart-icon profile-menu__icon login" /> 
          : 
          <BsPerson className="cart-icon profile-menu__icon"/>
        }
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
                    onClick={server.Logout as MouseEventHandler} 
                    className="link"
                  >
                    Log out
                  </Link>
                </li>
                <li className="profile-nav-item">
                  <Link to={`/profile/${userName}`} className="link">Profile</Link>
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