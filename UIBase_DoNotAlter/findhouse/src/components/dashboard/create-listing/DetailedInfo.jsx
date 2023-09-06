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
    <div className="row">
      <div className="col-lg-6 offset-3">
        <div className="col-12">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="propertyASize">Applicant First Name</label>
            <input type="text" className="form-control" id="propertyASize" placeholder="John"/>
          </div>
        </div>
        {/* End .col */}

        <div className="col-12">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="sizePrefix">Applicant Last Name</label>
            <input type="text" className="form-control" id="sizePrefix" placeholder="Sina"/>
          </div>
        </div>
        {/* End .col */}

        <div className="col-12">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="landArea">Applicant Phone Number</label>
            <input type="text" className="form-control" id="landArea" placeholder="0918789654"/>
          </div>
        </div>
        {/* End .col */}

        <div className="col-12">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="LASPostfix">Applicant Email Address</label>
            <input type="text" className="form-control" id="LASPostfix" placeholder="info@test.com"/>
          </div>
        </div>
        {/* End .col */}

        <div className="col-xl-12">
          <div className="my_profile_setting_input overflow-hidden mt20">
            {/* <button className="btn btn1 float-start">Back</button> */}
            <button className="btn btn2 float-center" style={{marginLeft:"8rem"}}>Submit</button>
          </div>
        </div>
        {/* End .col */}
      </div>
    </div>
  );
};

export default DetailedInfo;
