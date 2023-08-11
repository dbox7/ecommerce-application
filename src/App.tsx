import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { LoginPage} from './app/pages/login/LoginPage';
import { MainPage } from './app/pages/main/MainPage';
import { SignUpPage } from './app/pages/signup/SignUpPage';
import { NotFoundPage } from './app/pages/404/NotFoundPage';

import './App.css';

function App() {  
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="*" element={<NotFoundPage />}/>
      </Routes>
    </BrowserRouter>
  );

}

export default App;
