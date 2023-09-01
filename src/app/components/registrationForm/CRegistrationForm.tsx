import { useState } from 'react';
import { COUNTRIES } from '../../utils/constants';
import { IAddress, IPayload } from '../../utils/types';
import { Link } from 'react-router-dom';

import useInput from '../../services/input/useInput';
import CEmail from '../inputs/email/CEmail';
import CPassword from '../inputs/password/CPassword';
import CTextDateInput from '../inputs/textDateInput/CTextDateInput';
import CPostalCode from '../inputs/postalCode/CPostalCode';
import CCheckbox from '../inputs/checkbox/CCheckbox';
import CButton from '../button/CButton';
import CAlert from '../alert/CAlert';
import UseFormBlock from '../../services/useFormBlock';
import useRegistration from '../../services/useRegistration';

import './CRegistrationForm.css';


const getCountryCode = (countryName: string): string => {
  
  const res = COUNTRIES.find((item) => item.name === countryName);

  return res?.code as string;

};

export function CRegistrationForm() {

  const [defaultShippingAddress, setDefaultShippingAddress] = useState<boolean>(true);
  const [defaultBillingAddress, setDefaultBillingAddress] = useState<boolean>(true);

  const [useBillingAddress, setUseBillingAddress] = useState<boolean>(true);

  const registration = useRegistration();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {

    e.preventDefault();

    const shippingAddress: IAddress = {
      streetName: shippingStreet.value,
      city: shippingCity.value,
      postalCode: shippingPostalCode.value,
      country: getCountryCode(shippingCountry.value),
    };

    const billingAddress: IAddress = {
      streetName: billingStreet.value,
      city: billingCity.value,
      postalCode: billingPostalCode.value,
      country: getCountryCode(billingCountry.value),
    };

    const payload: IPayload = {
      email: email.value, 
      password: password.value, 
      firstName: firstName.value, 
      lastName: lastName.value, 
      dateOfBirth: dateOfBirth.value,
      addresses: [
        shippingAddress
      ],
      shippingAddress: [0],
      defaultShippingAddress: defaultShippingAddress ? 0 : undefined,
      billingAddress: [0],
      defaultBillingAddress: defaultBillingAddress ? 0 : undefined
    };

    if (!useBillingAddress) {

      payload.addresses[1] = billingAddress;
      payload.billingAddress = [1];
      payload.defaultBillingAddress = defaultBillingAddress ? 1 : undefined;

    }

    registration.registrateCustomer(payload);

  };

  const handleCheckboxChange = (): void => {

    setUseBillingAddress(!useBillingAddress);

  };

  const email = useInput('', 'email');
  const password = useInput('', 'password');
  const dateOfBirth = useInput('', 'date');  
  const firstName = useInput('', 'text');
  const lastName = useInput('', 'text');

  const shippingStreet = useInput('', 'text');
  const shippingCity = useInput('', 'text');
  const shippingPostalCode = useInput('', 'postalCode');
  const shippingCountry = useInput('', 'text');

  const billingStreet = useInput('', 'text');
  const billingCity = useInput('', 'text');
  const billingPostalCode = useInput('', 'postalCode');
  const billingCountry = useInput('', 'text');

  const isFormBlockedByMainInfo = UseFormBlock([
    email.valid.isNotEmpty!,
    email.valid.isEmailGood!,
    password.valid.isNotEmpty!,
    password.valid.isMinLength!,
    password.valid.isPasswordGood!,
    dateOfBirth.valid.isDateGood!,
    firstName.valid.isNotEmpty!,
    firstName.valid.isTextGood!,
    lastName.valid.isNotEmpty!,
    lastName.valid.isTextGood!,
    shippingStreet.valid.isNotEmpty!,
    shippingCity.valid.isNotEmpty!,
    shippingCity.valid.isTextGood!,
    shippingPostalCode.valid.isNotEmpty!,
    shippingPostalCode.valid.isPostalCodeGood!,
    shippingCountry.valid.isNotEmpty!,
    shippingCountry.valid.isTextGood!,
  ]);

  const isFormBlockedByBilling = UseFormBlock([
    billingStreet.valid.isNotEmpty!,
    billingCity.valid.isNotEmpty!,
    billingCity.valid.isTextGood!,
    billingPostalCode.valid.isNotEmpty!,
    billingPostalCode.valid.isPostalCodeGood!,
    billingCountry.valid.isNotEmpty!,
    billingCountry.valid.isTextGood!
  ]);
  
  return (
    <div className="substrate">
      <div className="sub-title">Registration</div>

      <CAlert message={registration.error}></CAlert>

      <form 
        className="form"
        onSubmit={handleSubmit}
      >

        <div className="info">
          <div className="info-block">
            <CEmail 
              {...email}
            />
            <CPassword 
              {...password}
            />
            <CTextDateInput 
              {...firstName}
              title="First name"
            />
            <CTextDateInput 
              {...lastName}
              title="Last name"
            />
            <CTextDateInput 
              {...dateOfBirth}
              title="Date of birth"
              data={null}
              isDate={true}
            />
          </div>
          
          <div className="info-block">
            <h4 className="clarification">Enter the shipping address:</h4>
            <CTextDateInput 
              {...shippingStreet}
              title="Street"
            />
            <CTextDateInput 
              {...shippingCity}
              title="City"
            />
            <CPostalCode 
              {...shippingPostalCode}
              country={shippingCountry.value}
            />
            <CTextDateInput 
              {...shippingCountry}
              title="Country"
              data={COUNTRIES}
            />
            <CCheckbox 
              title="Set as default shipping address"
              checked={defaultShippingAddress}
              changeHandler={(e) => setDefaultShippingAddress((e.target as HTMLInputElement).checked)}
            />
            <CCheckbox 
              title="The billing address is the same"
              checked={useBillingAddress}
              changeHandler={handleCheckboxChange}
            />
          </div>
          
          {!useBillingAddress && (
            <div className="info-block">
              <h4 className="clarification">Enter the billing address:</h4>
              <CTextDateInput 
                {...billingStreet}
                title="Street"
              />
              <CTextDateInput 
                {...billingCity}
                title="City"
              />
              <CPostalCode 
                {...billingPostalCode}
                country={billingCountry.value}
              />
              <CTextDateInput 
                {...billingCountry}
                title="Country"
                data={COUNTRIES}
              />
              <CCheckbox 
                title="Set as default billing address"
                checked={defaultBillingAddress}
                changeHandler={(e) => setDefaultBillingAddress((e.target as HTMLInputElement).checked)}
              />
            </div>
          )}
        </div>
        
        <CButton 
          type="submit"
          value="Sign up"
          disabled={!useBillingAddress && !isFormBlockedByMainInfo ? 
            isFormBlockedByBilling 
            : 
            isFormBlockedByMainInfo}
        />
        <div>
          Already have an account?
          <p className="login-form-link">
            <Link to="/login" className="link"><b>Log in</b></Link>
          </p>
        </div>
      </form>
    </div>
  );

};

export default CRegistrationForm;

  