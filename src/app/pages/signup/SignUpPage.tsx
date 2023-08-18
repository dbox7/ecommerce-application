import { useContext } from 'react';
import CRegistrationForm from '../../components/registrationForm/CRegistrationForm';
import { GlobalContext } from '../../store/GlobalContext';
import { useNavigate } from 'react-router-dom';


export function SignUpPage() {

  return (
    <CRegistrationForm />
  );

};
