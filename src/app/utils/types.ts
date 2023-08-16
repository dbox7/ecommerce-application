import { Dispatch, SetStateAction } from 'react';
import { Customer } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

export interface IButtonProps {
  value: string,
  clickHandler?: React.MouseEventHandler,
  type: 'button' | 'submit' | 'reset',
  disabled?: boolean,
}

export interface IGlobalStoreType {
  currentUser: Customer,
  setCurrentUser: Dispatch<SetStateAction<Customer>>,
  apiMeRoot?: ByProjectKeyRequestBuilder,
  setApiMeRoot: Dispatch<SetStateAction<Customer>>
}

export interface IInputProps {
  value: string;
  changeHandler: React.ChangeEventHandler;
  blurHandler: React.FocusEventHandler;
  activeState: boolean;
  valid: IValidation;
}

export interface IValidation {
  isEmpty: boolean;
  isEmailGood?: boolean;
  isPasswordGood?: boolean;
  isDateGood?: boolean;
  isTextGood?: boolean;
  isMinLength?: boolean;
  isPostalCodeGood?: boolean;
  minLength?: number;
}

export interface ICountry {
  name: string,
  code: string,
  postalCode: RegExp
}