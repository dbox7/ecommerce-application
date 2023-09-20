import { useState, useEffect } from 'react';
import { ChangeEvent } from 'react';

type IUseInputChangesResult = {
  inputValue: string;
  hasChanged: boolean;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  saveChanges: () => void;
};

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