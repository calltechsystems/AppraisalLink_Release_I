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
            <div className="col-lg-9">
              <table
                className=""
                style={{
                  width: "450px",
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
                        {userData?.brokerage_Details?.firstName}{" "}
                        {userData?.brokerage_Details?.middleName}{" "}
                        {userData?.brokerage_Details?.lastName}
                      </span>
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
                        <span className="fw-bold"> Brokerage Name</span> :{" "}
                        {userData?.brokerage_Details?.brokerageNameRef}
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
                </tr>
                <tr>
                  <td
                    style={{
                      border: "1px solid #2e008b",
                      color: "#2e008b",
                    }}
                  >
                    <li className="text-dark p-2" style={{ listStyle: "none" }}>
                      <span className="text-dark" style={{ fontSize: "17px" }}>
                        <span className="fw-bold"> Phone</span> :{" "}
                        {userData?.brokerage_Details?.phoneNumber}
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
                        : {userData?.brokerage_Details?.mortageBrokerLicNo}
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
                        {userData?.brokerage_Details?.mortageBrokerageLicNo}
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
                        {userData.brokerage_Details?.streetNumber},{" "}
                        {userData.brokerage_Details?.streetName},{" "}
                        {userData?.brokerage_Details?.city},{" "}
                        {userData?.brokerage_Details?.province},{" "}
                        {userData?.brokerage_Details?.zipCode}
                      </span>
                      {/* <span className="text-dark fw-bold">Last Name</span> :{" "}
                    <span className="text-dark fw-bold"> Patel </span> */}
                    </li>
                  </td>
                </tr>
                {/* <tr>
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
                        {userData?.brokerage_Details?.assistantFirstName}{" "}
                        {userData?.brokerage_Details?.assistantLatsName}
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
                        {userData?.brokerage_Details?.assistantEmailAddress}{" "}
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
                        {userData?.brokerage_Details?.assistantPhoneNumber}{" "}
                      </span>
                    </li>
                  </td>
                </tr> */}
              </table>
            </div>
            {/* End .col */}
          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;
