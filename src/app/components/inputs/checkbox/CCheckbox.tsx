import { FC } from 'react';

interface ICheckboxProps {
  title: string
  checked: boolean,
  changeHandler: React.ChangeEventHandler
}

const CCheckbox: FC<ICheckboxProps> = (props) => {

  return ( 
    <div>
      <input
        type="checkbox"
        checked={props.checked}
        onChange={props.changeHandler}
      />
      <label>Set as default billing address</label>
    </div>
  );

};

export default CCheckbox;