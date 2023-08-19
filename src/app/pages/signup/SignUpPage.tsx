import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../store/GlobalContext';
import { useNavigate } from 'react-router-dom';
import CRegistrationForm from '../../components/registrationForm/CRegistrationForm';

export function SignUpPage() {

  const [globalStore, setGlobalStore] = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    
    if (globalStore.currentUser.id) {

      navigate('/');
  
    }

  });

  return (
    <div className="form-wrap">
      <CRegistrationForm />
    </div>
  );

};
