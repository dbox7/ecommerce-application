import { FC } from 'react';
import { IInputProps } from '../../../utils/types';

const CPassword: FC<IInputProps> = (props) => {

  return ( 
    <div className="input-wrap">
      <label className="input-title">Password</label>
      <input
        className="input"
        type="password"
        value={props.value}
        onChange={props.changeHandler}
        required
        minLength={8}
        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$"
        title="Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number"
      />
    </div>
  );

};

export default CPassword;