import ReCAPTCHA from "react-google-recaptcha";
import Image from "next/image";

// function onChange(value) {
//   console.log("Captcha value:", value);
// }

const Form = ({ userData, chnageShowCardHandler }) => {
  return (
    <form
      className="contact_form"
      action="#"
      style={{ borderRadius: "5px" }}
    >
      <div className="d-flex justify-content-end">
        <button
          className="btn btn2 btn-color profile_edit_button_01 mb-2"
          onClick={() => chnageShowCardHandler(false)}
        >
          <span
            className=""
            data-toggle="tooltip"
            data-placement="top"
            title="Edit Profile"
          >Edit Profile</span>
        </button>
      </div>

      <div className="row">
        <div className="col-lg-3 text-center">
          <div className="wrap-custom-file mt-3 mb-5">
            <img
              style={{ borderRadius: "50%" }}
              src={userData?.appraiser_Details?.profileImage}
              alt="Uploaded Image"
            />
          </div>
          {/* End .col */}
        </div>
        <div className="col-lg-9">
          <div className="row mb-2">
          <div className="col-lg-9">
              {/* <table
                className=""
                style={{
                  width: "650px",
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
                      <span className="text-dark" style={{ fontSize: "17px" }}>
                        {" "}
                        <span className="fw-bold">Name</span> :{" "}
                        {userData?.appraiser_Details?.firstName}{" "}
                        {userData?.appraiser_Details?.middleName}{" "}
                        {userData?.appraiser_Details?.lastName}
                      </span>
                    </li>
                  </td>
                  <td
                    style={{
                      border: "1px solid grey",
                      color: "#2e008b",
                    }}
                  >
                    <li className="text-dark p-2" style={{ listStyle: "none" }}>
                      <span className="text-dark" style={{ fontSize: "17px" }}>
                        <span className="fw-bold"> Company</span> :{" "}
                        {userData?.appraiser_Details?.companyName}
                      </span>
                    </li>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      border: "1px solid grey",
                      color: "#2e008b",
                      
                    }}
                  >
                    <li className="text-dark p-2" style={{ listStyle: "none" }}>
                      <span className="text-dark" style={{ fontSize: "17px" }}>
                        <span className="fw-bold">Email</span> :{" "}
                        {userData?.userEmail}
                      </span>
                      
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
                        {userData?.appraiser_Details?.phoneNumber}
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
                      <span className="text-dark" style={{ fontSize: "17px" }}>
                        <span className="fw-bold">
                          Mortgage Broker Licence No.
                        </span>{" "}
                        : {userData?.appraiser_Details?.mortageBrokerLicNo}
                      </span>
                      
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
                        {userData?.appraiser_Details?.phoneNumber}
                      </span>
                    
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
                        {userData.appraiser_Details?.streetNumber},{" "}
                        {userData.appraiser_Details?.streetName},{" "}
                        {userData?.appraiser_Details?.city},{" "}
                        {userData?.appraiser_Details?.province},{" "}
                        {userData?.appraiser_Details?.zipCode}
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
                      <span className="text-dark" style={{ fontSize: "17px" }}>
                        {" "}
                        <span className="fw-bold">Assistant Name</span> :{" "}
                        {userData?.appraiser_Details?.assistantFirstName}{" "}
                        {userData?.appraiser_Details?.assistantLatsName}
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
                      <span className="text-dark" style={{ fontSize: "17px" }}>
                        {" "}
                        <span className="fw-bold">Assistant Email</span> :{" "}
                        {userData?.appraiser_Details?.assistantEmailAddress}{" "}
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
                      <span className="text-dark" style={{ fontSize: "17px" }}>
                        {" "}
                        <span className="fw-bold">Assistant Phone </span> :{" "}
                        {userData?.appraiser_Details?.assistantPhoneNumber}{" "}
                      </span>
                    </li>
                  </td>
                </tr>
              </table> */}
              <div className="form-content">
                <span style={{ fontWeight: "bold" }}>
                  <h3 className="text-center"> Appraiser Details </h3>
                </span>
                <hr />
                <div className=" col-lg-12">
                  <div className="row">
                    <h5 className="col-lg-5 mt-1 text-start">
                      <span className="fs-18 text-color">Name </span>{" "}
                    </h5>
                    <span className="col-lg-1">:</span>
                    <span className="col-lg-6 text-start text-dark fw-bold">
                      {userData?.appraiser_Details?.firstName}{" "}
                      {userData?.appraiser_Details?.middleName}{" "}
                      {userData?.appraiser_Details?.lastName}
                    </span>
                  </div>
                  <div className="row">
                    <h5 className="col-lg-5 mt-1 text-start">
                      <span className="fs-18 text-color">Company Name</span>{" "}
                    </h5>
                    <span className="col-lg-1">:</span>
                    <span className="col-lg-6 text-start text-dark fw-bold">
                      {userData?.appraiser_Details?.companyName}
                    </span>
                  </div>
                  <div className="row">
                    <h5 className="col-lg-5 mt-1 text-start">
                      <span className="fs-18 text-color">Email Address </span>{" "}
                    </h5>
                    <span className="col-lg-1">:</span>
                    <span className="col-lg-6 text-start text-dark fw-bold">
                      {userData?.userEmail}
                    </span>
                  </div>
                  <div className="row">
                    <h5 className="col-lg-5 mt-1 text-start">
                      <span className="fs-18 text-color">Phone </span>{" "}
                    </h5>
                    <span className="col-lg-1">:</span>
                    <span className="col-lg-6 text-start text-dark fw-bold">
                      {userData?.appraiser_Details?.phoneNumber}
                    </span>
                  </div>
                  <div className="row">
                    <h5 className="col-lg-5 mt-1 text-start">
                      <span className="fs-18 text-color">Designation</span>{" "}
                    </h5>
                    <span className="col-lg-1">:</span>
                    <span className="col-lg-6 text-start text-dark fw-bold">
                      {userData?.appraiser_Details?.mortageBrokerLicNo}
                    </span>
                  </div>
                  
                  <div className="row">
                    <h5 className="col-lg-5 mt-1 text-start">
                      <span className="fs-18 text-color">
                        Reviewer Name
                      </span>{" "}
                    </h5>
                    <span className="col-lg-1">:</span>
                    <span className="col-lg-6 text-start text-dark fw-bold">
                      {userData?.appraiser_Details?.mortageBrokerageLicNo}
                    </span>
                  </div>
                  <div className="row">
                    <h5 className="col-lg-5 mt-1 text-start">
                      <span className="fs-18 text-color">
                        Reviewer Designation
                      </span>{" "}
                    </h5>
                    <span className="col-lg-1">:</span>
                    <span className="col-lg-6 text-start text-dark fw-bold">
                      {userData?.appraiser_Details?.mortageBrokerageLicNo}
                    </span>
                  </div>
                  <div className="row">
                    <h5 className="col-lg-5 mt-1 text-start">
                      <span className="fs-18 text-color">Address </span>{" "}
                    </h5>
                    <span className="col-lg-1">:</span>
                    <span className="col-lg-6 text-dark fw-bold">
                      {userData?.appraiser_Details?.streetName}-
                      {userData?.appraiser_Details?.streetNumber},
                      {userData?.appraiser_Details?.unit}{" "}
                      {userData?.appraiser_Details?.city} -{" "}
                      {userData?.appraiser_Details?.province}{" "}
                      {userData?.appraiser_Details?.postalCode}
                    </span>
                  </div>
                  {/* <div className="row">
                    <h5 className="col-lg-5 mt-1 text-start">
                      <span className="fs-18 text-color">Assistant Name </span>{" "}
                    </h5>
                    <span className="col-lg-1">:</span>
                    <span className="col-lg-6 text-start text-dark fw-bold">
                      {userData?.appraiser_Details?.assistantFirstName}{" "}
                      {userData?.appraiser_Details?.assistantLastName}
                    </span>
                  </div>
                  <div className="row">
                    <h5 className="col-lg-5 mt-1 text-start">
                      <span className="fs-18 text-color">Assistant Email </span>{" "}
                    </h5>
                    <span className="col-lg-1">:</span>
                    <span className="col-lg-6 text-start text-dark fw-bold">
                      {userData?.appraiser_Details?.assistantEmailAddress}{" "}
                    </span>
                  </div>
                  <div className="row">
                    <h5 className="col-lg-5 mt-1 text-start">
                      <span className="fs-18 text-color">Assistant Phone </span>{" "}
                    </h5>
                    <span className="col-lg-1">:</span>
                    <span className="col-lg-6 text-start text-dark fw-bold">
                      {userData?.appraiser_Details?.assistantPhoneNumber}{" "}
                    </span>
                  </div> */}
                </div>
                <hr />
                {/* <div className="text-center" style={{}}>
                  <button
                    className="btn btn-color w-35"
                    onClick={() => closeAppraiserHandler()}
                  >
                    Ok
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;
