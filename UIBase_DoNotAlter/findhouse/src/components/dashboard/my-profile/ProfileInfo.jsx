import { useState } from "react";

const ProfileInfo = () => {
  const [profile, setProfile] = useState(null);

  // upload profile
  const uploadProfile = (e) => {
    setProfile(e.target.files[0]);
  };

  return (
    <div className="row">
      <h4 className="mb-3">Personal Information</h4>
      <div className="col-lg-12">{/* <p>*minimum 260px x 260px</p> */}</div>
      {/* End .col */}

      <div className="col-lg-12 col-xl-12 mt-2">
        <div className="my_profile_setting_input form-group">
          <div className="row">
            <div className="col-lg-4">
              <div className="wrap-custom-file">
                <input
                  type="file"
                  id="image1"
                  accept="image/png, image/gif, image/jpeg"
                  onChange={uploadProfile}
                  style={{ borderRadius: "50%" }}
                />
                <label
                  style={
                    profile !== null
                      ? {
                          backgroundImage: `url(${URL.createObjectURL(
                            profile
                          )})`,
                        }
                      : undefined
                  }
                  htmlFor="image1"
                >
                  <span>
                    <i className="flaticon-download"></i> Upload Photo{" "}
                  </span>
                </label>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="row mb-2">
                <div className="col-lg-5">
                  <label htmlFor="" style={{ paddingTop: "15px", fontWeight:'lighter'}}>
                    First Name <span class="req-btn">*</span> :
                  </label>
                </div>
                <div className="col-lg-7">
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput3"
                    placeholder="Micheal"
                    value="Micheal"
                  />
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-lg-5">
                  <label htmlFor="" style={{ paddingTop: "15px", fontWeight:'lighter'}}>
                    Middle Name :
                  </label>
                </div>
                <div className="col-lg-7">
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput3"
                    placeholder="Micheal"
                    value="George"                  />
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-lg-5">
                  <label htmlFor="" style={{ paddingTop: "15px", fontWeight:'lighter'}}>
                    Last Name <span class="req-btn">*</span> :
                  </label>
                </div>
                <div className="col-lg-7">
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput3"
                    placeholder="Micheal"
                    value="Sinha"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-5 mb-2">
                  <label htmlFor="" style={{ paddingTop: "15px", fontWeight:'lighter'}}>
                    Company Name{" "}
                  </label>
                </div>
                <div className="col-lg-7">
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput3"
                    placeholder="Jackson"
                    value="Jackson Empire"                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-5 mb-2">
                  <label htmlFor="" style={{ paddingTop: "15px", fontWeight:'lighter'}}>
                    Address Line 1 <span class="req-btn">*</span> :
                  </label>
                </div>
                <div className="col-lg-7 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput3"
                    placeholder="h.no. 14"
                    value="h.no. 14"                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-5 mb-2">
                  <label htmlFor="" style={{ paddingTop: "15px", fontWeight:'lighter'}}>
                    Address Line 2 :
                  </label>
                </div>
                <div className="col-lg-7 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput3"
                    placeholder="near bus stand"
                    value="near bus stand"                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-5 mb-2">
                  <label htmlFor="" style={{ paddingTop: "15px", fontWeight:'lighter'}}>
                    City <span class="req-btn">*</span> :
                  </label>
                </div>
                <div className="col-lg-7 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput3"
                    placeholder="Bhopal"
                    value="Bhopal"                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-5 mb-2">
                  <label htmlFor="" style={{ paddingTop: "15px", fontWeight:'lighter'}}>
                    State <span class="req-btn">*</span> :
                  </label>
                </div>
                <div className="col-lg-7 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput3"
                    placeholder="Madhya Pradesh"
                    value="Madhya Pradesh"                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-5 mb-2">
                  <label htmlFor="" style={{ paddingTop: "15px", fontWeight:'lighter'}}>
                    Zip-Code <span class="req-btn">*</span> :
                  </label>
                </div>
                <div className="col-lg-7 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput3"
                    placeholder="980764"
                    value="980764"                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-5 mb-2">
                  <label htmlFor="" style={{ paddingTop: "15px", fontWeight:'lighter'}}>
                    Email Address <span class="req-btn">*</span> :
                  </label>
                </div>
                <div className="col-lg-7">
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput3"
                    placeholder="Jackson@test.com"
                    value="Jackson@test.com"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-5 mb-2">
                  <label htmlFor="" style={{ paddingTop: "15px", fontWeight:'lighter'}}>
                    Phone Number <span class="req-btn">*</span> :
                  </label>
                </div>
                <div className="col-lg-7">
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput3"
                    placeholder="0909087667"
                    value="0909087667"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-5 mb-2">
                  <label htmlFor="" style={{ paddingTop: "15px", fontWeight:'lighter'}}>
                    Mortgage Brokerage Lic. No. <span class="req-btn">*</span> :
                  </label>
                </div>
                <div className="col-lg-7">
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput3"
                    placeholder="XCF65765Jackson"
                    value="XCF65765Jackson"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-5">
                  <label htmlFor="" style={{ paddingTop: "15px", fontWeight:'lighter'}}>
                    Mortgage Broker Licence No. <span class="req-btn">*</span> :
                  </label>
                </div>
                <div className="col-lg-7">
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput3"
                    placeholder="ACF345666Jackson"
                    value="ACF345666Jackson"
                  />
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-xl-12">
                  <div className="my_profile_setting_input" style={{textAlign:"end"}}>
                    {/* <button className="btn btn1">Save Details</button> */}
                    <button className="btn btn2 btn-dark">
                      Update Profile
                    </button>
                  </div>
                </div>
                {/* End .col */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
