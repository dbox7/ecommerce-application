import { Customer } from '@commercetools/platform-sdk';
import { ICountry, IValidationRules } from './types';

export const anonUser: Customer = {
  id: '',
  createdAt: '',
  lastModifiedAt: '',
  email: '',
  version: 0,
  addresses: [],
  isEmailVerified: false,
  authenticationMode: ''
};

export const COUNTRIES: ICountry[] = [
  {
    name: 'USA',
    code: 'US',
    postalCode: /(^\d{5}$)|(^\d{5}-\d{4}$)/,
  },
  {
    name: 'Canada',
    code: 'CN',
    postalCode: /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] ?[0-9][A-Z][0-9]$/
  },
  {
    name: 'United Kindom',
    code: 'UK',
    postalCode: /^(GIR|[A-Z]\d[A-Z\d]??|[A-Z]{2}\d[A-Z\d]??)[ ]??(\d[A-Z]{2})$/
  },
  {
    name: 'Australia',
    code: 'AU',
    postalCode: /^(0[289][0-9]{2})|([1345689][0-9]{3})|(2[0-8][0-9]{2})|(290[0-9])|(291[0-4])|(7[0-4][0-9]{2})|(7[8-9][0-9]{2})$/
  },
  {
    name: 'Germany',
    code: 'DE',
    postalCode: /\b((?:0[1-46-9]\d{3})|(?:[1-357-9]\d{4})|(?:[4][0-24-9]\d{3})|(?:[6][013-9]\d{3}))\b/
  }
];

export const RULES: IValidationRules = {
  email: {
    isNotEmpty: true,
    isEmailGood: false
  },
  password: {
    isNotEmpty: true,
    isPasswordGood: false,
    minLength: 8
  },
  date: {
    isNotEmpty: true,
    isDateGood: false
  },
  text: {
    isNotEmpty: true,
    isTextGood: false,
  },
  postalCode: {
    isNotEmpty: true,
    isPostalCodeGood: false,
  }
};
