import { Customer } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { ChangeEventHandler } from 'react';

export interface IButtonProps {
  value: string,
  clickHandler?: React.MouseEventHandler,
  type: 'button' | 'submit' | 'reset',
  disabled?: boolean,
}

export interface ICountry {
  name: string,
  code: string,
  postalCode: RegExp
}

export interface IGlobalStoreType {
  currentUser: Customer,
  apiMeRoot?: ByProjectKeyRequestBuilder,
}

export interface IInputProps {
  value: string;
  changeHandler: ChangeEventHandler<HTMLInputElement>;
  blurHandler: React.FocusEventHandler;
  activeState: boolean;
  valid: Partial<IValidation>;
  className?: string;
}

export interface IValidation {
  isNotEmpty: boolean;
  isEmailGood?: boolean;
  isPasswordGood?: boolean;
  isDateGood?: boolean;
  isTextGood?: boolean;
  isMinLength?: boolean;
  isPostalCodeGood?: boolean;
  minLength?: number;
}

export interface IValidationRules {
  [index: string]: IValidation
}

export interface IAddress {
  id: string;
  streetName: string;
  postalCode: string;
  city: string;
  country: string;
}

export interface IAdressProps {
  addresses: IAddress[];
  shippingAddressIds: string[];
  billingAddressIds: string[];
  defaultBillingAddressIds: string | undefined;
  defaultShippingAddressIds: string | undefined;
}