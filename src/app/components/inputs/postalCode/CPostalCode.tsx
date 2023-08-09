import { FC } from 'react';
import { IInputProps } from '../../../utils/types';


const CPostalCode: FC<IInputProps> = (props) => {

  return ( 
    <div className="input-wrap">
      <label className="input-title">Postal Code</label>
      <input
        className="input"
        type="text"
        value={props.value}
        onChange={props.changeHandler}
        required
        pattern="^\d{5}(-\d{4})?$"
        title="Must follow the format for the country (e.g., 12345 or A1B 2C3 for the U.S. and Canada, respectively)"
      />
    </div>
  );

};

export default CPostalCode;