import { anonUser } from '../../utils/constants';
import { IGlobalStoreType } from '../../utils/types';
import { IUserAction, UserActionsType } from '../types';

const InitialState : IGlobalStoreType = {
  currentUser: localStorage.currentUser ? JSON.parse(localStorage.currentUser): anonUser,
  loading: false,
};

export const userReducer = (state = InitialState, action: IUserAction): IGlobalStoreType => {

  switch (action.type) {

  case UserActionsType.PENDING: 
    return {
      currentUser: state.currentUser, 
      loading: true
    };

  case UserActionsType.UPDATE_SUCCESS: 

    return {
      currentUser: action.payload, 
      loading: false
    };

  case UserActionsType.ERROR: 
    return {
      currentUser: state.currentUser, 
      loading: false
    };

  default:
    return state;

  }

};

export { UserActionsType };
