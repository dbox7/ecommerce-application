import { anonUser, initialCart } from '../../utils/constants';
import { IGlobalStoreType } from '../../utils/types';
import { IUserAction, UserActionsType } from '../types';

const InitialState : IGlobalStoreType = {
  currentUser: localStorage.currentUser ? JSON.parse(localStorage.currentUser): anonUser,
  loading: false,
  msg: { body: '', error: false },
  cart: initialCart,
};

export const userReducer = (state = InitialState, action: IUserAction): IGlobalStoreType => {

  switch (action.type) {

  case UserActionsType.PENDING: 
    return {
      currentUser: state.currentUser, 
      loading: true, 
      msg: { body: '', error: false },
      cart: state.cart,
    };

  case UserActionsType.UPDATE_SUCCESS: 

    return {
      currentUser: action.payload.user, 
      loading: false, 
      msg: { body: action.payload.msg || '', error: false },
      cart: action.payload.cart,
    };

  case UserActionsType.ERROR: 
    return {
      currentUser: state.currentUser, 
      loading: false, 
      msg: { body: action.payload, error: true },
      cart: state.cart,
    };

  default:
    return state;

  }

};

export { UserActionsType };
