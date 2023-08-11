import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from './app/components/contexts/UserContext';
import { Customer } from '@commercetools/platform-sdk';
import { anonUser } from './app/utils/constants';
import { LoginPage} from './app/pages/login/LoginPage';
import { MainPage } from './app/pages/main/MainPage';
import { SignUpPage } from './app/pages/signup/SignUpPage';
import { NotFoundPage } from './app/pages/404/NotFoundPage';  

import './App.css';

function App() {

  let initUser = localStorage.currentUser;

  if (initUser) {

    initUser = JSON.parse(initUser);

  } else {

    initUser = anonUser;
    
  }

  const [user, setUser] = useState<Customer>(anonUser);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />  
          <Route path="*" element={<NotFoundPage />}/>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );

}

export default App;
