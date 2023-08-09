import React from 'react';
import { Link } from 'react-router-dom';

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
    </nav>
  );

}