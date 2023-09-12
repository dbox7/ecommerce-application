import { useContext, useEffect } from 'react';
// import { GlobalContext } from '../../store/GlobalContext';
import { useNavigate } from 'react-router-dom';

import CRegistrationForm from '../../components/registrationForm/CRegistrationForm';
import { useTypedSelector } from '../../store/hooks/useTypedSelector';

export const SignUpPage = () => {

  // const [globalStore] = useContext(GlobalContext);
  const {currentUser} = useTypedSelector(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    
    if (currentUser.id) {

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
