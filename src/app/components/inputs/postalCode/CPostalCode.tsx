import { FC } from 'react';
import { ICountry, IInputProps } from '../../../utils/types';
import { COUNTRIES } from '../../../utils/constants';

import CInput from '../CInput';

type IPostalCodeProps = IInputProps & {
  country: string
}

const CPostalCode: FC<IPostalCodeProps> = ({
  title,
  info,
  value,
  type,
  changeHandler, 
  blurHandler, 
  activeState,
  errors,
  country
}) => {

  const selectedCountry: ICountry | undefined = COUNTRIES.find((item) => item.name === country);

  return ( 
    <CInput
      value={value}
      type={type}
      changeHandler={changeHandler}
      blurHandler={blurHandler}
      activeState={activeState}
      errors={selectedCountry?.postalCode.test(value) ? [] : errors}
      title={title}
      info={info}
      hasChanged={false}
    />
  );

};

export default CPostalCode;