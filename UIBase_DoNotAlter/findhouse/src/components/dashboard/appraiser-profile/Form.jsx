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
              <div className="">
                <span style={{ fontWeight: "bold" }}>
                  <h3 className="text-center"> Appraiser Details </h3>
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
                        {userData?.appraiser_Details?.firstName}{" "}
                        {userData?.appraiser_Details?.middleName}{" "}
                        {userData?.appraiser_Details?.lastName}
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
                        {userData?.appraiser_Details?.companyName}
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
                        {userData?.appraiser_Details?.phoneNumber}
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
                        {userData?.appraiser_Details?.cellNumber}
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
                        <a target="_blank"
                        rel="noopener noreferrer" href={userData?.appraiser_Details?.lenderListUrl ? userData?.appraiser_Details?.lenderListUrl : "#"} style={{cursor:"pointer"}}>Lender List Pdf</a>
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 mt-1 text-start">
                      <span className="fs-18 fw-bold text-color">
                        Designation{" "}
                      </span>
                      {"   "}
                      <span className="">:</span>
                      {"   "}
                      <span className="text-start text-dark fw-bold">
                        {userData?.appraiser_Details?.mortageBrokerageLicNo}
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
                        {userData?.appraiser_Details?.streetNumber}{" "}
                        {userData?.appraiser_Details?.streetName}
                        {userData?.appraiser_Details?.unit}{" "}
                        {userData?.appraiser_Details?.city},{" "}
                        {userData?.appraiser_Details?.province},{" "}
                        {userData?.appraiser_Details?.postalCode}
                      </span>
                    </div>
                  </div>
                  {/* <div className="row">
                    <div className="col-lg-12 mt-1 text-start">
                      <span className="fs-18 fw-bold text-color">
                        Assistant Name{" "}
                      </span>
                      {"   "}
                      <span className="">:</span>
                      {"   "}
                      <span className="text-start text-dark fw-bold">
                        {userData?.appraiser_Details?.assistantFirstName}{" "}
                        {userData?.appraiser_Details?.assistantLastName}
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
                        {userData?.appraiser_Details?.assistantEmailAddress}
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
                        {userData?.appraiser_Details?.assistantPhoneNumber}
                      </span>
                    </div>
                  </div> */}
                </div>
                <hr />
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
