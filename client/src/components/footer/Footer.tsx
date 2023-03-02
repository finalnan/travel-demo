import './Footer.scss';

const Footer = () => {
  return (
    <div className="footer__container">
      <div className="wrapper">
        <div className="col">
          <h2>FAQ</h2>
          <span>Where we are based</span>
          <span>How we operate</span>
          <span>Refund policy</span>
        </div>

        <div className="col">
          <h2>Contacts</h2>
          <span>(0123) - 12345678</span>
          <span>admin@admin.com</span>
          <span>Youtube</span>
        </div>

        <div className="col">
          <h2>Privacy</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam
            autem, dolor veritatis error architecto dolore velit voluptatum a
            animi quae enim magni obcaecati at, qui vero nihil explicabo illo
            beatae.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
