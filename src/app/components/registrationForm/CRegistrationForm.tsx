import { apiRoot } from '../../ctp';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useInput from '../../services/customHooks/useInput';
import { COUNTRIES } from '../../utils/constants';
import CEmail from '../inputs/email/CEmail';
import CPassword from '../inputs/password/CPassword';
import CTextDateInput from '../inputs/textDateInput/CTextDateInput';
import CPostalCode from '../inputs/postalCode/CPostalCode';
import CCheckbox from '../inputs/checkbox/CCheckbox';
import CButton from '../button/CButton';
import CAlert from '../alert/CAlert';
import { CustomerDraft } from '@commercetools/platform-sdk';
import { GlobalContext } from '../contexts/GlobalContext';

import './CRegistrationForm.css';

const getCountryCode = (countryName: string) => {
  
  const res = COUNTRIES.find((item) => item.name === countryName);

  return res?.code;

};

export function CRegistrationForm() {

  const navigate = useNavigate();
  const [globalStore, setGlobalStore] = useContext(GlobalContext);
  const [errors, setErrors] = useState<String[]>([]);
  const [formBlocked, setFormBlocked] = useState(false);
  const [defaultShippingAddress, setDefaultShippingAddress] = useState(true);
  const [defaultBillingAddress, setDefaultBillingAddress] = useState(true);

  const [useBillingAddress, setUseBillingAddress] = useState(true);

  useEffect(() => { //если юзер есть, то перенаправляем на главную

    if (globalStore.currentUser.id) {

      navigate('/');
    
    }
    
  }, [globalStore, navigate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    setErrors([]);
    setFormBlocked(true);

    const shippingAddress = {
      streetName: shippingStreet.value,
      city: shippingCity.value,
      postalCode: shippingPostalCode.value,
      country: getCountryCode(shippingCountry.value),
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
      defaultBillingAddress: defaultBillingAddress ? 0 : undefined
    };

    apiRoot.customers()
      .post({body: payload as CustomerDraft })
      .execute()
      .then((data) => {

        setGlobalStore({...globalStore, currentUser: data.body.customer});
        navigate('/');
      
      })
      .catch((err) => {

        setErrors([...errors, err.message]);
        setFormBlocked(false);

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

  if (globalStore.currentUser.id) {

    return <></>;

  }

  return (
    <div className="substrate">
      <div className="sub-title">Registration</div>

      <CAlert messages={errors}></CAlert>

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
            <h4>Enter the shipping address:</h4>
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
              <h4>Enter the billing address:</h4>
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
          value={ formBlocked ? 'Please wait...' : 'Sign up' }
          disabled={formBlocked}
        />
      </form>
    </div>
  );

};

export default CRegistrationForm;

  