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
  IAction,
  IAddress,
  IChangePassword, 
  IGlobalStoreType, 
  IPayload, 
  IQueryArgs, 
  IToastify
} from '../utils/types';
import { useNavigate } from 'react-router-dom';
import { anonUser } from '../utils/constants';
import useToastify from './useToastify';

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
  const notify = useToastify();
  
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

    const errorMessage: IToastify = {
      error: 'An error occurred while updating password.',
    };
    const successMessage: IToastify = {
      success: 'Your password has been updated successfully!'
    };

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
            notify(successMessage);
          
          });
        
      })
      .catch(() => {

        setError('An error occurred while updating password.');
        notify(errorMessage);
      
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

    const errorMessage: IToastify = {
      error: 'An error occurred while updating personal information.',
    };
    const successMessage: IToastify = {
      success: 'Your personal information has been updated successfully!'
    };

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
      .catch(() => {

        setError('An error occurred while updating personal information.');
        notify(errorMessage);
      
      });
    
  };

  // ------------------------------------------------------------------------------------------------------------------ GetAllProducts
  const GetAllProducts = (setProducts: Function) => {

    // const [products, setProducts] = useState<ProductProjection[]>([]);

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

  const addAddresses = (
    customerID: string,
    version: number,
    address: IAddress,
    actionTypes: string[],
  ): void => {

    const errorMessage: IToastify = {
      error: 'An error occurred while adding address.',
    };
    const successMessage: IToastify = {
      success: 'Your addresses has been added successfully!'
    };
 
    const updateData: CustomerUpdate = {
      version,
      actions: [
        { action: 'addAddress', address }
      ]
    };


    api.customers()
      .withId({ ID: customerID })
      .post({ body: updateData })
      .execute()
      .then((data) => {

        setGlobalStore({ ...globalStore, currentUser: data.body });

        const addresses = data.body.addresses;
        const lastAddress = addresses[addresses.length - 1];
        const addressId = lastAddress.id;
        const version = data.body.version;

        const actions: { action: IAction; [key: string]: string }[] = [];

        if (addressId) {

          for (let i = 0; i < actionTypes.length; i+=1) {

            const actionType = actionTypes[i];
        
            switch (actionType) {
      
            case 'addShippingAddressId':
              actions.push({ action: actionType, addressId });
              break;
            case 'addBillingAddressId':
              actions.push({ action: actionType, addressId });
              break;
            default:
              break;
            
            }
          
          }
        
        }

        const updateData = {
          version,
          actions,
        };

        api.customers()
          .withId({ ID: customerID })
          .post({ body: updateData as CustomerUpdate})
          .execute()
          .then((data) => {

            setGlobalStore({ ...globalStore, currentUser: data.body });
      
          })
          .catch(() => {

            setError('An error occurred while updating address.');
        
          });
        notify(successMessage);
      
      })
      .catch(() => {

        setError('An error occurred while updating address.');
        notify(errorMessage);

      });
    
  
  };

  const changeAddress = (
    customerID: string,
    version: number,
    address: IAddress,
    addressId: string,
    actionTypes: string[],
  ): void => {

    const errorMessage: IToastify = {
      error: 'An error occurred while updating address.',
    };
    const successMessage: IToastify = {
      success: 'Your addresses has been updated successfully!'
    };

    const actions: { action: IAction; [key: string]: string | IAddress }[] = [];

    for (let i = 0; i < actionTypes.length; i+=1) {

      const actionType = actionTypes[i];
  
      switch (actionType) {

      case 'changeAddress':
        actions.push({ action: actionType, addressId, address });
        break;
      case 'addShippingAddressId':
        actions.push({ action: actionType, addressId });
        break;
      case 'addBillingAddressId':
        actions.push({ action: actionType, addressId });
        break;
      case 'setDefaultBillingAddress':
        actions.push({ action: actionType, addressId });
        break;
      case 'setDefaultShippingAddress':
        actions.push({ action: actionType, addressId });
        break;
      default:
        break;
      
      }
    
    }
  
    const updateData = {
      version,
      actions,
    };
  


    api.customers()
      .withId({ ID: customerID })
      .post({ body: updateData as CustomerUpdate })
      .execute()
      .then((data) => {

        setGlobalStore({ ...globalStore, currentUser: data.body });
        notify(successMessage);
      
      })
      .catch(() => {

        setError('An error occurred while updating address.');
        notify(errorMessage);
        
      });
    
  
  };

  const removeAddress = (
    customerID: string,
    version: number,
    addressId: string,
  ): void => {

    const errorMessage: IToastify = {
      error: 'An error occurred while removing address.',
    };
    const successMessage: IToastify = {
      success: 'Your addresses has been removed successfully!'
    };
 
    const updateData: CustomerUpdate = {
      version,
      actions: [
        { action: 'removeAddress', addressId }
      ]
    };


    api.customers()
      .withId({ ID: customerID })
      .post({ body: updateData })
      .execute()
      .then((data) => {

        setGlobalStore({ ...globalStore, currentUser: data.body });
        notify(successMessage);
      
      })
      .catch(() => {

        setError('An error occurred while updating address.');
        notify(errorMessage);
        
      });
    
  
  };

  const setDefaultAddress = (
    customerID: string,
    version: number,
    addressId: string,
    actionType: string,
  ): void => {
    
    const errorMessage: IToastify = {
      error: 'An error occurred while updating address.',
    };
    const successMessage: IToastify = {
      success: 'Your addresses has been updated successfully!'
    };
    const actions: { action: IAction; [key: string]: string }[] = [];

    const createAction = (action: IAction, params: Record<string, string>): void => {

      actions.push({ action, ...params });
    
    };

    switch (actionType) {

    case 'setDefaultShippingAddress':
      createAction('setDefaultShippingAddress', { addressId });
      break;
    case 'setDefaultBillingAddress':
      createAction('setDefaultBillingAddress', { addressId });
      break;
    default:
      break;
    
    }
 
    const updateData = {
      version,
      actions,
    };


    api.customers()
      .withId({ ID: customerID })
      .post({ body: updateData as CustomerUpdate })
      .execute()
      .then((data) => {

        setGlobalStore({ ...globalStore, currentUser: data.body });
        notify(successMessage);
      
      })
      .catch(() => {

        setError('An error occurred while updating address.');
        notify(errorMessage);
        
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
    FilterProducts,
    addAddresses,
    changeAddress,
    removeAddress,
    setDefaultAddress
  };

};
