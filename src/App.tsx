import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalContext, defaultGlobalStore } from './app/store/GlobalContext';
import { IGlobalStoreType } from '../src/app/utils/types';

import { LoginPage} from './app/pages/login/LoginPage';
import { MainPage } from './app/pages/main/MainPage';
import { SignUpPage } from './app/pages/signup/SignUpPage';
import { NotFoundPage } from './app/pages/404/NotFoundPage';
import { Header } from './app/components/header/CHeader';
import { Footer } from './app/components/footer/CFooter';
import { CatalogPage } from './app/pages/catalog/CatalogPage';
import { UserProfilePage } from './app/pages/UserProfilePage/UserProfilePage';
import { ProductPage } from './app/pages/product/ProductPage';
import { CartPage } from './app/pages/cart/CartPage';
import { AboutUsPage } from './app/pages/about/AboutUsPage';
import { ContactsPage } from './app/pages/contacts/ContactsPage';

import './App.css';

const App = () => {

  // Значение стейта по-умолчанию - анонимный юзер (потом будем брать значение из localStorage)
  const [globalStore, setGlobalStore] = useState<IGlobalStoreType>(defaultGlobalStore);

  return (
    <GlobalContext.Provider value={[globalStore, setGlobalStore]}>
      <BrowserRouter>
        <div className="main_container">
          <Header/>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route path="catalog" element={<CatalogPage />} />
            <Route path="catalog/:id" element={<ProductPage />} />
            <Route path="*" element={<NotFoundPage />}/>
            <Route path="profile" element={<UserProfilePage />}/>
            <Route path="cart" element={<CartPage />}/>
            <Route path="about" element={<AboutUsPage />}/>
            <Route path="contacts" element={<ContactsPage />}/>
          </Routes>
          <Footer/>
        </div>
      </BrowserRouter>
    </GlobalContext.Provider>
  );

};

export default App;

