import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../store/GlobalContext';
import { createUserApiClient, PROJECT_KEY, apiAnonRoot } from '../ctp';
import { MyCustomerDraft, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';



export function useRegistration() {

  const navigate = useNavigate();
  const [globalStore, setGlobalStore] = useContext(GlobalContext);
  const [errors, setErrors] = useState<String[]>([]);

  const registrateCustomer = (payload: any) => {

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

          setErrors(['An account with this email already exists.']);

        } else {
            
          setErrors(['Something went wrong. Please try again later.']);

        }

      });

  };
  
  return { errors, registrateCustomer };

};

export default useRegistration;

