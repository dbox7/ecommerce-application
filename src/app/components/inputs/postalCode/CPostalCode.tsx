import { FC, useEffect, useState } from 'react';
import { ICountry, IPostalCodeProps } from '../../../utils/types';
import { COUNTRIES } from '../../../utils/constants';
import { CInfo } from '../../info/CInfo';

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

      {!valid.isNotEmpty && !activeState &&
      <div className="out-error">Not be an empty</div>}

      {valid.isNotEmpty && selectedCountry && !selectedCountry?.postalCode.test(value) && !activeState &&
      <div className="out-error">Enter right postal code</div>}

    </div>
  );

};

export default CPostalCode;