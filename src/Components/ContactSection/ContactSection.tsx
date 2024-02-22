import LangModel from "../../languageControl/Language";
import { whatsAppImg } from "../../utils/file-import";
import { emailImg } from "../../utils/file-import";
import { linkedinImg } from "../../utils/file-import";
import { phoneImg } from "../../utils/file-import";
import "./ContactSection.scss";

interface props {
  data: LangModel;
}

function ContactSection(props: props): JSX.Element {
  const message = encodeURIComponent('Hi Tom, I visited your "Hotix" project.');
  return (
    <div className="ContactSection">
      <h1 className="contact-header">Contact Us</h1>
      <p className="contact-paragraph">
        If you have any questions, feedback, or inquiries, I would love to hear
        from you! <br />
        Whether you're seeking assistance with the app's features, <br />
        encountering technical issues, or simply want to share your thoughts, I
        am always available! <br />
        Additionally, if you're looking for a developer for your team, feel free
        to reach out -
        <div className="contact-icons">
          <a
            href={`https://wa.me/+972525416514?text=${message}`}
            className="contact-btn"
          >
            <img src={whatsAppImg} alt="whatsapp" />
          </a>
          <a href="mailto:tomayos1997@gmail.com" className="contact-btn">
            <img src={emailImg} alt="email" />
          </a>
          <a
            href="https://www.linkedin.com/in/tom-amar-b2494a25a/"
            className="contact-btn"
          >
            <img src={linkedinImg} alt="linkedin" />
          </a>
          <a href="tel:+972525416514" className="contact-btn">
            <img src={phoneImg} alt="phone" className="phone-icon-img" />
          </a>
        </div>
        I am greatly appreciate your interest and look forward to connecting
        with you!
      </p>
    </div>
  );
}

export default ContactSection;
