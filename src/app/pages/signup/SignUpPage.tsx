import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../store/GlobalContext';
import { useNavigate } from 'react-router-dom';

import CRegistrationForm from '../../components/registrationForm/CRegistrationForm';

export const SignUpPage = () => {

  const [globalStore] = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    
    if (globalStore.currentUser.id) {

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
