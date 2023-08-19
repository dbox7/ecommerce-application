import { CustomerDraft } from '@commercetools/platform-sdk';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRoot } from '../ctp';
import { GlobalContext } from '../store/GlobalContext';

const useRegistration = () => {

  const navigate = useNavigate();
  const [globalStore, setGlobalStore] = useContext(GlobalContext);
  const [errors, setErrors] = useState<String[]>([]);

  const registrateCustomer = (payload: any) => {

    apiRoot.customers()
      .post({body: payload as CustomerDraft })
      .execute()
      .then((data) => {

        setGlobalStore({...globalStore, currentUser: data.body.customer});
        navigate('/');
      
      })
      .catch((err) => {

        setErrors([...errors, err.message]);

      });

  };
  
  return { errors, registrateCustomer };

};

export default useRegistration;

