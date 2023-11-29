import ReCAPTCHA from "react-google-recaptcha";

function onChange(value) {
  console.log("Captcha value:", value);
}

const Form = () => {
  return (
    <form className="contact_form" action="#">
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="first-name" className="mb-2 text-dark fw-bold">
              First Name <span class="req-btn">*</span>
            </label>
            <input
              id="form_name"
              name="form_name"
              className="form-control"
              required="required"
              type="text"
              style={{
                // paddingTop: "15px",
                // paddingBottom: "15px",
                backgroundColor: "#E8F0FE",
                // //color: "white",
              }}
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="first-name" className="mb-2 text-dark fw-bold">
              Last Name <span class="req-btn">*</span>
            </label>
            <input
              id="form_name"
              name="form_name"
              className="form-control"
              required="required"
              type="text"
              style={{
                // paddingTop: "15px",
                // paddingBottom: "15px",
                backgroundColor: "#E8F0FE",
                // //color: "white",
              }}
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="first-name" className="mb-2 text-dark fw-bold">
              Email Address <span class="req-btn">*</span>
            </label>
            <input
              id="form_email"
              name="form_email"
              className="form-control required email"
              required="required"
              type="email"
              style={{
                // paddingTop: "15px",
                // paddingBottom: "15px",
                backgroundColor: "#E8F0FE",
                // //color: "white",
              }}
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="first-name" className="mb-2 text-dark fw-bold">
              Phone Number <span class="req-btn">*</span>
            </label>
            <input
              id="form_phone"
              name="form_phone"
              className="form-control required phone"
              required="required"
              type="number"
              style={{
                // paddingTop: "15px",
                // paddingBottom: "15px",
                backgroundColor: "#E8F0FE",
                // //color: "white",
              }}
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="first-name" className="mb-2 text-dark fw-bold">
              Company <span class="req-btn"></span>
            </label>
            <input
              id="form_subject"
              name="form_subject"
              className="form-control required"
              type="text"
              style={{
                // paddingTop: "15px",
                // paddingBottom: "15px",
                backgroundColor: "#E8F0FE",
                // //color: "white",
              }}
            />
          </div>
        </div>
        {/* End .col */}

        {/* <div className="col-md-6">
          <div className="form-group">
            <input
              id="form_subject"
              name="form_subject"
              className="form-control required"
              required="required"
              type="text"
              placeholder="You are"
            />
          </div>
        </div> */}
        {/* End .col */}

        {/* <div className="col-md-6">
          <div className="form-group">
            <input
              id="form_subject"
              name="form_subject"
              className="form-control required"
              required="required"
              type="text"
              placeholder="Country"
            />
          </div>
        </div> */}
        {/* End .col */}

        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="first-name" className="mb-2 text-dark fw-bold">
              Province/State <span class="req-btn"></span>
            </label>
            <input
              id="form_subject"
              name="form_subject"
              className="form-control required"
              type="text"
              style={{
                // paddingTop: "15px",
                // paddingBottom: "15px",
                backgroundColor: "#E8F0FE",
                // //color: "white",
              }}
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-md-12">
          <div className="form-group">
            <label htmlFor="first-name" className="mb-2 text-dark fw-bold">
              Subject <span class="req-btn">*</span>
            </label>
            <input
              id="form_subject"
              required
              name="form_subject"
              className="form-control required"
              type="text"
              style={{
                // paddingTop: "15px",
                // paddingBottom: "15px",
                backgroundColor: "#E8F0FE",
                // //color: "white",
              }}
            />
          </div>
        </div>
        {/* End .col */}

        {/* <div className="col-md-12">
          <div className="form-group">
            <input
              id="form_subject"
              name="form_subject"
              className="form-control required"
              required="required"
              type="text"
              placeholder="How we can help you?"
            />
          </div>
        </div> */}
        {/* End .col */}

        <div className="col-sm-12">
          <div className="form-group">
            <label htmlFor="first-name" className="mb-2 text-dark fw-bold">
              Description <span class="req-btn">*</span>
            </label>
            <span style={{ fontSize: "12px" }}>(max. 300 words)</span>
            <textarea
              id="form_message"
              name="form_message"
              className="form-control required"
              rows="4"
              style={{
                // paddingTop: "15px",
                // paddingBottom: "15px",
                backgroundColor: "#E8F0FE",
                // //color: "white",
              }}
            ></textarea>
          </div>
          {/* End .col */}
          <ReCAPTCHA sitekey="6LcyCiApAAAAAGqvFl6wWf8hqjDjO6ZyLuK4mmFe" onChange={onChange} />,
          <div className="form-group mb0 text-end">
            <button type="submit" className="btn btn-lg btn-thm">
              Submit
            </button>
          </div>
          {/* End button submit */}
        </div>
      </div>
    </form>
  );
};

export default Form;
