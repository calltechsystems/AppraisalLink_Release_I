import Link from "next/link";
import Image from "next/image";

const Form = () => {
  return (
    <div className="row">
      <div className="col-lg-6">
        <form action="#">
          <div className="heading text-center">
            <h3>Signup to your account</h3>
            <p className="text-center">
              Already have an account?{" "}
              <Link href="/login" className="text-thm">
                Login
              </Link>
            </p>
          </div>
          {/* End .heading */}

          <div className="col-lg-12">
            <div className="form-group input-group ui_kit_select_search mb-3">
              <select
                className="form-select"
                data-live-search="true"
                data-width="100%"
                style={{ paddingTop: "15px", paddingBottom: "15px" }}
              >
                <option value="">Choose User...</option>
                <option data-tokens="SelectRole">Mortgage Broker</option>
                <option data-tokens="Agent/Agency">Mortgage Brokerage</option>
                <option data-tokens="SingleUser">Appraiser</option>
                <option data-tokens="SingleUser">Appraiser Company</option>
              </select>
            </div>
          </div>
          {/* End from-group */}

          <div className="col-lg-12">
            <div className="form-group input-group  ">
              <input
                type="email"
                className="form-control"
                required
                placeholder="Email Address"
              />
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <i className="fa fa-envelope-o"></i>
                </div>
              </div>
            </div>
            {/* End .form-group */}
          </div>

          <div className="col-lg-12">
            <div className="form-group input-group  ">
              <input
                type="password"
                className="form-control"
                required
                placeholder="Create Password"
              />
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <i className="flaticon-password"></i>
                </div>
              </div>
            </div>
            {/* End .form-group */}
          </div>

          <div className="col-lg-12">
            <div className="form-group input-group  ">
              <input
                type="password"
                className="form-control"
                required
                placeholder="Confirm Password"
              />
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <i className="flaticon-password"></i>
                </div>
              </div>
            </div>
            {/* End .form-group */}
          </div>

          <div className="form-group form-check custom-checkbox mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              required
              id="terms"
            />
            <label
              className="form-check-label form-check-label"
              htmlFor="terms"
            >
              I have read and accept the Terms and Privacy Policy?
            </label>
          </div>
          {/* End .form-group */}

          <button type="submit" className="btn btn-log w-100 btn-thm">
            Sign Up
          </button>
          {/* login button */}

          {/* <div className="divide">
        <span className="lf_divider">Or</span>
        <hr />
      </div> */}
          {/* devider */}

        </form>
      </div>
      <div className="col-lg-6 col-xl-6">
        <div className="regstr_thumb">
          <Image
            width={357}
            height={659}
            className="img-fluid w100 h-100 cover"
            src="/assets/images/home/mobile-login-concept-illustration_114360-83.avif"
            alt="regstr.jpg"
          />
        </div>
      </div>
    </div>
  );
};

export default Form;
