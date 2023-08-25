import { useState, useContext } from 'react';
import { useApi } from './useApi';
import { CustomerUpdate } from '@commercetools/platform-sdk';
import { GlobalContext } from '../store/GlobalContext';
import { IUpdatePersonalInfo } from '../utils/types';


const useUpdatePersonalInfo = (): IUpdatePersonalInfo => {

  const [globalStore, setGlobalStore] = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const api = useApi();

  const updatePersonalInfo = (
    customerID: string,
    email: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    version: number
  ): void => {

    setLoading(true);
    setError(null);

    const updateData: CustomerUpdate = {
      version,
      actions: [
        { action: 'changeEmail', email },
        { action: 'setFirstName', firstName },
        { action: 'setLastName', lastName },
        { action: 'setDateOfBirth', dateOfBirth },
      ],
    };

    try {

      api.customers()
        .withId({ ID: customerID })
        .post({ body: updateData })
        .execute()
        .then((data) => {

          setLoading(false);
          setGlobalStore({ ...globalStore, currentUser: data.body });
        
        })
        .catch((error) => {

          setLoading(false);
          setError('An error occurred while updating personal information.');
          console.error(error);
        
        });
    
    } catch (error) {

      setLoading(false);
      setError('An error occurred while updating personal information.');
      console.error(error);
    
    }
  
  };

  return { updatePersonalInfo, loading, error };

};

export default useUpdatePersonalInfo;