import { ChangeEventHandler, useContext, useEffect } from 'react';
import CButton from '../button/CButton';
import './CUserProfileForm.css';
import { GlobalContext } from '../../store/GlobalContext';
import CTextDateInput from '../inputs/textDateInput/CTextDateInput';
import useInput from '../../services/input/useInput';
import CEmail from '../inputs/email/CEmail';
import CUserAddresses from '../userAdresses/CUserAdresses';
import { IAddress } from '../../utils/types';
import { useNavigate } from 'react-router';


export default function CUserProfileForm(): JSX.Element {
  
  const [globalStore, setGlobalStore] = useContext(GlobalContext);
  const navigate = useNavigate();
  const dataOfBirth = useInput(`${globalStore.currentUser.dateOfBirth}`, 'date');
  const lastName = useInput(`${globalStore.currentUser.lastName}`, 'text');
  const firstName = useInput(`${globalStore.currentUser.firstName}`, 'text');
  const email = useInput(`${globalStore.currentUser.email}`, 'email');
  
  useEffect(() => {

    if (!globalStore.currentUser.id) {

      navigate('/login');
    
    }

    globalStore.apiMeRoot?.me()
      .get()
      .execute()
      .then(data => {

        console.log('Updated profile data', data.body);
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
  

  // const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (event) => {
  //   email.changeHandler(event.target.value);
  // };
  //  console.log(handleEmailChange);
  // const handleFirstNameChange: ChangeEventHandler<HTMLInputElement> = (event) => {
  //   firstName.changeHandler(event);
  // };

  // const handleLastNameChange: ChangeEventHandler<HTMLInputElement> = (event) => {
  //   lastName.changeHandler(event);
  // };

  // const handleDateOfBirthChange: ChangeEventHandler<HTMLInputElement> = (event) => {
  //   dataOfBirth.changeHandler(event);
  // };

  const handleSubmit = (event: React.FormEvent) => {

    event.preventDefault();
 
  };
  
  if (!globalStore.currentUser.id) return <></>;



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
                {...dataOfBirth}
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
          <button>Edit</button>
        </section>
      </div>
      
    </div>
  );

};