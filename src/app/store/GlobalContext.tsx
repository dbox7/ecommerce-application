import { createContext } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { anonUser } from '../utils/constants';
import { IGlobalStoreType } from '../utils/types';

export const defaultGlobalStore : IGlobalStoreType = {
  currentUser: anonUser,
  apiMeRoot: undefined,
};

export const GlobalContext = createContext<[IGlobalStoreType, Dispatch<SetStateAction<IGlobalStoreType>>]>([defaultGlobalStore, () => {}]);