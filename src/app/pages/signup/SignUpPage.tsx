import { useContext } from 'react';
import CRegistrationForm from '../../components/registrationForm/CRegistrationForm';
import { GlobalContext } from '../../components/contexts/GlobalContext';
import { useNavigate } from 'react-router-dom';


export function SignUpPage() {

  return (
    <CRegistrationForm />
  );

};
