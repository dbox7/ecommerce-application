import { Api } from '../ctp';
import { 
  MyCustomerDraft, 
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
  IPayload, 
  IQueryArgs
} from '../utils/types';
import { anonUser, emptyCart } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { UserActionsType } from '../store/types';
import { ProductActionsType } from '../store/types';
import { CartActionTypes } from '../store/reducers/cartReducer';



export const useServerApi = () => {

  const dispatch: any = useDispatch();


  // ------------------------------------------------------------------------------------------------------------------ Registration
  const Registration = (payload: IPayload) => {

    return Api.root.me().signup()
      .post({body: payload as MyCustomerDraft})
      .execute()
      .then((data) => {

        Api.passwordRoot(payload.email, payload.password).me().get().execute().then((data) => {
          
          localStorage.currentUser = JSON.stringify(data.body);
          dispatch({type: UserActionsType.UPDATE_SUCCESS, payload: data.body});

        });
        if (data.body.cart) {

          Api.passwordRoot(payload.email, payload.password).me().activeCart().get().execute().then((data) => {

            localStorage.cart = JSON.stringify(data.body);
            dispatch({type: CartActionTypes.UPDATE_CART, payload: data.body});

          });
        
        }

        return ('success');
      
      })
      .catch((err) => {

        dispatch({type: UserActionsType.ERROR, payload: err.body.message});

        return (err.body.message);

      });
      
  };

  // ------------------------------------------------------------------------------------------------------------------ Login
  const Login = (email: string, password: string) => {

    return Api.root.me().login().post({
      body: {email, password, activeCartSignInMode: 'MergeWithExistingCustomerCart'}
    })
      .execute()
      .then((data) => {


        Api.passwordRoot(email, password).me().get().execute().then((data) => {

          // Сохраняем в глобальном хранилище и localStorage профиль пользователя
          localStorage.currentUser = JSON.stringify(data.body);
          dispatch({type: UserActionsType.UPDATE_SUCCESS, payload: data.body});

        });

        if (data.body.cart) {

          Api.passwordRoot(email, password).me().activeCart().get().execute().then((data) => {

            dispatch({type: CartActionTypes.UPDATE_CART, payload: data.body});

          });

        }

        return ('success');
      
      }).catch((err) => {

        dispatch({type: UserActionsType.ERROR, payload: err.body.message});

        return (err.body.message);

      });

  };

  // ------------------------------------------------------------------------------------------------------------------ Logout
  const Logout = () => {

    delete localStorage.currentUser;
    delete localStorage.rToken;
    // Удаляем из кеша анонимного API-клиента, так как после логина/регистрации он протух
    Api.expireAnonClient();
    
    dispatch({type: UserActionsType.UPDATE_SUCCESS, payload: anonUser});
    dispatch({type: CartActionTypes.UPDATE_CART, payload: emptyCart});

  };

  // ------------------------------------------------------------------------------------------------------------------ ChangePassword
  const ChangePassword = (email: string, updateData: IChangePassword) => {

    return Api.root
      .me()
      .password()
      .post({ body: updateData as CustomerChangePassword })
      .execute()
      .then(() => {
   
        const password: string = updateData.newPassword;

        Api.expireAnonClient();
        Api.passwordRoot(email, password).me().login().post({
          body: {email, password}
        })
          .execute()
          .then(data => {

            localStorage.currentUser = JSON.stringify(data.body);
            dispatch({type: UserActionsType.UPDATE_SUCCESS, payload: data.body.customer});
  
          });

        return ('success');
        
      })
      .catch((err) => {

        dispatch({type: UserActionsType.ERROR, payload: err.body.message});

        return ('error');
      
      });

  };

  // ------------------------------------------------------------------------------------------------------------------ getCustomer
  const getCustomer = () => {

    Api.root.me()
      .get()
      .execute()
      .then((data) => {

        localStorage.currentUser = JSON.stringify(data.body);
        dispatch({type: UserActionsType.UPDATE_SUCCESS, payload: data.body});
        
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
  ) => {

    const updateData: CustomerUpdate = {
      version,
      actions: [
        { action: 'changeEmail', email },
        { action: 'setFirstName', firstName },
        { action: 'setLastName', lastName },
        { action: 'setDateOfBirth', dateOfBirth },
      ],
    };

    return Api.root.customers()
      .withId({ ID: customerID })
      .post({ body: updateData })
      .execute()
      .then((data) => {
        
        localStorage.currentUser = JSON.stringify(data.body);
        dispatch({type: UserActionsType.UPDATE_SUCCESS, payload: data.body});

        return ('success');
      
      })
      .catch((err) => {

        dispatch({type: UserActionsType.ERROR, payload: err.body.message});

        return ('error');
      
      });
    
  };

  // ------------------------------------------------------------------------------------------------------------------ GetAllProducts
  const GetAllProducts = () => {

    Api.root.productProjections().get({
      queryArgs: {
        limit: 100
      }
    }).execute().then(data => {

      dispatch({type: ProductActionsType.UPDATE_PRODS, payload: data.body.results});

    }).catch((err) => {

      dispatch({type: ProductActionsType.ERROR_PRODS, payload: err.body.message});

      return ('error');

    });

  };

  // ------------------------------------------------------------------------------------------------------------------ GetProductById
  const GetProductById = (id: string, setProduct: Function) => {

    Api.root.productProjections()
      .withId({ID: id as string})
      .get().execute().then(res => {
        
        setProduct(res.body);
        
      }).catch((err) => {

        dispatch({type: ProductActionsType.ERROR_PRODS, payload: err.body.message}); 
        
        return ('error');
        
      });

  };

  // ------------------------------------------------------------------------------------------------------------------ GetAllCategories
  const GetAllCategories = () => {

    return Api.root.categories().get().execute().then((data) => {

      dispatch({type: ProductActionsType.UPDATE_CATS, payload: data.body.results});

      return ('success');

    }).catch((err) => {
      
      dispatch({type: ProductActionsType.ERROR_PRODS, payload: err.body.message});

      return ('error');

    });

  };

  // ------------------------------------------------------------------------------------------------------------------ FilterProducts
  const FilterProducts = (queryArgs: IQueryArgs) => {

    return Api.root.productProjections().search().get({
      queryArgs: queryArgs
    }).execute().then((data) => {
  
      return dispatch({type: ProductActionsType.UPDATE_PRODS, payload: data.body.results}).payload;
      
    });

  };

  // ------------------------------------------------------------------------------------------------------------------ AddAddresses
  const addAddresses = (
    customerID: string,
    version: number,
    address: IAddress,
    actionTypes: string[],
  ) => {
 
    const updateData: CustomerUpdate = {
      version,
      actions: [
        { action: 'addAddress', address }
      ]
    };


    return Api.root.customers()
      .withId({ ID: customerID })
      .post({ body: updateData })
      .execute()
      .then((data) => {

        localStorage.currentUser = JSON.stringify(data.body);
        dispatch({type: UserActionsType.UPDATE_SUCCESS, payload: data.body});

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

        Api.root.customers()
          .withId({ ID: customerID })
          .post({ body: updateData as CustomerUpdate})
          .execute()
          .then((data) => {

            localStorage.currentUser = JSON.stringify(data.body);
            dispatch({type: UserActionsType.UPDATE_SUCCESS, payload: data.body});
      
          })
          .catch((err) => {

            dispatch({type: UserActionsType.ERROR, payload: err.body.message});
        
          });

        return ('success');
      
      })
      .catch((err) => {

        dispatch({type: UserActionsType.ERROR, payload: err.body.message});

        return ('error');

      });
    
  
  };

  // ------------------------------------------------------------------------------------------------------------------ ChangeAddress
  const changeAddress = (
    customerID: string,
    version: number,
    address: IAddress,
    addressId: string,
    actionTypes: string[],
  ) => {

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

    return Api.root.customers()
      .withId({ ID: customerID })
      .post({ body: updateData as CustomerUpdate })
      .execute()
      .then((data) => {

        localStorage.currentUser = JSON.stringify(data.body);
        dispatch({type: UserActionsType.UPDATE_SUCCESS, payload: data.body});

        return ('success');

      })
      .catch((err) => {

        dispatch({type: UserActionsType.ERROR, payload: err.body.message});

        return ('error');
        
      });
    
  };

  // ------------------------------------------------------------------------------------------------------------------ RemoveAddress
  const removeAddress = (
    customerID: string,
    version: number,
    addressId: string,
  ) => {

    const updateData: CustomerUpdate = {
      version,
      actions: [
        { action: 'removeAddress', addressId }
      ]
    };


    return Api.root.customers()
      .withId({ ID: customerID })
      .post({ body: updateData })
      .execute()
      .then((data) => {

        localStorage.currentUser = JSON.stringify(data.body);
        dispatch({type: UserActionsType.UPDATE_SUCCESS, payload: data.body});

        return ('success');
      
      })
      .catch((err) => {

        dispatch({type: UserActionsType.ERROR, payload: err.body.message});

        return ('error');
        
      });
    
  
  };

  // ------------------------------------------------------------------------------------------------------------------ SetDefaultAddress
  const setDefaultAddress = (
    customerID: string,
    version: number,
    addressId: string,
    actionTypes: string[],
  ) => {
    
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


    return Api.root.customers()
      .withId({ ID: customerID })
      .post({ body: updateData as CustomerUpdate })
      .execute()
      .then((data) => {
        
        localStorage.currentUser = JSON.stringify(data.body);
        dispatch({type: UserActionsType.UPDATE_SUCCESS, payload: data.body});

        return ('success');
      
      })
      .catch((err) => {

        dispatch({type: UserActionsType.ERROR, payload: err.body.message});

        return ('error');
        
      });
  
  };

  // ------------------------------------------------------------------------------------------------------------------ createCart

  const createCart = (draft: MyCartDraft): Promise<Cart> => {

    return Api.root
      .me()
      .carts()
      .post({ body: draft })
      .execute()
      .then(async (data) => {
        
        return dispatch({type: CartActionTypes.UPDATE_CART, payload: data.body}).payload;
      
      }).catch((err) => {

        dispatch({type: CartActionTypes.ERROR_CART, payload: err.body.message});

        return ('error');

      });
      
  };

  // ------------------------------------------------------------------------------------------------------------------ getCart
  const getCart = (cartID: string, userID:string, callback?: Function) => {

    if (!userID) {

      return Api.root.me()
        .carts()
        .withId({ID: cartID})
        .get()
        .execute()
        .then((data) => {

          dispatch({type: CartActionTypes.UPDATE_CART, payload: data.body});
          if (callback) callback(data);

          return ('success');
       
        })
        .catch((err) => {
        
          dispatch({type: CartActionTypes.ERROR_CART, payload: err.body.message});

          return ('error');

        });
    
    } else {

      return Api.root.me()
        .activeCart()
        .get()
        .execute()
        .then((data) => {

          dispatch({type: CartActionTypes.UPDATE_CART, payload: data.body});
          if (callback) callback(data);

          return ('success');
       
        })
        .catch((err) => {
        
          dispatch({type: CartActionTypes.ERROR_CART, payload: err.body.message});

          return ('error');

        });
    
    }
    
  };

  // ------------------------------------------------------------------------------------------------------------------ deleteCart
  const deleteCart = (cartID: string, version: number) => {

    return Api.root.me()
      .carts()
      .withId({ ID: cartID })
      .delete({
        queryArgs: { version },
      })
      .execute()
      .then(() => {
        
        dispatch({type: CartActionTypes.UPDATE_CART, payload: emptyCart});
        return ('success');
      
      })
      .catch((err) => {

        dispatch({type: CartActionTypes.ERROR_CART, payload: err.body.message});

        return ('error');

      });
  
  };

  // ------------------------------------------------------------------------------------------------------------------ addCartItem
  const addCartItem = (
    cartID: string,
    version: number,
    quantity: number,
    variantId: number,
    productId: string,
  ): Promise<string> => {

    const updateData: MyCartUpdate = {
      version,
      actions: [
        { action: 'addLineItem', productId, variantId, quantity }
      ],
    };

    return Api.root.me()
      .carts()
      .withId({ ID: cartID })
      .post({ body: updateData })
      .execute()
      .then((data) => {

        dispatch({type: CartActionTypes.UPDATE_CART, payload: data.body});

        return ('success');

      })
      .catch((err) => {

        dispatch({type: CartActionTypes.ERROR_CART, payload: err.body.message});

        return ('error');

      });
    
  
  };

  // ------------------------------------------------------------------------------------------------------------------ removeCartItem
  const removeCartItem = (
    cartID: string,
    version: number,
    quantity: number,
    lineItemId: string
  ) => {

    const updateData: MyCartUpdate = {
      version,
      actions: [
        { action: 'removeLineItem', lineItemId, quantity }
      ],
    };
 
    return Api.root.me()
      .carts()
      .withId({ ID: cartID })
      .post({ body: updateData })
      .execute()
      .then((data) => {

        dispatch({type: CartActionTypes.UPDATE_CART, payload: data.body});

        return ('success');

      })
      .catch((err) => {
          
        dispatch({type: CartActionTypes.ERROR_CART, payload: err.body.message});

        return ('error');

      });
  
  };

  // ------------------------------------------------------------------------------------------------------------------ addDiscount
  const addDiscount = (
    cartID: string,
    version: number,
    code: string
  ): Promise<string> => {

    const updateDiscount: MyCartUpdate = {
      version,
      actions: [
        { action: 'addDiscountCode', code}
      ],
    };
 
    return Api.root.me()
      .carts()
      .withId({ ID: cartID })
      .post({ body: updateDiscount })
      .execute()
      .then((data) => {

        dispatch({type: CartActionTypes.UPDATE_CART, payload: data.body});

        return ('success');

      })
      .catch((err) => {
        
        dispatch({type: CartActionTypes.ERROR_CART, payload: err.body.message});

        return ('error');

      });

  };

  // ------------------------------------------------------------------------------------------------------------------ changeLineItem
  const changeLineItem = (
    cartID: string,
    version: number,
    quantity: number,
    lineItemId: string
  ) => {

    const updateData: MyCartUpdate = {
      version,
      actions: [
        { action: 'changeLineItemQuantity', lineItemId, quantity }
      ],
    };
 
    return Api.root.me()
      .carts()
      .withId({ ID: cartID })
      .post({ body: updateData })
      .execute()
      .then((data) => {

        dispatch({type: CartActionTypes.UPDATE_CART, payload: data.body});

        return ('success');

      })
      .catch((err) => {
          
        dispatch({type: CartActionTypes.ERROR_CART, payload: err.body.message});

        return ('error');

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
    removeCartItem,
    addDiscount,
    changeLineItem
  };

};
