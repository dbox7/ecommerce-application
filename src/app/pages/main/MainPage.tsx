import React from 'react';
import { Link } from 'react-router-dom';
import CButton from '../../components/button/CButton';
import CTextInput from '../../components/textInput/CTextInput';
import Password from '../../components/password/CPassword';

export function MainPage() {

  const data = ['1', '2'];

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
      <CTextInput 
        title="hello"
        value="hehe"
        changeHandler={()=>{}}
        data={data}
      />
      <Password 
        title="hello"
        value="title"
        changeHandler={() => {}}
      />
    </nav>
  );

}