import { anonUser } from '../../utils/constants';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { Customer } from '@commercetools/platform-sdk';
import { IUserAction, UserActionsType } from '../types';

interface IGlobalStoreType {
  currentUser: Customer
  apiMeRoot?: ByProjectKeyRequestBuilder,
  loading: boolean
}

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
