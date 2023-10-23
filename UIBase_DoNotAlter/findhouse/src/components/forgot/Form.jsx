import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";


const Form = () => {

  const router = useRouter();

  const [show , setShow] = useState(false);

  const onCloseHandler = () =>{
    console.log("in");
  }

  const onClickHandler = () =>{
    setShow(true);
  }
  return (
    <>
      <div className="row">
        <div className="col-lg-6">
          <Link href={"/login"}>
              <span className="flaticon-close"></span>
          </Link>
          <Image
            width={157}
            height={300}
            className="img-fluid w100 h-100 cover"
            src="/assets/images/home/forgot-password.avif"
            alt="login.jpg"
          />
        
        </div>

        <div className="col-lg-6 pt60 ">
          <form action="#" style={{padding:'20px'}}>
            <div className="heading text-center">
              <h3>Reset your password via registered email.</h3>
            </div>
            {/* End .heading */}

            <div className="input-group mb-2 mr-sm-2">
              <input
                type="email"
                className="form-control"
                required
                placeholder="Email Address"
              />
              <div className="">
                <div className="button-class-close-forgot">
                  <button
                    onClick={onClickHandler}
                    className="btn btn-log w-100 btn-thm mb-0"
                    style={{ marginLeft: "5px" }}
                  >
                    Send OTP
                  </button>
                </div>
              </div>
            </div>
            {/* End .input-group */}

            {/* <div className="divide">
        <span className="lf_divider">Or</span>
        <hr />
      </div> */}
            {/* devider */}

            {show && (<div className="input-group mb-2 mr-sm-2">

           
              <input
                type="password"
                className="form-control mb-2"
                required
                placeholder="Enter your new password"
              />
              <div className="input-group-prepend">
                {/* <div className="input-group-text">
                  <i className="flaticon-user"></i>
                </div> */}
              </div>
            </div>)}

            {show && (<div className="input-group mb-2 mr-sm-2">

           
              <input
                type="password"
                className="form-control mb-2"
                required
                placeholder="Enter confirm password"
              />
              <div className="input-group-prepend">
                {/* <div className="input-group-text">
                  <i className="flaticon-user"></i>
                </div> */}
              </div>
            </div>)}

            {show && (<div className="input-group mb-0 mr-sm-2">

           
              <input
                type="email"
                className="form-control mb-0"
                required
                placeholder="Enter OTP"
              />
              <div className="input-group-prepend">
                {/* <div className="input-group-text">
                  <i className="flaticon-user"></i>
                </div> */}
              </div>
            </div>)}
            {/* End .input-group */}

            <div className="mt-0 d-flex justify-content-end mb-4">
              <Link href="#">Resend OTP</Link>
            </div>

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
              Submit
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
