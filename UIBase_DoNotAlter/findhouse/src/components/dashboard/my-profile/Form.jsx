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
        <div className="col-lg-2 text-center">
          <div className="wrap-custom-file mt-3 mb-5">
            <img
              style={{ borderRadius: "50%" }}
              src={userData?.broker_Details?.profileImage}
              alt="Uploaded Image"
            />
          </div>
          {/* End .col */}
        </div>
        <div className="col-lg-10">
          <div className="row mb-2">
            <div className="col-lg-12">
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
                    }}
                  >
                    <li className="text-dark p-2" style={{ listStyle: "none" }}>
                      <span className="text-dark" style={{ fontSize: "17px" }}>
                        <span className="fw-bold"> Company</span> :{" "}
                        {userData?.broker_Details?.companyName}
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
                        {userData?.broker_Details?.phoneNumber}
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
                        : {userData?.broker_Details?.mortageBrokerLicNo}
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
                        {userData?.broker_Details?.phoneNumber}
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
                        {userData.broker_Details?.streetNumber},{" "}
                        {userData.broker_Details?.streetName},{" "}
                        {userData?.broker_Details?.city},{" "}
                        {userData?.broker_Details?.province},{" "}
                        {userData?.broker_Details?.zipCode}
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
                      <span className="text-dark" style={{ fontSize: "17px" }}>
                        {" "}
                        <span className="fw-bold">Assistant Phone </span> :{" "}
                        {userData?.broker_Details?.assistantPhoneNumber}{" "}
                      </span>
                    </li>
                  </td>
                </tr>
              </table> */}
              <span style={{ fontWeight: "bold" }}>
                <h3 className="text-center text-color"> User Details </h3>
              </span>
              {/* <hr /> */}
              <div
                className="d-flex justify-content-center"
                id="property-info-container"
              >
                <table
                  style={{
                    width: "700px",
                    textAlign: "start",
                    borderRadius: "5px",
                    fontSize: "17px",
                    fontWeight: "bold",
                  }}
                >
                  <thead>
                    <tr>
                      <th
                        style={{
                          border: "1px solid #2e008b",
                          color: "#2e008b",
                          color: "#2e008b",
                          // padding: "5px",
                          textAlign: "center",
                        }}
                      >
                        Headers
                      </th>
                      <th
                        style={{
                          border: "1px solid #2e008b",
                          // width: "470px",
                          color: "#2e008b",
                          // padding: "5px",
                          textAlign: "center",
                        }}
                      >
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td
                        style={{
                          border: "1px solid #2e008b",
                          color: "#2e008b",
                          padding: "5px",
                        }}
                      >
                        <span className="text-start">Name</span>
                      </td>
                      <td
                        style={{
                          border: "1px solid #2e008b",
                          width: "420px",
                          color: "black",
                          padding: "5px",
                        }}
                      >
                        {" "}
                        {userData?.broker_Details?.firstName}{" "}
                        {userData?.broker_Details?.middleName}{" "}
                        {userData?.broker_Details?.lastName}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          border: "1px solid #2e008b",
                          color: "#2e008b",
                          padding: "5px",
                        }}
                      >
                        <span className="text-start"> Company Name </span>
                      </td>
                      <td
                        style={{
                          border: "1px solid #2e008b",
                          width: "250px",
                          color: "black",
                          padding: "5px",
                        }}
                      >
                        {userData?.broker_Details?.companyName}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          border: "1px solid #2e008b",
                          color: "#2e008b",
                          padding: "5px",
                        }}
                      >
                        <span className="text-start"> Email Address</span>
                      </td>
                      <td
                        style={{
                          border: "1px solid #2e008b",
                          width: "250px",
                          color: "black",
                          padding: "5px",
                        }}
                      >
                        {userData?.broker_Details?.emailId}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          border: "1px solid #2e008b",
                          color: "#2e008b",
                          padding: "5px",
                        }}
                      >
                        <span className="text-start"> Phone Number</span>
                      </td>
                      <td
                        style={{
                          border: "1px solid #2e008b",
                          width: "250px",
                          color: "black",
                          padding: "5px",
                        }}
                      >
                        {userData?.broker_Details?.phoneNumber}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          border: "1px solid #2e008b",
                          color: "#2e008b",
                          padding: "5px",
                        }}
                      >
                        <span className="text-start"> Cell Number</span>
                      </td>
                      <td
                        style={{
                          border: "1px solid #2e008b",
                          width: "250px",
                          color: "black",
                          padding: "5px",
                        }}
                      >
                        {userData?.broker_Details?.cellNumber
                          ? userData?.broker_Details?.cellNumber
                          : "Not Provided"}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          border: "1px solid #2e008b",
                          color: "#2e008b",
                          padding: "5px",
                        }}
                      >
                        <span className="text-start">
                          {" "}
                          Mortgage Broker Licence No.
                        </span>
                      </td>
                      <td
                        style={{
                          border: "1px solid #2e008b",
                          width: "250px",
                          color: "black",
                          padding: "5px",
                        }}
                      >
                        {userData?.broker_Details?.mortageBrokerLicNo}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          border: "1px solid #2e008b",
                          color: "#2e008b",
                          padding: "5px",
                        }}
                      >
                        <span className="text-start">
                          Mortgage Brokerage Licence No.
                        </span>
                      </td>
                      <td
                        style={{
                          border: "1px solid #2e008b",
                          width: "250px",
                          color: "black",
                          padding: "5px",
                        }}
                      >
                        {userData?.broker_Details?.mortageBrokerageLicNo}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          border: "1px solid #2e008b",
                          color: "#2e008b",
                          padding: "5px",
                        }}
                      >
                        <span className="text-start">Address</span>
                      </td>
                      <td
                        style={{
                          border: "1px solid #2e008b",
                          width: "250px",
                          color: "black",
                          padding: "5px",
                        }}
                      >
                        {" "}
                        {userData?.broker_Details?.streetNumber}{" "}
                        {userData?.broker_Details?.streetName}{" "}
                        {userData?.broker_Details?.apartmentNo}{" "}
                        {userData?.broker_Details?.city}{" "}
                        {userData?.broker_Details?.province}{" "}
                        {userData?.broker_Details?.postalCode}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          border: "1px solid #2e008b",
                          color: "#2e008b",
                          padding: "5px",
                        }}
                      >
                        <span className="text-start">Assistant#1 Name</span>
                      </td>
                      <td
                        style={{
                          border: "1px solid #2e008b",
                          width: "250px",
                          color: "black",
                          padding: "5px",
                        }}
                      >
                        {userData?.broker_Details?.assistantFirstName}
                        {userData?.broker_Details?.assistantLastName}
                        {/* <span>
                          {userData?.broker_Details?.assistantFirstName
                            ? userData.broker_Details.assistantFirstName
                            : "Not Provided"}{" "}
                          {userData?.broker_Details?.assistantLastName
                            ? userData.broker_Details.assistantLastName
                            : " "}
                        </span> */}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          border: "1px solid #2e008b",
                          color: "#2e008b",
                          padding: "5px",
                        }}
                      >
                        <span className="text-start">Assistant#1 Email</span>
                      </td>
                      <td
                        style={{
                          border: "1px solid #2e008b",
                          width: "250px",
                          color: "black",
                          padding: "5px",
                        }}
                      >
                        {" "}
                        {userData?.broker_Details?.assistantEmailAddress
                          ? userData?.broker_Details?.assistantTwoEmailAddress
                          : "Not Provided"}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          border: "1px solid #2e008b",
                          color: "#2e008b",
                          padding: "5px",
                        }}
                      >
                        <span className="text-start">Assistant#1 Phone</span>
                      </td>
                      <td
                        style={{
                          border: "1px solid #2e008b",
                          width: "250px",
                          color: "black",
                          padding: "5px",
                        }}
                      >
                        {" "}
                        {userData?.broker_Details?.assistantPhoneNumber
                          ? userData?.broker_Details?.assistantPhoneNumber
                          : "Not Provided"}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          border: "1px solid #2e008b",
                          color: "#2e008b",
                          padding: "5px",
                        }}
                      >
                        <span className="text-start">Assistant#2 Name</span>
                      </td>
                      <td
                        style={{
                          border: "1px solid #2e008b",
                          width: "250px",
                          color: "black",
                          padding: "5px",
                        }}
                      >
                        {userData?.broker_Details?.assistantTwoFirstName}
                        {userData?.broker_Details?.assistantTwoLastName}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          border: "1px solid #2e008b",
                          color: "#2e008b",
                          padding: "5px",
                        }}
                      >
                        <span className="text-start">Assistant#2 Email</span>
                      </td>
                      <td
                        style={{
                          border: "1px solid #2e008b",
                          width: "250px",
                          color: "black",
                          padding: "5px",
                        }}
                      >
                        {" "}
                        {userData?.broker_Details?.assistantTwoEmailAddress
                          ? userData?.broker_Details?.assistantTwoEmailAddress
                          : "Not Provided"}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          border: "1px solid #2e008b",
                          color: "#2e008b",
                          padding: "5px",
                        }}
                      >
                        <span className="text-start">Assistant#2 Phone</span>
                      </td>
                      <td
                        style={{
                          border: "1px solid #2e008b",
                          width: "250px",
                          color: "black",
                          padding: "5px",
                        }}
                      >
                        {" "}
                        {userData?.broker_Details?.assistantTwoPhoneNumber
                          ? userData?.broker_Details?.assistantTwoPhoneNumber
                          : "Not Provided"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* <div className="">
                <span style={{ fontWeight: "bold" }}>
                  <h3 className="text-center"> Broker Details </h3>
                </span>
                <hr />
                <div className=" col-lg-12">
                  <div className="row">
                    <div className="col-lg-12 mt-1 text-start">
                      <span className="fs-18 fw-bold text-color">Name </span>
                      {"   "}
                      <span className="">:</span>
                      {"   "}
                      <span className="text-start text-dark fw-bold">
                        {userData?.broker_Details?.firstName}{" "}
                        {userData?.broker_Details?.middleName}{" "}
                        {userData?.broker_Details?.lastName}
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 mt-1 text-start">
                      <span className="fs-18 fw-bold text-color">
                        Company Name{" "}
                      </span>
                      {"   "}
                      <span className="">:</span>
                      {"   "}
                      <span className="text-start text-dark fw-bold">
                        {userData?.broker_Details?.companyName}
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 mt-1 text-start">
                      <span className="fs-18 fw-bold text-color">
                        Email Address{" "}
                      </span>
                      {"   "}
                      <span className="">:</span>
                      {"   "}
                      <span className="text-start text-dark fw-bold">
                        {userData?.userEmail}
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 mt-1 text-start">
                      <span className="fs-18 fw-bold text-color">Phone </span>
                      {"   "}
                      <span className="">:</span>
                      {"   "}
                      <span className="text-start text-dark fw-bold">
                        {userData?.broker_Details?.phoneNumber}
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 mt-1 text-start">
                      <span className="fs-18 fw-bold text-color">
                        Mortgage Broker Licence No.{" "}
                      </span>
                      {"   "}
                      <span className="">:</span>
                      {"   "}
                      <span className="text-start text-dark fw-bold">
                        {userData?.broker_Details?.mortageBrokerLicNo}
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 mt-1 text-start">
                      <span className="fs-18 fw-bold text-color">
                        Mortgage Brokerage Licence No.{" "}
                      </span>
                      {"   "}
                      <span className="">:</span>
                      {"   "}
                      <span className="text-start text-dark fw-bold">
                        {userData?.broker_Details?.mortageBrokerageLicNo}
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 mt-1 text-start">
                      <span className="fs-18 fw-bold text-color">Address </span>
                      {"   "}
                      <span className="">:</span>
                      {"   "}
                      <span className="text-start text-dark fw-bold">
                        {userData?.broker_Details?.streetNumber}{" "}
                        {userData?.broker_Details?.streetName}
                        {userData?.broker_Details?.unit}{" "}
                        {userData?.broker_Details?.city},{" "}
                        {userData?.broker_Details?.province},{" "}
                        {userData?.broker_Details?.postalCode}
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 mt-1 text-start">
                      <span className="fs-18 fw-bold text-color">
                        Assistant Name{" "}
                      </span>
                      {"   "}
                      <span className="">:</span>
                      {"   "}
                      <span className="text-start text-dark fw-bold">
                        {userData?.broker_Details?.assistantFirstName}{" "}
                        {userData?.broker_Details?.assistantLastName}
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 mt-1 text-start">
                      <span className="fs-18 fw-bold text-color">
                        Assistant Email{" "}
                      </span>
                      {"   "}
                      <span className="">:</span>
                      {"   "}
                      <span className="text-start text-dark fw-bold">
                        {userData?.broker_Details?.assistantEmailAddress}
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 mt-1 text-start">
                      <span className="fs-18 fw-bold text-color">
                        Assistant Phone{" "}
                      </span>
                      {"   "}
                      <span className="">:</span>
                      {"   "}
                      <span className="text-start text-dark fw-bold">
                        {userData?.broker_Details?.assistantPhoneNumber}
                      </span>
                    </div>
                  </div>
                </div>
                <hr />
              </div> */}
            </div>
            {/* End .col */}
          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;
