import { anonUser } from '../../utils/constants';
import { IGlobalStoreType } from '../../utils/types';

const InitialState : IGlobalStoreType = {
  currentUser: anonUser,
  apiMeRoot: undefined,
  loading: false,
  msg: { body: '', error: false }
};

export enum UserActionsType {
  PENDING = 'PENDING',
  UPDATE_SUCCESS = 'UPDATE_SUCCESS',
  ERROR = 'ERROR'
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