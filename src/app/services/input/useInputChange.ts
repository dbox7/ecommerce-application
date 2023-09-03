import { useState, useEffect } from 'react';
import { IUseInputChangesResult } from '../../utils/types';


const useInputChanges = (initialValue: string): IUseInputChangesResult => {

  const [inputValue, setInputValue] = useState<string>(initialValue);
  const [previousValue, setPreviousValue] = useState<string>(initialValue);
  const [hasChanged, setHasChanged] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const { value } = event.target;

    setInputValue(value);
  
  };

  useEffect(() => {

    if (inputValue !== previousValue) {

      setHasChanged(true);
    
    } else {

      setHasChanged(false);
    
    }
  
  }, [inputValue, previousValue]);

  const saveChanges = () => {

    setPreviousValue(inputValue);
  
  };
  

  return {
    inputValue, 
    hasChanged, 
    handleInputChange, 
    saveChanges
  };

};

export default useInputChanges;