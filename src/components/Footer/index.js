import github from "../../assets/images/github.svg";
import linkedin from "../../assets/images/linkedin.svg";
import mail from "../../assets/images/mail.svg";

export function Footer() {
  return (
    <footer className="footer">
      <span className="copy">&copy; 2023 Vinícius Rodrigues</span>
      <div className="icons-container">
        <a
          href="https://www.linkedin.com/in/vinicius-rodrigues-5897831b8/"
          className="icon-link"
          rel="noreferrer"
          target="_blank"
        >
          <img src={linkedin} alt="linkedin" className="linkedin" />
        </a>
        <a
          href="https://github.com/viniscode"
          className="icon-link"
          rel="noreferrer"
          target="_blank"
        >
          <img src={github} alt="github" className="github" />
        </a>
        <a
          href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=viniciuskauarodriguesdev@gmail.com"
          rel="noreferrer"
          target="_blank"
          className="icon-link"
        >
          <img src={mail} alt="e-mail" className="mail" />
        </a>
      </div>
    </footer>
  );
}
