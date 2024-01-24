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
        <div className="col-lg-3 text-center">{/* End .col */}</div>
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
                        {userData?.appraiserCompany_Datails?.firstName}{" "}
                        {userData?.appraiserCompany_Datails?.lastName}
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
                        {
                          userData?.appraiserCompany_Datails
                            ?.appraiserCompanyName
                        }
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
                        {userData?.appraiserCompany_Datails?.phoneNumber}
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
                        <span className="fw-bold">Licence No.</span> :{" "}
                        {userData?.appraiserCompany_Datails?.licenseNumber}
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
                        <span className="fw-bold"> Primary Address</span>
                        {userData?.appraiserCompany_Datails?.addressLineOne}
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
                        {userData?.appraiserCompany_Datails?.city},{" "}
                        {userData?.appraiserCompany_Datails?.state},{" "}
                        {userData?.appraiserCompany_Datails?.postalCode}
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
                        {
                          userData?.appraiserCompany_Datails
                            ?.officeContactFirstName
                        }{" "}
                        {
                          userData?.appraiserCompany_Datails
                            ?.officeContactLastName
                        }
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
                        <span className="fw-bold">Office Email</span> :{" "}
                        {userData?.appraiserCompany_Datails?.officeContactEmail}{" "}
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
                        <span className="fw-bold">Office Phone </span> :{" "}
                        {userData?.appraiserCompany_Datails?.officeContactPhone}{" "}
                      </span>
                    </li>
                  </td>
                </tr>
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
