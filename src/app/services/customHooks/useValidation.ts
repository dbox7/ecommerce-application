import { useState, useEffect } from 'react';

interface IValidationRules {
  [index: string]: object
}

const rules: IValidationRules = {
  email: {
    isEmpty: true,
    isEmailGood: false
  },
  password: {
    isEmpty: true,
    isPasswordGood: false
  }
};

const useValidation = (value: string, type: string) => {

  const [isEmpty, setEmpty] = useState(true);
  const [isEmailGood, setEmailGood] = useState(false);
  const [isPasswordGood, setPasswordGood] = useState(false);

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

      case 'isPasswordGood': {
        
        const REGEXP = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

        REGEXP.test(value) ? setPasswordGood(true) : setPasswordGood(false);
        break;

      }
      
      }

    }

  }, [value]);

  return {
    isEmpty,
    isEmailGood,
    isPasswordGood,
  };

};

export default useValidation;