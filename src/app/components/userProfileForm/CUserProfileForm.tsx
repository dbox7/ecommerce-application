import { IAddress, IChangePassword } from '../../utils/types';
import { useServerApi } from '../../services/useServerApi';
import useInput from '../../services/input/useInput2';
import { useTypedSelector } from '../../store/hooks/useTypedSelector';
import { useEffect, FC } from 'react';
import { useShowMessage } from '../../services/useShowMessage';
import { checkRegExp, checkMinMax, isEmpty } from '../../utils/usefullFuncs';
import { 
  EmailREGEXP, 
  PasswordREGEXP, 
  TextREGEXP, 
  inputsInfo, 
  msg, 
  validError 
} from '../../utils/constants';

import CButton from '../button/CButton';
import CInput from '../inputs/CInput';
import CUserAddresses from '../userAddresses/CUserAddresses';

import './CUserProfileForm.css';


const CUserProfileForm: FC = () => {
  
  const server = useServerApi();
  const showMessage = useShowMessage();
  const {currentUser} = useTypedSelector(state => state.user);

  useEffect(() => {

    server.getCustomer();
  
  },[currentUser.lastModifiedAt]);

  const passData = {
    currentPassword: useInput(
      'password',
      [
        checkRegExp(PasswordREGEXP, validError.password), 
        checkMinMax([8], 'length')
      ]
    ),
    newPassword: useInput(
      'password',
      [
        checkRegExp(PasswordREGEXP, validError.password), 
        checkMinMax([8], 'length')
      ]
    )
  };

  const data = {
    email: useInput(
      'email', 
      [
        checkRegExp(EmailREGEXP, validError.email), 
        isEmpty()
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
  };

  const convertedAddresses: IAddress[] = currentUser.addresses.map(address => ({
    id: address.id || '',
    streetName: address.streetName || '',
    postalCode: address.postalCode || '',
    city: address.city || '',
    country: address.country || '',
  }));

  const isPasswordBlockedByInfo = Object.values(passData).some(item => item.errors.length > 0);
  const isFormBlockedByInfo = Object.values(data).some(item => item.errors.length > 0);

  const isEmptyEvent = () => {

    passData.currentPassword.changeHandler({
      target: { value: '' }
    } as React.ChangeEvent<HTMLInputElement>);
    passData.newPassword.changeHandler({
      target: { value: '' }
    } as React.ChangeEvent<HTMLInputElement>);
  
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    
    const res = await server.UpdatePersonalInfo(
      currentUser.id,
      data.email.value,
      data.firstName.value,
      data.lastName.value,
      data.dateOfBirth.value,
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
      currentPassword: passData.currentPassword.value,
      newPassword: passData.newPassword.value,
      version: currentUser.version
    };

    e.preventDefault();
    
    const res = await server.ChangePassword(
      data.email.value,
      updateData
    );
    
    res === 'success' ?
      showMessage(msg.PASSWORD_CHANGE_SUCCESS)
      :
      showMessage(msg.PASSWORD_CHANGE_ERROR);


    isEmptyEvent();

  };

  const anyInputChanged =
  data.firstName.hasChanged ||
  data.lastName.hasChanged ||
  data.email.hasChanged ||
  data.dateOfBirth.hasChanged;


  return (
    <div className="profile-wrap">
      <h1 className="sub-title">User profile</h1>
      <div className="profile-block">
        <section>
          <div className="personal-info">
            <h3>Personal information</h3>
            <form onSubmit={handleSubmit}>
              <div className="input-block">
                <CInput
                  {...data.email}
                  className="profile-input"
                  title="Email"
                  info={inputsInfo.email}
                />
              </div>
              <div className="input-block">
                <CInput
                  {...data.firstName}
                  className="profile-input"
                  title="First name"
                  info={inputsInfo.text}
                />
              </div>
              <div className="input-block">
                <CInput
                  {...data.lastName}
                  className="profile-input"
                  title="Last name"
                  info={inputsInfo.text}
                />
              </div>
              <div className="input-block">
                <CInput
                  {...data.dateOfBirth}
                  className="profile-input"
                  title="Date of birth"
                  info={inputsInfo.date}
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
                <CInput
                  {...passData.currentPassword}
                  className="profile-input"
                  title="Current password"
                  info={inputsInfo.password}
                />
              </div>
              <div className="input-block">
                <CInput
                  {...passData.newPassword}
                  className="profile-input"
                  title="New password"
                  info={inputsInfo.password}
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