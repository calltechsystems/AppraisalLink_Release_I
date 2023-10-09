import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import Captcha from "../common/Captcha";
import { encryptionData } from "../../utils/dataEncryption";
import { useRouter } from "next/router";
import { FaEye } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

const Form = () => {
  const [showhide, setShowhide] = useState("");
  const [showRegister, setRegister] = useState(true);
  const [showLabel, setShowLabel] = useState(false);
  const [captchaVerfied, setCaptchaVerified] = useState(false);

  const [firstClick, setFirstClick] = useState(true);

  const router = useRouter();

  const [passwordRegisterVerified, setPasswordRegisterVerified] =
    useState(false);

  const [passwordVisible, setPasswordVisible] = useState(false); // State variable to toggle password visibility
  const [passwordVisible_01, setPasswordVisible_01] = useState(false); // State variable to toggle password visibility
  const [passwordRegister, setPasswordRegister] = useState(""); // State variable to store the password value

  const emailRegisterRef = useRef();
  const passwordRegisterRef = useRef("");
  const userTypeRef = useRef(1);
  const checkRef = useRef("");

  const [isLoading, setLoading] = useState(false);

  const [isFocused, setIsFocused] = useState(false);

  const inputStyle = {
    position: "relative",
    // width: "100%",
    // padding: "8px",
    // border: "1px solid #ccc",
    // borderRadius: "4px",
  };

  const labelStyle = {
    position: "absolute",
    top: isFocused ? "-30px" : "-20px",
    left: "0",
    transition: "top 0.3s ease, font-size 0.3s ease",
    fontSize: isFocused ? "12px" : "10px",
    color: isFocused ? "green" : "inherit",
  };

  const handleshowhide = (event) => {
    const getuser = event.target.value;
    setShowhide(getuser);
    // setUserinput(false);
  };

  // Toggle password visibility hnadler
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const togglePasswordVisibility_01 = () => {
    setPasswordVisible_01(!passwordVisible_01);
  };

  const registerHandler = (event) => {
    event.preventDefault();

    setRegister(false);

    const email = emailRegisterRef.current.value;
    const password = passwordRegister;
    const reEnterPassword = passwordRegisterRef.current.value;
    const user = userTypeRef.current.value;

    if (password !== reEnterPassword) {
      toast.error("Password are meant to be same ");
    } else if (!email) {
      toast.error("Email cant be empty or non valid.");
    } else if (!captchaVerfied) {
      toast.error("captcha isnt verified");
    }
    else{
    const data = {
      email: email,
      password: password,
      userType: Number(user),
    };

    const encryptedData = encryptionData(data);

    setLoading(true);
    toast.loading("Registering user...");
    axios
      .post("/api/register", encryptedData)
      .then((res) => {
        console.log(res);
        toast.dismiss();
        router.push("/login");
      })
      .catch((err) => {
        toast.dismiss();
        toast.error(err.response.data.error);
        router.reload();
      })
      .finally(() => {
        setLoading(false);
      });
    }
  };

  const checkPasswordRegisterHandler = (event) => {
    setFirstClick(false);
    setPasswordRegister(event.target.value);
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (passwordRegex.test(event.target.value)) {
      setPasswordRegisterVerified(true);
    } else {
      setPasswordRegisterVerified(false);
    }
  };
  return (
    <div className="row mt-4">
      <div className="col-lg-6 col-xl-6">
        <div className="regstr_thumb">
          <Image
            width={357}
            height={659}
            className="img-fluid w100 h-100 cover mb-5"
            src="/assets/images/home/mobile-login-concept-illustration_114360-83.avif"
            alt="regstr.jpg"
          />
        </div>
      </div>
      <div className="col-lg-6">
        <form onSubmit={registerHandler}>
          <div className="heading text-center">
            <h3>Signup to your account</h3>
          </div>
          {/* End .heading */}

          <div className="col-lg-12">
            <div className="form-group input-group ui_kit_select_search mb-3">
              <select
                className="form-select"
                data-live-search="true"
                data-width="100%"
                ref={userTypeRef}
                style={{ paddingTop: "15px", paddingBottom: "15px" }}
              >
                <option value="">Choose User...</option>
                <option data-tokens="SelectRole" value={1}>
                  Mortgage Broker
                </option>
                <option data-tokens="Agent/Agency" value={2}>
                  Mortgage Brokerage
                </option>
                <option data-tokens="SingleUser" value={3}>
                  Appraiser
                </option>
                <option data-tokens="SingleUser" value={4}>
                  Appraiser Company
                </option>
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
                ref={emailRegisterRef}
              />
              <div className="input-group-prepend">
                <div className="input-group-text m-1" style={{border:'1px solid #2e008b'}}>
                  <i className="fa fa-envelope-o"></i>
                </div>
              </div>
            </div>
            {/* End .form-group */}
          </div>

          <div className="col-lg-12" style={{ marginTop: "10px" }}>
            <div
              className="form-group input-group  "
              style={{ position: "relative", marginBottom: "6px" }}
            >
              {/* <label htmlFor="passwordInput" style={labelStyle}>
                Password must have a A-Z,a-z,0-9,!@#$%^& a & 8 - 15 characters
                long.
              </label> */}
              <input
                type={passwordVisible ? "text" : "password"} // Conditionally set the input type
                className="form-control"
                placeholder="Password"
                id="passwordInput"
                style={inputStyle}
                required
                value={passwordRegister}
                onChange={(e) => checkPasswordRegisterHandler(e)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                maxLength={15}
                minLength={8}
              />
              <div className="input-group-prepend">
                <div
                  className="input-group-text m-1"  style={{border:'1px solid #2e008b', cursor:'pointer'}}
                  onClick={togglePasswordVisibility}
                >
                  <FaEye/>
                </div>
              </div>
            </div>
            {/* End .form-group */}
          </div>
          <div style={{ marginTop: "10px" }}>
            {isFocused ? (
              passwordRegisterVerified ? (
                <span style={{ color: "green" }}>Strong Password &#10004;</span>
              ) : !firstClick ? (
                <span style={{ color: "red" }}> Weak Password &#10008;</span>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </div>

          <div className="col-lg-12">
          <div
          className="form-group input-group  "
          style={{ position: "",marginTop:"-10px", marginBottom:'15px'}}
        >
          <label htmlFor="passwordInput" style={labelStyle}>
            Password must have a A-Z,a-z,0-9,!@#$%^& a & 8 - 15 characters long.
          </label>
              <input
                type={passwordVisible_01 ? "text" : "password"} // Conditionally set the input type
                className="form-control mt-3"
                placeholder="Re enter Password"
                required
                ref={passwordRegisterRef}
                style={{ paddingRight: "40px" }} // Add right padding to accommodate the button
              />
              <div className="input-group-prepend mt-3">
                <div
                  className="input-group-text m-1" style={{border:'1px solid #2e008b', cursor:'pointer'}}
                  onClick={togglePasswordVisibility_01}
                >
                  <FaEye/>
                </div>
              </div>
            </div>
            {/* End .form-group */}
          </div>
          {/* {isFocused ? (
            passwordRegisterVerified ? (
              <div style={{marginTop:"-2%"}}> <span style={{ color: "green" }}>Strong Password &#10004;</span> </div>
            ) : (
              !firstClick ? <div style={{marginTop:"-2%"}}><span style={{ color: "red" }}> Weak Password &#10008;</span> </div> : ""
            )
          ) : (
            ""
          )} */}

          <div className="col-lg-12">
            <div>
              <Captcha verified={setCaptchaVerified} />
            </div>
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
          <div
            className="heading text-center"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              // paddingLeft: "30%",
            }}
          >
            <div>
              <p className="text-center" style={{fontSize:'16px'}}>Already have Account? </p>
            </div>
            <div
              style={{
                // textDecoration: "underline",
                fontWeight: "bold",
                lineHeight: "1.5",
                marginLeft: "5px",
              }}
            >
              <Link href="/login" className="text-thm">
                Log In!
              </Link>
            </div>
          </div>
          {/* login button */}

          {/* <div className="divide">
        <span className="lf_divider">Or</span>
        <hr />
      </div> */}
          {/* devider */}
        </form>
      </div>
    </div>
  );
};

export default Form;
