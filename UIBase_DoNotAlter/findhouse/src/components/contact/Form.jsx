import ReCAPTCHA from "react-google-recaptcha";

// function onChange(value) {
//   console.log("Captcha value:", value);
// }

const Form = () => {
  return (
    <form className="contact_form" action="#">
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="first-name" className="mb-2 text-dark">
              First Name <span class="req-btn">*</span>
            </label>
            <input
              id="form_name"
              name="form_name"
              className="form-control"
              required="required"
              type="text"
              placeholder="First Name"
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="first-name" className="mb-2 text-dark">
              Last Name <span class="req-btn">*</span>
            </label>
            <input
              id="form_name"
              name="form_name"
              className="form-control"
              required="required"
              type="text"
              placeholder="Last Name"
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="first-name" className="mb-2 text-dark">
              Email Address <span class="req-btn">*</span>
            </label>
            <input
              id="form_email"
              name="form_email"
              className="form-control required email"
              required="required"
              type="text"
              placeholder="Email Address"
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="first-name" className="mb-2 text-dark">
              Phone Number <span class="req-btn">*</span>
            </label>
            <input
              id="form_phone"
              name="form_phone"
              className="form-control required phone"
              required="required"
              type="text"
              placeholder="Phone Number"
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="first-name" className="mb-2 text-dark">
              Company <span class="req-btn"></span>
            </label>
            <input
              id="form_subject"
              name="form_subject"
              className="form-control required"
              type="text"
              placeholder="Company"
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
            <label htmlFor="first-name" className="mb-2 text-dark">
              Province/State <span class="req-btn"></span>
            </label>
            <input
              id="form_subject"
              name="form_subject"
              className="form-control required"
              type="text"
              placeholder="Province/State"
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-md-12">
          <div className="form-group">
            <label htmlFor="first-name" className="mb-2 text-dark">
              Subject <span class="req-btn"></span>
            </label>
            <input
              id="form_subject"
              name="form_subject"
              className="form-control required"
              type="text"
              placeholder="Subject"
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
            <label htmlFor="first-name" className="mb-2 text-dark">
              How we can help you? <span class="req-btn">*</span>
            </label>
            <textarea
              id="form_message"
              name="form_message"
              className="form-control required"
              rows="4"
              required="required"
              placeholder="How we can help you?"
            ></textarea>
          </div>
          {/* End .col */}
          {/* <ReCAPTCHA sitekey="Your client site key" onChange={onChange} />, */}
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
