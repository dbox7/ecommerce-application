import { useContext } from 'react';
import CButton from '../button/CButton';
import './CUserProfileForm.css';
import { GlobalContext } from '../../store/GlobalContext';
import CTextDateInput from '../inputs/textDateInput/CTextDateInput';
import useInput from '../../services/input/useInput';
import CEmail from '../inputs/email/CEmail';
import CUserAddresses from '../userAdresses/CUserAdresses';
import { IAddress } from '../../utils/types';


export default function CUserProfileForm(): JSX.Element {
  
  const [globalStore] = useContext(GlobalContext);
  const dataOfBirth = useInput('', 'date');
  const lastName = useInput('', 'text');
  const firstName = useInput('', 'text');
  const email = useInput('', 'email');
  
  const convertedAddresses: IAddress[] = globalStore.currentUser.addresses.map(address => ({
    id: address.id || '',
    streetName: address.streetName || '',
    postalCode: address.postalCode || '',
    city: address.city || '',
    country: address.country || '',
  }));


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
  );

};