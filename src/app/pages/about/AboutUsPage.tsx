import { Link } from 'react-router-dom';

import { PiGithubLogoLight } from 'react-icons/pi';
import { CiMail } from 'react-icons/ci';
import { PiTelegramLogoThin } from 'react-icons/pi';

import dbox7Photo from '../../assets/team/dbox7.jpeg';
import xu69uxPhoto from '../../assets/team/xu69ux.jpeg';
import GEKKOPhoto from '../../assets/team/GEKKO-ops.jpeg';

import './AboutUsPage.css';

export const AboutUsPage = () => {

  return (

    <div className="content about">
      <h1 className="about-page-title">About Us</h1>
      <div className="about-page-text">
        <p>Hey there, <b>username!</b></p>
        <br/>
        <p>We're a team of young web developers, united by a common goal: to create 
          an educational project for <b><Link to="https://rs.school/" target="_blank">RS-School</Link></b>. This project is not only our 
          first experience of collaboration but also our first foray into React development.</p>
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
          drop us a line through the <b><Link to="/contacts">"Contact Us"</Link></b> page.</p>
        <br/>
        <p>Best regards,</p>
        <p>The <b>"JS do IT"</b> Team</p>
        <Link to="https://rs.school/" target="_blank"><div className="school-logo"></div></Link>
      </div>
      <div className="about-page-team">
        <div className="developer-card">
          <div className="developer-image">
            <img src={dbox7Photo} alt="avatar" />
          </div>
          <div className="developer-info">
            <h2>Dmitry Korobka</h2>
            <p>Team Lead and Design</p>
            <p>Hi, I'm Dmitry. I'm a web developer with a background in
              JavaScript and React. I'm also a UI/UX enthusiast.
              My hobbies include music, cinema, and video games.
            </p>
            <div className="social-icons">
              <a href="https://t.me/dbox7">
                <PiTelegramLogoThin className="icon-telegram"/>
              </a>
              <a href="https://github.com/dbox7">
                <PiGithubLogoLight className="icon-git"/>
              </a>
              <a href="mailto:dbox.insight@gmail.com">
                <CiMail className="icon-mail"/>
              </a>
            </div>
          </div>
        </div>

        <div className="developer-card">
          <div className="developer-image">
            <img src={xu69uxPhoto} alt="avatar" />
          </div>
          <div className="developer-info">
            <h2>Kseniya Spiridonova</h2>
            <p>Prompt Engineer and developer</p>
            <p>Hi, I'm Xu. I'm a web developer with a background in
              JavaScript and React. I'm also a UI/UX enthusiast.
              My hobbies include music, cinema, and video games.
            </p>
            <div className="social-icons">
              <a href="https://t.me/xu69ux">
                <PiTelegramLogoThin className="icon-telegram"/>
              </a>
              <a href="https://github.com/xu69ux">
                <PiGithubLogoLight className="icon-git"/>
              </a>
              <a href="mailto:spiridonova.kseniya@gmail.com">
                <CiMail className="icon-mail"/>
              </a>
            </div>
          </div>
        </div>

        <div className="developer-card">
          <div className="developer-image">
            <img src={GEKKOPhoto} alt="avatar" />
          </div>
          <div className="developer-info">
            <h2>Artyom Mykoliuk</h2>
            <p>Back-end Engineer and developer</p>
            <p>Hi, I'm Artyom. I'm a web developer with a background in
              JavaScript and React. I'm also a UI/UX enthusiast.
              My hobbies include music, cinema, and video games.
            </p>
            <div className="social-icons">
              <a href="https://t.me/GEKKO33">
                <PiTelegramLogoThin className="icon-telegram"/>
              </a>
              <a href="https://github.com/GEKKO-ops">
                <PiGithubLogoLight className="icon-git"/>
              </a>
              <a href="mailto:dbox.insight@gmail.com">
                <CiMail className="icon-mail"/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

  );

};