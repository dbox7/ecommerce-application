import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../store/GlobalContext';
import { createUserApiClient, PROJECT_KEY, apiAnonRoot } from '../ctp';
import { CustomerDraft, MyCustomerDraft, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';



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

        // Эта функция вызовется, если API-запрос вернёт HTTP-ошибку. Добавим её в Чувствительную Копилку Сообщений
        setErrors([...errors, err.message]);
          
        // А для программистов мы выведем в консоль полный объект ошибки, там может быть полезная инфа об отладке
        console.error('Error sending POST /customers. Take a look at body.errors[x].detailedErrorMessage', err);
      
      });

  };
  
  return { errors, registrateCustomer };

};

export default useRegistration;

