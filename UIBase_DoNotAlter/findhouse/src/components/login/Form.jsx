import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRef } from "react";
import axios from "axios";

import Captcha from "../common/Captcha";
import { encryptionData } from "../../utils/dataEncryption";
import { useRouter } from "next/router";

const Form = ({ user }) => {
  const [showhide, setShowhide] = useState("");
  const [showRegister, setRegister] = useState(true);
  const [captchaVerfied, setCaptchaVerified] = useState(false);

  const router = useRouter();

  const [passwordLoginVerified, setPasswordLoginVerified] = useState(true);

  const [passwordVisible, setPasswordVisible] = useState(false); // State variable to toggle password visibility
  const [passwordLogin, setPasswordLogin] = useState(""); // State variable to store the password value

  //defining the variables
  const emailLoginRef = useRef();
  const [isLoading, setLoading] = useState(false);

  const handleshowhide = (event) => {
    const getuser = event.target.value;
    setShowhide(getuser);
    // setUserinput(false);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const loginHandler = (event) => {
    event.preventDefault();
    const email = emailLoginRef.current.value;
    const password = passwordLogin;

    if (!email || !password) {
      alert("Credentials Can't be empty");
    } else if (!captchaVerfied) {
      alert("captcha isnt verified");
    }

    const data = {
      email: email,
      password: password,
    };

    const encryptedData = encryptionData(data);

    setLoading(true);
    axios
      .post("/api/login", encryptedData)
      .then((res) => {
        alert("Successfully Logged In!");
        localStorage.setItem("user", JSON.stringify(res.data.userData));
        router.push("/my-dashboard");
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const checkPasswordLoginHandler = (event) => {
    setPasswordLogin(event.target.value);
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (passwordRegex.test(event.target.value)) {
      setPasswordLoginVerified(true);
    } else {
      setPasswordLoginVerified(false); // Change this to false for invalid passwords
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-6">
          <Image
            width={157}
            height={100}
            className="img-fluid w100 h-80 cover"
            src="/assets/images/home/computer-login.avif"
            alt="login.jpg"
          />
        </div>
        <div className="col-lg-6 pt100">
          <form onSubmit={loginHandler}>
            <div className="heading text-center">
              <h3>{`Login to your account ${user}`} </h3>
            </div>
            {/* End .heading */}

            <div className="input-group mb-2 mr-sm-2">
              <input
                type="text"
                className="form-control"
                required
                placeholder="Email address"
                ref={emailLoginRef}
              />
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <i className="flaticon-user"></i>
                </div>
              </div>
            </div>
            {/* End .input-group */}

            {/* <Link
              href="/forgot-password"
              className="btn-fpswd float-end text-color"
            >
              Forgot password?
            </Link> */}
            <div className="input-group form-group">
              <input
                type={passwordVisible ? "text" : "password"} // Conditionally set the input type
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                required
                value={passwordLogin}
                onChange={(e) => checkPasswordLoginHandler(e)}
                style={{ paddingRight: "40px" }} // Add right padding to accommodate the button
              />
              <div className="input-group-prepend">
                <div
                  className="input-group-text"
                  onClick={togglePasswordVisibility}
                >
                  <i className="flaticon-password"></i>
                </div>
              </div>
            </div>

            <div className="col-12" style={{marginBottom:'-30px'}}>
              <div>
                <Captcha verified={setCaptchaVerified} />
              </div>
            </div>

            {/* End .input-group */}

            <div className="form-group form-check custom-checkbox mb-3 mt-0">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="remeberMe"
              />
              <label
                className="form-check-label form-check-label"
                htmlFor="remeberMe"
              >
                Remember me
              </label>

              <Link
                href="/forgot-password"
                className="btn-fpswd float-end text-color"
              >
                Forgot password?
              </Link>
              {/* <a className="btn-fpswd float-end" href="/forgot-password">
          Forgot password?
        </a> */}
            </div>
            {/* End .form-group */}

            <button type="submit" className="btn btn-log w-100 btn-thm">
              Log In
            </button>
            <div
              className="heading text-center"
              style={{
                display: "flex",
                flexDirection: "row",
                textAlign: "center",
                paddingLeft: "30%",
              }}
            >
              <div>
                <p className="text-center">Dont have an account? </p>
              </div>
              <div
                style={{
                  textDecoration: "underline",
                  fontWeight: "bold",
                  marginLeft: "5px",
                  lineHeight: "1.3",
                }}
              >
                <Link href="/register" className="text-thm">
                  Sign Up !
                </Link>
              </div>
            </div>
            {/* login button */}

            {/* <div className="divide">
        <span className="lf_divider">Or</span>
        <hr />
      </div> */}
            {/* devider */}

            <div className="row mt25">
              {/* <div className="col-lg-6">
          <button
            type="submit"
            className="btn btn-block color-white bgc-fb mb0 w-100"
          >
            <i className="fa fa-facebook float-start mt5"></i> Facebook
          </button>
        </div> */}
              {/* End .col */}

              {/* <div className="col-lg-6">
          <button
            type="submit"
            className="btn btn2 btn-block color-white bgc-gogle mb0 w-100"
          >
            <i className="fa fa-google float-start mt5"></i> Google
          </button>
        </div> */}
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
