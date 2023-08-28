import { useContext, useEffect, useState } from 'react';
import CButton from '../button/CButton';
import './CUserProfileForm.css';
import { GlobalContext } from '../../store/GlobalContext';
import CTextDateInput from '../inputs/textDateInput/CTextDateInput';
import useInput from '../../services/input/useInput';
import CEmail from '../inputs/email/CEmail';
import CUserAddresses from '../userAdresses/CUserAdresses';
import { IAddress, IChangePassword } from '../../utils/types';
import { useNavigate } from 'react-router';
import useUpdatePersonalInfo from '../../services/useUpdatePersonalInfo';
import { ToastContainer } from 'react-toastify';
import UseFormBlock from '../../services/useFormBlock';
import 'react-toastify/dist/ReactToastify.css';
import UseChangePassword from '../../services/useChangePassword';
import CPassword from '../inputs/password/CPassword';


export default function CUserProfileForm(): JSX.Element {
  
  const [globalStore, setGlobalStore] = useContext(GlobalContext);
  const [hasChanges, setHasChanges] = useState(false);
  const { updatePersonalInfo } = useUpdatePersonalInfo();
  const { changePassword } = UseChangePassword();
  const navigate = useNavigate();
  const dateOfBirth = useInput(`${globalStore.currentUser.dateOfBirth}`, 'date', undefined, setHasChanges);
  const lastName = useInput(`${globalStore.currentUser.lastName}`, 'text', undefined, setHasChanges);
  const firstName = useInput(`${globalStore.currentUser.firstName}`, 'text', undefined, setHasChanges);
  const email = useInput(globalStore.currentUser.email, 'email', undefined, setHasChanges);
  const currentPassword = useInput('', 'password', undefined, setHasChanges);
  const newPassword = useInput('', 'password', undefined, setHasChanges);
  
  useEffect(() => {

    if (!globalStore.currentUser.id) {

      navigate('/login');
    
    }

    globalStore.apiMeRoot?.me()
      .get()
      .execute()
      .then(data => {
        
        setGlobalStore({...globalStore, currentUser: data.body});
      
      });
        
  }, [globalStore.currentUser.lastModifiedAt]);

  const convertedAddresses: IAddress[] = globalStore.currentUser.addresses.map(address => ({
    id: address.id || '',
    streetName: address.streetName || '',
    postalCode: address.postalCode || '',
    city: address.city || '',
    country: address.country || '',
  }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    updatePersonalInfo(
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
    changePassword(
      email.value,
      updateData
    );

  };

  const isEmptyEvent = () => {

    currentPassword.changeHandler({
      target: { value: '' }
    } as React.ChangeEvent<HTMLInputElement>);
    newPassword.changeHandler({
      target: { value: '' }
    } as React.ChangeEvent<HTMLInputElement>);
  
  };

  
  if (!globalStore.currentUser.id) return <></>;
  
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
                type="submit"
                disabled={isPasswordBlockedByInfo}
                clickHandler={isEmptyEvent}
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