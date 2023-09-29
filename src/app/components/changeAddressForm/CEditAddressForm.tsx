import { Dispatch, SetStateAction, useState, FC } from 'react';
import { COUNTRIES, TextREGEXP, inputsInfo, msg, validError } from '../../utils/constants';
import { IAddress } from '../../utils/types';
import { checkRegExp, isEmpty, checkPostalCode } from '../../utils/usefullFuncs';

import useInput from '../../services/input/useInput2';
import { useServerApi } from '../../services/useServerApi';
import { useTypedSelector } from '../../store/hooks/useTypedSelector';
import { useShowMessage } from '../../services/useShowMessage';

import CPostalCode from '../inputs/postalCode/CPostalCode';
import CCheckbox from '../inputs/checkbox/CCheckbox';
import CButton from '../button/CButton';
import CInput from '../inputs/CInput';

import '../registrationForm/CRegistrationForm.css';


interface IEditAdrdressProps {
  setModal: Dispatch<SetStateAction<boolean>> | ((isActive: boolean) => void);
  addressId: string | undefined;
}

const getCountryCode = (countryName: string): string => {
  
  const res = COUNTRIES.find((item) => item.name === countryName);

  return res?.code as string;

};

const getCountryName = (countryCode: string | undefined): string => {

  const res = COUNTRIES.find((item) => item.code === countryCode);

  return res?.name as string;

};

export const CEditAddressForm: FC<IEditAdrdressProps> = ({setModal,  addressId}) => {

  const [useShippingAddress, setUseShippingAddress] = useState<boolean>(false);
  const [useBillingAddress, setUseBillingAddress] = useState<boolean>(false);
  const [removeShippingAddress, setRemoveShippingAddress] = useState<boolean>(false);
  const [removeBillingAddress, setRemoveBillingAddress] = useState<boolean>(false);
  const {currentUser} = useTypedSelector(state => state.user);

  const targetAddressId = addressId;
  const addresses = currentUser.addresses;

  const targetAddress = addresses.find(address => address.id === targetAddressId);

  const targetStreetName = targetAddress?.streetName;
  const targetCity = targetAddress?.city;
  const targetCountry = getCountryName(targetAddress?.country);
  const targetPostalCode = targetAddress?.postalCode;

  const data = {
    street: useInput(
      'text', 
      [
        checkRegExp(TextREGEXP, validError.text), 
        isEmpty()
      ],
      `${targetStreetName}`    
    ),
    city: useInput(
      'text', 
      [
        checkRegExp(TextREGEXP, validError.text), 
        isEmpty()
      ],
      `${targetCity}`
    ),
    postalCode: useInput(
      'text', 
      [
        checkPostalCode(), 
        isEmpty()
      ],
      `${targetPostalCode}`
    ),
    country: useInput(
      'text', 
      [
        checkRegExp(TextREGEXP, validError.text), 
        isEmpty()
      ],
      `${targetCountry}`
    ),
  };

  const server = useServerApi();
  const showMessage = useShowMessage();

  const handleSaveClick = () => {

    setModal(false);
    setUseBillingAddress(false);
    setUseShippingAddress(false);
    setRemoveBillingAddress(false);
    setRemoveShippingAddress(false);
  
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    const address: IAddress = {
      streetName: data.street.value,
      city: data.city.value,
      postalCode: data.postalCode.value,
      country: getCountryCode(data.country.value),
    };
    
    const actionMap: Record<string, string[]> = {
      useShippingAddress: ['addShippingAddressId'],
      useBillingAddress: ['addBillingAddressId'],
      removeShippingAddress: ['removeShippingAddressId'],
      removeBillingAddress: ['removeBillingAddressId'],
    };
    
    let actionTypes: string[] = ['changeAddress'];

    if (useShippingAddress) {

      actionTypes = actionTypes.concat(actionMap.useShippingAddress);
    
    }
    
    if (useBillingAddress) {

      actionTypes = actionTypes.concat(actionMap.useBillingAddress);
    
    }
    
    if (removeShippingAddress) {

      actionTypes = actionTypes.concat(actionMap.removeShippingAddress);
    
    }
    
    if (removeBillingAddress) {

      actionTypes = actionTypes.concat(actionMap.removeBillingAddress);
    
    }

    if (targetAddressId) {

      const res = await server.changeAddress(
        currentUser.id,
        currentUser.version,
        address,
        targetAddressId,
        actionTypes,
      );

      res === 'success' ?
        showMessage(msg.ADDRESS_UPDATE_SUCCESS)
        :
        showMessage(msg.ADDRESS_UPDATE_ERROR);

    }

    handleSaveClick();

  };

  
  return (
    <div className="substrate">
      <div className="sub-title">Edit address</div>
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
              title="Set as shipping address"
              checked={useShippingAddress}
              changeHandler={(e) => setUseShippingAddress((e.target as HTMLInputElement).checked)}
            />
            <CCheckbox
              title="Set as billing address"
              checked={useBillingAddress}
              changeHandler={(e) => setUseBillingAddress((e.target as HTMLInputElement).checked)}
            />
            <CCheckbox
              title="Remove as shipping address"
              checked={removeShippingAddress}
              changeHandler={(e) => setRemoveShippingAddress((e.target as HTMLInputElement).checked)}
            />
            <CCheckbox
              title="Remove as billing address"
              checked={removeBillingAddress}
              changeHandler={(e) => setRemoveBillingAddress((e.target as HTMLInputElement).checked)}
            />
          </div>
        </div>
        <CButton
          type="submit"
          value="Save"
          disabled={false}
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

export default CEditAddressForm;

  