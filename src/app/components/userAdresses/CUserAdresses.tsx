import { IAdressProps } from '../../utils/types';

const CUserAddresses: React.FC<IAdressProps> = ({ 
  addresses,
  shippingAddressIds,
  billingAddressIds,
  defaultShippingAddressIds,
  defaultBillingAddressIds
}) => {

  return (
    <div>
      <h2>User Addresses</h2>
      <ul className="address-list">
        {addresses.map(address => (
          <li className="address-item"
            key={address.id}>
            <span>
              {address.id && shippingAddressIds.includes(address.id)
                ? 'Shipping'
                : address.id && billingAddressIds.includes(address.id)
                  ? 'Billing'
                  : 'Unknown'} Address
            </span>
            <span>
              {address.id && defaultShippingAddressIds && defaultShippingAddressIds.includes(address.id)
                ? 'Default'
                : address.id && defaultBillingAddressIds && defaultBillingAddressIds.includes(address.id)
                  ? 'Dufault'
                  : ''}
            </span>
            <div className="param-value">Street: {address.streetName}</div>
            <div className="param-value">Postal Code: {address.postalCode}</div>
            <div className="param-value">City: {address.city}</div>
            <div className="param-value">Country: {address.country}</div>
          </li>
        ))}
      </ul>
    </div>
  );

};

export default CUserAddresses;