import ReCAPTCHA from "react-google-recaptcha";
import Image from "next/image";

// function onChange(value) {
//   console.log("Captcha value:", value);
// }

const Form = ({ userData, chnageShowCardHandler }) => {
  return (
    <form className="contact_form" action="#" style={{ borderRadius: "5px" }}>
      <div className="d-flex justify-content-end">
        <button
          className="btn btn2 btn-color profile_edit_button_01"
          onClick={() => chnageShowCardHandler(false)}
        >
          Edit Profile
        </button>
      </div>

      <div className="row">
        <div className="col-lg-3 text-center mb-5">
          <div className="wrap-custom-file mt-3 mb-5">
            <img
              style={{ borderRadius: "50%" }}
              src={
                userData?.brokerage_Details?.profileImage ||
                "https://th.bing.com/th?id=OIP.0TsJGYhWWOy_hBFOH0hX-gHaHa&w=249&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.1&pid=3.1&rm=2"
              }
              alt="Uploaded Image"
            />
          </div>
          {/* End .col */}
        </div>
        <div className="col-lg-9">
          <div className="row mb-2">
            <div className="col-lg-6">
              <div className="form-group">
                <ul>
                  <li className="text-dark mt-3">
                    {/* <span className="text-dark fw-bold">First Name</span> :{" "} */}
                    <span
                      className="text-dark fw-bold"
                      style={{ fontSize: "21px" }}
                    >
                      {" "}
                      Name : {userData?.brokerage_Details?.firstName}{" "}
                      {userData?.brokerage_Details?.middleName}{" "}
                      {userData?.brokerage_Details?.lastName}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="form-group">
                <ul>
                  <li className="text-dark mt-0">
                    <p className="text-dark" style={{ fontSize: "18px" }}>
                      Company : {userData?.brokerage_Details?.companyName}
                    </p>
                    {/* <span className="text-dark fw-bold">Middle Name</span> :{" "}
                    <span className="text-dark fw-bold"> Devendra </span> */}
                  </li>
                </ul>
              </div>
              <div className="form-group">
                <ul>
                  <li className="text-dark mt-0">
                    <p className="text-dark" style={{ fontSize: "17px" }}>
                      Email : {userData?.userEmail}
                    </p>
                    {/* <span className="text-dark fw-bold">Middle Name</span> :{" "}
                    <span className="text-dark fw-bold"> Devendra </span> */}
                  </li>
                </ul>
              </div>
              <div className="form-group">
                <ul>
                  <li className="text-dark mt-0">
                    <p className="text-dark" style={{ fontSize: "17px" }}>
                      Phone : {userData?.brokerage_Details?.phoneNumber}
                    </p>
                    {/* <span className="text-dark fw-bold">Last Name</span> :{" "}
                    <span className="text-dark fw-bold"> Patel </span> */}
                  </li>
                </ul>
              </div>
            </div>
            {/* End .col */}

            <div className="col-lg-6">
              <div className="form-group">
                <ul>
                  <li className="text-dark mt-3">
                    {/* <span className="text-dark fw-bold">First Name</span> :{" "} */}
                    <span className="text-dark" style={{ fontSize: "17px" }}>
                      {" "}
                      Address : {userData?.brokerage_Details?.adressLine1}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="form-group">
                <ul>
                  <li className="text-dark mt-0">
                    <p
                      className="text-dark"
                      style={{ fontSize: "17px", marginLeft: "4.8rem" }}
                    >
                      {userData?.brokerage_Details?.area}
                    </p>
                    {/* <span className="text-dark fw-bold">Middle Name</span> :{" "}
                    <span className="text-dark fw-bold"> Devendra </span> */}
                  </li>
                </ul>
              </div>
              <div className="form-group">
                <ul>
                  <li className="text-dark mt-0">
                    <p
                      className="text-dark"
                      style={{ fontSize: "17px", marginLeft: "4.8rem" }}
                    >
                      {userData?.brokerage_Details?.city},{" "}
                      {userData?.brokerage_Details?.state}
                    </p>
                    {/* <span className="text-dark fw-bold">Middle Name</span> :{" "}
                    <span className="text-dark fw-bold"> Devendra </span> */}
                  </li>
                </ul>
              </div>
              <div className="form-group">
                <ul>
                  <li className="text-dark mt-0">
                    <p
                      className="text-dark"
                      style={{ fontSize: "17px", marginLeft: "4.8rem" }}
                    >
                      {userData?.brokerage_Details?.zipCode}
                    </p>
                    {/* <span className="text-dark fw-bold">Last Name</span> :{" "}
                    <span className="text-dark fw-bold"> Patel </span> */}
                  </li>
                </ul>
              </div>
            </div>
            {/* End .col */}
          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;
