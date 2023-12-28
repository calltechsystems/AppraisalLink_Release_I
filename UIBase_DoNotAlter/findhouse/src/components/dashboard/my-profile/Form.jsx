import ReCAPTCHA from "react-google-recaptcha";
import Image from "next/image";

// function onChange(value) {
//   console.log("Captcha value:", value);
// }

const Form = ({ userData, chnageShowCardHandler }) => {
  return (
    <form className="contact_form" action="#" style={{ borderRadius: "5px" }}>
      <div className="d-flex justify-content-end mb-2">
        <button
          className="btn btn2 btn-color profile_edit_button_01"
          onClick={() => chnageShowCardHandler(false)}
        >
          <span
            // className="flaticon-edit"
            data-toggle="tooltip"
            data-placement="top"
            title="Edit Profile"
          >
            {" "}
            Edit Profile
          </span>
        </button>
      </div>

      <div className="row">
        <div className="col-lg-3 text-center">
          <div className="wrap-custom-file mt-3 mb-5">
            <img
              style={{ borderRadius: "50%" }}
              src={userData?.broker_Details?.profileImage}
              alt="Uploaded Image"
            />
          </div>
          {/* End .col */}
        </div>
        <div className="col-lg-9">
          <div className="row mb-2">
            <div className="col-lg-9">
              <table
                className=""
                style={{
                  width: "650px",
                  // textAlign: "center",
                  borderRadius: "5px",
                }}
              >
                <tr>
                  <td
                    style={{
                      border: "1px solid grey",
                      color: "#2e008b",
                    }}
                  >
                    <li className="text-dark p-2" style={{ listStyle: "none" }}>
                      {/* <span className="text-dark fw-bold">First Name</span> :{" "} */}
                      <span className="text-dark" style={{ fontSize: "17px" }}>
                        {" "}
                        <span className="fw-bold">Name</span> :{" "}
                        {userData?.broker_Details?.firstName}{" "}
                        {userData?.broker_Details?.middleName}{" "}
                        {userData?.broker_Details?.lastName}
                      </span>
                    </li>
                  </td>
                  <td
                    style={{
                      border: "1px solid grey",
                      color: "#2e008b",
                      // padding:"5px"
                    }}
                  >
                    <li className="text-dark p-2" style={{ listStyle: "none" }}>
                      <span className="text-dark" style={{ fontSize: "17px" }}>
                        <span className="fw-bold"> Company</span> :{" "}
                        {userData?.broker_Details?.companyName}
                      </span>
                      {/* <span className="text-dark fw-bold">Middle Name</span> :{" "}
                    <span className="text-dark fw-bold"> Devendra </span> */}
                    </li>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      border: "1px solid grey",
                      color: "#2e008b",
                      // padding:"5px"
                    }}
                  >
                    <li className="text-dark p-2" style={{ listStyle: "none" }}>
                      <span className="text-dark" style={{ fontSize: "17px" }}>
                        <span className="fw-bold">Email</span> :{" "}
                        {userData?.userEmail}
                      </span>
                      {/* <span className="text-dark fw-bold">Middle Name</span> :{" "}
                    <span className="text-dark fw-bold"> Devendra </span> */}
                    </li>
                  </td>
                  <td
                    style={{
                      border: "1px solid #2e008b",
                      color: "#2e008b",
                    }}
                  >
                    <li className="text-dark p-2" style={{ listStyle: "none" }}>
                      <span className="text-dark" style={{ fontSize: "17px" }}>
                        <span className="fw-bold"> Phone</span> :{" "}
                        {userData?.broker_Details?.phoneNumber}
                      </span>
                      {/* <span className="text-dark fw-bold">Last Name</span> :{" "}
                    <span className="text-dark fw-bold"> Patel </span> */}
                    </li>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="2"
                    style={{
                      border: "1px solid grey",
                      color: "#2e008b",
                      // padding:"5px"
                    }}
                  >
                    <li className="text-dark p-2" style={{ listStyle: "none" }}>
                      <span className="text-dark" style={{ fontSize: "17px" }}>
                        <span className="fw-bold">
                          Mortgage Broker Licence No.
                        </span>{" "}
                        : {userData?.broker_Details?.mortageBrokerLicNo}
                      </span>
                      {/* <span className="text-dark fw-bold">Middle Name</span> :{" "}
                    <span className="text-dark fw-bold"> Devendra </span> */}
                    </li>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="2"
                    style={{
                      border: "1px solid #2e008b",
                      color: "#2e008b",
                    }}
                  >
                    <li className="text-dark p-2" style={{ listStyle: "none" }}>
                      <span className="text-dark" style={{ fontSize: "17px" }}>
                        <span className="fw-bold">
                          {" "}
                          Mortgage Brokerge Licence No. :{" "}
                        </span>
                        {userData?.broker_Details?.phoneNumber}
                      </span>
                      {/* <span className="text-dark fw-bold">Last Name</span> :{" "}
                    <span className="text-dark fw-bold"> Patel </span> */}
                    </li>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="2"
                    style={{
                      border: "1px solid #2e008b",
                      color: "#2e008b",
                    }}
                  >
                    <li className="text-dark p-2" style={{ listStyle: "none" }}>
                      <span className="text-dark" style={{ fontSize: "17px" }}>
                        <span className="fw-bold"> Address : </span>
                        {userData.broker_Details?.streetNumber},{" "}
                        {userData.broker_Details?.streetName},{" "}
                        {userData?.broker_Details?.city},{" "}
                        {userData?.broker_Details?.province},{" "}
                        {userData?.broker_Details?.zipCode}
                      </span>
                      {/* <span className="text-dark fw-bold">Last Name</span> :{" "}
                    <span className="text-dark fw-bold"> Patel </span> */}
                    </li>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="2"
                    style={{
                      border: "1px solid grey",
                      color: "#2e008b",
                    }}
                  >
                    <li className="text-dark p-2" style={{ listStyle: "none" }}>
                      {/* <span className="text-dark fw-bold">First Name</span> :{" "} */}
                      <span className="text-dark" style={{ fontSize: "17px" }}>
                        {" "}
                        <span className="fw-bold">Assistant Name</span> :{" "}
                        {userData?.broker_Details?.assistantFirstName}{" "}
                        {userData?.broker_Details?.assistantLatsName}
                      </span>
                    </li>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="2"
                    style={{
                      border: "1px solid grey",
                      color: "#2e008b",
                    }}
                  >
                    <li className="text-dark p-2" style={{ listStyle: "none" }}>
                      {/* <span className="text-dark fw-bold">First Name</span> :{" "} */}
                      <span className="text-dark" style={{ fontSize: "17px" }}>
                        {" "}
                        <span className="fw-bold">Assistant Email</span> :{" "}
                        {userData?.broker_Details?.assistantEmailAddress}{" "}
                       
                      </span>
                    </li>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="2"
                    style={{
                      border: "1px solid grey",
                      color: "#2e008b",
                    }}
                  >
                    <li className="text-dark p-2" style={{ listStyle: "none" }}>
                      {/* <span className="text-dark fw-bold">First Name</span> :{" "} */}
                      <span className="text-dark" style={{ fontSize: "17px" }}>
                        {" "}
                        <span className="fw-bold">Assistant Phone </span> :{" "}
                        {userData?.broker_Details?.assistantPhoneNumber}{" "}
                      </span>
                    </li>
                  </td>
                </tr>
              </table>
              {/* <div className="form-group">
                <ul>
                  <li className="text-dark mt-3">
                    <span className="text-dark" style={{ fontSize: "17px" }}>
                      {" "}
                      Name : {userData?.broker_Details?.firstName}{" "}
                      {userData?.broker_Details?.middleName}{" "}
                      {userData?.broker_Details?.lastName}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="form-group">
                <ul>
                  <li className="text-dark mt-0">
                    <p className="text-dark" style={{ fontSize: "17px" }}>
                      Company : {userData?.broker_Details?.companyName}
                    </p>
                  </li>
                </ul>
              </div>
              <div className="form-group">
                <ul>
                  <li className="text-dark mt-0">
                    <p className="text-dark" style={{ fontSize: "17px" }}>
                      Email : {userData?.userEmail}
                    </p>
                  </li>
                </ul>
              </div>
              <div className="form-group">
                <ul>
                  <li className="text-dark mt-0">
                    <p className="text-dark" style={{ fontSize: "17px" }}>
                      Phone : {userData?.broker_Details?.phoneNumber}
                    </p>
                  </li>
                </ul>
              </div> */}
              {/* <div className="form-group">
                <ul>
                  <li className="text-dark mt-0">
                    <p className="text-dark" style={{ fontSize: "17px" }}>
                      Mortgage Broker Licence No. :{" "}
                      {userData?.broker_Details?.mortageBrokerLicNo}
                    </p>
                  </li>
                </ul>
              </div>
              <div className="form-group">
                <ul>
                  <li className="text-dark mt-0">
                    <p className="text-dark" style={{ fontSize: "17px" }}>
                      Mortgage Brokerge Licence No. :{" "}
                      {userData?.broker_Details?.mortageBrokerageLicNo}
                    </p>
               
                  </li>
                </ul>
              </div> */}
              {/* <div className="form-group">
                <ul>
                  <li className="text-dark mt-3">
                    <span className="text-dark" style={{ fontSize: "17px" }}>
                      {" "}
                      Address : {userData.broker_Details?.streetNumber},{" "}
                      {userData.broker_Details?.streetName},{" "}
                      {userData?.broker_Details?.city},{" "}
                      {userData?.broker_Details?.province},{" "}
                      {userData?.broker_Details?.zipCode}
                    </span>
                  </li>
                </ul>
              </div> */}
            </div>
            {/* End .col */}

            {/* <div className="col-lg-3">
              <div className="form-group">
                <ul>
                  <li className="text-dark mt-3">
                    <span className="text-dark fw-bold">First Name</span> :{" "} 
                    <span className="text-dark" style={{ fontSize: "17px" }}>
                      {" "}
                      Address : {userData.broker_Details?.streetNumber},{" "}
                      {userData.broker_Details?.streetName},{" "}
                      {userData?.broker_Details?.city},{" "}
                      {userData?.broker_Details?.province},{" "}
                      {userData?.broker_Details?.zipCode}
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
                      {userData?.broker_Details?.area}
                    </p>
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
                      {userData.broker_Details?.streetNumber},{" "}
                      {userData.broker_Details?.streetName},{" "}
                      {userData?.broker_Details?.city},{" "}
                      {userData?.broker_Details?.province},{" "}
                      {userData?.broker_Details?.zipCode}
                    </p>
                    
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
                      {userData?.broker_Details?.zipCode}
                    </p>
                    <span className="text-dark fw-bold">Last Name</span> :{" "}
                    <span className="text-dark fw-bold"> Patel </span>
                  </li>
                </ul>
              </div>
            </div> */}
            {/* End .col */}
          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;
