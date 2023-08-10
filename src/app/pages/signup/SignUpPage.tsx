import { useState } from 'react';
import SensitiveMessages from '../../SensetiveMessages';
import CRegistrationForm from '../../components/registrationForm/CRegistrationForm';
import { apiRoot } from '../../ctp';

export function SignUpPage(): JSX.Element {

  const [errorMsg, setErrorMsg] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  const [defaultShippingAddress, setDefaultShippingAddress] = useState(true);
  const [shippingStreet, setShippingStreet] = useState('');
  const [shippingCity, setShippingCity] = useState('');
  const [shippingPostalCode, setShippingPostalCode] = useState('');
  const [shippingCountry, setShippingCountry] = useState('');

  const [defaultBillingAddress, setDefaultBillingAddress] = useState(true);
  const [billingStreet, setBillingStreet] = useState('');
  const [billingCity, setBillingCity] = useState('');
  const [billingPostalCode, setBillingPostalCode] = useState('');
  const [billingCountry, setBillingCountry] = useState('');

  const [useBillingAddress, setUseBillingAddress] = useState(true);
  
  
  const errors = new SensitiveMessages(setErrorMsg, '<ul><li>', '</li><li>', '</li></ul>');

  const handleInputChange = (field: string, value: string) => {

    switch (field) {

    case 'email':
      setEmail(value);
      break;
    case 'password':
      setPassword(value);
      break;
    case 'firstName':
      setFirstName(value);
      break;
    case 'lastName':
      setLastName(value);
      break;
    case 'dateOfBirth':
      setDateOfBirth(value);
      break;
    case 'billingStreet':
      setBillingStreet(value);
      break;
    case 'billingCity':
      setBillingCity(value);
      break;
    case 'billingPostalCode':
      setBillingPostalCode(value);
      break;
    case 'billingCountry':
      setBillingCountry(value);
      break;
    case 'shippingStreet':
      setShippingStreet(value);
      break;
    case 'shippingCity':
      setShippingCity(value);
      break;
    case 'shippingPostalCode':
      setShippingPostalCode(value);
      break;
    case 'shippingCountry':
      setShippingCountry(value);
      break;
    default:
      break;
    
    }
  
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    //валидацию, если надо ещё, то добавлять сюда
    console.log(email, password, firstName, lastName, dateOfBirth);

    const shippingAddress = {
      streetName: shippingStreet,
      city: shippingCity,
      postalCode: shippingPostalCode,
      country: shippingCountry,
    };

    const billingAddress = {
      streetName: billingStreet,
      city: billingCity,
      postalCode: billingPostalCode,
      country: billingCountry, 
    };


    const payload = {
      email, password, firstName, lastName, dateOfBirth,
      addresses: [
        shippingAddress
      ],
      shippingAddress: [0],
      defaultShippingAddress: defaultShippingAddress ? 0 : undefined,
      billingAddress: [0],
      defaultBillingAddress: defaultBillingAddress ? 0 : undefined
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

  return (
    <CRegistrationForm />
  );

};
