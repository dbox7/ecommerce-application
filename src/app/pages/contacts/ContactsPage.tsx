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
          <p><b>Company Name:</b> DUST SNEAKERS, LLC</p>
          <p><b>Address:</b> 123 Main Street of Nothing, AZ 85001 United States</p>
          <p><b>Phone:</b> +1 (555) 555-5555</p>
          <p><b>Email:</b> info@dust-sneakers.com</p>
          <p><b>Website:</b> www.dust-sneakers.com</p>
          <p><b>Company Description:</b> DUST Sneakers - your trusted companion in the realm of sneakers and athletic footwear. 
            We present an extensive selection of sneakers from top-tier brands to cater to all your athletic requirements. 
            Our establishments are nestled within the quaint township of Nothing, Arizona, while our nationwide delivery 
            ensures your convenience. Whether you're passionate about running, basketball, or any other sport, DUST Sneakers 
            offers the ideal pair of sneakers for your pursuits. Moreover, certain models within our collection are adorned 
            with the venerable dust of legendary forsaken pathways, infusing your style with a distinctive allure.
          </p>
          <p><b>Operating Hours:</b><br/>Monday - Friday: 9:00 AM - 6:00 PM<br/>Saturday: 10:00 AM - 4:00 PM<br/>Sunday: Closed</p>
          <p><b>Social Media:</b><br/>Facebook: @dustsneakers<br/>Instagram: @dustsneakers<br/>Twitter: @dustsneakers</p>
          <p>Please note that these are fictional details and are not associated with any real company.</p>
        </div>
      </div>

    </div>

  );
  
};