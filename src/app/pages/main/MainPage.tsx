import React from 'react';
import { Link } from 'react-router-dom';
import CButton from '../../components/button/CButton';
import CPassword from '../../components/inputs/password/CPassword';
import CTextDateInput from '../../components/inputs/textDateInput/CTextDateInput';
import CCheckbox from '../../components/inputs/checkbox/CCheckbox';

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
      <CTextDateInput 
        title="hello"
        value="hehe"
        changeHandler={()=>{}}
        data={data}
      />
      <CPassword 
        value="title"
        changeHandler={() => {}}
      />
      <CCheckbox 
        value={true}
        changeHandler={() => {}}
      />
    </nav>
  );

}