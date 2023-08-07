import React from 'react';
import { Link } from 'react-router-dom';

export function MainPage() {

  return (
    <nav>
      <ul>
        <li>
          <Link to="/login">Login Page</Link>
        </li>
        <li>
          <Link to="/registration">Registration Page</Link>
        </li>
      </ul>
    </nav>
  );

}