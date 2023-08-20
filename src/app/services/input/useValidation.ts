import { useState, useEffect } from 'react';
import { IValidation } from '../../utils/types';
import { COUNTRIES, RULES } from '../../utils/constants';

const useValidation = (value: string, type: string): Partial<IValidation> => {

  const [isNotEmpty, setNotEmpty] = useState(false);
  const [isEmailGood, setEmailGood] = useState(false);
  const [isPasswordGood, setPasswordGood] = useState(false);
  const [isDateGood, setDateGood] = useState(false);
  const [isTextGood, setTextGood] = useState(false);
  const [isMinLength, setMinLength] = useState(false);
  const [isPostalCodeGood, setPostalCodeGood] = useState(false);

  useEffect(() => {

    for (const rule in RULES[type]) {

      switch(rule) {
      
      case 'isNotEmpty': {

        value ? setNotEmpty(true) : setNotEmpty(false);
        
        break;
      
      }

      case 'isEmailGood': {
        
        const REGEXP = /^\S+@\S+\.\S+$/;

        REGEXP.test(value) ? setEmailGood(true) : setEmailGood(false);

        break;

      }

      case 'minLength': {

        value.length >= RULES[type].minLength! ? setMinLength(true) : setMinLength(false);

        break;

      }

      case 'isPasswordGood': {
        
        const REGEXP = /^(?!\s)(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])(?=\S+$).{8,}(?<!\s)$/;


        REGEXP.test(value) ? setPasswordGood(true) : setPasswordGood(false);

        break;

      }

      case 'isDateGood': {

        const MS_IN_YEAR = 31536000000;
        const age = Math.floor((Date.now() - Date.parse(value)) / MS_IN_YEAR);

        age >= 14 ? setDateGood(true) : setDateGood(false);
        
        break;
      
      }

      case 'isTextGood': {

        const REGEXP = /^[a-zA-Z]+$/;

        REGEXP.test(value) ? setTextGood(true) : setTextGood(false);

        break;

      }

      case 'isPostalCodeGood': {

        const temp = COUNTRIES.some((country) => country.postalCode.test(value));

        temp ? setPostalCodeGood(true) : setPostalCodeGood(false);

        break;

      }
      
      }

    }

  }, [value]);

  return {
    isNotEmpty,
    isEmailGood,
    isPasswordGood,
    isDateGood,
    isTextGood,
    isMinLength,
    isPostalCodeGood
  };

};

export default useValidation;