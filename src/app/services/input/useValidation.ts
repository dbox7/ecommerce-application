import { useState, useEffect } from 'react';
import { IValidation } from '../../utils/types';
import { 
  COUNTRIES, 
  EmailREGEXP, 
  MS_IN_YEAR, 
  PasswordREGEXP, 
  RULES, 
  TextREGEXP
} from '../../utils/constants';

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

        setNotEmpty(Boolean(value));
        
        break;
      
      }

      case 'isEmailGood': {

        setEmailGood(EmailREGEXP.test(value));

        break;

      }

      case 'minLength': {

        setMinLength(value.length >= RULES[type].minLength!);

        break;

      }

      case 'isPasswordGood': {
        
        setPasswordGood(PasswordREGEXP.test(value));

        break;

      }

      case 'isDateGood': {

        const age = Math.floor((Date.now() - Date.parse(value)) / MS_IN_YEAR);

        setDateGood(age >= 14);
        
        break;
      
      }

      case 'isTextGood': {

        setTextGood(TextREGEXP.test(value));

        break;

      }

      case 'isPostalCodeGood': {

        setPostalCodeGood(COUNTRIES.some((country) => country.postalCode.test(value)));

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