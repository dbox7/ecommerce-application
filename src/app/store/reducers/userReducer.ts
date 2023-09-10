import { anonUser } from '../../utils/constants';
import { IGlobalStoreType } from '../../utils/types';

const InitialState : IGlobalStoreType = {
  currentUser: anonUser,
  apiMeRoot: undefined,
  loading: false,
  error: ''
};

export enum UserActionsType {
  LOGIN = 'LOGIN',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_ERROR = 'LOGIN_ERROR'
}

interface ILoginAction {
  type: UserActionsType.LOGIN
}

interface ILoginSuccesAction {
  type: UserActionsType.LOGIN_SUCCESS
  payload: any
}

interface ILoginErrorAction {
  type: UserActionsType.LOGIN_ERROR
  payload: string
}

export type IUserAction = ILoginAction | ILoginSuccesAction | ILoginErrorAction;

export const userReducer = (state = InitialState, action: IUserAction): IGlobalStoreType => {

  switch (action.type) {

  case UserActionsType.LOGIN: 
    return {
      currentUser: anonUser, 
      apiMeRoot: undefined, 
      loading: true, 
      error: ''
    };

  case UserActionsType.LOGIN_SUCCESS: 
    return {
      currentUser: action.payload.currentUser, 
      apiMeRoot: action.payload.apiMeRoot, 
      loading: false, 
      error: ''
    };

  case UserActionsType.LOGIN_ERROR: 
    return {currentUser: anonUser, apiMeRoot: undefined, loading: true, error: ''};

  default:
    return state;

  }

};