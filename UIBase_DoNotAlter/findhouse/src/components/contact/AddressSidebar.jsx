import Social from "../common/footer/Social";

const AddressSidebar = () => {
  return (
    <>
      <div className="row mt-5 mb-5" style={{position:'relative', zIndex:'10'}}>
        {/* <div className="col-lg-3 contact_localtion" style={{boxShadow:'0px 0px 50px 0px rgba(19, 19, 28, 0.12)'}}>
          <h4>Contact Us</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida
            quis libero eleifend ornare. habitasse platea dictumst.
          </p>
        </div> */}
        <div
          className="col-lg-3 contact_localtion"
          style={{
            boxShadow: "0px 0px 50px 0px rgba(19, 19, 28, 0.12)",
            marginLeft: "12px",
          }}
        >
          <h5>Address</h5>
          <p>XYZ street Model Town British Columbia Canada Pin Code 123456</p>
        </div>
        <div
          className="col-lg-3 contact_localtion"
          style={{
            boxShadow: "0px 0px 50px 0px rgba(19, 19, 28, 0.12)",
            marginLeft: "50px",
          }}
        >
          <h5>Phone</h5>
          <p>XXXXXXXXXX</p>
          <h5>Mail</h5>
          <p>XYZ@ABC.com</p>
        </div>

        <div
          className="col-lg-3 contact_localtion"
          style={{
            boxShadow: "0px 0px 50px 0px rgba(19, 19, 28, 0.12)",
            marginLeft: "50px",
          }}
        >
          <h5>Skype</h5>
          <p>xyz.com</p>
          <h5>Follow Us</h5>
          <ul className="contact_form_social_area">
            <Social />
          </ul>
        </div>
      </div>
    </>
  );
};

export default AddressSidebar;
