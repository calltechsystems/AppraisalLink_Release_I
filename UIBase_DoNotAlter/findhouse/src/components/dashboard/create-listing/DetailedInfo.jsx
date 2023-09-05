import React, { Component, useState } from 'react';

const DetailedInfo = () =>{
  
    const [userInfo,setUserInfo] = useState( {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInfo({ [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can handle form submission here, e.g., send data to a server
    console.log('Form data submitted:', userInfo);
  };

    return (
      <div className="user-form">
        <h2>User Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={userInfo.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={userInfo.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userInfo.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={userInfo.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    );
  
}

export default DetailedInfo;

// import CheckBoxFilter from "../../common/CheckBoxFilter";

// const DetailedInfo = () => {
//   return (
//     <div className="row">
//       <div className="col-lg-6 col-xl-4">
//         <div className="my_profile_setting_input form-group">
//           <label htmlFor="propertyId">Property ID</label>
//           <input type="text" className="form-control" id="propertyId" />
//         </div>
//       </div>
//       {/* End .col */}

//       <div className="col-lg-6 col-xl-4">
//         <div className="my_profile_setting_input form-group">
//           <label htmlFor="propertyASize">Area Size</label>
//           <input type="text" className="form-control" id="propertyASize" />
//         </div>
//       </div>
//       {/* End .col */}

//       <div className="col-lg-6 col-xl-4">
//         <div className="my_profile_setting_input form-group">
//           <label htmlFor="sizePrefix">Size Prefix</label>
//           <input type="text" className="form-control" id="sizePrefix" />
//         </div>
//       </div>
//       {/* End .col */}

//       <div className="col-lg-6 col-xl-4">
//         <div className="my_profile_setting_input form-group">
//           <label htmlFor="landArea">Land Area</label>
//           <input type="text" className="form-control" id="landArea" />
//         </div>
//       </div>
//       {/* End .col */}

//       <div className="col-lg-6 col-xl-4">
//         <div className="my_profile_setting_input form-group">
//           <label htmlFor="LASPostfix">Land Area Size Postfix</label>
//           <input type="text" className="form-control" id="LASPostfix" />
//         </div>
//       </div>
//       {/* End .col */}

//       <div className="col-lg-6 col-xl-4">
//         <div className="my_profile_setting_input form-group">
//           <label htmlFor="bedRooms">Bedrooms</label>
//           <input type="text" className="form-control" id="bedRooms" />
//         </div>
//       </div>
//       {/* End .col */}

//       <div className="col-lg-6 col-xl-4">
//         <div className="my_profile_setting_input form-group">
//           <label htmlFor="bathRooms">Bathrooms</label>
//           <input type="text" className="form-control" id="bathRooms" />
//         </div>
//       </div>
//       {/* End .col */}

//       <div className="col-lg-6 col-xl-4">
//         <div className="my_profile_setting_input form-group">
//           <label htmlFor="garages">Garages</label>
//           <input type="text" className="form-control" id="garages" />
//         </div>
//       </div>
//       {/* End .col */}

//       <div className="col-lg-6 col-xl-4">
//         <div className="my_profile_setting_input form-group">
//           <label htmlFor="garagesSize">Garages Size</label>
//           <input type="text" className="form-control" id="garagesSize" />
//         </div>
//       </div>
//       {/* End .col */}

//       <div className="col-lg-6 col-xl-4">
//         <div className="my_profile_setting_input form-group">
//           <label htmlFor="yearBuild">Year Built</label>
//           <input type="text" className="form-control" id="yearBuild" />
//         </div>
//       </div>
//       {/* End .col */}

//       <div className="col-lg-6 col-xl-4">
//         <div className="my_profile_setting_input form-group">
//           <label htmlFor="videoUrl">Video URL</label>
//           <input type="text" className="form-control" id="videoUrl" />
//         </div>
//       </div>
//       {/* End .col */}

//       <div className="col-lg-6 col-xl-4">
//         <div className="my_profile_setting_input form-group">
//           <label htmlFor="virtualTour">360° Virtual Tour</label>
//           <input type="text" className="form-control" id="virtualTour" />
//         </div>
//       </div>

//       <div className="col-xl-12">
//         <h4 className="mb10">Amenities</h4>
//       </div>

//       <CheckBoxFilter />

//       <div className="col-xl-12">
//         <div className="my_profile_setting_input overflow-hidden mt20">
//           <button className="btn btn1 float-start">Back</button>
//           <button className="btn btn2 float-end">Next</button>
//         </div>
//       </div>
//       {/* End .col */}
//     </div>
//   );
// };

// export default DetailedInfo;
