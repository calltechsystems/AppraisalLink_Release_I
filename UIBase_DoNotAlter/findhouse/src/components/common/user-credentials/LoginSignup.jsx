import {  useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
// import { getSession } from "next-iron-session";
import Captcha from "../Captcha";
import CaptchaReg from "../CaptchaReg";
// import axios from "axios";
// import { encryptionData } from "../../../utils/dataEncryption";

const LoginSignup = () => {

  // Registration Show Hide Functionality start

  const [showhide, setShowhide] = useState("");
  const [showRegister,setRegister]=useState(true);
  // const [userinput, setUserinput] = useState(true);

  //defining the variables
  const emailLoginRef = useRef();
  const passwordLoginRef = useRef();

  const emailRegisterRef = useRef();
  const passwordRegisterRef = useRef();
  const repasswordRef = useRef();
  const userTypeRef = useRef();

  const checkValueRef = useRef();

  const [isLoading , setLoading] = useState(false);

  const router = useRouter();

  const handleshowhide = (event) => {
    const getuser = event.target.value;
    setShowhide(getuser);
    // setUserinput(false);
  };

  //login trigger function
  const loginHandler = (event) =>{

    event.preventDefault();
    const email = emailLoginRef.current.value;
    const password = passwordLoginRef.current.value;

    if(!email  || !password){
      alert("Credentials Can't be empty");
    }

    const data = {
      email :email,
      password:password
    };

    const encryptedData = encryptionData(data);

    setLoading(true);
    axios.post("/api/login",encryptedData)
    .then(res=>{
      console.log(res);
      alert("Successfully Logged In!");
      localStorage.setItem("user",JSON.stringify(res));
      router.push("/my-profile");
    })
    .catch(err=>{
      alert(err.message);
    })
    .finally(()=>{
      setLoading(false);
    })
  }

  const registerHandler = (event)=>{

          event.preventDefault();
          
          setRegister(false);
        
          const email = emailRegisterRef.current.value;
          const password = passwordRegisterRef.current.value;
          const reEnterPassword = repasswordRef.current.value;
          const user = userTypeRef.current.value;
          
          if(password!==reEnterPassword){
            alert("Password are meant to be same ");
          }
          else if(!email){
            alert("Email cant be empty or non valid.");
          }
          const data = {
            email :email,
            password:password,
            AccountType :user
          };
          
          const encryptedData = encryptionData(data);

          setLoading(true);
          axios.post("/api/register",encryptedData)
          .then(res=>{
            alert("Successfully Signed In!");
            //redirection to login
          })
          .catch(err=>{
           alert(err.message);
          })
          .finally(()=>{
            setLoading(false);
          })
  }

  // Registration Show Hide Functionality end

  return (
    <div className="modal-content">
      <div className="modal-header">
        <button
          type="button"
          data-bs-dismiss="modal"
          aria-label="Close"
          className="btn-close"
        ></button>
      </div>
      {/* End .modal-header */}

      <div className="modal-body container pb20">
        <div className="row">
          <div className={ showRegister ? "col-lg-12" : "col-lg-24"}>
            <ul className="sign_up_tab nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  id="home-tab"
                  data-bs-toggle="tab"
                  href="#home"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  Login
                </Link>
              </li>
              {/* End login tab */}

              { showRegister && ( <li className="nav-item">
                <Link
                  className="nav-link"
                  id="profile-tab"
                  data-bs-toggle="tab"
                  href="#profile"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >
                  Register
                </Link>
              </li>)
              }
              {/* End Register tab */}
            </ul>
            {/* End .sign_up_tab */}
          </div>
        </div>
        {/* End .row */}

        <div className="tab-content container" id="myTabContent">
          <div
            className="row mt25 tab-pane fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <div className="col-lg-6 col-xl-6">
              <div className="login_thumb">
                <Image
                  width={357}
                  height={494}
                  className="img-fluid w100 h-100 cover"
                  src="/assets/images/home/computer-login.avif"
                  alt="login.jpg"
                />
              </div>
            </div>
            {/* End col */}

            <div className="col-lg-6 col-xl-6">
              <div className="login_form">
                <form  onSubmit={(e)=>loginHandler(e)}>
                  <div className="heading">
                    <h4>Login</h4>
                  </div>
                  {/* End heading */}

                  <div className="input-group mb-2 mr-sm-2">
                    <input
                      type="text"
                      className="form-control"
                      id="inlineFormInputGroupUsername2"
                      placeholder="Email Address"
                      required
                      ref={emailLoginRef}
                    />
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="flaticon-user"></i>
                      </div>
                    </div>
                  </div>
                  {/* End input-group */}

                  <div className="input-group form-group">
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Password"
                      required
                      ref={passwordLoginRef}
                    />
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="flaticon-password"></i>
                      </div>
                    </div>
                  </div>
                  {/* End input-group */}

                  <Captcha />

                  <div className="form-group form-check custom-checkbox mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="remeberMe"
                      ref={checkValueRef}
                    />
                    <label
                      className="form-check-label form-check-label"
                      htmlFor="remeberMe"
                    >
                      Remember me
                    </label>

                    <Link
                      className="btn-fpswd float-end"
                      href="/forgot-password"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  {/* End remember me checkbox */}

                  <button
                    type="submit"
                    className="btn btn-log w-100 btn-thm"
                    disabled={true}
                    id="login"
                  >
                    Log In
                  </button>
                  {/* End submit button */}

                  <p className="text-center">
                    Dont have an account?{" "}
                    <Link className="text-danger fw-bold" href="#">
                      Register
                    </Link>
                  </p>
                </form>
              </div>
              {/* End .col .login_form */}
            </div>
          </div>
          {/* End .tab-pane */}

          { showRegister && (<div
            className="row mt25 tab-pane fade"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
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
            {/* End . left side image for register */}

           <div className="col-lg-6 col-xl-6">
              <div className="sign_up_form">
                <div className="heading">
                  <h4>Register</h4>
                </div>
                {/* End .heading */}

                <form onSubmit={(e)=>registerHandler(e)}>
                  <div className="form-group ui_kit_select_search mb-3">
                    <select
                      className="form-select"
                      data-live-search="true"
                      data-width="100%"
                      onChange={(e) => handleshowhide(e)}
                      ref={userTypeRef}
                      // disabled={!userinput}
                    >
                      <option data-tokens="SelectRole">Choose User</option>
                      <option data-tokens="Agent/Agency" value="1">
                        Mortgage Broker
                      </option>
                      <option data-tokens="SingleUser" value="2">
                        Mortgage Brokerage
                      </option>
                      <option data-tokens="SingleUser" value="3">
                        Appraiser
                      </option>
                      <option data-tokens="SingleUser" value="4">
                        Appraiser Company
                      </option>
                    </select>
                  </div>
                  {/* End from-group */}

                  {showhide === "1" && (
                    <>
                      <div className="form-group input-group  mb-3">
                        <input
                          ref={emailRegisterRef}
                          type="email"
                          name="email"
                          className="form-control"
                          id="exampleInputEmail2"
                          placeholder="Email Address"
                          required
                        />
                        <div className="input-group-prepend">
                          <div className="input-group-text">
                            <i className="fa fa-envelope-o"></i>
                          </div>
                        </div>
                      </div>
                      {/* End .row */}

                      <div className="form-group input-group  mb-3">
                        <input
                          ref={passwordRegisterRef}
                          name="password"
                          type="password"
                          className="form-control"
                          id="exampleInputPassword2"
                          placeholder="Create Password"
                          required
                        />
                        <div className="input-group-prepend">
                          <div className="input-group-text">
                            <i className="flaticon-password"></i>
                          </div>
                        </div>
                      </div>
                      {/* End .row */}

                      <div className="form-group input-group  mb-3">
                        <input
                          type="password"
                          className="form-control"
                          id="exampleInputPassword3"
                          placeholder="Confirm Password"
                          required
                          ref={repasswordRef}
                        />
                        <div className="input-group-prepend">
                          <div className="input-group-text">
                            <i className="flaticon-password"></i>
                          </div>
                        </div>
                      </div>
                      {/* End .row */}

                      <CaptchaReg />
                    </>
                  )}

                  <div className="form-group form-check custom-checkbox mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="terms"
                      required
                      ref={checkValueRef}
                    />
                    <label className="form-check-label" htmlFor="terms">
                      I accept the Terms and Privacy Policy.
                    </label>
                    <Link
                      href="assets/images/Terms & Conditions.pdf"
                      target="_blank"
                      className="form-check-label text-danger"
                    >
                      Terms&Cond.
                    </Link>
                  </div>
                  {/* End from-group */}

                  <button
                   type = "submit"
                    className="btn btn-log w-100 btn-thm"
                    id="signup"
                    disabled={true}
                  >
                    Sign Up
                  </button>
                  {/* End btn */}

                  <p className="text-center">
                    Already have an account?{" "}
                    <Link className="text-thm fw-bold" href="#">
                      Log In
                    </Link>
                  </p>
                </form>
                {/* End .form */}
              </div>
            </div>
            {/* End register content */}
          </div>)}
          {/* End .tab-pane */}
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps(context) {
  const isPreview = context.preview; // Check if in preview mode

  return {
    props: {
      preview: isPreview
    },
  };
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const decryptionKey = process.env.CRYPTO_SECRET_KEY;

  return {
    props: {
      decryptionKey
    },
  };
}


export default LoginSignup;
