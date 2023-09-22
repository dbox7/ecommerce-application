import { FC, useEffect, useState } from 'react';
import { ICountry, IInputProps } from '../../../utils/types';
import { COUNTRIES } from '../../../utils/constants';

import { CInfo } from '../../info/CInfo';

type IPostalCodeProps = IInputProps & {
  country: string
}

const CPostalCode: FC<IPostalCodeProps> = ({
  value, 
  changeHandler, 
  blurHandler, 
  activeState, 
  valid,
  country
}) => {

  const [error, setError] = useState('');
  const selectedCountry: ICountry | undefined = COUNTRIES.find((item) => item.name === country);

  useEffect(() => {

    selectedCountry &&
    (!valid.isNotEmpty || 
    !valid.isPostalCodeGood ||
    !selectedCountry?.postalCode.test(value)) && 
    !activeState ?
      setError('error')
      :
      setError('');

  }, [
    activeState,
    selectedCountry
  ]);

  return ( 
    <div className="input-wrap">
      <label className="input-title">Postal Code</label>
      <CInfo text="Must follow the format for the country (e.g., 12345 or A1B 2C3 for the U.S. and Canada, respectively)"/>
      <input
        className={'input ' + error}
        type="text"
        value={value}
        onChange={changeHandler}
        onBlur={blurHandler}
      />

      {!valid.isNotEmpty && !activeState && selectedCountry &&
      <div className="out-error">Not be an empty</div>}

      {valid.isNotEmpty && selectedCountry && !selectedCountry?.postalCode.test(value) && !activeState &&
      <div className="out-error">Please, enter a valid postal code</div>}

    </div>
  );

};

export default CPostalCode;