import { useState, FC } from 'react';
import { COUNTRIES, EmailREGEXP, PasswordREGEXP, TextREGEXP, inputsInfo, msg, validError } from '../../utils/constants';
import { IAddress, IPayload } from '../../utils/types';
import { useServerApi } from '../../services/useServerApi';
import useInput from '../../services/input/useInput2';
import UseFormBlock from '../../services/useFormBlock';
import { useShowMessage } from '../../services/useShowMessage';

import CEmail from '../inputs/email/CEmail';
import CPassword from '../inputs/password/CPassword';
import CTextDateInput from '../inputs/textDateInput/CTextDateInput';
import CPostalCode from '../inputs/postalCode/CPostalCode';
import CCheckbox from '../inputs/checkbox/CCheckbox';
import CButton from '../button/CButton';
import { Link } from 'react-router-dom';

import './CRegistrationForm.css';
import { checkMinMax, checkPostalCode, checkRegExp, isEmpty } from '../../utils/usefullFuncs';
import CInput from '../inputs/CInput';

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
      streetName: data.billingStreet.value,
      city: data.billingCity.value,
      postalCode: data.billingPostalCode.value,
      country: getCountryCode(data.billingCountry.value),
    };

    const payload: IPayload = {
      email: email.value, 
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

  // const isFormBlockedByMainInfo = UseFormBlock([
  //   email.valid.isNotEmpty!,
  //   email.valid.isEmailGood!,
  //   password.valid.isNotEmpty!,
  //   password.valid.isMinLength!,
  //   password.valid.isPasswordGood!,
  //   dateOfBirth.valid.isDateGood!,
  //   firstName.valid.isNotEmpty!,
  //   firstName.valid.isTextGood!,
  //   lastName.valid.isNotEmpty!,
  //   lastName.valid.isTextGood!,
  //   shippingStreet.valid.isNotEmpty!,
  //   shippingCity.valid.isNotEmpty!,
  //   shippingCity.valid.isTextGood!,
  //   shippingPostalCode.valid.isNotEmpty!,
  //   shippingPostalCode.valid.isPostalCodeGood!,
  //   shippingCountry.valid.isNotEmpty!,
  //   shippingCountry.valid.isTextGood!,
  // ]);

  // const isFormBlockedByBilling = UseFormBlock([
  //   billingStreet.valid.isNotEmpty!,
  //   billingCity.valid.isNotEmpty!,
  //   billingCity.valid.isTextGood!,
  //   billingPostalCode.valid.isNotEmpty!,
  //   billingPostalCode.valid.isPostalCodeGood!,
  //   billingCountry.valid.isNotEmpty!,
  //   billingCountry.valid.isTextGood!
  // ]);
  
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
            />
            <CInput
              {...data.lastName}
              title="Last name"
            />
            <CTextDateInput 
              {...data.dateOfBirth}
              title="Date of birth"
              data={null}
              isDate={true}
            />
          </div>
          
          <div className="info-block">
            <h4 className="clarification">Enter the shipping address:</h4>
            <CInput 
              {...data.shippingStreet}
              title="Street"
            />
            <CInput 
              {...data.shippingCity}
              title="City"
            />
            <CPostalCode 
              {...data.shippingPostalCode}
              country={data.shippingCountry.value}
            />
            <CTextDateInput 
              {...data.shippingCountry}
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
              <CInput 
                {...data.billingStreet}
                title="Street"
              />
              <CInput 
                {...data.billingCity}
                title="City"
              />
              <CPostalCode 
                {...data.billingPostalCode}
                country={data.billingCountry.value}
              />
              <CTextDateInput 
                {...data.billingCountry}
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
          // disabled={!useBillingAddress && !isFormBlockedByMainInfo ? 
          //   isFormBlockedByBilling 
          //   : 
          //   isFormBlockedByMainInfo}
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

  