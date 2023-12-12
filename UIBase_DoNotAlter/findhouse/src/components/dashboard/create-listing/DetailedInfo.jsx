import React, { Component, useState } from "react";
import { useRouter } from "next/router";

// const DetailedInfo = () =>{

//     const [userInfo,setUserInfo] = useState( {
//       firstName: '',
//       lastName: '',
//       email: '',
//       password: '',
//     });

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setUserInfo({ [name]: value });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // You can handle form submission here, e.g., send data to a server
//     console.log('Form data submitted:', userInfo);
//   };

//     return (
//       <div className="user-form">
//         <h2>User Registration</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="firstName">First Name</label>
//             <input
//               type="text"
//               id="firstName"
//               name="firstName"
//               value={userInfo.firstName}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="lastName">Last Name</label>
//             <input
//               type="text"
//               id="lastName"
//               name="lastName"
//               value={userInfo.lastName}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={userInfo.email}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={userInfo.password}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <button type="submit">Register</button>
//         </form>
//       </div>
//     );

// }

// export default DetailedInfo;

import CheckBoxFilter from "../../common/CheckBoxFilter";
const DetailedInfo = ({
  onCancelHandler,
  isDisable,
  updateHandler,
  applicantFirstName,
  setApplicantFirstName,
  applicantLatsName,
  setApplicantLastName,
  applicantNumber,
  setApplicantNumber,
  applicantEmail,
  setApplicantEmail,
  propertyData,
  submitHandler,
  setDisable,
}) => {
  const router = useRouter();
  const cancelHandler = () => {
    router.push("/my-profile");
  };
  console.log(applicantEmail);
  return (
    <>
      {/* <div className="row">
        <div className="col-lg-12">
          <div className="row mb-2">
            <div className="col-lg-6">
              <div className="my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  style={{
                    paddingTop: "15px",
                    color: "#1560bd",
                    fontWeight: "",
                  }}
                >
                  First Name
                </label>
              </div>
              <div className="">
                <input
                  style={{
                    // paddingTop: "15px",
                    // paddingBottom: "15px",
                    backgroundColor: "#E8F0FE",
                    //color: "white",
                  }}
                  type="text"
                  className="form-control"
                  id="formGroupExampleInput3"
                  onChange={(e) => setApplicantFirstName(e.target.value)}
                  value={applicantFirstName}
                  disabled={isDisable}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  style={{
                    paddingTop: "15px",
                    color: "#1560bd",
                    fontWeight: "",
                  }}
                >
                  Last Name
                </label>
              </div>
              <div className="">
                <input
                  style={{
                    // paddingTop: "15px",
                    // paddingBottom: "15px",
                    backgroundColor: "#E8F0FE",
                    //color: "white",
                  }}
                  type="text"
                  className="form-control"
                  id="formGroupExampleInput3"
                  onChange={(e) => setApplicantLastName(e.target.value)}
                  value={applicantLatsName}
                  disabled={isDisable}
                />
              </div>
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-lg-6">
              <div className="my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  style={{
                    paddingTop: "15px",
                    color: "#1560bd",
                    fontWeight: "",
                  }}
                >
                  Phone Number
                </label>
              </div>
              <div className="">
                <input
                  style={{
                    // paddingTop: "15px",
                    // paddingBottom: "15px",
                    backgroundColor: "#E8F0FE",
                    //color: "white",
                  }}
                  type="number"
                  className="form-control"
                  id="formGroupExampleInput3"
                  onChange={(e) => setApplicantNumber(e.target.value)}
                  value={applicantNumber}
                  disabled={isDisable}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  style={{
                    paddingTop: "15px",
                    color: "#1560bd",
                    fontWeight: "",
                  }}
                >
                  Email Address
                </label>
              </div>
              <div className="">
                <input
                  style={{
                    // paddingTop: "15px",
                    // paddingBottom: "15px",
                    backgroundColor: "#E8F0FE",
                    //color: "white",
                  }}
                  type="text"
                  className="form-control"
                  id="formGroupExampleInput3"
                  onChange={(e) => setApplicantEmail(e.target.value)}
                  value={applicantEmail}
                  disabled={isDisable}
                />
              </div>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-lg-6">
              <div className="my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  style={{
                    paddingTop: "15px",
                    color: "#1560bd",
                    fontWeight: "",
                  }}
                >
                  Address
                </label>
              </div>
              <div className="">
                <input
                  style={{
                    // paddingTop: "15px",
                    // paddingBottom: "15px",
                    backgroundColor: "#E8F0FE",
                    //color: "white",
                  }}
                  type="text"
                  className="form-control"
                  id="formGroupExampleInput3"
                  // onChange={(e) => setApplicantNumber(e.target.value)}
                  // value={applicantNumber}
                  disabled={isDisable}
                />
              </div>
            </div>
            <div className="col-xl-6">
              <div className="my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  style={{
                    paddingTop: "15px",
                    color: "#1560bd",
                    fontWeight: "",
                  }}
                >
                  Attachment
                </label>
                <form className="form-inline d-flex flex-wrap wrap">
                  <label className="upload">
                    <input
                      style={{
                        // paddingTop: "15px",
                        // paddingBottom: "15px",
                        backgroundColor: "#E8F0FE",
                        //color: "white",
                      }}
                      className="form-control"
                      type="file"
                    />
                  </label>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="my_profile_setting_textarea">
              <label
                htmlFor="propertyDescription"
                style={{
                  paddingTop: "15px",
                  color: "#1560bd",
                  fontWeight: "",
                }}
              >
                Summary
              </label>
              <textarea
                style={{
                  // paddingTop: "15px",
                  // paddingBottom: "15px",
                  backgroundColor: "#E8F0FE",
                  //color: "white",
                }}
                className="form-control"
                id="propertyDescription"
                rows="4"
              ></textarea>
            </div>
          </div>
          
          <div className="col-xl-12">
            <div className="my_profile_setting_input overflow-hidden mt20 text-center">
              <button className="btn btn5 m-1" onClick={onCancelHandler}>
                Cancel
              </button>
              {!isDisable &&
                (propertyData ? (
                  <button className="btn btn5" onClick={updateHandler}>
                    Update
                  </button>
                ) : (
                  <button className="btn btn5" onClick={submitHandler}>
                    Submit
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div> */}

      <div className="row">
        <div className="col-lg-12">
          <div className="row" style={{ marginBottom: "10px" }}>
            <div className="col-lg-3 my_profile_setting_input form-group">
              <label
                className="text-color"
                style={{ paddingTop: "15px", fontWeight: "" }}
              >
                First Name <span class="req-btn">*</span>
              </label>
            </div>
            <div className="col-lg-7">
              <input
                style={{
                  // paddingTop: "15px",
                  // paddingBottom: "15px",
                  backgroundColor: "#E8F0FE",
                  //color: "white",
                }}
                type="text"
                className="form-control"
                id="formGroupExampleInput3"
                onChange={(e) => setApplicantFirstName(e.target.value)}
                value={applicantFirstName}
                disabled={isDisable}
                maxLength={30}
              />
            </div>
          </div>
          <div className="row" style={{ marginBottom: "10px" }}>
            <div className="col-lg-3 my_profile_setting_input form-group">
              <label
                className="text-color"
                style={{ paddingTop: "15px", fontWeight: "" }}
              >
                Last Name <span class="req-btn">*</span>
              </label>
            </div>
            <div className="col-lg-7">
              <input
                style={{
                  // paddingTop: "15px",
                  // paddingBottom: "15px",
                  backgroundColor: "#E8F0FE",
                  //color: "white",
                }}
                type="text"
                className="form-control"
                id="formGroupExampleInput3"
                onChange={(e) => setApplicantLastName(e.target.value)}
                value={applicantLatsName}
                disabled={isDisable}
                maxLength={30}
              />
            </div>
          </div>
          <div className="row" style={{ marginBottom: "10px" }}>
            <div className="col-lg-3 my_profile_setting_input form-group">
              <label
                className="text-color"
                style={{ paddingTop: "15px", fontWeight: "" }}
              >
                Phone Number <span class="req-btn">*</span>
              </label>
            </div>
            <div className="col-lg-7">
              <input
                style={{
                  // paddingTop: "15px",
                  // paddingBottom: "15px",
                  backgroundColor: "#E8F0FE",
                  //color: "white",
                }}
                type="number"
                min={10}
                max={10}
                className="form-control"
                id="formGroupExampleInput3"
                onChange={(e) => setApplicantNumber(e.target.value)}
                value={applicantNumber}
                disabled={isDisable}
              />
            </div>
          </div>
          <div className="row" style={{ marginBottom: "10px" }}>
            <div className="col-lg-3 my_profile_setting_input form-group">
              <label
                className="text-color"
                style={{ paddingTop: "15px", fontWeight: "" }}
              >
                Email Address <span class="req-btn">*</span>
              </label>
            </div>
            <div className="col-lg-7">
              <input
                style={{
                  // paddingTop: "15px",
                  // paddingBottom: "15px",
                  backgroundColor: "#E8F0FE",
                  //color: "white",
                }}
                type="text"
                className="form-control"
                id="formGroupExampleInput3"
                onChange={(e) => setApplicantEmail(e.target.value)}
                value={applicantEmail}
                disabled={isDisable}
                maxLength={30}
              />
            </div>
          </div>

          <div className="row" style={{ marginBottom: "10px" }}>
            <div className="col-lg-3 my_profile_setting_input form-group">
              <label
                className="text-color"
                style={{ paddingTop: "15px", fontWeight: "" }}
              >
                Address
              </label>
            </div>
            <div className="col-lg-7">
              <input
                style={{
                  // paddingTop: "15px",
                  // paddingBottom: "15px",
                  backgroundColor: "#E8F0FE",
                  //color: "white",
                }}
                type="text"
                className="form-control"
                id="formGroupExampleInput3"
                maxLength={30}
                // onChange={(e) => setApplicantEmail(e.target.value)}
                // value={applicantEmail}
                // disabled={isDisable}
              />
            </div>
          </div>

          <div className="">
            <div className="row my_profile_setting_textarea">
              <div className="col-lg-3">
                <label
                  htmlFor="propertyDescription"
                  className="text-color"
                  style={{
                    paddingTop: "15px",
                    color: "#1560bd",
                    fontWeight: "",
                  }}
                >
                  Remark / Additional Information
                </label>
              </div>

              <div className="col-lg-7">
                <textarea
                  style={{
                    // paddingTop: "15px",
                    // paddingBottom: "15px",
                    backgroundColor: "#E8F0FE",
                    //color: "white",
                  }}
                  className="form-control"
                  id="propertyDescription"
                  rows="4"
                  maxLength={200}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="">
            <div className="row my_profile_setting_input form-group">
              <div className="col-lg-3">
                <label
                  className="text-color"
                  htmlFor=""
                  style={{
                    paddingTop: "10px",
                    color: "#1560bd",
                    fontWeight: "",
                  }}
                >
                  Attachment
                </label>
              </div>
              <div className="col-lg-7 mb-2">
                <form className="form-inline d-flex flex-wrap wrap">
                  <label className="upload">
                    <input
                      style={{
                        // paddingTop: "15px",
                        // paddingBottom: "15px",
                        backgroundColor: "#E8F0FE",
                        //color: "white",
                      }}
                      className="form-control"
                      type="file"
                    />
                  </label>
                </form>
              </div>
            </div>
          </div>
          <div className="col-xl-12">
            <div className="my_profile_setting_input overflow-hidden mt20 text-center">
              <button className="btn btn5 m-1" onClick={cancelHandler}>
                Reset
              </button>
              {!isDisable &&
                (propertyData ? (
                  <button className="btn btn5" onClick={updateHandler}>
                    Update
                  </button>
                ) : (
                  <button className="btn btn5" onClick={submitHandler}>
                    Submit
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailedInfo;
