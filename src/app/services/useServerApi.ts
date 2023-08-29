import { useContext, useState } from 'react';
import { PROJECT_KEY, apiAnonRoot, createUserApiClient } from '../ctp';
import { GlobalContext } from '../store/GlobalContext';
import { Category, MyCustomerDraft, ProductProjection, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { IGlobalStoreType, IPayload } from '../utils/types';
import { useNavigate } from 'react-router-dom';
import { anonUser } from '../utils/constants';


function GetApi(globalStore: IGlobalStoreType) {

  let api;

  if (globalStore.currentUser.id && globalStore.apiMeRoot) {

    api = globalStore.apiMeRoot;
  
  } else {
  
    api = apiAnonRoot;
  
  }

  return api;
  
} 

export function useServerApi() {

  const [globalStore, setGlobalStore] = useContext(GlobalContext);
  const [error, setError] = useState<String>('');
  
  const navigate = useNavigate();
  const api = GetApi(globalStore);

  // ------------------------------------------------------------------------------------------------------------------ Registration
  const Registration = (payload: IPayload) => {

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

  // ------------------------------------------------------------------------------------------------------------------ Login
  const Login = (email: string, password: string): void => {

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

  };

  // ------------------------------------------------------------------------------------------------------------------ Logout
  const Logout = () => {

    if (globalStore.currentUser.id) {

      setGlobalStore({...globalStore, currentUser: anonUser});

    }
    navigate('/');

  };

  // ------------------------------------------------------------------------------------------------------------------ GetAllProducts
  const GetAllProducts = () => {

    const [products, setProducts] = useState<ProductProjection[]>([]);

    api?.productProjections().get({
      queryArgs: {
        limit: 100
      }
    }).execute().then(data => {

      const products = data.body.results;

      setProducts(products);

    }).catch(() => {
        
      setError('Something went wrong. Please try again later.');

    });

    return products;

  };

  // ------------------------------------------------------------------------------------------------------------------ GetAllCategories
  const GetAllCategories = (setCategories: Function) => {

    api?.categories().get().execute().then((data) => {

      setCategories(data.body.results);

    }).catch(() => {
        
      setError('Something went wrong. Please try again later.');

    });

  };

  return { 
    error,
    Registration,
    Login,
    Logout,
    GetAllProducts,
    GetAllCategories
  };

}
