import React, { useState } from 'react';

const countries: string[] = ['USA', 'Canada', 'UK', 'Australia', 'Germany'];

export function RegistrationPage(): JSX.Element {

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

  const handleCheckboxChange = () => {

    setUseBillingAddress(!useBillingAddress);
  
  };

  return (
    <div>
      <h1>Registration</h1>
      <form>
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
