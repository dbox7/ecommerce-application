import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ClientBuilder } from '@commercetools/sdk-client-v2';
import { PROJECT_KEY, AUTH_URL, CLIENT_ID, CLIENT_SECRET, API_URL } from '../../ctp';
import { GlobalContext } from '../../store/GlobalContext';
import { useContext, useState } from 'react';

export function useLogin() {

  const [errors, setErrors] = useState<String[]>([]);
  const [globalStore, setGlobalStore] = useContext(GlobalContext);

  function createClient(email: string, password: string) {

    const ctpMeClient = new ClientBuilder()
      .withProjectKey(PROJECT_KEY)
      .withPasswordFlow({
        host: AUTH_URL,
        projectKey: PROJECT_KEY,
        credentials: {
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          user: {
            username: email,
            password: password
          }
        }
      })
      .withHttpMiddleware({
        host: API_URL,
        fetch,
      })
      .withLoggerMiddleware() // Include middleware for logging
      .build();
  
    const apiMeRoot = createApiBuilderFromCtpClient(ctpMeClient).withProjectKey({ projectKey: PROJECT_KEY});
  
    return apiMeRoot.me().login().post({
      body: {email, password}
    })
      .execute()
      .then(data => {
  
        // Сохраняем в глобальном хранилище и профиль пользователя, и API для обращений от его имени
        setGlobalStore({...globalStore, currentUser: data.body.customer, apiMeRoot: apiMeRoot});
  
      }).catch(err => {
  
        console.log(err.message);
        setErrors([...errors, err.message]);
  
      });
  
  }

  return { errors, createClient };

}
