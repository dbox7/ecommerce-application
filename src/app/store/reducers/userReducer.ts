import { anonUser } from '../../utils/constants';
import { IGlobalStoreType } from '../../utils/types';

const InitialState : IGlobalStoreType = {
  currentUser: anonUser,
  apiMeRoot: undefined,
  loading: false,
  error: ''
};

export enum UserActionsType {
  PENDING = 'PENDING',
  UPDATE_SUCCESS = 'UPDATE_SUCCESS',
  ERROR = 'ERROR',
  LOGOUT = 'LOGOUT'
}

interface IPendingAction {
  type: UserActionsType.PENDING
}

interface IUpdateSuccesAction {
  type: UserActionsType.UPDATE_SUCCESS
  payload: any
}

interface IErrorAction {
  type: UserActionsType.ERROR
  payload: string
}

export type IUserAction = IPendingAction | IUpdateSuccesAction | IErrorAction ;

export const userReducer = (state = InitialState, action: IUserAction): IGlobalStoreType => {

  switch (action.type) {

  case UserActionsType.PENDING: 
    return {
      currentUser: state.currentUser, 
      apiMeRoot: state.apiMeRoot,
      loading: true, 
      error: ''
    };

  case UserActionsType.UPDATE_SUCCESS: 
    const api = action.payload.api ? action.payload.api : state.apiMeRoot;

    return {
      currentUser: action.payload.user, 
      apiMeRoot: api, 
      loading: false, 
      error: ''
    };

  case UserActionsType.ERROR: 
    return {
      currentUser: state.currentUser, 
      apiMeRoot: state.apiMeRoot, 
      loading: false, 
      error: action.payload
    };

  default:
    return state;

  }

};

// export const userActionCreator = (payload: any) => {}