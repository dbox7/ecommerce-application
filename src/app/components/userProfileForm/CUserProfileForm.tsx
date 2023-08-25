import { useContext, useEffect, useState } from 'react';
import CButton from '../button/CButton';
import './CUserProfileForm.css';
import { GlobalContext } from '../../store/GlobalContext';
import CTextDateInput from '../inputs/textDateInput/CTextDateInput';
import useInput from '../../services/input/useInput';
import CEmail from '../inputs/email/CEmail';
import CUserAddresses from '../userAdresses/CUserAdresses';
import { IAddress } from '../../utils/types';
import { useNavigate } from 'react-router';
import useUpdatePersonalInfo from '../../services/useUpdatePersonalInfo';
import { ToastContainer, toast } from 'react-toastify';
import UseFormBlock from '../../services/useFormBlock';
import 'react-toastify/dist/ReactToastify.css';


export default function CUserProfileForm(): JSX.Element {
  
  const [globalStore, setGlobalStore] = useContext(GlobalContext);
  const [hasChanges, setHasChanges] = useState(false);
  const { updatePersonalInfo, error } = useUpdatePersonalInfo();
  const navigate = useNavigate();
  const dateOfBirth = useInput(`${globalStore.currentUser.dateOfBirth}`, 'date', undefined, setHasChanges);
  const lastName = useInput(`${globalStore.currentUser.lastName}`, 'text', undefined, setHasChanges);
  const firstName = useInput(`${globalStore.currentUser.firstName}`, 'text', undefined, setHasChanges);
  const email = useInput(`${globalStore.currentUser.email}`, 'email', undefined, setHasChanges);
  const notify = () => error ? toast.error('An error occurred while updating personal information.')
    : toast.success('Your profile has been updated successfully!');
  
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

  console.log(isFormBlockedByInfo);


  return (
    <div className="profile-wrap">
      <h1 className="sub-title">User profile</h1>
      <div className="profile-block">
        <section>
          <h2>Personal information</h2>
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
              clickHandler={notify}
              type="submit"
              disabled={!isFormBlockedByInfo && hasChanges ?
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