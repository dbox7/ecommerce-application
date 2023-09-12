import { createContext } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { anonUser, initialCart } from '../utils/constants';
import { IGlobalStoreType } from '../utils/types';

export const defaultGlobalStore : IGlobalStoreType = {
  currentUser: anonUser,
  apiMeRoot: undefined,
  cart: initialCart,
};

export const GlobalContext = createContext<[IGlobalStoreType, Dispatch<SetStateAction<IGlobalStoreType>>]>([defaultGlobalStore, () => {}]);