import { Customer } from '@commercetools/platform-sdk';
import { ICountry, IValidationRules } from './types';

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

export const developers = [

  { name: 'Dmitry Korobka', 
    role: 'Team lead and design', 
    photo: dbox7Photo, 
    bio: 'I am a software engineer with a passion for web development. I am a team player and a quick learner. I am always looking for new challenges and opportunities to grow as a developer.',
    telegram: 'https://t.me/dbox7', 
    github: 'https;//github.com/dbox7', 
    email: 'mailto:dbox.insight@gmail.com'
  },

  { name: 'Kseniya Spiridonova',
    role: 'Front-end developer and prompt engineer',
    photo: xu69uxPhoto,
    bio: 'I am a software engineer with a passion for web development. I am a team player and a quick learner. I am always looking for new challenges and opportunities to grow as a developer.',
    telegram: 'https://t.me/xu69ux',
    github: 'https;//github.com/xu69ux',
    email: 'mailto:spiridonova.kseniya@gmail.com'
  },

  { name: 'Artem Mykoliuk',
    role: 'Front-end developer and API engineer',
    photo: GEKKOPhoto,
    bio: 'I am a software engineer with a passion for web development. I am a team player and a quick learner. I am always looking for new challenges and opportunities to grow as a developer.',
    telegram: 'https://t.me/GEKKO-ops',
    github: 'https;//github.com/GEKKO-ops',
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

export const ALL_SIZES = [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 11, 12];

export const TRANSITION_DURATION = 300;
