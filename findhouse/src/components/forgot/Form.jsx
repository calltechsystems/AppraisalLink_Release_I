import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import axios from "axios";
import { encryptionData } from "../../utils/dataEncryption";

const Form = () => {
  const router = useRouter();

  const [show, setShow] = useState(false);

  const tokenRef = useRef("");
  const newPassword = useRef("");
  const newPasswordConfirm = useRef("");
  const emailRef = useRef("");

  const onCloseHandler = () =>{
    console.log("in");
  };

  const onClickHandler = () =>{

    const email = emailRef.current.value;
    if(email === ""){
      toast.error("Registered email should be filled !");
    }
    else{
      const formData = {
        email : email
      };

      const payload = encryptionData(formData);
      toast.loading("Sending the token to this email");
      axios.post("/api/sendResetToken",payload)
      .then((res)=>{
        toast.dismiss();
        setShow(true);
        toast.success("Sent Successfully");
      })
      .catch((err)=>{
        toast.dismiss();
        toast.error("Try again");
      })
    }
    
  }

  const onSubmitHnadler = () =>{

    const email = emailRef.current.value;
    const newPasswordRef = newPassword.current.value;
    const newPasswordConfirmRef = newPasswordConfirm.current.value;
    const token = tokenRef.current.value;
    if(email === ""){
      toast.error("Registered email should be filled !");
    }

    if(token === ""){
      toast.error("Please provide the token !");
    }

    if(newPasswordRef !== newPasswordConfirmRef){
      toast.error("provide the same password");
    }

    else{
      const formData = {
        email : email,
        newPassword : newPasswordRef,
        token : token
      };

      console.log(formData);

      const payload = encryptionData(formData);
      toast.loading("Reseting password ....");
      axios.post("/api/resetForgotPassword",payload)
      .then((res)=>{
        toast.dismiss();
        setShow(true);
        toast.success("Password set Successfully");
        router.push("/login");
      })
      .catch((err)=>{
        toast.dismiss();
        toast.error("Try again");
      })
    }



    
  }

  const resentOTPHnadler = () =>{

    const email = emailRef.current.value;
    if(email === ""){
      toast.error("Registered email should be filled !");
    }
    else{
      const formData = {
        email : email
      };

      const payload = encryptionData(formData);
      toast.loading("Re sending the token to this email");
      axios.post("/api/sendResetToken",payload)
      .then((res)=>{
        toast.dismiss();
        setShow(true);
        toast.success("Sent Successfully");
      })
      .catch((err)=>{
        toast.dismiss();
        toast.error("Try again");
      })
    }
  }

  return (
    <>
      <div className="row">
        <Link href={"/login"} className="text-end" style={{marginLeft:'34rem'}}>
          <span className="flaticon-close"></span>
        </Link>
        <div className="col-lg-6">
          <Image
            width={157}
            height={300}
            className="img-fluid w100 h-90 cover"
            src="/assets/images/home/forgot-password.avif"
            alt="login.jpg"
          />
        </div>

        <div className="col-lg-6 pt60 ">
          <div  style={{ padding: "20px" }}>
            <div className="heading text-center">
              <h3>Reset your password via registered email.</h3>
            </div>
            {/* End .heading */}

            <div className="input-group mb-2 mr-sm-2">
              <input
                type="email"
                className="form-control"
                ref={emailRef}
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

            {show && (
              <div className="input-group mb-2 mr-sm-2">
                <input
                  type="number"
                  ref={tokenRef}
                  className="form-control mb-2"
                  required
                  placeholder="Enter OTP"
                />
                <div className="input-group-prepend">
                  {/* <div className="input-group-text">
                  <i className="flaticon-user"></i>
                </div> */}
                </div>
              </div>
            )}
            {/* End .input-group */}

            {show && (
              <div className="input-group mb-2 mr-sm-2">
                <input
                  type="password"
                  ref={newPassword}
                  className="form-control mb-2"
                  required
                  placeholder="New password"
                />
                <div className="input-group-prepend">
                  {/* <div className="input-group-text">
                  <i className="flaticon-user"></i>
                </div> */}
                </div>
              </div>
            )}

            {show && (
              <div className="input-group mb-2 mr-sm-2">
                <input
                  type="password"
                  ref={newPasswordConfirm}
                  className="form-control mb-2"
                  required
                  placeholder="Confirm password"
                />
                <div className="input-group-prepend">
                  {/* <div className="input-group-text">
                  <i className="flaticon-user"></i>
                </div> */}
                </div>
              </div>
            )}

            {/* <div className="mt-0 d-flex justify-content-end mb-4">
              <Link href="#">Resend OTP</Link>
            </div> */}

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

            {show && (
              <button onClick={onSubmitHnadler} className="btn btn-log w-100 btn-thm">
                Submit
              </button>
            )}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
