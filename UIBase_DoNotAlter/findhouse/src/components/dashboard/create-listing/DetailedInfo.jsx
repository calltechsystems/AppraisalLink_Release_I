import React, { Component, useState } from "react";


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
const DetailedInfo = ({isDisable,updateHandler,applicantFirstName,setApplicantFirstName ,applicantLatsName,setApplicantLastName,applicantNumber,setApplicantNumber ,applicantEmail,setApplicantEmail,propertyData,submitHandler,setDisable}) => {
  console.log(applicantEmail)
  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="row" style={{marginBottom:'-15px'}}>
            <div className="col-lg-3 my_profile_setting_input form-group">
              <label htmlFor="" style={{ paddingTop: "15px", fontWeight:'lighter' }}>
                Applicant First Name :
              </label>
            </div>
            <div className="col-lg-7">
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput3"
               onChange={(e)=>setApplicantFirstName(e.target.value)}
               value={applicantFirstName}
                disabled={isDisable}
              />
            </div>
          </div>
          <div className="row"  style={{marginBottom:'-15px'}}>
            <div className="col-lg-3 my_profile_setting_input form-group">
              <label htmlFor="" style={{ paddingTop: "15px", fontWeight:'lighter' }}>
                Applicant Last Name :
              </label>
            </div>
            <div className="col-lg-7">
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput3"
                onChange={(e)=>setApplicantLastName(e.target.value)}
                value={applicantLatsName}
                disabled={isDisable}
              />
            </div>
          </div>
          <div className="row"  style={{marginBottom:'-15px'}}>
            <div className="col-lg-3 my_profile_setting_input form-group">
              <label htmlFor="" style={{ paddingTop: "15px", fontWeight:'lighter' }}>
                Applicant Phone Number :
              </label>
            </div>
            <div className="col-lg-7">
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput3"
                onChange={(e)=>setApplicantNumber(e.target.value)}
               value={applicantNumber}
                disabled={isDisable}
              />
            </div>
          </div>
          <div className="row"  style={{marginBottom:'-15px'}}>
            <div className="col-lg-3 my_profile_setting_input form-group">
              <label htmlFor="" style={{ paddingTop: "15px", fontWeight:'lighter' }}>
                Applicant Email Address :
              </label>
            </div>
            <div className="col-lg-7">
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput3"
                onChange={(e)=>setApplicantEmail(e.target.value)}
               value={applicantEmail}
                disabled={isDisable}
              />
            </div>
          </div>

          <div className="col-xl-12">
            <div className="my_profile_setting_input overflow-hidden mt20">
              <button className="btn btn1 float-start">Cancel</button>
              {!isDisable && (propertyData ? <button
                className="btn btn2 float-end"
                style={{ textAlign:'center' }}
                onClick={updateHandler}
              >
                Update
              </button> : <button
              className="btn btn2 float-end"
              style={{ textAlign:'center' }}
              onClick={submitHandler}
            >
              Submit
            </button>)}
            </div>
          </div>
          {/* End .col */}
        </div>
      </div>
    </>
  );
};

export default DetailedInfo;
