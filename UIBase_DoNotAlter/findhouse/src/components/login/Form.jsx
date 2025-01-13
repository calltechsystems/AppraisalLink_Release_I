import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRef } from "react";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import Captcha from "../common/Captcha";
import { encryptionData } from "../../utils/dataEncryption";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const Form = ({
  user,
  setModalIsOpen,
  setModalIsOpenError,
  setErrorMessage,
}) => {
  const [showhide, setShowhide] = useState("");
  const [change, setChange] = useState(false);
  const [showRegister, setRegister] = useState(true);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorContent, setErrorContent] = useState("");

  const [successContent, setSuccessContent] = useState("");
  const [captchaVerfied, setCaptchaVerified] = useState(false);

  const [reloadOption, setReloadOption] = useState(false);

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
      setChange(true);
      setErrorMessage("Credentials Can't be empty");
      setModalIsOpenError(true);
    } else if (!captchaVerfied) {
      setErrorMessage("Please fill the Captcha !");
      setModalIsOpenError(true);
      setChange(true);
      return;
    } else {
      const data = {
        email: email,
        password: password,
      };

      const encryptedData = encryptionData(data);

      setLoading(true);
      toast.loading("Logging User ..");
      axios
        .post("/api/login", encryptedData)
        .then((res) => {
          toast.dismiss();
          localStorage.setItem("user", JSON.stringify(res.data.userData));
          if (res.data.userData.userType === 7) {
            router.push("/appraiser-company-dashboard-admin");
          } else if (
            res.data.userData.userType === 1 ||
            res.data.userData.userType === 6
          ) {
            router.push("/my-dashboard");
          } else if (res.data.userData.userType === 4) {
            router.push("/appraiser-company-dashboard");
          } else if (
            res.data.userData.userType === 3 ||
            res.data.userData.userType === 5
          ) {
            router.push("/appraiser-dashboard");
          } else if (res.data.userData.userType === 2) {
            router.push("/brokerage-dashboard");
          }
        })
        .catch((err) => {
          const status = err.response.request.status;
          if (String(status) === String(403)) {
            toast.dismiss();
            setErrorMessage(
              "Your account is not yet verified.or resend email verification  Please check your email and follow the verification link to activate your account."
            );
            setModalIsOpenError(true);
          } else {
            // console.log(err);
            toast.dismiss();
            setErrorMessage(err.response.data.error);
            setModalIsOpenError(true);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleErrorModalCancel = () => {
    setError(false);
  };

  const handleSuccessModalCancel = () => {
    setSuccess(false);
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

        <div className="col-lg-6 pt60">
          {error && (
            <div
              style={{
                backgroundColor: "orangered",
                opacity: "80%",
                borderColor: "red",
                borderWidth: "20px",
                borderRadius: "4px",
                padding: "1%",
                justifyContent: "space-between",
                display: "flex",
                flexDirection: "row",
                width: "80%",
                marginLeft: "10%",
              }}
            >
              <h4 style={{ color: "white" }}>Invalid credentials</h4>
              <div
                className="input-group-text m-1"
                style={{ border: "1px solid white" }}
                onClick={handleErrorModalCancel}
              >
                <img
                  src="https://th.bing.com/th/id/OIP.VirRE_r48DkDvZVNoo6_agHaHZ?w=209&h=208&c=7&r=0&o=5&dpr=1.1&pid=1.7"
                  width={"20px"}
                  height={"20px"}
                />
              </div>
            </div>
          )}
          {success && (
            <div
              style={{
                backgroundColor: "green",
                opacity: "80%",
                borderColor: "green",
                borderWidth: "20px",
                borderRadius: "4px",
                padding: "1%",
                justifyContent: "space-between",
                display: "flex",
                flexDirection: "row",
                width: "80%",
                marginLeft: "10%",
              }}
            >
              <h4 style={{ color: "white" }}>Successfully logged in</h4>
              <div
                className="input-group-text m-1"
                style={{ border: "1px solid white" }}
                onClick={handleSuccessModalCancel}
              >
                <h4 style={{ color: "white", marginTop: "20%" }}>OK</h4>
              </div>
            </div>
          )}

          <form onSubmit={loginHandler}>
            <div className="heading text-center">
              <h3>{`Login to your account `} </h3>
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
                <div
                  className="input-group-text m-1"
                  style={{ border: "1px solid #2e008b" }}
                >
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
                  className="input-group-text m-1"
                  style={{ border: "1px solid #2e008b", cursor: "pointer" }}
                  onClick={togglePasswordVisibility}
                  // onMouseLeave={togglePasswordVisibility}
                >
                  <FaEye />
                </div>
              </div>
            </div>

            <div className="col-12">
              <div>
                {/* {captchaVerfied ? (
                  ""
                ) : (
                  <label
                    className="form-check-label form-check-label"
                    htmlFor="remeberMe"
                    style={{ color: "red" }}
                  >
                    Captcha doesnt match
                  </label>
                )} */}
                <Captcha
                  verified={setCaptchaVerified}
                  reload={reloadOption}
                  change={change}
                  setChange={setChange}
                />
              </div>
            </div>

            <div className="form-group form-check custom-checkbox mb-3 mt-0">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="remeberMe"
                style={{ border: "1px solid black" }}
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
              className="heading"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                // marginLeft: "20%",
              }}
            >
              <div>
                <p style={{ fontSize: "16px" }}>Don&apos;t have an account? </p>
              </div>
              <div
                style={{
                  // textDecoration: "underline",
                  fontWeight: "bold",
                  marginLeft: "5px",
                  lineHeight: "1.6",
                }}
              >
                <Link href="/sign-up" className="text-thm">
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
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
