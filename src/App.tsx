import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalContext, defaultGlobalStore } from '../src/app/components/contexts/GlobalContext';
import { IGlobalStoreType } from '../src/app/utils/types';
import { LoginPage} from './app/pages/login/LoginPage';
import { MainPage } from './app/pages/main/MainPage';
import { SignUpPage } from './app/pages/signup/SignUpPage';
import { NotFoundPage } from './app/pages/404/NotFoundPage';
import { Header } from './app/components/header/Header';
import { CatalogPage } from './app/pages/catalog/CatalogPage';
import { Logout } from './app/components/logout/CLogout';
import './App.css';

export default function App() {

  // Значение стейта по-умолчанию - анонимный юзер (потом будем брать значение из localStorage)
  const [globalStore, setGlobalStore] = useState<IGlobalStoreType>(defaultGlobalStore);

  return (
    <GlobalContext.Provider value={[globalStore, setGlobalStore]}>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="logout" element={<Logout />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="*" element={<NotFoundPage />}/>
        </Routes>
      </BrowserRouter>
    </GlobalContext.Provider>
  );

}

