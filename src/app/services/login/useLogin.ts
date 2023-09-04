import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { createUserApiClient, PROJECT_KEY } from '../../ctp';
import { GlobalContext } from '../../store/GlobalContext';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
  
  const [globalStore, setGlobalStore] = useContext(GlobalContext);
  const [error, setError] = useState<String>('');
  const navigate = useNavigate();


  function createClient(email: string, password: string): void {

    const ctpMeClient = createUserApiClient(email, password);
    const apiMeRoot = createApiBuilderFromCtpClient(ctpMeClient).withProjectKey({ projectKey: PROJECT_KEY});
    
    apiMeRoot.me().login().post({
      body: {email, password}
    })
      .execute()
      .then(data => {

        setGlobalStore({...globalStore, currentUser: data.body.customer, apiMeRoot: apiMeRoot});
        navigate('/');
      
      }).catch(err => {
        
        if (err.body.message === 'Customer account with the given credentials not found.') {

          setError('The user does not exist or the email/password is incorrect.');

        } else {
              
          setError('Something went wrong. Please try again later.');

        }
      
      });
  
  }

  return { error, createClient };

}
