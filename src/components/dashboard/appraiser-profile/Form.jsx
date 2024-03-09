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
              <div className="">
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
                          {userData?.appraiser_Details?.firstName}{" "}
                          {userData?.appraiser_Details?.middleName}{" "}
                          {userData?.appraiser_Details?.lastName}
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
                          {userData?.appraiser_Details?.companyName}
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
                          {userData?.appraiser_Details?.emailId}
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
                          {userData?.appraiser_Details?.phoneNumber}
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
                          <span className="text-start text-dark fw-bold">
                            {userData?.appraiser_Details?.cellNumber
                              ? userData?.appraiser_Details?.cellNumber
                              : "Not Provided"}
                          </span>
                          {/* {userData?.appraiser_details?.cellNumber
                            ? userData?.appraiser_details?.cellNumber
                            : "Not Provided"} */}
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
                          {userData?.appraiser_Details?.streetNumber}{" "}
                          {userData?.appraiser_Details?.streetName}
                          {userData?.appraiser_Details?.unit}{" "}
                          {userData?.appraiser_Details?.city},{" "}
                          {userData?.appraiser_Details?.province},{" "}
                          {userData?.appraiser_Details?.postalCode}
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
                          <span className="text-start">Designation</span>
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
                            {userData?.appraiser_Details?.designation}
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
                          <span className="text-start">Lender List</span>
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
                            <span className="text-start text-dark fw-bold">
                              <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={
                                  userData?.appraiser_Details?.lenderListUrl
                                    ? userData?.appraiser_Details?.lenderListUrl
                                    : "#"
                                }
                                style={{ cursor: "pointer" }}
                              >
                                Lender List Pdf
                              </a>
                            </span>
                          }{" "}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* <span style={{ fontWeight: "bold" }}>
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
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={
                            userData?.appraiser_Details?.lenderListUrl
                              ? userData?.appraiser_Details?.lenderListUrl
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
                </div>
                <hr /> */}
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
