import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTypedSelector } from '../../store/hooks/useTypedSelector';

import { CDeveloperCard } from '../../components/developers/card/CDeveloperCard';
import { developers } from '../../utils/constants';

import './AboutUsPage.css';


export const AboutUsPage: FC = () => {

  const { currentUser } = useTypedSelector(state => state.user);
  const user = currentUser;

  return (
    <div className="about__content">
      <h1 className="about__content__title">About Us</h1>
      <div className="about__content__text">
        {user.firstName ? 
          <p>Hey there,&nbsp; 
            <Link to="/profile/:user" className="about__content__text__text-link" target="_blank">
              <b>{user.firstName}!</b>
            </Link>
          </p> :
          <p>Hey there,&nbsp; 
            <Link to="/signup" className="about__content__text__text-link" target="_blank">
              <b>username!</b>
            </Link>
          </p>
        }
        <br/>
        <p>We're a team of young web developers, united by a common goal: to create 
          an educational project for&nbsp;
        <b>
            <Link to="https://rs.school/" className="about__content__text__text-link" target="_blank"> 
            RS-School
          </Link>
          </b>. 
          This project is not only our first experience of collaboration but also our first foray into React development.
        </p>
        <br/>
        <p>Inspired by cutting-edge technologies, we also decided to utilize 
          artificial intelligence tools. With the help of ChatGPT, 
          we crafted informative product descriptions to enrich our content. 
          And speaking of Midjorney – it's our idol when it comes to visual creation, 
          adding that "wow" factor to our products.</p>
        <br/>
        <h2 className="about__content__sub-title">Who are we</h2> 
        <div className="about__content__team">
          {developers.map((developer, index) => <CDeveloperCard key={index} developer={developer} />)}
        </div>
        <h2 className="about__content__sub-title">How we did IT</h2>
        <p>Despite the fact that the three of us were not acquainted before the project began, 
          it didn't hinder us from finding common ground. 
          We quickly understood each other's strengths and weaknesses, which helped us navigate 
          through all the challenges of team development.</p><br/>
        <p>The most challenging part of the project was dealing with the Commercetools platform 
          and its SDK, and we often laughed at how difficult it was to decipher their documentation. 
          Nevertheless, gradually, we arrived at more optimal solutions for the project: 
          the API root was rewritten three times, Redux was added, and a comprehensive code refactoring 
          was carried out. Additionally, this project helped us gain confidence in working with Git. 
          By the way, the code for our application is available at the following link.</p><br/>
        <p>We're open to feedback and value diverse perspectives. If you have suggestions or observations, let us know. 
          The&nbsp;
        <b><Link to="/contacts" 
            className="about__content__text__text-link" 
            target="_blank">"Contacts"
          </Link></b> page is just a joke, so please reach out to us through the links on the cards.</p>
        <br/>
        <p>Best regards,</p>
        <p>The <b>"JS do IT"</b> Team</p>
        <Link to="https://rs.school/" target="_blank"><div className="about__content__text__school-logo"></div></Link>
      </div>
    </div>
  );

};