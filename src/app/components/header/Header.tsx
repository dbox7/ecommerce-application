import { Link } from 'react-router-dom';
import { useUserContext } from '../../store/UserContext';

export default function Header(): JSX.Element {

  const { user, setUser } = useUserContext();


  const handleLogout = (): void => {

    localStorage.removeItem('user');
    setUser(false);
  
  };


  return (
    <header>
      <div>
        <Link to="/">Main</Link>
      </div>
      <nav>
        {!user ? 
          <ul>
            <li>
              <Link to="/login">Log in</Link>
            </li>
            <li>
              <Link to="/signup">Sign up</Link>
            </li>
          </ul>  
          :
          <ul>
            <button onClick={handleLogout}>Log out</button>
          </ul>  
        }
      </nav>
    </header>
  );

}