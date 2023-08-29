import './AboutUsPage.css';

export const AboutUsPage = () => {

  return (

    <div className="container">
      <div className="content about">
        <h1 className="about-page-title">About Us</h1>
        <div className="about-page-text">
          <p>Hey there, <b>username!</b></p>
          <br/>
          <p>We're a team of young web developers, united by a common goal: to create 
            an educational project for <b>RS-School</b>. This project is not only our 
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
            drop us a line through the <b>"Contact Us"</b> page.</p>
          <br/>
          <p>Best regards,</p>
          <p>The <b>"JS do IT"</b> Team</p>
        </div>
      </div>
    </div>

  );

};