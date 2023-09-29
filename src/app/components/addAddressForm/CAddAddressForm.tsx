import { useState, Dispatch, SetStateAction, FC } from 'react';
import { COUNTRIES, TextREGEXP, inputsInfo, msg, validError } from '../../utils/constants';
import { IAddress } from '../../utils/types';
import useInput from '../../services/input/useInput';
import { useServerApi } from '../../services/useServerApi';
import { useShowMessage } from '../../services/useShowMessage';
import { useTypedSelector } from '../../store/hooks/useTypedSelector';
import { checkRegExp, isEmpty, checkPostalCode } from '../../utils/usefullFuncs';

import CPostalCode from '../inputs/postalCode/CPostalCode';
import CCheckbox from '../inputs/checkbox/CCheckbox';
import CButton from '../button/CButton';
import CInput from '../inputs/CInput';

import '../registrationForm/CRegistrationForm.css';


interface IAddAdrdressProps {
  setModal: Dispatch<SetStateAction<boolean>>;
}

const getCountryCode = (countryName: string): string => {
  
  const res = COUNTRIES.find((item) => item.name === countryName);

  return res?.code as string;

};

export const CAddAddressForm: FC<IAddAdrdressProps> = ({setModal}) => {

  const [useShippingAddress, setUseShippingAddress] = useState<boolean>(false);
  const [useBillingAddress, setUseBillingAddress] = useState<boolean>(false);
  const {currentUser} = useTypedSelector(state => state.user);

  const data = {
    street: useInput(
      'text', 
      [
        checkRegExp(TextREGEXP, validError.text), 
        isEmpty()
      ]
    ),
    city: useInput(
      'text', 
      [
        checkRegExp(TextREGEXP, validError.text), 
        isEmpty()
      ]
    ),
    postalCode: useInput(
      'text', 
      [
        checkPostalCode(), 
        isEmpty()
      ]
    ),
    country: useInput(
      'text', 
      [
        checkRegExp(TextREGEXP, validError.text), 
        isEmpty()
      ]
    ),
  };

  const server = useServerApi();
  const showMessage = useShowMessage();
  
  const isFormBlockedByMainInfo = Object.values(data).some(item => item.errors.length > 0);

  const handleSaveClick = () => {

    setModal(false);

    data.street.changeHandler({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
    data.city.changeHandler({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
    data.postalCode.changeHandler({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
    data.country.changeHandler({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
    setUseBillingAddress(false);
    setUseShippingAddress(false);
  
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    const address: IAddress = {
      streetName: data.street.value,
      city: data.city.value,
      postalCode: data.postalCode.value,
      country: getCountryCode(data.country.value),
    };

    let actionTypes: string[] = [];

    if (useShippingAddress && useBillingAddress) {

      actionTypes = ['addShippingAddressId', 'addBillingAddressId'];
    
    } else if (useShippingAddress) {

      actionTypes = ['addShippingAddressId'];
    
    } else if (useBillingAddress) {

      actionTypes = ['addBillingAddressId'];
    
    }

    const res = await server.addAddresses(
      currentUser.id,
      currentUser.version,
      address,
      actionTypes,
    );

    res === 'success' ?
      showMessage(msg.ADDRESS_UPDATE_SUCCESS)
      :
      showMessage(msg.ADDRESS_UPDATE_ERROR);

    handleSaveClick();

  };

  
  return (
    <div className="substrate">
      <div className="sub-title">Add address</div>

      <form 
        className="form"
        onSubmit={handleSubmit}
      >

        <div className="info">
          <div className="info-block">
            <CInput
              {...data.street}
              title="Street"
              info={inputsInfo.street}
            />
            <CInput
              {...data.city}
              title="City"
              info={inputsInfo.text}
            />
            <CPostalCode
              {...data.postalCode}
              title="Postal Code"
              info={inputsInfo.postalCode}
              country={data.country.value}
            />
            <CInput
              {...data.country}
              title="Country"
              dataList={COUNTRIES}
            />
            <CCheckbox
              title="Set as  address"
              checked={useShippingAddress}
              changeHandler={(e) => setUseShippingAddress((e.target as HTMLInputElement).checked)}
            />
            <CCheckbox
              title="Set as billing address"
              checked={useBillingAddress}
              changeHandler={(e) => setUseBillingAddress((e.target as HTMLInputElement).checked)}
            />
          </div>
        </div>
        <CButton
          type="submit"
          value="Save"
          disabled={isFormBlockedByMainInfo && (!useShippingAddress || !useBillingAddress)
            ? isFormBlockedByMainInfo
            : !useShippingAddress
              ? !useBillingAddress
              : isFormBlockedByMainInfo}
        />
        <CButton
          type="button"
          value="Cancel"
          disabled={false}
          clickHandler={handleSaveClick}
        />
      </form>
    </div>
  );

};

export default CAddAddressForm;

  