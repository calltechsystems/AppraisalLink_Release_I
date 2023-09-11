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

const DetailedInfo = () => {
  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="row mb-2">
            <div className="col-lg-3 my_profile_setting_input form-group">
              <label htmlFor="" style={{ paddingTop: "15px" }}>
                Applicant First Name :
              </label>
            </div>
            <div className="col-lg-7">
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput3"
                placeholder="Micheal"
              />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-lg-3 my_profile_setting_input form-group">
              <label htmlFor="" style={{ paddingTop: "15px" }}>
                Applicant Last Name :
              </label>
            </div>
            <div className="col-lg-7">
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput3"
                placeholder="Jackson"
              />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-lg-3 my_profile_setting_input form-group">
              <label htmlFor="" style={{ paddingTop: "15px" }}>
                Applicant Phone Number :
              </label>
            </div>
            <div className="col-lg-7">
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput3"
                placeholder="000-876-876"
              />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-lg-3 my_profile_setting_input form-group">
              <label htmlFor="" style={{ paddingTop: "15px" }}>
                Applicant Email Address :
              </label>
            </div>
            <div className="col-lg-7">
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput3"
                placeholder="info@test.com"
              />
            </div>
          </div>

          {/* <div className="col-xl-12">
            <div className="my_profile_setting_input overflow-hidden mt20">
              <button className="btn btn1 float-start">Back</button>
              <button
                className="btn btn2 float-center"
                style={{ textAlign:'center' }}
              >
                Submit
              </button>
            </div>
          </div> */}
          {/* End .col */}
        </div>
      </div>
    </>
  );
};

export default DetailedInfo;
