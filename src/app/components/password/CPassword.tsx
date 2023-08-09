import { FC } from 'react';

interface IPasswordProps {
  title: string;
  value: string;
  changeHandler: React.ChangeEventHandler;
}

const Password: FC<IPasswordProps> = (props) => {

  return ( 
    <div className="input-wrap">
      <label className="input-title">{props.title}:</label>
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

export default Password;