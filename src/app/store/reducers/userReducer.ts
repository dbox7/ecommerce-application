import { anonUser } from '../../utils/constants';
import { IGlobalStoreType } from '../../utils/types';
import { IUserAction, UserActionsType } from '../types';

const InitialState : IGlobalStoreType = {
  currentUser: localStorage.currentUser ? JSON.parse(localStorage.currentUser): anonUser,
  loading: false,
  msg: { body: '', error: false },
};

export const userReducer = (state = InitialState, action: IUserAction): IGlobalStoreType => {

  switch (action.type) {

  case UserActionsType.PENDING: 
    return {
      currentUser: state.currentUser, 
      loading: true, 
      msg: { body: '', error: false },
    };

  case UserActionsType.UPDATE_SUCCESS: 

    return {
      currentUser: action.payload.user, 
      loading: false, 
      msg: { body: action.payload.msg || '', error: false },
    };

  case UserActionsType.ERROR: 
    return {
      currentUser: state.currentUser, 
      loading: false, 
      msg: { body: action.payload, error: true },
    };

  default:
    return state;

  }

};

export { UserActionsType };
