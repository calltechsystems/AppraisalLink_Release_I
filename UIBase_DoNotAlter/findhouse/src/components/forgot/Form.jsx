import Link from "next/link";
import Image from "next/image";

const Form = () => {
  return (
    <>
      <div className="row">
        <div className="col-lg-6">
          <Image
            width={157}
            height={300}
            className="img-fluid w100 h-100 cover"
            src="/assets/images/home/forgot-password.avif"
            alt="login.jpg"
          />
        </div>

        <div className="col-lg-6 pt60 ">
          <form action="#">
            <div className="heading text-center">
              <h3>Reset your password via registered email.</h3>
              {/* <p className="text-center">
                Reset your password with email.{" "}
                <Link href="/register" className="text-thm">
            Sign Up!
          </Link>
              </p> */}
            </div>
            {/* End .heading */}

            <div className="input-group mb-2 mr-sm-2">
              <input
                type="email"
                className="form-control"
                required
                placeholder="Email Address"
              />
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <i className="flaticon-user"></i>
                </div>
              </div>
            </div>
            {/* End .input-group */}

            {/* <div className="divide">
        <span className="lf_divider">Or</span>
        <hr />
      </div> */}
            {/* devider */}

            {/* <div className="input-group mb-2 mr-sm-2">
              <input
                type="email"
                className="form-control"
                required
                placeholder="Enter OTP"
              />
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <i className="flaticon-user"></i>
                </div>
              </div>
            </div> */}
            {/* End .input-group */}

            {/* <div className="input-group mb-2 mr-sm-2">
        <input
          type="email"
          className="form-control"
          required
          placeholder="Enter Your YYY"
        />
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="flaticon-user"></i>
          </div>
        </div>
      </div> */}
            {/* End .input-group */}

            <button type="submit" className="btn btn-log w-100 btn-thm">
              Send OTP
            </button>
            {/* login button */}

            <div className="row mt25">
              <div className="col-lg-6">
                {/* <button
            type="submit"
            className="btn btn-block color-white bgc-fb mb0 w-100"
          >
            <i className="fa fa-facebook float-start mt5"></i> Facebook
          </button> */}
              </div>
              {/* End .col */}

              <div className="col-lg-6">
                {/* <button
            type="submit"
            className="btn btn2 btn-block color-white bgc-gogle mb0 w-100"
          >
            <i className="fa fa-google float-start mt5"></i> Google
          </button> */}
              </div>
              {/* End .col */}
            </div>
            {/* more signin options */}
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
