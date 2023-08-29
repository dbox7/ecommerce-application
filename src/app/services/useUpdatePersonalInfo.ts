import { useState, useContext } from 'react';
import { useApi } from './useApi';
import { CustomerUpdate } from '@commercetools/platform-sdk';
import { GlobalContext } from '../store/GlobalContext';
import { IUpdatePersonalInfo } from '../utils/types';

const useUpdatePersonalInfo = (): IUpdatePersonalInfo => {

  const [globalStore, setGlobalStore] = useContext(GlobalContext);
  const [error, setError] = useState('');
  const api = useApi();

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
        
      })
      .catch((error) => {

        setError('An error occurred while updating personal information.');
        console.error(error);
        
      });
    
  
  };

  return { updatePersonalInfo, error };

};

export default useUpdatePersonalInfo;