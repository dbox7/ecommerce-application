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

    Api.root.me().signup()
      .post({body: payload as MyCustomerDraft})
      .execute()
      .then((data) => {

        Api.passwordRoot(payload.email, payload.password).me().get().execute().then((data) => {
          
          localStorage.currentUser = JSON.stringify(data.body);
          dispatch({type: UserActionsType.UPDATE_SUCCESS, payload: { user: data.body }});

        });
        if (data.body.cart) {

          Api.passwordRoot(payload.email, payload.password).me().activeCart().get().execute().then((data) => {

            localStorage.cart = JSON.stringify(data.body);
            dispatch({type: CartActionTypes.UPDATE_CART, payload: { cart: data.body}});

          });
        
        }

      
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

    Api.root.me().login().post({
      body: {email, password, activeCartSignInMode: 'MergeWithExistingCustomerCart'}
    })
      .execute()
      .then((data) => {


        Api.passwordRoot(email, password).me().get().execute().then((data) => {

          // Сохраняем в глобальном хранилище и localStorage профиль пользователя
          localStorage.currentUser = JSON.stringify(data.body);
          dispatch({type: UserActionsType.UPDATE_SUCCESS, payload: { user: data.body }});

        });

        if (data.body.cart) {

          Api.passwordRoot(email, password).me().activeCart().get().execute().then((data) => {

            localStorage.cart = JSON.stringify(data.body);
            dispatch({type: CartActionTypes.UPDATE_CART, payload: { cart: data.body}});

          });
        
        }
      
      }).catch((err) => {

        const error = (err.body.message === 'Customer account with the given credentials not found.') ? 
          'The user does not exist or the email/password is incorrect.'
          :
          'Something went wrong. Please try again later.';

        dispatch({type: UserActionsType.ERROR, payload: error});

      });

  };

  // ------------------------------------------------------------------------------------------------------------------ Logout
  const Logout = () => {

    delete localStorage.currentUser;
    delete localStorage.cart;
    delete localStorage.rToken;
    // Удаляем из кеша анонимного API-клиента, так как после логина/регистрации он протух
    Api.expireAnonClient();
    
    dispatch({type: UserActionsType.UPDATE_SUCCESS, payload: { user: anonUser}});
    dispatch({type: CartActionTypes.UPDATE_CART, payload: { cart: emptyCart}});

  };

  // ------------------------------------------------------------------------------------------------------------------ ChangePassword
  const ChangePassword = (email: string, updateData: IChangePassword): void => {

    Api.root
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

            const successMessage = 'Your password has been updated successfully!';

            dispatch({type: UserActionsType.UPDATE_SUCCESS, payload: { 
              user: data.body.customer, 
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

    Api.root.me()
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

    Api.root.customers()
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

    Api.root.productProjections().get({
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

    Api.root.productProjections()
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

    Api.root.categories().get().execute().then((data) => {

      dispatch({type: ProductActionsType.UPDATE_CATS, payload: data.body.results });

    }).catch(() => {
        
      const error = 'Something went wrong. Please try again later.';

      dispatch({type: ProductActionsType.ERROR_PRODS, payload: error});

    });

  };

  // ------------------------------------------------------------------------------------------------------------------ FilterProducts
  const FilterProducts = (queryArgs: IQueryArgs) => {

    Api.root.productProjections().search().get({
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


    Api.root.customers()
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

        Api.root.customers()
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

    Api.root.customers()
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


    Api.root.customers()
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


    Api.root.customers()
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

  const createCart = (draft: MyCartDraft): Promise<Cart> => {

    return Api.root
      .me()
      .carts()
      .post({ body: draft })
      .execute()
      .then(async (data) => {
        
        return await dispatch({type: CartActionTypes.UPDATE_CART, payload: { cart: data.body }}).payload.cart;
      
      }).catch(() => {

        const error = 'Something went wrong. Please try again later.';

        dispatch({type: CartActionTypes.ERROR_CART, payload: error});

      });
      
  };

  // ------------------------------------------------------------------------------------------------------------------ getCart
  const getCart = (cartID: string, callback?: Function): void => {

    Api.root.me()
      .carts()
      .withId({ ID: cartID })
      .get()
      .execute()
      .then((data) => {

        dispatch({type: CartActionTypes.UPDATE_CART, payload: { cart: data.body }});
        if (callback) callback(data);
      
      })
      .catch(() => {
      
        const error = 'You do not have a shopping cart yet, please add the product';
        
        dispatch({type: CartActionTypes.ERROR_CART, payload: error});

      });
    
  };

  // ------------------------------------------------------------------------------------------------------------------ deleteCart
  const deleteCart = (cartID: string, version: number): void => {

    Api.root.me()
      .carts()
      .withId({ ID: cartID })
      .delete({
        queryArgs: { version },
      })
      .execute()
      .then(() => {

        dispatch({type: CartActionTypes.UPDATE_CART, payload: { cart: emptyCart }});
      
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


    Api.root.me()
      .carts()
      .withId({ ID: cartID })
      .post({ body: updateData })
      .execute()
      .then((data) => {

        const successMessage ='Pruduct has been added to cart successfully!';

        localStorage.cart = JSON.stringify(data.body);

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
  ): void => {


    const updateData: MyCartUpdate = {
      version,
      actions: [
        { action: 'removeLineItem', lineItemId, quantity }
      ],
    };
 

    Api.root.me()
      .carts()
      .withId({ ID: cartID })
      .post({ body: updateData })
      .execute()
      .then((data) => {

        const successMessage =  'Your cart has been updated successfully!';
          
        localStorage.cart = JSON.stringify(data.body);

        dispatch({type: CartActionTypes.UPDATE_CART, payload: { cart: data.body, msg: successMessage }});

      })
      .catch(() => {

        const error ='An error occurred while updating cart.';
          
        dispatch({type: CartActionTypes.ERROR_CART, payload: error});

      });

  
  };

  // ------------------------------------------------------------------------------------------------------------------ addDiscount
  const addDiscount = (
    cartID: string,
    version: number,
    code: string
  ): Promise<Cart> => {


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
      .then(async (data) => {

        const successMessage =  'Your promo code has been successfully applied!';

        return await dispatch({type: CartActionTypes.UPDATE_CART, payload: { cart: data.body, msg: successMessage }});


      })
      .catch(() => {

        const error ='Error applying the promo code. Please try again.';

        dispatch({type: CartActionTypes.ERROR_CART, payload: error});


      });


  };
  // ------------------------------------------------------------------------------------------------------------------ changeLineItem
  const changeLineItem = (
    cartID: string,
    version: number,
    quantity: number,
    lineItemId: string
  ): Promise<Cart> => {


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
      .then(async (data) => {

        localStorage.cart = JSON.stringify(data.body);

        return await dispatch({type: CartActionTypes.UPDATE_CART, payload: { cart: data.body}});

      })
      .catch(() => {

        const error ='An error occurred while updating cart.';
          
        dispatch({type: CartActionTypes.ERROR_CART, payload: error});

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
