import { useState } from 'react';
import { COUNTRIES } from '../../utils/constants';
import { IAddress, IEditAdrdressProps } from '../../utils/types';
import useInput from '../../services/input/useInput';
import { useServerApi } from '../../services/useServerApi';
import { useTypedSelector } from '../../store/hooks/useTypedSelector';

import CTextDateInput from '../inputs/textDateInput/CTextDateInput';
import CPostalCode from '../inputs/postalCode/CPostalCode';
import CCheckbox from '../inputs/checkbox/CCheckbox';
import CButton from '../button/CButton';

import '../registrationForm/CRegistrationForm.css';

const getCountryCode = (countryName: string): string => {
  
  const res = COUNTRIES.find((item) => item.name === countryName);

  return res?.code as string;

};

const getCountryName = (countryCode: string | undefined): string => {

  const res = COUNTRIES.find((item) => item.code === countryCode);

  return res?.name as string;

};

export const CEditAddressForm: React.FC<IEditAdrdressProps> = ({setModal,  addressId}) => {

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
  
  const street = useInput(`${targetStreetName}`, 'text');
  const city = useInput(`${targetCity}`, 'text');
  const postalCode = useInput(`${targetPostalCode}`, 'postalCode');
  const country = useInput(`${targetCountry}`, 'text');

  const server = useServerApi();

  const handleSaveClick = () => {

    setModal(false);
    setUseBillingAddress(false);
    setUseShippingAddress(false);
    setRemoveBillingAddress(false);
    setRemoveShippingAddress(false);
  
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {

    e.preventDefault();

    const address: IAddress = {
      streetName: street.value,
      city: city.value,
      postalCode: postalCode.value,
      country: getCountryCode(country.value),
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

    if (targetAddressId) server.changeAddress(
      currentUser.id,
      currentUser.version,
      address,
      targetAddressId,
      actionTypes,
    );

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
            <CTextDateInput
              {...street}
              title="Street"
            />
            <CTextDateInput
              {...city}
              title="City"
            />
            <CPostalCode
              {...postalCode}
              country={country.value}
            />
            <CTextDateInput
              {...country}
              title="Country"
              data={COUNTRIES}
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

  