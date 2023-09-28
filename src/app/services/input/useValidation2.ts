import { useState, useEffect } from 'react';

const useValidation = (value: string, rules: Function[]): string[] => {

  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {

    setErrors(rules.reduce<string[]>((errors, rule) => {

      const res = rule(value);

      if (!res.valid && res.type) {

        errors.push(res.type);
      
      }

      return errors;
    
    }, []));

  }, [value]);

  return errors;

};

export default useValidation;