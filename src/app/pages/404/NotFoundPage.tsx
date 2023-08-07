import React from 'react';
import { Link } from 'react-router-dom';

import './NotFoundPage.css';

export function NotFoundPage() {

  return (
    <div>
      <h1>Oops! You seem to be lost.</h1>
      <p>Here are some helpful links:</p>
      <Link to="/">Home</Link>
      <Link to="/login">Login Page</Link>
      <Link to="/registration">Registration Page</Link>
    </div>
  );

}