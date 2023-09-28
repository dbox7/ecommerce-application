import { useState, FC } from 'react';
import { COUNTRIES, EmailREGEXP, PasswordREGEXP, TextREGEXP, inputsInfo, msg, validError } from '../../utils/constants';
import { IAddress, IPayload } from '../../utils/types';
import { useServerApi } from '../../services/useServerApi';
import useInput from '../../services/input/useInput2';
import { checkMinMax, checkPostalCode, checkRegExp, isEmpty } from '../../utils/usefullFuncs';
import { useShowMessage } from '../../services/useShowMessage';

import CPostalCode from '../inputs/postalCode/CPostalCode';
import CCheckbox from '../inputs/checkbox/CCheckbox';
import CButton from '../button/CButton';
import { Link } from 'react-router-dom';
import CInput from '../inputs/CInput';

import './CRegistrationForm.css';


const getCountryCode = (countryName: string): string => {
  
  const res = COUNTRIES.find((item) => item.name === countryName);

  return res?.code as string;

};

export const CRegistrationForm: FC = () => {

  const [defaultShippingAddress, setDefaultShippingAddress] = useState<boolean>(true);
  const [defaultBillingAddress, setDefaultBillingAddress] = useState<boolean>(true);

  const [useBillingAddress, setUseBillingAddress] = useState<boolean>(true);

  const server = useServerApi();
  const showMessage = useShowMessage();

  const data = {
    email: useInput(
      'email', 
      [
        checkRegExp(EmailREGEXP, validError.email), 
        isEmpty()
      ]
    ),
    password: useInput(
      'password', 
      [
        checkRegExp(PasswordREGEXP, validError.password),
        checkMinMax([8], 'length')
      ]
    ),
    dateOfBirth: useInput(
      'date', 
      [
        checkMinMax([14], 'date'), 
        isEmpty()
      ]
    ),
    firstName: useInput(
      'text', 
      [
        checkRegExp(TextREGEXP, validError.text), 
        isEmpty()
      ]
    ),
    lastName: useInput(
      'text', 
      [
        checkRegExp(TextREGEXP, validError.text), 
        isEmpty()
      ]
    ),
    shippingStreet: useInput(
      'text', 
      [
        checkRegExp(TextREGEXP, validError.text), 
        isEmpty()
      ]
    ),
    shippingCity: useInput(
      'text', 
      [
        checkRegExp(TextREGEXP, validError.text), 
        isEmpty()
      ]
    ),
    shippingPostalCode: useInput(
      'text', 
      [
        checkPostalCode(), 
        isEmpty()
      ]
    ),
    shippingCountry: useInput(
      'text', 
      [
        checkRegExp(TextREGEXP, validError.text), 
        isEmpty()
      ]
    ),

  };

  const bilData = {
    billingStreet: useInput(
      'text', 
      [
        checkRegExp(TextREGEXP, validError.text), 
        isEmpty()
      ]
    ),
    billingCity: useInput(
      'text', 
      [
        checkRegExp(TextREGEXP, validError.text), 
        isEmpty()
      ]
    ),
    billingPostalCode: useInput(
      'text', 
      [
        checkPostalCode(), 
        isEmpty()
      ]
    ),
    billingCountry: useInput(
      'text', 
      [
        checkRegExp(TextREGEXP, validError.text), 
        isEmpty()
      ]
    )
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    const shippingAddress: IAddress = {
      streetName: data.shippingStreet.value,
      city: data.shippingCity.value,
      postalCode: data.shippingPostalCode.value,
      country: getCountryCode(data.shippingCountry.value),
    };

    const billingAddress: IAddress = {
      streetName: bilData.billingStreet.value,
      city: bilData.billingCity.value,
      postalCode: bilData.billingPostalCode.value,
      country: getCountryCode(bilData.billingCountry.value),
    };

    const payload: IPayload = {
      email: data.email.value, 
      password: data.password.value, 
      firstName: data.firstName.value, 
      lastName: data.lastName.value, 
      dateOfBirth: data.dateOfBirth.value,
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

    const res = await server.Registration(payload);

    if (res !== 'success') {

      res === 'There is already an existing customer with the provided email.' ?
        showMessage(msg.REG_ALREADY_EXIST)
        :
        showMessage(msg.COMMON_ERROR);

    }

  };

  const handleCheckboxChange = (): void => {

    setUseBillingAddress(!useBillingAddress);

  };

  const isFormBlockedByMainInfo = Object.values(data).some(item => item.errors.length > 0);
  const isFormBlockedByBilling = Object.values(bilData).some(item => item.errors.length > 0);  

  return (
    <div className="substrate">
      <div className="sub-title">Registration</div>
      <form 
        className="form"
        onSubmit={handleSubmit}
      >

        <div className="info">
          <div className="info-block">
            <CInput
              {...data.email}
              title="Email"
              info={inputsInfo.email}
            />
            <CInput
              {...data.password}
              title="Password"
              info={inputsInfo.password}
            />
            <CInput
              {...data.firstName}
              title="First name"
              info={inputsInfo.text}
            />
            <CInput
              {...data.lastName}
              title="Last name"
              info={inputsInfo.text}
            />
            <CInput 
              {...data.dateOfBirth}
              title="Date of birth"
              info={inputsInfo.date}
            />
          </div>
          
          <div className="info-block">
            <h4 className="clarification">Enter the shipping address:</h4>
            <CInput 
              {...data.shippingStreet}
              title="Street"
              info={inputsInfo.street}
            />
            <CInput 
              {...data.shippingCity}
              title="City"
              info={inputsInfo.text}
            />
            <CPostalCode 
              {...data.shippingPostalCode}
              title="Postal Code"
              info={inputsInfo.postalCode}
              country={data.shippingCountry.value}
            />
            <CInput 
              {...data.shippingCountry}
              title="Country"
              dataList={COUNTRIES}
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
              <CInput 
                {...bilData.billingStreet}
                title="Street"
                info={inputsInfo.street}
              />
              <CInput 
                {...bilData.billingCity}
                title="City"
                info={inputsInfo.text}
              />
              <CPostalCode 
                {...bilData.billingPostalCode}
                title="Postal Code"
                info={inputsInfo.postalCode}
                country={bilData.billingCountry.value}
              />
              <CInput 
                {...bilData.billingCountry}
                title="Country"
                dataList={COUNTRIES}
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

  