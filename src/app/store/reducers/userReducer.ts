import { anonUser } from '../../utils/constants';
import { IGlobalStoreType } from '../../utils/types';
import { IUserAction, UserActionsType } from '../types';

const InitialState : IGlobalStoreType = {
  currentUser: anonUser,
  apiMeRoot: undefined,
  loading: false,
  msg: { body: '', error: false }
};

export const userReducer = (state = InitialState, action: IUserAction): IGlobalStoreType => {

  switch (action.type) {

  case UserActionsType.PENDING: 
    return {
      currentUser: state.currentUser, 
      apiMeRoot: state.apiMeRoot,
      loading: true, 
      msg: { body: '', error: false }
    };

  case UserActionsType.UPDATE_SUCCESS: 
    const api = action.payload.api ? action.payload.api : state.apiMeRoot;

    return {
      currentUser: action.payload.user, 
      apiMeRoot: api, 
      loading: false, 
      msg: { body: action.payload.msg || '', error: false }
    };

  case UserActionsType.ERROR: 
    return {
      currentUser: state.currentUser, 
      apiMeRoot: state.apiMeRoot, 
      loading: false, 
      msg: { body: action.payload, error: true }
    };

  default:
    return state;

  }

};

export { UserActionsType };
