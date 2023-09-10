import { GOOGLE_MAP } from '../../utils/constants';

import './ContactsPage.css';

export const ContactsPage = () => {

  return (

    <div className="contacts-page">
      <h1 className="contacts-page-title">Contacts</h1>
      <div className="contacts-page-content">
        <div className="contacts-page-map">
          <iframe title="google-map" src={GOOGLE_MAP} style={{border:0}} allowFullScreen loading="lazy"></iframe>
        </div>
        <div className="contacts-page-text">
          <p>Company Name: JS DO SNEAKERS, LLC</p>
          <p>Address:
            123 Main Street
            Phoenix, AZ 85001
            United States
          </p>
          <p>Phone: +1 (555) 555-5555</p>
          <p>Email: info@jsdosneakers.com</p>
          <p>Website: www.jsdosneakers.com</p>
          <p>Company Description: Sports Sneakers - your reliable partner in the world of sneakers and athletic footwear. 
            We offer a wide range of sneakers from leading brands to meet all your athletic needs. 
            Our stores are located in the heart of Phoenix, Arizona, and we deliver products nationwide. 
            Whether you're into running, basketball, or any other sport, Sports Sneakers has the perfect pair of sneakers for you.
          </p>
          <p>Operating Hours:
            Monday - Friday: 9:00 AM - 6:00 PM
            Saturday: 10:00 AM - 4:00 PM
            Sunday: Closed
          </p>
          <p>Social Media:
            Facebook: @jsdosneakers
            Instagram: @jsdosneakers
            Twitter: @jsdosneakers
          </p>
          <p>Please note that these are fictional details and are not associated with any real company.</p>
        </div>
      </div>

    </div>

  );
  
};