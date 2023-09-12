import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../../store/hooks/useTypedSelector';
import useToastify from '../../services/useToastify';

import CRegistrationForm from '../../components/registrationForm/CRegistrationForm';


export const SignUpPage = () => {

  const { currentUser, msg } = useTypedSelector(state => state.user);
  const navigate = useNavigate();
  const notify = useToastify();

  useEffect(() => {
    
    if (currentUser.id !== '') {

      navigate('/');
  
    }

    if (msg.body !== '') {

      msg.error ? 
        notify({ error: msg.body })
        :
        notify({ success: msg.body });

    }

  }, [currentUser.id, msg]);

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
