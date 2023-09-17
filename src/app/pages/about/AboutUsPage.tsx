import { Link } from 'react-router-dom';
import { useTypedSelector } from '../../store/hooks/useTypedSelector';

import { CDeveloperCard } from '../../components/developers/card/CDeveloperCard';
import { developers } from '../../utils/constants';

import './AboutUsPage.css';


export const AboutUsPage = () => {

  const { currentUser } = useTypedSelector(state => state.user);
  const user = currentUser;

  return (

    <div className="about__content">
      <h1 className="about__content__title">About Us</h1>
      <div className="about__content__text">
        {user.firstName ? 
          <p>Hey there, <b>{user.firstName}!</b></p> :
          <p>Hey there, <b>username!</b></p>
        }
        <br/>
        <p>We're a team of young web developers, united by a common goal: to create 
          an educational project for <b><Link to="https://rs.school/" target="_blank" className="text-link">RS-School</Link></b>. 
          This project is not only our first experience of collaboration but also our first foray into React development.
        </p>
        <br/>
        <p>Inspired by cutting-edge technologies, we also decided to utilize 
          artificial intelligence tools. With the help of ChatGPT, 
          we crafted informative product descriptions to enrich our content. 
          And speaking of Midjorney – it's our idol when it comes to visual creation, 
          adding that "wow" factor to our products.</p>
        <br/>
        <p>We're open to feedback and value diverse perspectives. 
          If you have suggestions or observations, let us know. 
          Additionally, if you share our drive and propose collaboration, 
          drop us a line through the <b><Link to="/contacts" className="about__content__text__text-link">"Contact Us"</Link></b> page.</p>
        <br/>
        <p>Best regards,</p>
        <p>The <b>"JS do IT"</b> Team</p>
        <Link to="https://rs.school/" target="_blank"><div className="about__content__text__school-logo"></div></Link>
      </div>
      <div className="about__content__team">
        {developers.map((developer, index) => <CDeveloperCard key={index} developer={developer} />)}
      </div>
    </div>

  );

};