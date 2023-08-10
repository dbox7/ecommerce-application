import { useState, useEffect } from 'react';

// interface IRules {
//   [index: string]: object
// }

// const ruless: IRules = {
//   email: {
//     isEmpty: true,
//     isEmailGood: false
//   },
// }

const useEmailValidation = (value: string) => {

  const REGEXP = /^\S+@\S+\.\S+$/;

  const [isEmpty, setEmpty] = useState(true);
  const [isEmailGood, setEmailGood] = useState(false);

  useEffect(() => {

    value ? setEmpty(false) : setEmpty(true);

    REGEXP.test(value) ? setEmailGood(true) : setEmailGood(false);

  }, [value]);
    

  return {
    isEmpty,
    isEmailGood
  };

};

export default useEmailValidation;