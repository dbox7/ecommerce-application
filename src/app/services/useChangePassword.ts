import { useState, useContext } from 'react';
import { GlobalContext } from '../store/GlobalContext';
import { IChangePassword, IToastify } from '../utils/types';
import { CustomerChangePassword, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { PROJECT_KEY, createUserApiClient } from '../ctp';
import { useApi } from './useApi';
import useToastify from './useToastify';

const UseChangePassword = () => {

  const [globalStore, setGlobalStore] = useContext(GlobalContext);
  const [err, setErr] = useState<string>('');
  const api = useApi();
  const notify = useToastify();
  const errorMessage: IToastify = {
    error: 'An error occurred while updating password.',
  };
  const successMessage: IToastify = {
    success: 'Your password has been updated successfully!'
  };

  const changePassword = (email: string, updateData: IChangePassword): void => {


    api
      .me()
      .password()
      .post({ body: updateData as CustomerChangePassword })
      .execute()
      .then((data) => {

          
        const password: string = updateData.newPassword;
        const ctpMeClient = createUserApiClient(email, password);
        const apiMeRoot = createApiBuilderFromCtpClient(ctpMeClient).withProjectKey({ projectKey: PROJECT_KEY});

        apiMeRoot.me().login().post({
          body: {email, password}
        })
          .execute()
          .then(data => {
      
            setGlobalStore({...globalStore, currentUser: data.body.customer, apiMeRoot: apiMeRoot});
            notify(successMessage);
            
          });
        
      })
      .catch((err) => {

        setErr('An error occurred while updating password.');
        notify(errorMessage);
        
      });
  
  };

  return { changePassword, err };

};

export default UseChangePassword;