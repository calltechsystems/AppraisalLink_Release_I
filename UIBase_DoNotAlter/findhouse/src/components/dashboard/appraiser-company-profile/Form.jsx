import ReCAPTCHA from "react-google-recaptcha";
import { handleDownloadClick } from "./downloadFunction";
import Image from "next/image";

// function onChange(value) {
//   console.log("Captcha value:", value);
// }

const Form = ({ userData, chnageShowCardHandler }) => {
  const userData_01 = userData.userType ; // Example data, replace with actual data

  const renderUserType = (userData_01) => {
    if (userData_01 === 4) {
      return "Appraiser Company";
    } else {
      return "Unknown User Type"; // Default value if userType is not 1 or 6
    }
  };
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
          <div className="wrap-custom-file mt-5 mb-5">
            <img
              style={{ borderRadius: "50%" }}
              src={userData?.appraiserCompany_Datails?.profileImage}
              alt="Uploaded Image"
            />
          </div>
          {/* End .col */}
        </div>
        <div className="col-lg-9">
          <div className="row mb-2">
            <div className="col-lg-9">
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
                        <span className="text-start">User ID</span>
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
                        {userData.userEmail}
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
                        <span className="text-start"> User Type</span>
                      </td>
                      <td
                        style={{
                          border: "1px solid #2e008b",
                          width: "250px",
                          color: "black",
                          padding: "5px",
                        }}
                      >
                        {renderUserType(userData_01)}
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
                        <span className="text-start">Primary Contact Name</span>
                      </td>
                      <td
                        style={{
                          border: "1px solid #2e008b",
                          width: "280px",
                          color: "black",
                          padding: "5px",
                        }}
                      >
                        {" "}
                        {userData?.appraiserCompany_Datails?.firstName}{" "}
                        {userData?.appraiserCompany_Datails?.middleName}{" "}
                        {userData?.appraiserCompany_Datails?.lastName}
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
                          Appraiser Company Name{" "}
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
                        {
                          userData?.appraiserCompany_Datails
                            ?.appraiserCompanyName
                        }
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
                        {userData?.appraiserCompany_Datails?.emailId}
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
                        {userData?.appraiserCompany_Datails?.phoneNumber}
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
                        {userData?.appraiserCompany_Datails?.cellNumber
                          ? userData?.appraiserCompany_Datails?.cellNumber
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
                        <span className="text-start"> Licence Number</span>
                      </td>
                      <td
                        style={{
                          border: "1px solid #2e008b",
                          width: "250px",
                          color: "black",
                          padding: "5px",
                        }}
                      >
                        {userData?.appraiserCompany_Datails?.licenseNumber}
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
                        <span className="text-start"> Lender List</span>
                      </td>
                      <td
                        style={{
                          border: "1px solid #2e008b",
                          width: "250px",
                          color: "black",
                          padding: "5px",
                        }}
                      >
                        <span className="text-start text-dark fw-bold">
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={
                              userData?.appraiserCompany_Datails
                                ?.lenderListUrl !== ""
                                ? userData?.appraiserCompany_Datails
                                    ?.lenderListFUrl
                                : ""
                            }
                            onClick={(event)=>handleDownloadClick(event,
                              userData?.appraiserCompany_Datails?.lenderListUrl,
                              `${userData?.appraiserCompany_Datails?.firstName}_lenderlist.pdf`)}
                            style={{ cursor: "pointer",textDecoration:"underline" }}
                          >
                            Lender List Pdf
                          </a>
                        </span>
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
                        {userData?.appraiserCompany_Datails?.streetNumber}{" "}
                        {userData?.appraiserCompany_Datails?.streetName}{" "}
                        {userData?.appraiserCompany_Datails?.apartmentNumber}{" "}
                        {userData?.appraiserCompany_Datails?.city},{" "}
                        {userData?.appraiserCompany_Datails?.province},{" "}
                        {userData?.appraiserCompany_Datails?.postalCode}
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
                        <span className="text-start">Office Contact Name</span>
                      </td>
                      <td
                        style={{
                          border: "1px solid #2e008b",
                          width: "250px",
                          color: "black",
                          padding: "5px",
                        }}
                      >
                        {
                          userData?.appraiserCompany_Datails
                            ?.officeContactFirstName
                        }{" "}
                        {
                          userData?.appraiserCompany_Datails
                            ?.officeContactLastName
                        }
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
                        <span className="text-start">Office Contact Email</span>
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
                        {/* {
                          userData?.appraiserCompany_Datails?.officeContactEmail
                        }{" "} */}
                        {userData?.appraiserCompany_Datails?.officeContactEmail
                          ? userData?.appraiserCompany_Datails
                              ?.officeContactEmail
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
                        <span className="text-start">Office Contact Phone</span>
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
                        {/* {userData?.appraiserCompany_Datails?.officeContactPhone} */}
                        {userData?.appraiserCompany_Datails?.officeContactPhone
                          ? userData?.appraiserCompany_Datails
                              ?.officeContactPhone
                          : "Not Provided"}
                      </td>
                    </tr>
                  </tbody>
                </table>
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
