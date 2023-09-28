import { useState, FC } from 'react';
import { COUNTRIES, EmailREGEXP, PasswordREGEXP, TextREGEXP, msg, validType } from '../../utils/constants';
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

  const email = useInput('', [checkRegExp(EmailREGEXP, validType.email), isEmpty()]);
  const password = useInput('', [checkRegExp(PasswordREGEXP, validType.password)]);
  const dateOfBirth = useInput('', [checkMinMax([14]), isEmpty()]);  
  const firstName = useInput('', [checkRegExp(TextREGEXP, validType.text), isEmpty()]);
  const lastName = useInput('', [checkRegExp(TextREGEXP, validType.text), isEmpty()]);

  const shippingStreet = useInput('', [checkRegExp(TextREGEXP, validType.text), isEmpty()]);
  const shippingCity = useInput('', [checkRegExp(TextREGEXP, validType.text), isEmpty()]);
  const shippingPostalCode = useInput('', [checkPostalCode(), isEmpty()]);
  const shippingCountry = useInput('', [checkRegExp(TextREGEXP, validType.text), isEmpty()]);

  const billingStreet = useInput('', [checkRegExp(TextREGEXP, validType.text), isEmpty()]);
  const billingCity = useInput('', [checkRegExp(TextREGEXP, validType.text), isEmpty()]);
  const billingPostalCode = useInput('', [checkPostalCode(), isEmpty()]);
  const billingCountry = useInput('', [checkRegExp(TextREGEXP, validType.text), isEmpty()]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

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
            <CEmail 
              {...email}
            />
            <CPassword 
              {...password}
              title="Password"
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

  