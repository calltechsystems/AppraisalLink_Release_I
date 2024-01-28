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
          className="btn btn2 btn-color profile_edit_button_01"
          onClick={() => chnageShowCardHandler(false)}
        >
          <span
            className="flaticon-edit"
            data-toggle="tooltip"
            data-placement="top"
            title="Edit Profile"
          ></span>
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
            <div className="col-lg-6">
              <div className="form-group">
                <ul>
                  <li className="text-dark mt-3">
                    {/* <span className="text-dark fw-bold">First Name</span> :{" "} */}
                    <span
                      className="text-dark fw-bold"
                      style={{ fontSize: "21px" }}
                    >
                      {" "}
                      Name : {userData?.appraiser_Details?.firstName}{" "}
                      {userData?.appraiser_Details?.middleName}{" "}
                      {userData?.appraiser_Details?.lastName}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="form-group">
                <ul>
                  <li className="text-dark mt-0">
                    <p className="text-dark" style={{ fontSize: "18px" }}>
                      Company : {userData?.appraiser_Details?.companyName}
                    </p>
                    {/* <span className="text-dark fw-bold">Middle Name</span> :{" "}
                    <span className="text-dark fw-bold"> Devendra </span> */}
                  </li>
                </ul>
              </div>
              <div className="form-group">
                <ul>
                  <li className="text-dark mt-0">
                    <p className="text-dark" style={{ fontSize: "17px" }}>
                      Email : {userData?.userEmail}
                    </p>
                    {/* <span className="text-dark fw-bold">Middle Name</span> :{" "}
                    <span className="text-dark fw-bold"> Devendra </span> */}
                  </li>
                </ul>
              </div>
              <div className="form-group">
                <ul>
                  <li className="text-dark mt-0">
                    <p className="text-dark" style={{ fontSize: "17px" }}>
                      Phone : {userData?.appraiser_Details?.phoneNumber}
                    </p>
                        </li>
                </ul>
              </div>
               <div className="form-group">
                <ul>
                  <li className="text-dark mt-0">
                    <p className="text-dark" style={{ fontSize: "17px" }}>
                      Designation. :{" "}
                      {userData?.appraiser_Details?.designation || "NA"}
                    </p>
                    
                  </li>
                </ul>
              </div>
              {/*<div className="form-group">
                <ul>
                  <li className="text-dark mt-0">
                    <p className="text-dark" style={{ fontSize: "17px" }}>
                      Mortgage Brokerge Licence No. :{" "}
                      {userData?.brokerage_Details?.mortageBrokerageLicNo}
                    </p>
                     
                  </li>
                </ul>
                  </div>*/}
            </div>
            {/* End .col */}

            <div className="col-lg-6">
              <div className="form-group">
                <ul>
                  <li className="text-dark mt-3">
                    {/* <span className="text-dark fw-bold">First Name</span> :{" "} */}
                    <span className="text-dark" style={{ fontSize: "17px" }}>
                      {" "}
                      Address : {userData?.appraiser_Details?.adressLine1}
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
                      {userData?.appraiserCompany_Datails?.area}
                    </p>
                    {/* <span className="text-dark fw-bold">Middle Name</span> :{" "}
                    <span className="text-dark fw-bold"> Devendra </span> */}
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
                      {userData.appraiser_Details?.streetName}-{userData.appraiser_Details?.streetNumber},{userData?.appraiser_Details?.city},{" "}
                      {userData?.appraiser_Details?.province}
                    </p>
                    {/* <span className="text-dark fw-bold">Middle Name</span> :{" "}
                    <span className="text-dark fw-bold"> Devendra </span> */}
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
                      {userData?.appraiser_Details?.postalCode}
                    </p>
                    {/* <span className="text-dark fw-bold">Last Name</span> :{" "}
                    <span className="text-dark fw-bold"> Patel </span> */}
                  </li>
                </ul>
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
