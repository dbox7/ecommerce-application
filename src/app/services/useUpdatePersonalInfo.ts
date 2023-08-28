import { useState, useContext } from 'react';
import { useApi } from './useApi';
import { CustomerUpdate } from '@commercetools/platform-sdk';
import { GlobalContext } from '../store/GlobalContext';
import { IToastify, IUpdatePersonalInfo } from '../utils/types';
import useToastify from './useToastify';


const useUpdatePersonalInfo = (): IUpdatePersonalInfo => {

  const [globalStore, setGlobalStore] = useContext(GlobalContext);
  const [error, setError] = useState<string>('');
  const api = useApi();
  const notify = useToastify();
  const errorMessage: IToastify = {
    error: 'An error occurred while updating personal information.',
  };
  const successMessage: IToastify = {
    success: 'Your profile has been updated successfully!'
  };

  const updatePersonalInfo = (
    customerID: string,
    email: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    version: number
  ): void => {

    const updateData: CustomerUpdate = {
      version,
      actions: [
        { action: 'changeEmail', email },
        { action: 'setFirstName', firstName },
        { action: 'setLastName', lastName },
        { action: 'setDateOfBirth', dateOfBirth },
      ],
    };


    api.customers()
      .withId({ ID: customerID })
      .post({ body: updateData })
      .execute()
      .then((data) => {

        setGlobalStore({ ...globalStore, currentUser: data.body });
        notify(successMessage);
      
      })
      .catch((error) => {

        setError('An error occurred while updating personal information.');
        notify(errorMessage);
        
      });
    
  
  };

  return { updatePersonalInfo, error };

};

export default useUpdatePersonalInfo;