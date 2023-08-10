import React, { useState } from 'react';
import { apiRoot } from '../../ctp';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './LoginPage.css';


export function LoginPage() {

  const navigate = useNavigate();

  const [user, setUser] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {

    if (window.localStorage !== undefined) {

      let userInfo = window.localStorage.getItem('user');

      if (userInfo) {

        setUser(JSON.parse(userInfo));
      
      }
      console.log(userInfo);

    }

  }, []);

  const handleInputChange = (field: string, value: string) => {

    switch (field) {

    case 'email':
      setEmail(value);
      break;
    case 'password':
      setPassword(value);
      break;

    }

  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

  

    const payload = {
      email, password
    };
    
    apiRoot.login()
      .post({body: payload})
      .execute()
      .then((data) => {

        console.log('SUCCESS');
        console.log(data);
        const user = JSON.stringify(data.body.customer);

        localStorage.setItem('user', user);
        navigate('/');
      
      })
      .catch((err) => {
  
        console.log(err.message);
        
      });

  };

  
  return (
    <div>
      <h1>Log in Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            title="A properly formatted email address (e.g., example@email.com)"
            required
          />
        </div>
        <div>
          <label>Password:</label>  
          <input
            type="password"
            value={password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            title="A password of at least 8 characters"
            required
          />
        </div>
        <button type="submit">Log me in</button>
        <div>don't have an account yet? so <Link to="/signup">Sign up</Link> </div>
      </form>
    </div>
  );

} 