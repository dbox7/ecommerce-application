import { useState } from 'react';
import { apiRoot } from '../../ctp';
import useInput from '../../services/customHooks/useImport';

import { COUNTRIES } from '../../utils/constants';
import SensitiveMessages from '../../SensetiveMessages';
import CEmail from '../inputs/email/CEmail';
import CPassword from '../inputs/password/CPassword';
import CTextDateInput from '../inputs/textDateInput/CTextDateInput';
import CPostalCode from '../inputs/postalCode/CPostalCode';
import CCheckbox from '../inputs/checkbox/CCheckbox';
import CButton from '../button/CButton';

import './CRegistrationForm.css';

const CRegistrationForm = () => {

  const [errorMsg, setErrorMsg] = useState('');

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [dateOfBirth, setDateOfBirth] = useState('');

  const [defaultShippingAddress, setDefaultShippingAddress] = useState(true);
  // const [shippingStreet, setShippingStreet] = useState('');
  // const [shippingCity, setShippingCity] = useState('');
  // const [shippingPostalCode, setShippingPostalCode] = useState('');
  // const [shippingCountry, setShippingCountry] = useState('');

  const [defaultBillingAddress, setDefaultBillingAddress] = useState(true);
  // const [billingStreet, setBillingStreet] = useState('');
  // const [billingCity, setBillingCity] = useState('');
  // const [billingPostalCode, setBillingPostalCode] = useState('');
  // const [billingCountry, setBillingCountry] = useState('');

  const [useBillingAddress, setUseBillingAddress] = useState(true);


  const errors = new SensitiveMessages(setErrorMsg, '<ul><li>', '</li><li>', '</li></ul>');

  // const handleInputChange = (field: string, value: string) => {

  //   switch (field) {

  //   case 'email':
  //     setEmail(value);
  //     break;
  //   case 'password':
  //     setPassword(value);
  //     break;
  //   case 'firstName':
  //     setFirstName(value);
  //     break;
  //   case 'lastName':
  //     setLastName(value);
  //     break;
  //   case 'dateOfBirth':
  //     setDateOfBirth(value);
  //     break;
  //   case 'billingStreet':
  //     setBillingStreet(value);
  //     break;
  //   case 'billingCity':
  //     setBillingCity(value);
  //     break;
  //   case 'billingPostalCode':
  //     setBillingPostalCode(value);
  //     break;
  //   case 'billingCountry':
  //     setBillingCountry(value);
  //     break;
  //   case 'shippingStreet':
  //     setShippingStreet(value);
  //     break;
  //   case 'shippingCity':
  //     setShippingCity(value);
  //     break;
  //   case 'shippingPostalCode':
  //     setShippingPostalCode(value);
  //     break;
  //   case 'shippingCountry':
  //     setShippingCountry(value);
  //     break;
  //   default:
  //     break;
    
  //   }

  // };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    //валидацию, если надо ещё, то добавлять сюда
    console.log(email, password, firstName, lastName, dateOfBirth);

    const shippingAddress = {
      streetName: shippingStreet.value,
      city: shippingCity.value,
      postalCode: shippingPostalCode.value,
      country: shippingCountry.value,
    };

    const billingAddress = {
      streetName: billingStreet,
      city: billingCity,
      postalCode: billingPostalCode,
      country: billingCountry, 
    };


    const payload = {
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
      defaultBillingAddress: defaultBillingAddress ? 1 : undefined
    };

    apiRoot.customers()
      .post({body: payload})
      .execute()
      .then((data) => {

        console.log('SUCCESS');
        console.log(data);
      
      })
      .catch((err) => {

        errors.add(err.message);
      
      });

  };

  const handleCheckboxChange = () => {

    setUseBillingAddress(!useBillingAddress);

  };

  const email = useInput('', 'email');
  const password = useInput('', 'password');
  const dateOfBirth = useInput(`${Date.now()}`, 'date');  
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

  return (
    <div>
      <h1>Registration</h1>
      <form 
        className="registration"
        onSubmit={handleSubmit}
      >
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
        <p>Enter the shipping address:</p>
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
          title="The shipping address is the same as the billing address"
          checked={useBillingAddress}
          changeHandler={handleCheckboxChange}
        />
        {!useBillingAddress && (
          <div className="registration">
            <p>Enter the billing address:</p>
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
        <CButton 
          value="Register"
        />
      </form>
    </div>
  );

};

export default CRegistrationForm;

  