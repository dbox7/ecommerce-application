import { FC, useEffect, useState } from 'react';
import { ICountry, IInputProps } from '../../../utils/types';
import { COUNTRIES } from '../../../utils/constants';

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

    (valid.isEmpty || 
    !valid.isPostalCodeGood ||
    !selectedCountry?.postalCode.test(value)) && 
    !activeState ?
      setError('error')
      :
      setError('');

  }, [
    activeState,
  ]);

  return ( 
    <div className="input-wrap">
      <label className="input-title">Postal Code</label>
      <input
        className={'input ' + error}
        type="text"
        value={value}
        onChange={changeHandler}
        onBlur={blurHandler}
        title="Must follow the format for the country (e.g., 12345 or A1B 2C3 for the U.S. and Canada, respectively)"
      />

      {valid.isEmpty && !activeState &&
      <div className="out-error">Not be an empty</div>}

      {!valid.isEmpty && !selectedCountry?.postalCode.test(value) && !activeState &&
      <div className="out-error">Enter right postal code</div>}

    </div>
  );

};

export default CPostalCode;