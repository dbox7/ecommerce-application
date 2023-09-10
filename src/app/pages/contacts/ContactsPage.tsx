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
          <p><b>Company Name:</b> JS DO SNEAKERS, LLC</p>
          <p><b>Address:</b> 123 Main Street of Nothing, AZ 85001 United States</p>
          <p><b>Phone:</b> +1 (555) 555-5555</p>
          <p><b>Email:</b> info@jsdosneakers.com</p>
          <p><b>Website:</b> www.jsdosneakers.com</p>
          <p><b>Company Description:</b> JS do Sneakers - your reliable partner in the world of sneakers and athletic footwear. 
            We offer a wide range of sneakers from leading brands to meet all your athletic needs. 
            Our stores are located in the town of Nothing, Arizona, and we deliver products nationwide. 
            Whether you're into running, basketball, or any other sport, Sports Sneakers has the perfect pair of sneakers for you. 
            Additionally, some of our models are covered in the dust of legendary abandoned roads to add a unique charm to your style.
          </p>
          <p><b>Operating Hours:</b><br/>Monday - Friday: 9:00 AM - 6:00 PM<br/>Saturday: 10:00 AM - 4:00 PM<br/>Sunday: Closed</p>
          <p><b>Social Media:</b><br/>Facebook: @jsdosneakers<br/>Instagram: @jsdosneakers<br/>Twitter: @jsdosneakers</p>
          <p>Please note that these are fictional details and are not associated with any real company.</p>
        </div>
      </div>

    </div>

  );
  
};