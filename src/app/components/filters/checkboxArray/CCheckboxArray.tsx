import { useEffect, useState } from 'react';
import CCheckbox from '../../inputs/checkbox/CCheckbox';

const CCheckboxArray = ({ array, setResult }:{ array: (number[]), setResult: Function }) => {

  const [checked, setChecked] = useState(
    new Array(array.length).fill(false)
  );

  useEffect(() => {

    setResult(array.filter((item: (number), idx: number) => checked[idx] === true ? true : false));
    
  }, [checked]);
  
  return ( 
    <div className="wrap">
      {
        array.map((item, idx) => (
          <CCheckbox 
            key={`cb-${item}`}
            title={String(item)}
            checked={checked[idx]}
            changeHandler={() => setChecked(checked.map((item, index) =>
              index === idx ? !item : item
            ))}
          />
        ))
      }
    </div>
  );

};
 
export default CCheckboxArray;