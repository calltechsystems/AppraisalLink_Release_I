import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const Form = () => {
  const [verified, setVerified] = useState(false);

  function onChange(value) {
    console.log("Captcha value:", value);
    setVerified(true);
  }

  return (
    <form className="contact_form" action="#">
      <div className="row">
        <div className="col-lg-12">
          <div className="row">
            <div className="col-md-6">
              <div className="row form-group">
                <div className="col-lg-4">
                  <label
                    htmlFor="first-name"
                    className="mt-3 text-dark fw-bold"
                  >
                    First Name <span class="req-btn">*</span>
                  </label>
                </div>
                <div className="col-lg-8">
                  <input
                    id="form_name"
                    name="form_name"
                    className="form-control"
                    required="required"
                    type="text"
                    maxLength={30}
                    style={{
                      // paddingTop: "15px",
                      // paddingBottom: "15px",
                      backgroundColor: "#E8F0FE",
                      // //color: "white",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row form-group">
                <div className="col-lg-4">
                  <label
                    htmlFor="first-name"
                    className="mt-3 text-dark fw-bold"
                  >
                    Last Name <span class="req-btn">*</span>
                  </label>
                </div>
                <div className="col-lg-8">
                  <input
                    id="form_name"
                    name="form_name"
                    className="form-control"
                    required="required"
                    type="text"
                    maxLength={30}
                    style={{
                      // paddingTop: "15px",
                      // paddingBottom: "15px",
                      backgroundColor: "#E8F0FE",
                      // //color: "white",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="row">
            <div className="col-md-6">
              <div className="row form-group">
                <div className="col-lg-4">
                  <label
                    htmlFor="first-name"
                    className="mt-3 text-dark fw-bold"
                  >
                    Email Address<span class="req-btn">*</span>
                  </label>
                </div>
                <div className="col-lg-8">
                  <input
                    id="form_email"
                    name="form_email"
                    className="form-control required email"
                    required="required"
                    type="email"
                    maxLength={30}
                    style={{
                      // paddingTop: "15px",
                      // paddingBottom: "15px",
                      backgroundColor: "#E8F0FE",
                      // //color: "white",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row form-group">
                <div className="col-lg-4">
                  <label
                    htmlFor="first-name"
                    className="mt-3 text-dark fw-bold"
                  >
                    Phone No. <span class="req-btn">*</span>
                  </label>
                </div>
                <div className="col-lg-8">
                  <input
                    id="form_phone"
                    name="form_phone"
                    className="form-control"
                    required="required"
                    type="number"
                    pattern="\d{1,10}"
                    style={{
                      // paddingTop: "15px",
                      // paddingBottom: "15px",
                      backgroundColor: "#E8F0FE",
                      // //color: "white",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="row">
            <div className="col-md-6">
              <div className="row form-group">
                <div className="col-lg-4">
                  <label
                    htmlFor="first-name"
                    className="mt-3 text-dark fw-bold"
                  >
                    Company <span class="req-btn"></span>
                  </label>
                </div>
                <div className="col-lg-8">
                  <input
                    id="form_subject"
                    name="form_subject"
                    className="form-control required"
                    type="text"
                    maxLength={30}
                    style={{
                      // paddingTop: "15px",
                      // paddingBottom: "15px",
                      backgroundColor: "#E8F0FE",
                      // //color: "white",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row form-group">
                <div className="col-lg-4">
                  <label
                    htmlFor="first-name"
                    className="mt-3 text-dark fw-bold"
                  >
                    Province <span class="req-btn"></span>
                  </label>
                </div>
                <div className="col-lg-8">
                  <input
                    id="form_subject"
                    name="form_subject"
                    className="form-control required"
                    type="text"
                    maxLength={30}
                    style={{
                      // paddingTop: "15px",
                      // paddingBottom: "15px",
                      backgroundColor: "#E8F0FE",
                      // //color: "white",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="row">
            <div className="col-md-12">
              <div className="row form-group">
                <div className="col-lg-2">
                  <label
                    htmlFor="first-name"
                    className="mt-2 text-dark fw-bold"
                  >
                    Subject <span class="req-btn">*</span>
                  </label>
                </div>
                <div className="col-lg-10">
                  <input
                    id="form_subject"
                    required
                    name="form_subject"
                    className="form-control required"
                    type="text"
                    maxLength={30}
                    style={{
                      // paddingTop: "15px",
                      // paddingBottom: "15px",
                      backgroundColor: "#E8F0FE",
                      // //color: "white",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="col-md-6">
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
        </div> */}
        {/* End .col */}

        {/* <div className="col-md-6">
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
        </div> */}
        {/* End .col */}

        {/* <div className="col-md-6">
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
        </div> */}
        {/* End .col */}

        {/* <div className="col-md-6">
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
        </div> */}
        {/* End .col */}

        {/* <div className="col-md-6">
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

        {/* <div className="col-md-6">
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
        </div> */}
        {/* End .col */}

        {/* <div className="col-md-12">
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
        </div> */}
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

        <div className="col-lg-12">
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
              maxLength={300}
              style={{
                // paddingTop: "15px",
                // paddingBottom: "15px",
                backgroundColor: "#E8F0FE",
                // //color: "white",
              }}
            ></textarea>
          </div>
          {/* End .col */}
        </div>
        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-6">
              <ReCAPTCHA
                sitekey="6LcyCiApAAAAAGqvFl6wWf8hqjDjO6ZyLuK4mmFe"
                onChange={onChange}
              />
            </div>
            <div
              className="col-lg-6 form-group my_profile_setting_input"
              style={{ textAlign: "end" }}
            >
              <button type="submit" className="btn btn2" disabled={!verified}>
                Submit
              </button>
            </div>
          </div>

          {/* End button submit */}
        </div>
      </div>
    </form>
  );
};

export default Form;
