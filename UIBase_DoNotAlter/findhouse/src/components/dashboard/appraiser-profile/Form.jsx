import { handleDownloadClick } from "./downloadFunction";

const Form = ({ userData, chnageShowCardHandler }) => {

  const userData_01 = userData.userType ; // Example data, replace with actual data

  const renderUserType = (userData_01) => {
    if (userData_01 === 3) {
      return "Appraiser";
    } else if (userData_01 === 5) {
      return "Sub Appraiser";
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
                          {userData?.appraiser_Details?.companyName
                              ? userData?.appraiser_Details?.companyName
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
                          {userData?.appraiser_Details?.streetName}{" "}
                          {userData?.appraiser_Details?.apartmentNo}{" "}
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
                                  userData?.appraiser_Details?.lenderListUrl !==
                                  ""
                                    ? userData?.appraiser_Details?.lenderListUrl
                                    : ""
                                }
                                onClick={(event)=>handleDownloadClick(event,
                                  userData?.appraiser_Details?.lenderListUrl,
                                  `${userData?.appraiser_Details?.firstName}_lenderlist.pdf`)}
                                style={{ cursor: "pointer",textDecoration:"underline" }}
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
