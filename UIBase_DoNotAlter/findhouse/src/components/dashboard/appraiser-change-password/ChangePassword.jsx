const ChangePassword = () => {
  return (
    <>
      <div className="row">
        {/* <h4 className="mb-3">Manage Password</h4> */}
        <div class="accordion" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                Change Password
              </button>
            </h2>
            <div
              id="collapseThree"
              class="accordion-collapse collapse show"
              aria-labelledby="headingThree"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <div className="row">
                  <div className="col-xl-4">
                    <div className="my_profile_setting_input form-group">
                      <label
                        htmlFor="formGroupExampleOldPass"
                        style={{
                          paddingBottom: "10px",
                          color: "#1560bd",
                          fontWeight: "",
                        }}
                      >
                        Old Password
                      </label>
                      <input
                        style={{
                          // paddingTop: "15px",
                          // paddingBottom: "15px",
                          backgroundColor: "#E8F0FE",
                          //color: "white",
                        }}
                        type="password"
                        className="form-control"
                        id="formGroupExampleOldPass"
                        // placeholder="alitfn"
                      />
                    </div>
                  </div>
                  {/* End .col */}

                  <div className="col-lg-6 col-xl-4">
                    <div className="my_profile_setting_input form-group">
                      <label
                        htmlFor="formGroupExampleNewPass"
                        style={{
                          paddingBottom: "10px",
                          color: "#1560bd",
                          fontWeight: "",
                        }}
                      >
                        New Password
                      </label>
                      <input
                        style={{
                          // paddingTop: "15px",
                          // paddingBottom: "15px",
                          backgroundColor: "#E8F0FE",
                          //color: "white",
                        }}
                        type="password"
                        className="form-control"
                        id="formGroupExampleNewPass"
                      />
                    </div>
                  </div>
                  {/* End .col */}

                  <div className="col-lg-6 col-xl-4">
                    <div className="my_profile_setting_input form-group">
                      <label
                        htmlFor="formGroupExampleConfPass"
                        style={{
                          paddingBottom: "10px",
                          color: "#1560bd",
                          fontWeight: "",
                        }}
                      >
                        Confirm New Password
                      </label>
                      <input
                        style={{
                          // paddingTop: "15px",
                          // paddingBottom: "15px",
                          backgroundColor: "#E8F0FE",
                          //color: "white",
                        }}
                        type="password"
                        className="form-control"
                        id="formGroupExampleConfPass"
                      />
                    </div>
                  </div>
                  {/* End .col */}

                  <div className="col-xl-12">
                    <div className="my_profile_setting_input float-end fn-520 mt-4">
                      <button className="btn btn-color">Update Password</button>
                    </div>
                  </div>
                  {/* End .col */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End .row */}

      <div className="row"></div>
    </>
  );
};

export default ChangePassword;
