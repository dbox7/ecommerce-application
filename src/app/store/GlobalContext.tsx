import { createContext } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { anonUser } from '../utils/constants';
import { IGlobalStoreType } from '../utils/types';

export const defaultGlobalStore : IGlobalStoreType = {
  currentUser: anonUser,
  setCurrentUser: () => {},
  apiMeRoot: undefined,
  setApiMeRoot: () => {}
};   

// Дефолтным значением контекста будет массив из глобального хранилища и пустой функции
export const GlobalContext = createContext<[IGlobalStoreType, Dispatch<SetStateAction<IGlobalStoreType>>]>([defaultGlobalStore, () => {}]);