import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function Header(): JSX.Element {
  
  const [user, setUser] = useState<boolean>(false);

  useEffect(() => {
    
    const storedUser = localStorage.getItem('user');

    setUser(!!storedUser);

    // Здесь можно также добавить дополнительную логику, связанную с авторизацией

  }, []);

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
            <button>Log out</button>
          </ul>  
        }
      </nav>
    </header>
  );

}