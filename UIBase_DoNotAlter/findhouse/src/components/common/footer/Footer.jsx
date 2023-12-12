import Link from "next/link";
import Social from "./Social";
// import SubscribeForm from "./SubscribeForm";

const Footer = () => {
  return (
    <>
      <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3 pr0 pl0">
        <div className="footer_about_widget">
          <h4>About Appraisal Link</h4>
          <p>
            We are a Ontario based buisness working with brokers and appraisers
            providing services in real estate sector.
          </p>
        </div>
      </div>
      {/* End .col */}

      <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3">
        <div className="footer_qlink_widget">
          <h4>Quick Links</h4>
          <ul className="list-unstyled">
            <li>
              <Link href="/about-us">About Us</Link>
            </li>
            <li>
              <Link href="/terms">Terms & Conditions</Link>
            </li>
            {/* <li>
              <Link href="/">User&apos;s Guide</Link>
            </li> */}
            <li>
              <Link href="/contact">Support Center</Link>
            </li>
            <li>
              <Link href="/faq">FAQ&apos;s</Link>
            </li>
          </ul>
        </div>
      </div>
      {/* End .col */}

      <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3">
        <div className="footer_contact_widget">
          <h4>Contact Us</h4>
          <ul className="list-unstyled">
            <li>
              <a href="#">123 Main Street</a>
            </li>
            <li>
              <a href="#">Brampton, LX23Y2, Ontario</a>
            </li>
            <li>
              <Link href="mailto:info@appraisallink.ca">info@appraisallink.ca</Link>
            </li>
            <li>
              <a href="tel:+13020001111">+1 302-000-1111</a>
            </li>
          </ul>
        </div>
      </div>
      {/* End .col */}

      <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3">
        <div className="footer_social_widget">
          <h4>Follow us</h4>
          <ul className="mb30">
            <Social />
          </ul>
          {/* <h4>Subscribe</h4>
          <SubscribeForm /> */}
        </div>
      </div>
    </>
  );
};

export default Footer;
