import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../store/GlobalContext';
import { createUserApiClient, PROJECT_KEY, apiAnonRoot } from '../ctp';
import { MyCustomerDraft, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { IPayload } from '../utils/types';

export function useRegistration() {

  const navigate = useNavigate();
  const [globalStore, setGlobalStore] = useContext(GlobalContext);
  const [error, setError] = useState('');

  const registrateCustomer = (payload: IPayload) => {

    apiAnonRoot.me().signup()
      .post({body: payload as MyCustomerDraft})
      .execute()
      .then((data) => {

        const ctpMeClient = createUserApiClient(payload.email, payload.password);
        const apiMeRoot = createApiBuilderFromCtpClient(ctpMeClient).withProjectKey({ projectKey: PROJECT_KEY});

        setGlobalStore({...globalStore, currentUser: data.body.customer, apiMeRoot: apiMeRoot});
        navigate('/');
      
      })
      .catch((err) => {
        
        if (err.body.message === 'There is already an existing customer with the provided email.') {

          setError('An account with this email already exists.');

        } else {
            
          setError('Something went wrong. Please try again later.');

        }

      });

  };
  
  return { error, registrateCustomer };

};

export default useRegistration;

