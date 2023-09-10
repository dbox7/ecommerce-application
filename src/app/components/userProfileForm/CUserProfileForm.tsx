import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../store/GlobalContext';
import { IAddress, IChangePassword } from '../../utils/types';
import { useServerApi } from '../../services/useServerApi';
import { useNavigate } from 'react-router-dom';
import UseFormBlock from '../../services/useFormBlock';
import useInput from '../../services/input/useInput';
import useInputChanges from '../../services/input/useInputChange';

import CButton from '../button/CButton';
import CTextDateInput from '../inputs/textDateInput/CTextDateInput';
import CEmail from '../inputs/email/CEmail';
import CUserAddresses from '../userAddresses/CUserAddresses';
import CPassword from '../inputs/password/CPassword';

import './CUserProfileForm.css';

const CUserProfileForm: React.FC = () => {
  
  const [globalStore] = useContext(GlobalContext);

  const server = useServerApi();
  const navigate = useNavigate();
  const currentPassword = useInput('', 'password');
  const newPassword = useInput('', 'password');

  const initFirstName = useInputChanges(`${globalStore.currentUser.firstName}`);
  const initEmail = useInputChanges(`${globalStore.currentUser.email}`);
  const initLastName = useInputChanges(`${globalStore.currentUser.lastName}`);
  const initDateOfBirth = useInputChanges(`${globalStore.currentUser.dateOfBirth}`);
  
  const dateOfBirth = useInput(initDateOfBirth.inputValue, 'date');
  const lastName = useInput(initLastName.inputValue, 'text');
  const firstName = useInput(initFirstName.inputValue, 'text');
  const email = useInput(initEmail.inputValue, 'email');

  const convertedAddresses: IAddress[] = globalStore.currentUser.addresses.map(address => ({
    id: address.id || '',
    streetName: address.streetName || '',
    postalCode: address.postalCode || '',
    city: address.city || '',
    country: address.country || '',
  }));

  const isPasswordBlockedByInfo = UseFormBlock([
    newPassword.valid.isNotEmpty!,
    newPassword.valid.isMinLength!,
    newPassword.valid.isPasswordGood!,
    currentPassword.valid.isNotEmpty!,
    currentPassword.valid.isMinLength!,
    currentPassword.valid.isPasswordGood!,
  ]);
  
  useEffect(() => {

    if (!globalStore.currentUser.id) {

      navigate('/login');
    
    }

    server.getCustomer();

  }, [globalStore.currentUser.lastModifiedAt]);

  const isEmptyEvent = () => {

    currentPassword.changeHandler({
      target: { value: '' }
    } as React.ChangeEvent<HTMLInputElement>);
    newPassword.changeHandler({
      target: { value: '' }
    } as React.ChangeEvent<HTMLInputElement>);
  
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    
    server.UpdatePersonalInfo(
      globalStore.currentUser.id,
      email.value,
      firstName.value,
      lastName.value,
      dateOfBirth.value,
      globalStore.currentUser.version
    );
  
  };

  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    const updateData: IChangePassword = {
      id: globalStore.currentUser.id,
      currentPassword: currentPassword.value,
      newPassword: newPassword.value,
      version: globalStore.currentUser.version
    };

    e.preventDefault();
    
    server.ChangePassword(
      email.value,
      updateData
    );
    
    isEmptyEvent();

  };

  const isFormBlockedByInfo = UseFormBlock([
    email.valid.isNotEmpty!,
    email.valid.isEmailGood!,
    dateOfBirth.valid.isDateGood!,
    firstName.valid.isNotEmpty!,
    firstName.valid.isTextGood!,
    lastName.valid.isNotEmpty!,
    lastName.valid.isTextGood!,
  ]);

  const anyInputChanged =
  initFirstName.hasChanged ||
  initLastName.hasChanged ||
  initEmail.hasChanged ||
  initDateOfBirth.hasChanged;


  return (
    <div className="profile-wrap">
      <h1 className="sub-title">User profile</h1>
      <div className="profile-block">
        <section>
          <div className="personal-info">
            <h3>Personal information</h3>
            <form onSubmit={handleSubmit}>
              <div className="input-block">
                <CEmail
                  {...email}
                  className="profile-input"
                  changeHandler={(e) => {

                    email.changeHandler(e);
                    initEmail.handleInputChange(e);
                  
                  }}
                />
              </div>
              <div className="input-block">
                <CTextDateInput
                  {...firstName}
                  className="profile-input"
                  title="First name"
                  changeHandler={(e) => {

                    firstName.changeHandler(e);
                    initFirstName.handleInputChange(e);
                  
                  }}
                />
              </div>
              <div className="input-block">
                <CTextDateInput
                  {...lastName}
                  className="profile-input"
                  title="Last name"
                  changeHandler={(e) => {

                    lastName.changeHandler(e);
                    initLastName.handleInputChange(e);
                  
                  }}
                />
              </div>
              <div className="input-block">
                <CTextDateInput
                  className="profile-input"
                  {...dateOfBirth}
                  title="Date of birth"
                  data={null}
                  isDate={true}
                  changeHandler={(e) => {

                    dateOfBirth.changeHandler(e);
                    initDateOfBirth.handleInputChange(e);
                  
                  }}
                />
              </div>
              <CButton
                value="Save changes"
                type="submit"
                disabled={!isFormBlockedByInfo && !anyInputChanged ?
                  !anyInputChanged: isFormBlockedByInfo}
              />
            </form>
          </div>
          <div className="password-change">
            <h3>Change password</h3>
            <form onSubmit={handlePasswordSubmit}>
              <div className="input-block">
                <CPassword
                  {...currentPassword}
                  className="profile-input"
                  title="Current password"
                />
              </div>
              <div className="input-block">
                <CPassword
                  {...newPassword}
                  className="profile-input"
                  title="New password"
                />
              </div>
              <CButton
                value="Save changes"
                type="submit"
                disabled={isPasswordBlockedByInfo}
              />
            </form>
          </div>
        </section>
        <section>
          {globalStore.currentUser.shippingAddressIds &&
          globalStore.currentUser.billingAddressIds && (
            <CUserAddresses
              addresses={convertedAddresses}
              shippingAddressIds={globalStore.currentUser.shippingAddressIds}
              billingAddressIds={globalStore.currentUser.billingAddressIds}
              defaultShippingAddressIds={globalStore.currentUser.defaultShippingAddressId}
              defaultBillingAddressIds={globalStore.currentUser.defaultBillingAddressId}
            />
          )}
        </section>
      </div>
      
    </div>
  );

};

export default CUserProfileForm;