import { 
  ChangeEvent, 
  useEffect, 
  useState 
} from 'react';

import CCheckbox from '../../inputs/checkbox/CCheckbox';

import './CCheckboxArray.css';

const CCheckboxArray = ({ array, setResult }:{ array: string[], setResult: Function }) => {

  const [checked, setChecked] = useState<string[]>([]);

  useEffect(() => {
    
    setResult(checked);
    
  }, [checked]);

  const changeHandler = (e:ChangeEvent<HTMLInputElement>) => {
      
    let isSelected = e.target.checked;
    let value = (e.target.nextSibling as Text).data;     

    if( isSelected ){

      setChecked( [...checked, value] );

    }else{

      setChecked((prevData) => {

        return prevData.filter((id)=>{
          
          return id !== value;
          
        });

      });
      
    }
    
  };  
  
  return ( 
    <div className="checkbox-array__wrap">
      {
        array.map((item) => (
          <CCheckbox 
            key={`cb-${item}`}
            title={item.toString()}
            checked={checked.includes(item)}
            changeHandler={changeHandler}
          />  
        ))
      }
    </div>
  );

};
 
export default CCheckboxArray;