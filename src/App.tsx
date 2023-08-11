

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoginPage} from './app/pages/login/LoginPage';
import { MainPage } from './app/pages/main/MainPage';
import { SignUpPage } from './app/pages/signup/SignUpPage';
import { NotFoundPage } from './app/pages/404/NotFoundPage';
import './App.css';
import  Header from './app/components/header/Header';
import { UserProvider } from './app/store/UserContext';

function App() {  
  
  return (
    <UserProvider>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="*" element={<NotFoundPage />}/>
        </Routes>
      </Router>  
    </UserProvider>

  );

}

export default App;
