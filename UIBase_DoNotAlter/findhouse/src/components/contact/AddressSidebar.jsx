import Social from "../common/footer/Social";

const AddressSidebar = () => {
  return (
    <>
      <div
        className="row mt-5 mb-5"
        style={{ position: "relative", zIndex: "10" }}
      >
        <div
          className="col-lg-3 contact_localtion m-3"
          style={{
            boxShadow: "0px 0px 50px 0px rgba(19, 19, 28, 0.12)",
            width: "251px",
          }}
        >
          <h4 className="text-center">Office</h4>
          <p>XYZ street Model Town British Columbia Canada <br /> Pin Code 123456</p>
        </div>
        <div
          className="col-lg-3 contact_localtion m-3"
          style={{
            boxShadow: "0px 0px 50px 0px rgba(19, 19, 28, 0.12)",
            width: "251px",
          }}
        >
          <h4 className="text-center">Hours</h4>
          <h5>Office Hours</h5>
          <p>Monday - Friday : 8:30 AM - 5 PM</p>
          <h5>Support Hours</h5>
          <p>Monday - Friday : 7 AM - 6 PM</p>
        </div>
        <div
          className="col-lg-3 contact_localtion m-3"
          style={{
            boxShadow: "0px 0px 50px 0px rgba(19, 19, 28, 0.12)",
            width: "251px",
          }}
        >
          <h4 className="text-center">Contact</h4>
          <p>XXXXXXXXXX</p>
          <h5>Customer Success</h5>
          <p>000-xxx-yyyy</p>
          <p>XYZ@ABC.com</p>
        </div>

        <div
          className="col-lg-3 contact_localtion m-3"
          style={{
            boxShadow: "0px 0px 50px 0px rgba(19, 19, 28, 0.12)",
            width: "251px",
          }}
        >
          <h4 className="text-center">Chat</h4>
          <p>Chat with us online !</p>
          <h5>Follow Us on !</h5>
          <ul className="contact_form_social_area">
            <Social />
          </ul>
        </div>
      </div>
    </>
  );
};

export default AddressSidebar;
