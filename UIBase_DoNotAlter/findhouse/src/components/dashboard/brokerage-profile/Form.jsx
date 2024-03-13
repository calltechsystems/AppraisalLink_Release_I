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
            Edit Profile
          </span>
        </button>
      </div>

      <div className="row">
        <div className="col-lg-3 text-center">
          <div className="wrap-custom-file mt-3 mb-5">
            <img
              style={{ borderRadius: "50%" }}
              src={userData?.brokerage_Details?.profileImage}
              alt="Uploaded Image"
            />
          </div>
          {/* End .col */}
        </div>
        <div className="col-lg-9">
          <div className="row mb-2">
            <div className="col-lg-11">
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
                          width: "370px",
                          color: "black",
                          padding: "5px",
                        }}
                      >
                        {" "}
                        {userData?.brokerage_Details?.firstName}{" "}
                        {userData?.brokerage_Details?.middleName}{" "}
                        {userData?.brokerage_Details?.lastName}
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
                        <span className="text-start"> Brokerage Name </span>
                      </td>
                      <td
                        style={{
                          border: "1px solid #2e008b",
                          width: "250px",
                          color: "black",
                          padding: "5px",
                        }}
                      >
                        {userData?.brokerage_Details?.brokerageName}
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
                        {userData?.brokerage_Details?.emailId}
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
                        {userData?.brokerage_Details?.phoneNumber}
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
                        {userData?.brokerage_Details?.cellNumber
                          ? userData?.brokerage_Details?.cellNumber
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
                        {userData?.brokerage_Details?.mortageBrokerLicNo}
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
                        {userData?.brokerage_Details?.mortageBrokerageLicNo}
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
                        {userData?.brokerage_Details?.streetNumber}{" "}
                        {userData?.brokerage_Details?.streetName}{" "}
                        {userData?.brokerage_Details?.apartmentNo}{" "}
                        {userData?.brokerage_Details?.city}{" "}
                        {userData?.brokerage_Details?.province}{" "}
                        {userData?.brokerage_Details?.postalCode}
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
                        {userData?.brokerage_Details?.assistantFirstName}
                        {userData?.brokerage_Details?.assistantLastName}
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
                        {
                          userData?.brokerage_Details?.assistantEmailAddress
                        }{" "}
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
                        {userData?.brokerage_Details?.assistantPhoneNumber}
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
                        {userData?.brokerage_Details?.assistantTwoFirstName}
                        {userData?.brokerage_Details?.assistantTwoLastName}
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
                        {
                          userData?.brokerage_Details?.assistantTwoEmailAddress
                        }{" "}
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
                        {userData?.brokerage_Details?.assistantTwoPhoneNumber}
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
                        {userData?.brokerage_Details?.firstName}{" "}
                        {userData?.brokerage_Details?.middleName}{" "}
                        {userData?.brokerage_Details?.lastName}
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 mt-1 text-start">
                      <span className="fs-18 fw-bold text-color">
                        Brokerage Name{" "}
                      </span>
                      {"   "}
                      <span className="">:</span>
                      {"   "}
                      <span className="text-start text-dark fw-bold">
                        {userData?.brokerage_Details?.brokerageName}
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
                      <span className="fs-18 fw-bold text-color">
                        Phone Number(Primary)
                      </span>
                      {"   "}
                      <span className="">:</span>
                      {"   "}
                      <span className="text-start text-dark fw-bold">
                        {userData?.brokerage_Details?.phoneNumber}
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 mt-1 text-start">
                      <span className="fs-18 fw-bold text-color">
                        Cell Number{" "}
                      </span>
                      {"   "}
                      <span className="">:</span>
                      {"   "}
                      <span className="text-start text-dark fw-bold">
                        {userData?.brokerage_Details?.cellNumber}
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
                        {userData?.brokerage_Details?.mortageBrokerLicNo}
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
                        {userData?.brokerage_Details?.mortageBrokerageLicNo}
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
                        {userData?.brokerage_Details?.streetNumber}{" "}
                        {userData?.brokerage_Details?.streetName}
                        {userData?.brokerage_Details?.unit}{" "}
                        {userData?.brokerage_Details?.city},{" "}
                        {userData?.brokerage_Details?.province},{" "}
                        {userData?.brokerage_Details?.postalCode}
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
                        {userData?.brokerage_Details?.assistantFirstName}{" "}
                        {userData?.brokerage_Details?.assistantLastName}
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
                        {userData?.brokerage_Details?.assistantEmailAddress}
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
                        {userData?.brokerage_Details?.assistantPhoneNumber}
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
