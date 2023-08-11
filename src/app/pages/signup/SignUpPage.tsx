import { useState } from 'react';
import SensitiveMessages from '../../SensetiveMessages';
import CRegistrationForm from '../../components/registrationForm/CRegistrationForm';
import { apiRoot } from '../../ctp';


export function SignUpPage() {

  return (
    <CRegistrationForm />
  );

};
