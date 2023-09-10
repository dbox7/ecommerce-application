import { useContext, useState } from 'react';
import { PROJECT_KEY, apiAnonRoot, createUserApiClient } from '../ctp';
import { GlobalContext } from '../store/GlobalContext';
import { 
  MyCustomerDraft, 
  createApiBuilderFromCtpClient,
  CustomerChangePassword, 
  CustomerUpdate,
  MyCartDraft,
  MyCartUpdate,
  MyCartUpdateAction,
  Cart,
  CartAddCustomLineItemAction,
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
import { createAnonApiClient } from '../ctp';
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

    const errorMessage: IToastify = {
      error: 'An account with this email already exists.',
    };

    const errorServerMessage: IToastify = {
      error: 'Something went wrong. Please try again later.',
    };

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

          notify(errorMessage);

        } else {
            
          notify(errorServerMessage);

        }

      });
      
  };

  // ------------------------------------------------------------------------------------------------------------------ Login
  const Login = (email: string, password: string): void => {

    const errorMessage: IToastify = {
      error: 'The user does not exist or the email/password is incorrect.',
    };

    const errorServerMessage: IToastify = {
      error: 'Something went wrong. Please try again later.',
    };

    const ctpMeClient = createUserApiClient(email, password);
    const apiMeRoot = createApiBuilderFromCtpClient(ctpMeClient).withProjectKey({ projectKey: PROJECT_KEY});
    
    
    api.me().login().post({
      body: {email, password, activeCartSignInMode: 'MergeWithExistingCustomerCart'} })
      .execute()
      .then(data => {


        setGlobalStore({...globalStore, currentUser: data.body.customer, cart: data.body.cart || globalStore.cart, apiMeRoot: apiMeRoot});
        navigate('/');
      
      }).catch(err => {
        
        if (err.body.message === 'Customer account with the given credentials not found.') {

          notify(errorMessage);

        } else {
              
          notify(errorServerMessage);

        }
      
      });

  };

  // ------------------------------------------------------------------------------------------------------------------ Logout
  const Logout = () => {

    if (globalStore.currentUser.id) {

      createAnonApiClient();
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

  // ------------------------------------------------------------------------------------------------------------------ getCustomer
  const getCustomer = () => {

    api.me()
      .get()
      .execute()
      .then((data) => {

        setGlobalStore({...globalStore, currentUser: data.body});
        
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

  // ------------------------------------------------------------------------------------------------------------------ AddAddresses
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

  // ------------------------------------------------------------------------------------------------------------------ ChangeAddress
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
      case 'removeShippingAddressId':
        actions.push({ action: actionType, addressId });
        break;
      case 'removeBillingAddressId':
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

  // ------------------------------------------------------------------------------------------------------------------ RemoveAddress
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

  // ------------------------------------------------------------------------------------------------------------------ SetDefaultAddress
  const setDefaultAddress = (
    customerID: string,
    version: number,
    addressId: string,
    actionTypes: string[],
  ): void => {
    
    const errorMessage: IToastify = {
      error: 'An error occurred while updating address.',
    };
    const successMessage: IToastify = {
      success: 'Your addresses has been updated successfully!'
    };
    const actions: { action: IAction; [key: string]: string }[] = [];

    for (let i = 0; i < actionTypes.length; i+=1) {

      const actionType = actionTypes[i];

      switch (actionType) {

      case 'setDefaultShippingAddress':
        actions.push({ action: actionType, addressId });
        break;
      case 'setDefaultBillingAddress':
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

  // ------------------------------------------------------------------------------------------------------------------ createCart

  const createCart = (draft: MyCartDraft): Promise<Cart> => {


    const errorServerMessage: IToastify = {
      error: 'Something went wrong. Please try again later.',
    };

    return new Promise<Cart>((resolve, reject) => {

      api
        .me()
        .carts()
        .post({ body: draft })
        .execute()
        .then((data) => {

          setGlobalStore({ ...globalStore, cart: data.body });
          resolve(data.body);
        
        })
        .catch((error) => {

          notify(errorServerMessage);
          reject(error);
        
        });
    
    });
      
  };

  // ------------------------------------------------------------------------------------------------------------------ getCart
  const getCart = (cartID: string,) => {


    const errorServerMessage: IToastify = {
      error: 'Something went wrong. Please try again later.',
    };

    api.me()
      .carts()
      .withId({ ID: cartID })
      .get()
      .execute()
      .then((data) => {

        setGlobalStore({...globalStore, cart: data.body});
        
      })
      .catch(() => {
        
        notify(errorServerMessage);

      });
      
  };

  // ------------------------------------------------------------------------------------------------------------------ deleeCart
  const deleteCart = (cartID: string, version: number) => {


    const errorServerMessage: IToastify = {
      error: 'Something went wrong. Please try again later.',
    };

    api.me()
      .carts()
      .withId({ ID: cartID })
      .delete({
        queryArgs: { version },
      })
      .execute()
      .then((data) => {

        setGlobalStore({...globalStore, cart: data.body});
        
      })
      .catch(() => {
        
        notify(errorServerMessage);

      });
      
  };

  // ------------------------------------------------------------------------------------------------------------------ addCatrtItem
  const addCartItem = (
    cartID: string,
    version: number,
    quantity: number,
    variantId: number,
    productId: string,
  ): void => {

    const errorMessage: IToastify = {
      error: 'An error occurred while adding item to cart.',
    };
    const successMessage: IToastify = {
      success: 'Pruduct has been added to cart  successfully!'
    };

    const updateData: MyCartUpdate = {
      version,
      actions: [
        { action: 'addLineItem', productId, variantId, quantity }
      ],
    };


    api.me()
      .carts()
      .withId({ ID: cartID })
      .post({ body: updateData })
      .execute()
      .then((data) => {

        setGlobalStore({ ...globalStore, cart: data.body });
        notify(successMessage);

      })
      .catch(() => {

        setError('An error occurred while updating cart.');
        notify(errorMessage);

      });
    
  
  };

  // ------------------------------------------------------------------------------------------------------------------ removeCatrtItem
  const removeCartItem = (
    cartID: string,
    version: number,
    quantity: number,
    lineItemId: string
  ): void => {

    const errorMessage: IToastify = {
      error: 'An error occurred while updating cart.',
    };
    const successMessage: IToastify = {
      success: 'Your cart has been updated successfully!'
    };

    const updateData: MyCartUpdate = {
      version,
      actions: [
        { action: 'removeLineItem', lineItemId, quantity }
      ],
    };


    api.me()
      .carts()
      .withId({ ID: cartID })
      .post({ body: updateData })
      .execute()
      .then((data) => {

        setGlobalStore({ ...globalStore, cart: data.body });
        notify(successMessage);

      })
      .catch(() => {

        setError('An error occurred while updating cart.');
        notify(errorMessage);

      });
    
  
  };

  
  return { 
    error,
    Registration,
    Login,
    Logout,
    ChangePassword,
    getCustomer,
    UpdatePersonalInfo,
    GetAllProducts,
    GetProductById,
    GetAllCategories,
    FilterProducts,
    addAddresses,
    changeAddress,
    removeAddress,
    setDefaultAddress,
    createCart,
    getCart,
    deleteCart,
    addCartItem,
    removeCartItem
  };

};
