import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CButton from '../button/CButton';
import './CUserProfileForm.css';
import { GlobalContext } from '../../store/GlobalContext';
import CTextDateInput from '../inputs/textDateInput/CTextDateInput';
import useInput from '../../services/input/useInput';
import CEmail from '../inputs/email/CEmail';


export const CUserProfileForm = () => {
  
  const [globalStore] = useContext(GlobalContext);
  const dataOfBirth = useInput('', 'date');
  const lastName = useInput('', 'text');
  const firstName = useInput('', 'text');
  const email = useInput('', 'email');
  
  


  function handleSubmit() {}

  return (
    <div>
      <h1>User profile</h1>
      <section>
        <h2>Personal information</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <CEmail
              {...email}
              value={globalStore.currentUser.email}
            />
          </div>
          <div className="input-block">
            <CTextDateInput
              {...firstName}
              title="First name"
              value={globalStore.currentUser.firstName || ''}
            />
          </div>
          <div className="input-block">
            <CTextDateInput
              {...lastName}
              title="Last name"
              value={globalStore.currentUser.lastName || ''}
            />
          </div>
          <div className="input-block">
            <CTextDateInput
              {...dataOfBirth}
              value={globalStore.currentUser.dateOfBirth || ''}
              title="Date of birth"
              data={null}
              isDate={true}
            />
          </div>
          <CButton
            value="Save changes"
            type="submit"
            disabled={false}
          />
        </form>
      </section>
      <section>
        <h2>User addresses</h2>
        <ul className="address-list">
          <li className="address-item">
            <span>Default</span>
            <div className="param-title">The shipping address</div>
            <div className="param-value">{globalStore.currentUser.defaultShippingAddressId}</div>
          </li>
          <li className="address-item">
            <span>Default</span>
            <div className="param-title">The billing addres:</div>
            <div className="param-value">{globalStore.currentUser.defaultBillingAddressId}</div>
          </li>
          {globalStore.currentUser.shippingAddressIds && globalStore.currentUser.shippingAddressIds.length > 0
          && globalStore.currentUser.defaultShippingAddressId !== globalStore.currentUser.shippingAddressIds[0] && (
            <li className="address-item">
              <div className="param-title">The shipping address</div>
              <div className="param-value">{globalStore.currentUser.shippingAddressIds[0]}</div>
            </li>)}
          {globalStore.currentUser.billingAddressIds && globalStore.currentUser.billingAddressIds.length > 0
          && globalStore.currentUser.defaultShippingAddressId !== globalStore.currentUser.billingAddressIds[0] && (
            <li className="address-item">
              <div className="param-title">The billing address</div>
              <div className="param-value">{globalStore.currentUser.billingAddressIds[0]}</div>
            </li>)}
        </ul>
        <button>Edit</button>
      </section>
    </div>
  );

};