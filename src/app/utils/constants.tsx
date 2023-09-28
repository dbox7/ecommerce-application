import { Cart, Customer } from '@commercetools/platform-sdk';
import { ICountry, IDeveloper, IValidationRules } from './types';

import { CiFacebook, CiInstagram, CiYoutube } from 'react-icons/ci';

import dbox7Photo from '../assets/team/dbox7.jpeg';
import xu69uxPhoto from '../assets/team/xu69ux.jpeg';
import GEKKOPhoto from '../assets/team/GEKKO-ops.jpeg';


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

export const emptyCart: Cart = {
  id: '',
  version: 0,
  lineItems: [],
  customLineItems: [],
  totalPrice: {
    type: 'centPrecision',
    currencyCode: '',
    centAmount: 0,
    fractionDigits: 0
  },
  taxMode: '',
  taxRoundingMode: '',
  taxCalculationMode: '',
  inventoryMode: '',
  cartState: '',
  shippingMode: '',
  shipping: [],
  itemShippingAddresses: [],
  discountCodes: [],
  directDiscounts: [],
  refusedGifts: [],
  origin: '',
  createdAt: '',
  lastModifiedAt: ''
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

export const developers: IDeveloper[] = [

  { name: 'Dmitry Korobka', 
    role: 'Team lead and design', 
    photo: dbox7Photo, 
    bio: 'I am actively developing as a front-end engineer. I have good experience writing code in JavaScript and TypeScrpt. I have an understanding of the language features, which allows me to write fairly high-quality code. Several pet projects have been implemented and presented on GitHub.',
    telegram: 'https://t.me/dbox7', 
    github: 'https://github.com/dbox7', 
    email: 'mailto:dbox.insight@gmail.com'
  },

  { name: 'Kseniya Spiridonova',
    role: 'Front-end developer and prompt engineer',
    photo: xu69uxPhoto,
    bio: 'I\'m a  novice front-end developer. I have some experience with generative adversarial neural networks and a strong affinity for large language models, which you can see here. Working as a part of the team on this project has brought me a lot of joy, my other projects are available on GitHub.',
    telegram: 'https://t.me/xu69ux',
    github: 'https://github.com/xu69ux',
    email: 'mailto:spiridonova.kseniya@gmail.com'
  },

  { name: 'Artem Mykoliuk',
    role: 'Front-end developer and API engineer',
    photo: GEKKOPhoto,
    bio: 'I\'m a budding front-end developer with a passion for crafting digital experiences. My journey into the world of web development started with a fascination for coding and a thirst for creativity. I find immense joy in being part of projects, collaborating with teams, and turning ideas into functional websites.',
    telegram: 'https://t.me/GEKKO33',
    github: 'https://github.com/GEKKO-ops',
    email: 'mailto:artem@mikolyuk.com'
  },
  
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

export const MS_IN_YEAR = 31536000000;
export const EmailREGEXP = /^\S+@\S+\.\S+$/;
export const PasswordREGEXP = /^(?!\s)(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}(?<!\s)$/;
export const TextREGEXP = /^[a-zA-Z ]+$/;

export const validError = {
  empty: 'Not be an empty',
  pwdLength: 'At least 8 characters',
  age: 'You too young',
  num: 'Out range',
  email: 'Please, enter a valid email',
  password: 'Please, enter a correct password',
  postalCode: 'Please, enter a valid postal code',
  text: 'Please, don\'t use nums or spec chars'
};

export const inputsInfo = {
  email: 'A properly formatted email address (e.g., example@email.com)',
  password: 'Minimum 8 characters, at least 1 uppercase letter,' +
  '1 lowercase letter, 1 number and 1 special character. No whitespaces, please.',
  text: 'Must contain at least one character and no special characters or numbers',
  date: 'A valid date input ensuring the user is above a certain age (e.g., 14 years old or older)',
  street: 'Must contain at least one character',
  postalCode: 'Must follow the format for the country (e.g., 12345 or A1B 2C3 for the U.S. and Canada, respectively)',
};

export const ALL_SIZES = ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '11', '12'];


export const TRANSITION_DURATION = 300;

export const GOOGLE_MAP = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26311.21492459712!2d-113.35652599634557!3d34.48001367189503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d2f79d6df2a0d7%3A0x3a207c1735cf3190!2zTm90aGluZywg0JDRgNC40LfQvtC90LAgODUzNjAsINCh0KjQkA!5e0!3m2!1sru!2skg!4v1694368598079!5m2!1sru!2skg';

export const DISCOUNTS: {[key: string] : string} = {
  'BIGORDERDEAL': '83622c46-3820-40db-89d6-d3015cb4a0c9',
  'SPRINT25': '069162aa-d848-4f1d-ae82-f531a8c4b0cc',
};

export const msg = {
  COMMON_ERROR: { body: 'Something went wrong. Please try again later.', error: true },
  REG_ALREADY_EXIST: { body: 'An account with this email already exists.', error: true },
  LOGIN_USER_NOT_FOUND: { body: 'The user does not exist or the email/password is incorrect.', error: true },
  PASSWORD_CHANGE_SUCCESS: { body: 'Your password has been updated successfully!', error: false },
  PASSWORD_CHANGE_ERROR: { body: 'An error occurred while updating password.', error: true },
  PERSONAL_INFO_CHANGE_SUCCESS: { body: 'Your personal information has been updated successfully!', error: false },
  PERSONAL_INFO_CHANGE_ERROR: { body: 'An error occurred while updating personal information.', error: true },
  ADDRESS_UPDATE_SUCCESS: { body: 'Your addresses has been update successfully!', error: false },
  ADDRESS_UPDATE_ERROR: { body: 'An error occurred while updating address.', error: true },
  PRODUCT_ADD_SUCCESS: { body: 'Your product added in cart successfully!', error: false },
  PRODUCT_ADD_ERROR: { body: 'An error occurred while addition product in cart.', error: true },
  PRODUCT_REMOVE_SUCCESS: { body: 'Your product removed from cart successfully!', error: false },
  PRODUCT_REMOVE_ERROR: { body: 'An error occurred while removing product from cart.', error: true },
  CLEAR_EMPTY_CART: { body: 'Your cart is quite empty!', error: true },
  DISCOUNT_INPUT_EMPTY: { body: 'Please enter discount code!', error: true },
  DISCOUNT_CART_EMPTY: { body: 'You can not apply discount code for empty cart!', error: true },
  DISCOUNT_ADD_SUCCESS: { body: 'Your discount code has been applied successfully!', error: false },
  DISCOUNT_ALREADY_EXIST: { body: 'This discount code has already been applied!', error: true },
  ORDER_CREATE_SUCCESS: { body: 'Your order has been created successfully!', error: false },
  ORDER_CART_EMPTY: { body: 'You can not create order for empty cart!', error: true },
};

export const SOCIAL_LINKS = [
  {
    link: 'https://www.facebook.com/rickroll548?mibextid=LQQJ4d',
    icon: <CiFacebook className="footer-icon facebook" />,
  },
  {
    link: 'https://www.instagram.com/p/BgSlRglAKBn/?igshid=MWZjMTM2ODFkZg%3D%3D',
    icon: <CiInstagram className="footer-icon instagram" />,
  },
  {
    link: 'https://youtu.be/dQw4w9WgXcQ?si=EVR4Pmst23-IHIwy',
    icon: <CiYoutube className="footer-icon youtube" />,
  },
];
