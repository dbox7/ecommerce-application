import { PROJECT_KEY, apiAnonRoot, createUserApiClient } from '../ctp';
import { 
  MyCustomerDraft, 
  createApiBuilderFromCtpClient,
  CustomerChangePassword, 
  CustomerUpdate,
  MyCartDraft,
  MyCartUpdate,
  Cart,
} from '@commercetools/platform-sdk';
import { 
  IAction,
  IAddress,
  IChangePassword, 
  IGlobalStoreType, 
  IPayload, 
  IQueryArgs
} from '../utils/types';
import { anonUser, initialCart } from '../utils/constants';
import { createAnonApiClient } from '../ctp';
import { useDispatch } from 'react-redux';
import { UserActionsType } from '../store/types';
import { ProductActionsType } from '../store/types';
import { useTypedSelector } from '../store/hooks/useTypedSelector';
import { CartActionTypes } from '../store/reducers/cartReducer';

const GetApi = (userState: IGlobalStoreType) => {

  let api;

  if (userState.currentUser.id && userState.apiMeRoot) {

    api = userState.apiMeRoot;
  
  } else {
  
    api = apiAnonRoot;
  
  }

  return api;
  
}; 

export const useServerApi = () => {

  const dispatch: any = useDispatch();

  const userState = useTypedSelector(state => state.user);
  const api = GetApi(userState);

  // ------------------------------------------------------------------------------------------------------------------ Registration
  const Registration = (payload: IPayload) => {

    apiAnonRoot.me().signup()
      .post({body: payload as MyCustomerDraft})
      .execute()
      .then((data) => {

        const ctpMeClient = createUserApiClient(payload.email, payload.password);
        const apiMeRoot = createApiBuilderFromCtpClient(ctpMeClient).withProjectKey({ projectKey: PROJECT_KEY});

        dispatch({type: UserActionsType.UPDATE_SUCCESS, payload: { user: data.body.customer, api: apiMeRoot }});
      
      })
      .catch((err) => {
        
        const error = (err.body.message === 'There is already an existing customer with the provided email.') ?
          'An account with this email already exists.'
          :
          'Something went wrong. Please try again later.';

        dispatch({type: UserActionsType.ERROR, payload: { body: error, error: true }});

      });
      
  };

  // ------------------------------------------------------------------------------------------------------------------ Login
  const Login = (email: string, password: string) => {

    const ctpMeClient = createUserApiClient(email, password);
    const apiMeRoot = createApiBuilderFromCtpClient(ctpMeClient).withProjectKey({ projectKey: PROJECT_KEY});
    
    
    apiMeRoot.me().login().post({
      body: {email, password, activeCartSignInMode: 'MergeWithExistingCustomerCart'} })
      .execute()
      .then(data => {

        dispatch({type: UserActionsType.UPDATE_SUCCESS, payload: { user: data.body.customer, api: apiMeRoot }});
        
      }).catch(err => {
          
        const error = (err.body.message === 'Customer account with the given credentials not found.') ? 
          'The user does not exist or the email/password is incorrect.'
          :
          'Something went wrong. Please try again later.';

        dispatch({type: UserActionsType.ERROR, payload: error});
        
      });

  };

  // ------------------------------------------------------------------------------------------------------------------ Logout
  const Logout = () => {

    createAnonApiClient();
    dispatch({type: UserActionsType.UPDATE_SUCCESS, payload: { user: anonUser, api: apiAnonRoot, cart: initialCart }});

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
      
            const successMessage = 'Your password has been updated successfully!';

            dispatch({type: UserActionsType.UPDATE_SUCCESS, payload: { 
              user: data.body.customer, 
              api: apiMeRoot, 
              msg: successMessage
            }});

          });
        
      })
      .catch(() => {

        const error = 'An error occurred while updating password.';

        dispatch({type: UserActionsType.ERROR, payload: error});
      
      });

  };

  // ------------------------------------------------------------------------------------------------------------------ getCustomer
  const getCustomer = () => {

    api.me()
      .get()
      .execute()
      .then((data) => {

        dispatch({type: UserActionsType.UPDATE_SUCCESS, payload: {user: data.body}});
        
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

        const successMessage = 'Your personal information has been updated successfully!';

        dispatch({type: UserActionsType.UPDATE_SUCCESS, payload: { user: data.body, msg: successMessage }});
      
      })
      .catch(() => {

        const error = 'An error occurred while updating personal information.';

        dispatch({type: UserActionsType.ERROR, payload: error});
      
      });
    
  };

  // ------------------------------------------------------------------------------------------------------------------ GetAllProducts
  const GetAllProducts = () => {

    api?.productProjections().get({
      queryArgs: {
        limit: 100
      }
    }).execute().then(data => {

      dispatch({type: ProductActionsType.UPDATE_PRODS, payload: { prods: data.body.results }});

    }).catch(() => {
        
      const error = 'Something went wrong. Please try again later.';

      dispatch({type: ProductActionsType.ERROR_PRODS, payload: error});

    });

  };

  // ------------------------------------------------------------------------------------------------------------------ GetProductById
  const GetProductById = (id: string, setProduct: Function) => {

    api?.productProjections()
      .withId({ID: id as string})
      .get().execute().then(res => {
        
        setProduct(res.body);
        
      }).catch(() => {
        
        const error = 'Something went wrong. Please try again later.';

        dispatch({type: ProductActionsType.ERROR_PRODS, payload: error});       
        
      });

  };

  // ------------------------------------------------------------------------------------------------------------------ GetAllCategories
  const GetAllCategories = () => {

    api?.categories().get().execute().then((data) => {

      dispatch({type: ProductActionsType.UPDATE_CATS, payload: data.body.results });

    }).catch(() => {
        
      const error = 'Something went wrong. Please try again later.';

      dispatch({type: ProductActionsType.ERROR_PRODS, payload: error});

    });

  };

  // ------------------------------------------------------------------------------------------------------------------ FilterProducts
  const FilterProducts = (queryArgs: IQueryArgs) => {

    api.productProjections().search().get({
      queryArgs: queryArgs
    }).execute().then((data) => {
  
      dispatch({type: ProductActionsType.UPDATE_PRODS, payload: { prods: data.body.results }});
      
    });

  };

  // ------------------------------------------------------------------------------------------------------------------ AddAddresses
  const addAddresses = (
    customerID: string,
    version: number,
    address: IAddress,
    actionTypes: string[],
  ): void => {
 
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

        dispatch({type: UserActionsType.UPDATE_SUCCESS, payload: { user: data.body }});

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

            const successMessage = 'Your addresses has been added successfully!';

            dispatch({type: UserActionsType.UPDATE_SUCCESS, payload: { user: data.body, msg: successMessage }});
      
          })
          .catch(() => {

            const error = 'An error occurred while updating address.';

            dispatch({type: UserActionsType.ERROR, payload: error});
        
          });
      
      })
      .catch(() => {

        const error = 'An error occurred while updating address.';

        dispatch({type: UserActionsType.ERROR, payload: error});

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

        const successMessage = 'Your addresses has been updated successfully!';

        dispatch({type: UserActionsType.UPDATE_SUCCESS, payload: { user: data.body, msg: successMessage }});

      })
      .catch(() => {

        const error = 'An error occurred while updating address.';

        dispatch({type: UserActionsType.ERROR, payload: error});
        
      });
    
  };

  // ------------------------------------------------------------------------------------------------------------------ RemoveAddress
  const removeAddress = (
    customerID: string,
    version: number,
    addressId: string,
  ): void => {

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

        const successMessage = 'Your addresses has been updated successfully!';

        dispatch({type: UserActionsType.UPDATE_SUCCESS, payload: { user: data.body, msg: successMessage }});
      
      })
      .catch(() => {

        const error = 'An error occurred while updating address.';

        dispatch({type: UserActionsType.ERROR, payload: error});
        
      });
    
  
  };

  // ------------------------------------------------------------------------------------------------------------------ SetDefaultAddress
  const setDefaultAddress = (
    customerID: string,
    version: number,
    addressId: string,
    actionTypes: string[],
  ): void => {
    
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

        const successMessage = 'Your addresses has been updated successfully!';

        dispatch({type: UserActionsType.UPDATE_SUCCESS, payload: { user: data.body, msg: successMessage }});
      
      })
      .catch(() => {

        const error = 'An error occurred while updating address.';

        dispatch({type: UserActionsType.ERROR, payload: error});
        
      });
  
  };

  // ------------------------------------------------------------------------------------------------------------------ createCart

  const createCart = (draft: MyCartDraft): void => {

    api
      .me()
      .carts()
      .post({ body: draft })
      .execute()
      .then((data) => {
        
        dispatch({type: CartActionTypes.UPDATE_CART, payload: { cart: data.body }});
      
      }).catch(() => {

        const error = 'Something went wrong. Please try again later.';

        dispatch({type: CartActionTypes.ERROR_CART, payload: error});
      
      });
      
  };

  // ------------------------------------------------------------------------------------------------------------------ getCart
  const getCart = (cartID: string): void => {

    api.me()
      .carts()
      .withId({ ID: cartID })
      .get()
      .execute()
      .then((data) => {

        dispatch({type: CartActionTypes.UPDATE_CART, payload: { cart: data.body }});
      
      })
      .catch(() => {
      
        const error = 'You do not have a shopping cart yet, please add the product';
        
        dispatch({type: CartActionTypes.ERROR_CART, payload: error});

      });
    
  };

  // ------------------------------------------------------------------------------------------------------------------ deleteCart
  const deleteCart = (cartID: string, version: number): void => {

    api.me()
      .carts()
      .withId({ ID: cartID })
      .delete({
        queryArgs: { version },
      })
      .execute()
      .then(() => {

        dispatch({type: CartActionTypes.UPDATE_CART, payload: { cart: null }});
      
      })
      .catch(() => {
      
        const error = 'Something went wrong. Please try again later.';

        dispatch({type: CartActionTypes.ERROR_CART, payload: error});

      });
  
  };

  // ------------------------------------------------------------------------------------------------------------------ addCartItem
  const addCartItem = (
    cartID: string,
    version: number,
    quantity: number,
    variantId: number,
    productId: string,
  ): void => {


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

        const successMessage ='Pruduct has been added to cart successfully!';

        dispatch({type: CartActionTypes.UPDATE_CART, payload: { cart: data.body, msg: successMessage }});

      })
      .catch(() => {

        const error = 'An error occurred while adding item to cart.';

        dispatch({type: CartActionTypes.ERROR_CART, payload: error});

      });
    
  
  };

  // ------------------------------------------------------------------------------------------------------------------ removeCartItem
  const removeCartItem = (
    cartID: string,
    version: number,
    quantity: number,
    lineItemId: string
  ): Promise<Cart> => {


    const updateData: MyCartUpdate = {
      version,
      actions: [
        { action: 'removeLineItem', lineItemId, quantity }
      ],
    };
 
    return new Promise<Cart> ((resolve, reject) => {

      api.me()
        .carts()
        .withId({ ID: cartID })
        .post({ body: updateData })
        .execute()
        .then((data) => {

          const successMessage =  'Your cart has been updated successfully!';

          dispatch({type: CartActionTypes.UPDATE_CART, payload: { cart: data.body, msg: successMessage }});

          resolve(data.body);

        })
        .catch(() => {

          const error ='An error occurred while updating cart.';
          
          dispatch({type: CartActionTypes.ERROR_CART, payload: error});
          reject(error);

        });
    
    });
  
  };

  
  return { 
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
