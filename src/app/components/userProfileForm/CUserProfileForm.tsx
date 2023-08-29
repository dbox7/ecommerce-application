import { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../store/GlobalContext';
import { IAddress, IChangePassword } from '../../utils/types';
import { ToastContainer, toast } from 'react-toastify';
import { useServerApi } from '../../services/useServerApi';
import { useNavigate } from 'react-router-dom';
import UseFormBlock from '../../services/useFormBlock';
import useInput from '../../services/input/useInput';
// import useUpdatePersonalInfo from '../../services/useUpdatePersonalInfo';
// import UseChangePassword from '../../services/useChangePassword';

import CButton from '../button/CButton';
import CTextDateInput from '../inputs/textDateInput/CTextDateInput';
import CEmail from '../inputs/email/CEmail';
import CUserAddresses from '../userAdresses/CUserAdresses';
import CPassword from '../inputs/password/CPassword';

import './CUserProfileForm.css';
import 'react-toastify/dist/ReactToastify.css';

const CUserProfileForm: React.FC = () => {
  
  const [globalStore] = useContext(GlobalContext);
  const [hasChanges, setHasChanges] = useState(false);

  // const { updatePersonalInfo, error } = useUpdatePersonalInfo();
  // const { changePassword, err } = UseChangePassword();

  const server = useServerApi();
  const navigate = useNavigate();

  const dateOfBirth = useInput(`${globalStore.currentUser.dateOfBirth}`, 'date', setHasChanges);
  const lastName = useInput(`${globalStore.currentUser.lastName}`, 'text', setHasChanges);
  const firstName = useInput(`${globalStore.currentUser.firstName}`, 'text', setHasChanges);
  const email = useInput(`${globalStore.currentUser.email}`, 'email', setHasChanges);
  const currentPassword = useInput('', 'password', setHasChanges);
  const newPassword = useInput('', 'password', setHasChanges);

  const convertedAddresses: IAddress[] = globalStore.currentUser.addresses.map(address => ({
    id: address.id || '',
    streetName: address.streetName || '',
    postalCode: address.postalCode || '',
    city: address.city || '',
    country: address.country || '',
  }));

  const isFormBlockedByInfo = UseFormBlock([
    email.valid.isNotEmpty!,
    email.valid.isEmailGood!,
    dateOfBirth.valid.isDateGood!,
    firstName.valid.isNotEmpty!,
    firstName.valid.isTextGood!,
    lastName.valid.isNotEmpty!,
    lastName.valid.isTextGood!,
  ]);

  const isPasswordBlockedByInfo = UseFormBlock([
    newPassword.valid.isNotEmpty!,
    newPassword.valid.isMinLength!,
    newPassword.valid.isPasswordGood!,
    currentPassword.valid.isNotEmpty!,
    currentPassword.valid.isMinLength!,
    currentPassword.valid.isPasswordGood!,
  ]);

  // const notify = () => server.error.includes('personal') ? 
  // toast.error('An error occurred while updating personal information.')
  //   : 
  // toast.success('Your profile has been updated successfully!');
  // const notifyPassword = () => server.error.includes('password') ? 
  // toast.error('An error occurred while updating password.')
  //   : 
  // toast.success('Your password has been updated successfully!');

  const notify = (goodMsg: string) => {

    if (server.error) {

      server.error.includes('password') ? 
        toast.error('An error occurred while updating password.')
        :
        toast.error('An error occurred while updating personal information.');

    } else {

      toast.success(goodMsg);
    
    };

  };
  
  useEffect(() => {

    if (!globalStore.currentUser.id) {

      navigate('/login');
    
    }

  });

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

  };

  return (
    <div className="profile-wrap">
      <h1 className="sub-title">User profile</h1>
      <div className="profile-block">
        <section>
          <div>
            <h3>Personal information</h3>
            <form onSubmit={handleSubmit}>
              <div className="input-block">
                <CEmail
                  className="profile-input"
                  {...email}
                />
              </div>
              <div className="input-block">
                <CTextDateInput
                  {...firstName}
                  className="profile-input"
                  title="First name"
                />
              </div>
              <div className="input-block">
                <CTextDateInput
                  {...lastName}
                  className="profile-input"
                  title="Last name"
                />
              </div>
              <div className="input-block">
                <CTextDateInput
                  className="profile-input"
                  {...dateOfBirth}
                  title="Date of birth"
                  data={null}
                  isDate={true}
                />
              </div>
              <CButton
                value="Save changes"
                clickHandler={() => notify('An error occurred while updating personal information.')}
                type="submit"
                disabled={!isFormBlockedByInfo && !hasChanges ?
                  !hasChanges : isFormBlockedByInfo}
              />
              <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"/>
            </form>
          </div>
          <div>
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
                clickHandler={() => notify('Your password has been updated successfully!')}
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
          <CButton
            value="Edit"
            type="submit"
            disabled={false}
          />
        </section>
      </div>
      
    </div>
  );

};

export default CUserProfileForm;