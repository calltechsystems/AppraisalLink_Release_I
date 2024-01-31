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
              src={userData?.broker_Details?.profileImage}
              alt="Uploaded Image"
            />
          </div>
          {/* End .col */}
        </div>
        <div className="col-lg-9">
          <div className="row mb-2">
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
                  <div className="">
                    <span style={{ fontWeight: "bold" }}>
                      <h3 className="text-center">
                        {" "}
                        Appraiser Company Details{" "}
                      </h3>
                    </span>
                    <hr />
                    <div className=" col-lg-12">
                      <div className="row">
                        <div className="col-lg-12 mt-1 text-start">
                          <span className="fs-18 fw-bold text-color">
                            Name{" "}
                          </span>
                          {"   "}
                          <span className="">:</span>
                          {"   "}
                          <span className="text-start text-dark fw-bold">
                            {userData?.appraiserCompany_Datails?.firstName}{" "}
                            {userData?.appraiserCompany_Datails?.lastName}
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
                            Phone{" "}
                          </span>
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
                            Licence No.{" "}
                          </span>
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
                          <span className="fs-18 fw-bold text-color">
                            Address{" "}
                          </span>
                          {"   "}
                          <span className="">:</span>
                          {"   "}
                          <span className="text-start text-dark fw-bold">
                            {userData?.appraiserCompany_Datails?.addressLineOne}{" "}
                            {userData?.appraiserCompany_Datails?.streetName}
                            {userData?.appraiserCompany_Datails?.unit}{" "}
                            {userData?.appraiserCompany_Datails?.city},{" "}
                            {userData?.appraiserCompany_Datails?.state},{" "}
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
                            {
                              userData?.appraiserCompany_Datails
                                ?.officeContactEmail
                            }{" "}
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
                            {
                              userData?.appraiserCompany_Datails
                                ?.officeContactPhone
                            }{" "}
                          </span>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </div>
                </div>
                {/* End .col */}
              </div>
              {/* <table
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
                      <span className="text-dark" style={{ fontSize: "17px" }}>
                        {" "}
                        <span className="fw-bold">Office Phone </span> :{" "}
                        {userData?.appraiserCompany_Datails?.officeContactPhone}{" "}
                      </span>
                    </li>
                  </td>
                </tr>
              </table> */}
            </div>
            {/* End .col */}
          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;
