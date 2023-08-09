import React from 'react';
import { Link } from 'react-router-dom';
import CButton from '../../components/button/CButton';

export function MainPage() {

  return (
    <nav>
      <ul>
        <li>
          <Link to="/login">Log in</Link>
        </li>
        <li>
          <Link to="/signup">Sign up</Link>
        </li>
      </ul>
      <CButton 
        value="hello"
      />
    </nav>
  );

}