import React, { useState } from 'react';
import SensitiveMessages from '../../SensetiveMessages';
import { apiRoot } from '../../ctp';
import { BaseAddress } from '@commercetools/platform-sdk';


const countries: string[] = ['USA', 'Canada', 'UK', 'Australia', 'Germany'];

export function SignUpPage(): JSX.Element {

  const [errorMsg, setErrorMsg] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [billingStreet, setBillingStreet] = useState('');
  const [billingCity, setBillingCity] = useState('');
  const [billingPostalCode, setBillingPostalCode] = useState('');
  const [billingCountry, setBillingCountry] = useState('');
  const [useBillingAddress, setUseBillingAddress] = useState(true);
  const [shippingStreet, setShippingStreet] = useState('');
  const [shippingCity, setShippingCity] = useState('');
  const [shippingPostalCode, setShippingPostalCode] = useState('');
  const [shippingCountry, setShippingCountry] = useState('');
  
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

    const payload = {
      email, password, firstName, lastName, dateOfBirth,
      addresses: [
        {
          streetName: shippingStreet,
          city: shippingCity,
          postalCode: shippingPostalCode,
          country: shippingCountry,
        } as BaseAddress,
        {
          streetName: billingStreet,
          city: billingCity,
          postalCode: billingPostalCode,
          country: billingCountry,  
        } as BaseAddress
      ]
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
    <div>
      <h1>Registration</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            title="A properly formatted email address (e.g., example@email.com)"
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            required
            minLength={8}
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$"
            title="Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number"
          />
        </div>
        <div>
          <label>First name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            required
          />
        </div>
        <div>
          <label>Last name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date of birth:</label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            required
          />
        </div>
        <p>Enter the shipping address:</p>
        <div>
          <label>Street:</label>
          <input
            type="text"
            value={shippingStreet}
            onChange={(e) => handleInputChange('shippingStreet', e.target.value)}
            required
          />
        </div>
        <div>
          <label>City:</label>
          <input
            type="text"
            value={shippingCity}
            onChange={(e) => handleInputChange('shippingCity', e.target.value)}
            required
          />
        </div>
        <div>
          <label>Postal code:</label>
          <input
            type="text"
            value={shippingPostalCode}
            onChange={(e) => handleInputChange('shippingPostalCode', e.target.value)}
            required
            pattern="^\d{5}(-\d{4})?$"
            title="Must follow the format for the country (e.g., 12345 or A1B 2C3 for the U.S. and Canada, respectively)"
          />
        </div>
        <div>
          <label>Country:</label>
          <input
            type="text"
            value={shippingCountry}
            onChange={(e) => handleInputChange('shippingCountry', e.target.value)}
            required
            list="country-list"
          />
          <datalist id="country-list">
            {countries.map((country) => (
              <option value={country} key={country} />
            ))}
          </datalist>
        </div>
        <div>
          <input
            type="checkbox"
            checked={useBillingAddress}
            onChange={handleCheckboxChange}
          />
          <label>The shipping address is the same as the billing address</label>
        </div>
        {!useBillingAddress && (
          <div>
            <p>Enter the billing address:</p>
            <div>
              <label>Street:</label>
              <input
                type="text"
                value={billingStreet}
                onChange={(e) => handleInputChange('billingStreet', e.target.value)}
                required
              />
            </div>
            <div>
              <label>City:</label>
              <input
                type="text"
                value={billingCity}
                onChange={(e) => handleInputChange('billingCity', e.target.value)}
                required
              />
            </div>
            <div>
              <label>Postal code:</label>
              <input
                type="text"
                value={billingPostalCode}
                onChange={(e) => handleInputChange('billingPostalCode', e.target.value)}
                required
                pattern="^\d{5}(-\d{4})?$"
                title="Must follow the format for the country (e.g., 12345 or A1B 2C3 for the U.S. and Canada, respectively)"
              />
            </div>
            <div>
              <label>Country:</label>
              <input
                type="text"
                value={billingCountry}
                onChange={(e) => handleInputChange('billingCountry', e.target.value)}
                required
                list="country-list"
              />
              <datalist id="country-list">
                {countries.map((country) => (
                  <option value={country} key={country} />
                ))}
              </datalist>
            </div>
          </div>
        )}
        <button type="submit">Register</button>
      </form>
    </div>
  );

};
