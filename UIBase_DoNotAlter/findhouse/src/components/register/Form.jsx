import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Captcha from "../common/Captcha";
import { encryptionData } from "../../utils/dataEncryption";
import { useRouter } from "next/router";
import { FaEye } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

const Form = ({ setModalIsOpen, setModalIsOpenError, setErrorMessage }) => {
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");

  const [change, setChange] = useState(false);
  const [passwordRegister, setPasswordRegister] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible_01, setPasswordVisible_01] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [is2Focused, setIs2Focused] = useState(false);
  const [passwordRegisterVerified, setPasswordRegisterVerified] =
    useState(false);
  const [checkRegisterConfrim, setCheckRegisterConfrim] = useState(false);
  const passwordRegisterRef = useRef(null);
  const [firstClick, setFirstClick] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const emailId = urlParams.get("emailId");
    const userTypeParam = urlParams.get("UserType");

    if (emailId) {
      setEmail(emailId);
    } else {
      console.warn("Email query parameter missing");
    }

    if (
      userTypeParam &&
      ["1", "2", "3", "4", "5", "6"].includes(userTypeParam)
    ) {
      setUserType(userTypeParam);
    } else {
      console.warn("Invalid or missing UserType query parameter");
    }
  }, []);

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const togglePasswordVisibility_01 = () =>
    setPasswordVisible_01(!passwordVisible_01);

  const checkPasswordRegisterHandler = (event) => {
    const value = event.target.value;
    setFirstClick(false);
    setPasswordRegister(value);

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    setPasswordRegisterVerified(passwordRegex.test(value));
  };

  const checkConfirmHandler = () => {
    const confirmPassword = passwordRegisterRef.current.value;
    setCheckRegisterConfrim(passwordRegister === confirmPassword);
  };

  const registerHandler = async (event) => {
    event.preventDefault();

    if (!captchaVerified) {
      setErrorMessage("Please complete the captcha!");
      setModalIsOpenError(true);
      return;
    }

    const data = {
      email,
      password: passwordRegister,
      userType: Number(userType),
    };
    const encryptedData = encryptionData(data);

    try {
      toast.loading("Registering...");
      await axios.post("/api/signUpUser", encryptedData);
      toast.dismiss();
      setModalIsOpen(true);
    } catch (error) {
      toast.dismiss();
      const statusText =
        error.response?.status === 409
          ? "Email is already registered."
          : "Registration failed. Please try again.";
      setErrorMessage(statusText);
      setModalIsOpenError(true);
    }
  };

  return (
    <div className="row mt-4">
      <div className="col-lg-6">
        <Image
          width={357}
          height={659}
          src="/assets/images/home/placeholder-concept-illustration_114360-4983.avif"
          alt="Registration Illustration"
          className="img-fluid w100 h-100 cover"
        />
      </div>
      <div className="col-lg-6">
        <form onSubmit={registerHandler}>
          <h3 className="text-center">Set your password</h3>

          <div className="form-group input-group ui_kit_select_search mb-3">
            <select
              className="form-select"
              value={userType}
              disabled
              style={{ padding: "15px" }}
            >
              <option value="">Select User Type</option>
              <option value="1">Mortgage Broker</option>
              <option value="2">Mortgage Brokerage</option>
              <option value="3">Appraiser</option>
              <option value="4">Appraiser Company</option>
              <option value="5">Appraiser</option>
              <option value="6">Mortgage Broker</option>
            </select>
          </div>

          <div className="form-group input-group">
            <input
              type="email"
              className="form-control"
              value={email}
              disabled
              placeholder="Email"
            />
          </div>

          <div className="col-lg-12" style={{ marginTop: "10px" }}>
            <div className="form-group input-group position-relative">
              <input
                type={passwordVisible ? "text" : "password"} // Conditionally set the input type
                className="form-control"
                placeholder="Password"
                id="passwordInput"
                required
                value={passwordRegister}
                onChange={checkPasswordRegisterHandler}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                maxLength={15}
                minLength={8}
                style={{ paddingRight: "40px" }} // Add space for the eye icon
              />
              <div
                className="input-group-text m-1"
                style={{
                  right: "px",
                  marginTop: "5px",
                  cursor: "pointer",
                  border: "1px solid black",
                  borderRadius: "5px",
                }}
                onClick={togglePasswordVisibility}
              >
                <FaEye />
              </div>
            </div>
            {/* Show password strength */}
            {isFocused &&
              (passwordRegisterVerified ? (
                <span style={{ color: "green" }}>Strong Password &#10004;</span>
              ) : !firstClick ? (
                <span style={{ color: "red" }}> Weak Password &#10008;</span>
              ) : null)}
          </div>

          <div className="col-lg-12" style={{ marginTop: "10px" }}>
            <div className="form-group input-group position-relative">
              <input
                type={passwordVisible_01 ? "text" : "password"} // Conditionally set the input type
                className="form-control"
                placeholder="Re-enter Password"
                required
                onChange={checkConfirmHandler}
                onFocus={() => setIs2Focused(true)}
                onBlur={() => setIs2Focused(false)}
                ref={passwordRegisterRef}
                style={{ paddingRight: "40px" }} // Add space for the eye icon
              />
              <div
                className="input-group-text m-1"
                style={{
                  right: "px",
                  marginTop: "5px",
                  cursor: "pointer",
                  border: "1px solid black",
                  borderRadius: "5px",
                }}
                onClick={togglePasswordVisibility_01}
              >
                <FaEye />
              </div>
            </div>
            {/* Show password match validation */}
            {is2Focused && !checkRegisterConfrim && (
              <div>
                <span style={{ color: "red" }}>
                  Both passwords aren&apos;t same &#10008;
                </span>
              </div>
            )}
          </div>

          <Captcha
            verified={setCaptchaVerified}
            change={change}
            setChange={setChange}
          />

          <button type="submit" className="btn btn-log w-100 btn-thm">
            Submit
          </button>
          <p className="text-center" style={{ fontSize: "16px" }}>
            Already have an account?{" "}
            <Link href="/login" style={{ color: "#2e008b" }}>
              <strong>Log In!</strong>{" "}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Form;
