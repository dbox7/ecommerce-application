import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../../store/hooks/useTypedSelector';

import CRegistrationForm from '../../components/registrationForm/CRegistrationForm';


export const SignUpPage = () => {

  const {currentUser} = useTypedSelector(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    
    if (currentUser.id !== '') {

      navigate('/');
  
    }

  });

  return (
    <div>
      <div className="content">
        <div className="form-wrap">
          <CRegistrationForm />
        </div>
      </div>
    </div> 
  );

};
