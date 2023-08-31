import { useContext, useState } from 'react';
import { PROJECT_KEY, apiAnonRoot, createUserApiClient } from '../ctp';
import { GlobalContext } from '../store/GlobalContext';
import { 
  MyCustomerDraft, 
  ProductProjection, 
  createApiBuilderFromCtpClient,
  CustomerChangePassword, 
  CustomerUpdate,
} from '@commercetools/platform-sdk';
import { 
  IChangePassword, 
  IGlobalStoreType, 
  IPayload, 
  IQueryArgs 
} from '../utils/types';
import { useNavigate } from 'react-router-dom';
import { anonUser } from '../utils/constants';

const GetApi = (globalStore: IGlobalStoreType) => {

  let api;

  if (globalStore.currentUser.id && globalStore.apiMeRoot) {

    api = globalStore.apiMeRoot;
  
  } else {
  
    api = apiAnonRoot;
  
  }

  return api;
  
}; 

export const useServerApi = () => {

  const [globalStore, setGlobalStore] = useContext(GlobalContext);
  const [error, setError] = useState('');
  
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

  // ------------------------------------------------------------------------------------------------------------------ ChangePassword
  const ChangePassword = (email: string, updateData: IChangePassword): void => {

    api
      .me()
      .password()
      .post({ body: updateData as CustomerChangePassword })
      .execute()
      .then(() => {
   
        const password: string = updateData.newPassword;
        const ctpMeClient = createUserApiClient(email, password);
        const apiMeRoot = createApiBuilderFromCtpClient(ctpMeClient).withProjectKey({ projectKey: PROJECT_KEY});

        apiMeRoot.me().login().post({
          body: {email, password}
        })
          .execute()
          .then(data => {
      
            setGlobalStore({...globalStore, currentUser: data.body.customer, apiMeRoot: apiMeRoot});
            
          });
        
      })
      .catch(() => {

        setError('An error occurred while updating password.');
        
      });

  };

  // ------------------------------------------------------------------------------------------------------------------ UpdatePersonalInfo
  const UpdatePersonalInfo = (
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
      .catch(() => {

        setError('An error occurred while updating personal information.');
        
      });
    
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

  // ------------------------------------------------------------------------------------------------------------------ GetProductById
  const GetProductById = (id: string, setProduct: Function) => {

    api?.productProjections()
      .withId({ID: id as string})
      .get().execute().then(res => {
        
        setProduct(res.body);
        
      }).catch(err => {
        
        setError(err);        
        
      });

  };

  // ------------------------------------------------------------------------------------------------------------------ GetAllCategories
  const GetAllCategories = (setCategories: Function) => {

    api?.categories().get().execute().then((data) => {

      setCategories(data.body.results);

    }).catch(() => {
        
      setError('Something went wrong. Please try again later.');

    });

  };

  // ------------------------------------------------------------------------------------------------------------------ FilterProducts
  const FilterProducts = (queryArgs: IQueryArgs, setProducts: Function) => {

    api.productProjections().search().get({
      queryArgs: queryArgs
    }).execute().then((data) => {
  
      setProducts(data.body.results);
      
    });

  };
  
  return { 
    error,
    Registration,
    Login,
    Logout,
    ChangePassword,
    UpdatePersonalInfo,
    GetAllProducts,
    GetProductById,
    GetAllCategories,
    FilterProducts
  };

};