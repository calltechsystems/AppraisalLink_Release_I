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
                        {userData?.userEmail}
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
                              userData?.appraiserCompany_Datails?.lenderListUrl
                                ? userData?.appraiserCompany_Datails
                                    ?.lenderListUrl
                                : "#"
                            }
                            style={{ cursor: "pointer" }}
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
                        {
                          userData?.appraiserCompany_Datails?.addressLineOne
                        }{" "}
                        {userData?.appraiserCompany_Datails?.addressLineTwo}
                        {userData?.appraiserCompany_Datails?.unit}{" "}
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
                        {
                          userData?.appraiserCompany_Datails?.officeContactEmail
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
                        {userData?.appraiserCompany_Datails?.officeContactPhone}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* <div className="">
                <span style={{ fontWeight: "bold" }}>
                  <h3 className="text-center"> Appraiser Company Details </h3>
                </span>
                <hr />
                <div className=" col-lg-12">
                  <div className="row">
                    <div className="col-lg-12 mt-1 text-start">
                      <span className="fs-18 fw-bold text-color">
                        Appraiser Company Name{" "}
                      </span>
                      {"   "}
                      <span className="">:</span>
                      {"   "}
                      <span className="text-start text-dark fw-bold">
                        {
                          userData?.appraiserCompany_Datails
                            ?.appraiserCompanyName
                        }
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 mt-1 text-start">
                      <span className="fs-18 fw-bold text-color">
                        Primary Contact Name{" "}
                      </span>
                      {"   "}
                      <span className="">:</span>
                      {"   "}
                      <span className="text-start text-dark fw-bold">
                        {userData?.appraiserCompany_Datails?.firstName}{" "}
                        {userData?.appraiserCompany_Datails?.middleName}{" "}
                        {userData?.appraiserCompany_Datails?.lastName}
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
                        {userData?.appraiserCompany_Datails?.phoneNumber}
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
                        {userData?.appraiserCompany_Datails?.mortageBrokerLicNo}
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 mt-1 text-start">
                      <span className="fs-18 fw-bold text-color">
                        Lender List{" "}
                      </span>
                      {"   "}
                      <span className="">:</span>
                      {"   "}
                      <span className="text-start text-dark fw-bold">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={
                            userData?.appraiserCompany_Datails?.lenderListUrl
                              ? userData?.appraiserCompany_Datails
                                  ?.lenderListUrl
                              : "#"
                          }
                          style={{ cursor: "pointer" }}
                        >
                          Lender List Pdf
                        </a>
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 mt-1 text-start">
                      <span className="fs-18 fw-bold text-color">Licence </span>
                      {"   "}
                      <span className="">:</span>
                      {"   "}
                      <span className="text-start text-dark fw-bold">
                        {userData?.appraiserCompany_Datails?.licenseNumber}
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
                        {userData?.appraiserCompany_Datails?.addressLineOne}{" "}
                        {userData?.appraiserCompany_Datails?.addressLineTwo}
                        {userData?.appraiserCompany_Datails?.unit}{" "}
                        {userData?.appraiserCompany_Datails?.city},{" "}
                        {userData?.appraiserCompany_Datails?.province},{" "}
                        {userData?.appraiserCompany_Datails?.postalCode}
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 mt-1 text-start">
                      <span className="fs-18 fw-bold text-color">
                        Office Contact Name{" "}
                      </span>
                      {"   "}
                      <span className="">:</span>
                      {"   "}
                      <span className="text-start text-dark fw-bold">
                        {
                          userData?.appraiserCompany_Datails
                            ?.officeContactFirstName
                        }{" "}
                        {
                          userData?.appraiserCompany_Datails
                            ?.officeContactLastName
                        }
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 mt-1 text-start">
                      <span className="fs-18 fw-bold text-color">
                        Office Contact Email{" "}
                      </span>
                      {"   "}
                      <span className="">:</span>
                      {"   "}
                      <span className="text-start text-dark fw-bold">
                        {userData?.appraiserCompany_Datails?.officeContactEmail}
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 mt-1 text-start">
                      <span className="fs-18 fw-bold text-color">
                        Office Contact Phone{" "}
                      </span>
                      {"   "}
                      <span className="">:</span>
                      {"   "}
                      <span className="text-start text-dark fw-bold">
                        {userData?.appraiserCompany_Datails?.officeContactPhone}
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
