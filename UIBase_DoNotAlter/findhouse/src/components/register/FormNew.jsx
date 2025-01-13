import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaEye } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import Captcha from "../common/Captcha";
import { encryptionData } from "../../utils/dataEncryption";

const Form = ({ setModalIsOpen, setModalIsOpenError, setErrorMessage }) => {
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");

  const emailRegisterRef = useRef();
  const userTypeRef = useRef(1);

  useEffect(() => {
    // Extract query parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const emailFromURL = urlParams.get("email");
    const userTypeFromURL = urlParams.get("userType");

    if (emailFromURL) {
      setEmail(emailFromURL);
    }
    if (userTypeFromURL) {
      setUserType(userTypeFromURL);
    }
  }, []);

  const registerHandler = (event) => {
    event.preventDefault();

    const email = emailRegisterRef.current.value;
    const user = userTypeRef.current.value;

    // Add the rest of your registration logic here
    
  };

  return (
    <div className="col-lg-6">
      <form onSubmit={registerHandler}>
        <div className="col-lg-12">
          <div className="form-group input-group ui_kit_select_search mb-3">
            <select
              required
              className="form-select"
              data-live-search="true"
              data-width="100%"
              ref={userTypeRef}
              value={userType} // Pre-fill value
              onChange={(e) => setUserType(e.target.value)}
              style={{ paddingTop: "15px", paddingBottom: "15px" }}
            >
              <option value="">Choose User...</option>
              <option value={1}>Mortgage Broker</option>
              <option value={2}>Mortgage Brokerage</option>
              <option value={3}>Appraiser</option>
              <option value={4}>Appraiser Company</option>
            </select>
          </div>
        </div>

        <div className="col-lg-12">
          <div className="form-group input-group">
            <input
              type="email"
              className="form-control"
              required
              placeholder="Email Address"
              ref={emailRegisterRef}
              value={email} // Pre-fill value
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="input-group-prepend">
              <div
                className="input-group-text m-1"
                style={{ border: "1px solid #2e008b" }}
              >
                <i className="fa fa-envelope-o"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Add the rest of the form */}
      </form>
    </div>
  );
};

export default Form;
