import { useState, useEffect } from 'react';
import { IValidation } from '../../utils/types';

interface IValidationRules {
  [index: string]: IValidation
}

const rules: IValidationRules = {
  email: {
    isEmpty: true,
    isEmailGood: false
  },
  password: {
    isEmpty: true,
    isPasswordGood: false,
    minLength: 8
  },
  date: {
    isEmpty: true,
    isDateGood: false
  }
};

const useValidation = (value: string, type: string) => {

  const [isEmpty, setEmpty] = useState(true);
  const [isEmailGood, setEmailGood] = useState(false);
  const [isPasswordGood, setPasswordGood] = useState(false);
  const [isDateGood, setDateGood] = useState(false);

  useEffect(() => {

    for (const rule in rules[type]) {

      switch(rule) {
      
      case 'isEmpty': {

        value ? setEmpty(false) : setEmpty(true);
        break;
      
      }

      case 'isEmailGood': {
        
        const REGEXP = /^\S+@\S+\.\S+$/;

        REGEXP.test(value) ? setEmailGood(true) : setEmailGood(false);
        break;

      }

      case 'minLength': {

        value.length >= rules[type].minLength! ? setPasswordGood(true) : setPasswordGood(false);
        break;

      }

      case 'isPasswordGood': {
        
        const REGEXP = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

        REGEXP.test(value) ? setPasswordGood(true) : setPasswordGood(false);
        break;

      }

      case 'isDateGood': {

        const MS_IN_YEAR = 31536000000;
        const age = Math.floor((Date.now() - Date.parse(value)) / MS_IN_YEAR);

        age >= 14 ? setDateGood(true) : setDateGood(false);
        console.log(age);
        
        break;
      
      }
      
      }

    }

  }, [value]);

  return {
    isEmpty,
    isEmailGood,
    isPasswordGood,
    isDateGood,
  };

};

export default useValidation;