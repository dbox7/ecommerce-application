import { useState, Dispatch, SetStateAction } from 'react';
import { COUNTRIES, msg } from '../../utils/constants';
import { IAddress } from '../../utils/types';
import useInput from '../../services/input/useInput';
import UseFormBlock from '../../services/useFormBlock';
import { useServerApi } from '../../services/useServerApi';
import { useShowMessage } from '../../services/useShowMessage';
import { useTypedSelector } from '../../store/hooks/useTypedSelector';

import CTextDateInput from '../inputs/textDateInput/CTextDateInput';
import CPostalCode from '../inputs/postalCode/CPostalCode';
import CCheckbox from '../inputs/checkbox/CCheckbox';
import CButton from '../button/CButton';

import '../registrationForm/CRegistrationForm.css';

interface IAddAdrdressProps {
  setModal: Dispatch<SetStateAction<boolean>>;
}

const getCountryCode = (countryName: string): string => {
  
  const res = COUNTRIES.find((item) => item.name === countryName);

  return res?.code as string;

};

export const CAddAddressForm: React.FC<IAddAdrdressProps> = ({setModal}) => {

  const [useShippingAddress, setUseShippingAddress] = useState<boolean>(false);
  const [useBillingAddress, setUseBillingAddress] = useState<boolean>(false);
  const {currentUser} = useTypedSelector(state => state.user);

  
  const street = useInput('', 'text');
  const city = useInput('', 'text');
  const postalCode = useInput('', 'postalCode');
  const country = useInput('', 'text');

  const server = useServerApi();
  const showMessage = useShowMessage();
  const isFormBlockedByMainInfo = UseFormBlock([

    street.valid.isNotEmpty!,
    city.valid.isNotEmpty!,
    city.valid.isTextGood!,
    postalCode.valid.isNotEmpty!,
    postalCode.valid.isPostalCodeGood!,
    country.valid.isNotEmpty!,
    country.valid.isTextGood!,
  ]);

  const handleSaveClick = () => {

    setModal(false);

    street.changeHandler({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
    city.changeHandler({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
    postalCode.changeHandler({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
    country.changeHandler({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
    setUseBillingAddress(false);
    setUseShippingAddress(false);
  
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    const address: IAddress = {
      streetName: street.value,
      city: city.value,
      postalCode: postalCode.value,
      country: getCountryCode(country.value),
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

  