import { createContext } from 'react';
import { Customer } from '@commercetools/platform-sdk';
import { Dispatch, SetStateAction } from 'react';
import { anonUser } from '../../utils/constants';

export const UserContext = createContext<[Customer, Dispatch<SetStateAction<Customer>>]>([anonUser, () => {}]);