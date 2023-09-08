import Social from "../common/footer/Social";

const AddressSidebar = () => {
  return (
    <div className="contact_localtion">
      <h4>Contact Us</h4>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida quis
        libero eleifend ornare. habitasse platea dictumst.
      </p>
      <div className="content_list">
        <h5>Address</h5>
        <p>
        XYZ street Model Town British Columbia Canada Pin Code 123456
        </p>
      </div>
      <div className="content_list">
        <h5>Phone</h5>
        <p>XXXXXXXXXX</p>
      </div>
      <div className="content_list">
        <h5>Mail</h5>
        <p>XYZ@ABC.com</p>
      </div>
      <div className="content_list">
        <h5>Skype</h5>
        <p>xyz.com</p>
      </div>
      <h5>Follow Us</h5>
      <ul className="contact_form_social_area">
        <Social />
      </ul>
    </div>
  );
};

export default AddressSidebar;
