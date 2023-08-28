import './AboutUsPage.css';

export function AboutUsPage() {

  return (

    <div className="container">
      <div className="content about">
        <h1 className="about-page-title">About Us</h1>
        <div className="about-page-text">
          Hey there, username!<br/>

          We're a team of young web developers, united by a common goal: to create 
          an educational project for RS-School. This project is not only our 
          first experience of collaboration but also our first foray into React development.<br/>

          Inspired by cutting-edge technologies, we also decided to utilize 
          artificial intelligence tools. With the help of ChatGPT, 
          we crafted informative product descriptions to enrich our content. 
          And speaking of Midjorney – it's our idol when it comes to visual creation, 
          adding that "wow" factor to our products.<br/>

          We're open to feedback and value diverse perspectives. 
          If you have suggestions or observations, let us know. 
          Additionally, if you share our drive and propose collaboration, 
          drop us a line through the "Contact Us" page.<br/>
          
          Best regards,
          The "JS do IT" Team
        </div>
      </div>
    </div>

  );

}