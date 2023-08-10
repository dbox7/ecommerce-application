import { FC } from 'react';
import { IInputProps } from '../../../utils/types';


const CEmail: FC<IInputProps> = (props) => {

  return ( 
    <div className="input-wrap">
      <label className="input-title">Email</label>
      <input
        className="input"
        type="email"
        value={props.value}
        onChange={props.changeHandler}
        title="A properly formatted email address (e.g., example@email.com)"
        required
      />
    </div>
  );

};

export default CEmail;