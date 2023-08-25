import { Customer } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from 
  '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

export interface IAddress {
  streetName: string,
  city: string,
  postalCode: string,
  country: string
}
export interface IButtonProps {
  value: string,
  type: 'button' | 'submit' | 'reset',
  clickHandler?: React.MouseEventHandler,
  disabled?: boolean,
  extraClass?: string
}

export interface ICheckboxProps {
  title: string
  checked: boolean,
  changeHandler: React.ChangeEventHandler
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
  changeHandler: React.ChangeEventHandler;
  blurHandler: React.FocusEventHandler;
  activeState: boolean;
  valid: Partial<IValidation>;
}

export interface IPayload {
  email: string,
  password: string, 
  firstName: string, 
  lastName: string, 
  dateOfBirth: string,
  addresses: IAddress[],
  shippingAddress: number[],
  defaultShippingAddress: number | undefined,
  billingAddress: number[],
  defaultBillingAddress: number | undefined
}

export type IPostalCodeProps = IInputProps & {
  country: string
}

export type ITextDateInputProps = IInputProps & {
  title: string
  data?: ICountry[] | null;
  isDate?: boolean;
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