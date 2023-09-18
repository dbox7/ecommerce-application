import { IAddress, IChangePassword } from '../../utils/types';
import { useServerApi } from '../../services/useServerApi';
import UseFormBlock from '../../services/useFormBlock';
import useInput from '../../services/input/useInput';
import useInputChanges from '../../services/input/useInputChange';
import { useTypedSelector } from '../../store/hooks/useTypedSelector';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useShowMessage } from '../../services/useShowMessage';
import { msg } from '../../utils/constants';


import CButton from '../button/CButton';
import CTextDateInput from '../inputs/textDateInput/CTextDateInput';
import CEmail from '../inputs/email/CEmail';
import CUserAddresses from '../userAddresses/CUserAddresses';
import CPassword from '../inputs/password/CPassword';

import './CUserProfileForm.css';




const CUserProfileForm: React.FC = () => {
  
  const server = useServerApi();
  const showMessage = useShowMessage();
  const {currentUser} = useTypedSelector(state => state.user);

  useEffect(() => {

    server.getCustomer();
  
  },[currentUser.lastModifiedAt]);

  const currentPassword = useInput('', 'password');
  const newPassword = useInput('', 'password');

  const initFirstName = useInputChanges(`${currentUser.firstName}`);
  const initEmail = useInputChanges(`${currentUser.email}`);
  const initLastName = useInputChanges(`${currentUser.lastName}`);
  const initDateOfBirth = useInputChanges(`${currentUser.dateOfBirth}`);
  
  const dateOfBirth = useInput(initDateOfBirth.inputValue, 'date');
  const lastName = useInput(initLastName.inputValue, 'text');
  const firstName = useInput(initFirstName.inputValue, 'text');
  const email = useInput(initEmail.inputValue, 'email');


  const convertedAddresses: IAddress[] = currentUser.addresses.map(address => ({
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

  const isEmptyEvent = () => {

    currentPassword.changeHandler({
      target: { value: '' }
    } as React.ChangeEvent<HTMLInputElement>);
    newPassword.changeHandler({
      target: { value: '' }
    } as React.ChangeEvent<HTMLInputElement>);
  
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    
    const res = await server.UpdatePersonalInfo(
      currentUser.id,
      email.value,
      firstName.value,
      lastName.value,
      dateOfBirth.value,
      currentUser.version
    );

    res === 'success' ?
      showMessage(msg.PERSONAL_INFO_CHANGE_SUCCESS)
      :
      showMessage(msg.PERSONAL_INFO_CHANGE_ERROR);
  
  };

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    const updateData: IChangePassword = {
      id: currentUser.id,
      currentPassword: currentPassword.value,
      newPassword: newPassword.value,
      version: currentUser.version
    };

    e.preventDefault();
    
    const res = await server.ChangePassword(
      email.value,
      updateData
    );
    
    res === 'success' ?
      showMessage(msg.PASSWORD_CHANGE_SUCCESS)
      :
      showMessage(msg.PASSWORD_CHANGE_ERROR);


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
          {currentUser.shippingAddressIds &&
          currentUser.billingAddressIds && (
            <CUserAddresses
              addresses={convertedAddresses}
              shippingAddressIds={currentUser.shippingAddressIds}
              billingAddressIds={currentUser.billingAddressIds}
              defaultShippingAddressIds={currentUser.defaultShippingAddressId}
              defaultBillingAddressIds={currentUser.defaultBillingAddressId}
            />
          )}
        </section>
      </div>
      
    </div>
  );

};

export default CUserProfileForm;