import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { LoginPage} from './app/pages/login/LoginPage';
import { MainPage } from './app/pages/main/MainPage';
import { RegistrationPage } from './app/pages/registration/RegistrationPage';
import { NotFoundPage } from './app/pages/404/NotFoundPage';
import './App.css';

function App() {  
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="registration" element={<RegistrationPage />} />
        <Route path="*" element={<NotFoundPage />}/>
      </Routes>
    </BrowserRouter>  
  );

}

export default App;
