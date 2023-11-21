import { current } from "@reduxjs/toolkit";

const LocationField = ({
  isDisable,
  streetNameRef,
  setStreetNameRef,
  streetNumberRef,
  setStreetNumberRef,
  cityRef,
  setCityRef,
  setZipCodeRef,
  stateRef,
  setStateRef,
  handleZipCodeChange,
  zipCodeRef,
  areaRef,
  setAreaRef,
  setBuildinRef,
  propertyData,
  setDisable,
  buildinRef,
}) => {
  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="row mb-2">
            <div className="col-lg-6">
              <div className="my_profile_setting_input form-group">
                <label
                  // className="text-color"
                  htmlFor=""
                  style={{ fontWeight: "lighter", color: "#1e90ff" }}
                >
                  Street Name <span class="req-btn">*</span>
                </label>
              </div>
              <div className="">
                <input
                  style={{
                    // paddingTop: "15px",
                    // paddingBottom: "15px",
                    backgroundColor: "#d1eaf0",
                    // color: "white",
                  }}
                  type="text"
                  // placeholder="Street Name"
                  className="form-control"
                  id="formGroupExampleInput3"
                  onChange={(e) => setStreetNameRef(e.target.value)}
                  value={streetNameRef}
                  disabled={isDisable}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="my_profile_setting_input form-group">
                <label
                  // className="text-color"
                  htmlFor=""
                  style={{
                    fontWeight: "lighter",
                    color: "#1e90ff",
                    // paddingTop: "15px",
                  }}
                >
                  Street Number <span class="req-btn">*</span>
                </label>
              </div>
              <div className="">
                <input
                  style={{
                    // paddingTop: "15px",
                    // paddingBottom: "15px",
                    backgroundColor: "#d1eaf0",
                    // color: "white",
                  }}
                  type="text"
                  // placeholder="Street Number"
                  className="form-control"
                  id="formGroupExampleInput3"
                  onChange={(e) => setStreetNumberRef(e.target.value)}
                  value={streetNumberRef}
                  disabled={isDisable}
                />
              </div>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-lg-6">
              <div className="my_profile_setting_input form-group">
                <label
                  // className="text-color"
                  htmlFor=""
                  style={{
                    paddingTop: "15px",
                    color: "#1e90ff",
                    fontWeight: "lighter",
                  }}
                >
                  City <span class="req-btn">*</span>
                </label>
              </div>
              <div className="">
                <input
                  style={{
                    // paddingTop: "15px",
                    // paddingBottom: "15px",
                    backgroundColor: "#d1eaf0",
                    // color: "white",
                  }}
                  type="text"
                  className="form-control"
                  id="formGroupExampleInput3"
                  onChange={(e) => setCityRef(e.target.value)}
                  value={cityRef}
                  disabled={isDisable}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="my_profile_setting_input form-group">
                <label
                  // className="text-color"
                  htmlFor=""
                  style={{
                    paddingTop: "15px",
                    color: "#1e90ff",
                    fontWeight: "lighter",
                  }}
                >
                  State <span class="req-btn">*</span>
                </label>
              </div>
              <div className="">
                <input
                  style={{
                    // paddingTop: "15px",
                    // paddingBottom: "15px",
                    backgroundColor: "#d1eaf0",
                    // color: "white",
                  }}
                  type="text"
                  className="form-control"
                  id="formGroupExampleInput3"
                  onChange={(e) => setStateRef(e.target.value)}
                  value={stateRef}
                  disabled={isDisable}
                />
              </div>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-lg-6">
              <div className="my_profile_setting_input form-group">
                <label
                  // className="text-color"
                  htmlFor=""
                  style={{
                    paddingTop: "15px",
                    color: "#1e90ff",
                    fontWeight: "lighter",
                  }}
                >
                  Postal Code <span class="req-btn">*</span>
                </label>
              </div>
              <div className="">
                <input
                  style={{
                    // paddingTop: "15px",
                    // paddingBottom: "15px",
                    backgroundColor: "#d1eaf0",
                    // color: "white",
                  }}
                  type="text"
                  className="form-control"
                  id="formGroupExampleInput3"
                  onChange={(e) => handleZipCodeChange(e)}
                  value={zipCodeRef}
                  disabled={isDisable}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="my_profile_setting_input form-group">
                <label
                  // className="text-color"
                  htmlFor=""
                  style={{
                    paddingTop: "15px",
                    color: "#1e90ff",
                    fontWeight: "lighter",
                  }}
                >
                  Property Area (sq.ft)
                </label>
              </div>
              <div className="">
                <input
                  style={{
                    // paddingTop: "15px",
                    // paddingBottom: "15px",
                    backgroundColor: "#d1eaf0",
                    // color: "white",
                  }}
                  type="number"
                  className="form-control"
                  id="formGroupExampleInput3"
                  onChange={(e) => setAreaRef(e.target.value)}
                  value={areaRef}
                  disabled={isDisable}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="my_profile_setting_input form-group">
              <label
                // className="text-color"
                htmlFor=""
                style={{
                  paddingTop: "15px",
                  color: "#1e90ff",
                  fontWeight: "lighter",
                }}
              >
                Type of Building <span class="req-btn">*</span>
              </label>
            </div>
            <div className="">
              <div className="form-group input-group ui_kit_select_search mb-3">
                <select
                  required
                  className="form-select"
                  data-live-search="true"
                  data-width="100%"
                  onChange={(e) => setBuildinRef(e.target.value)}
                  disabled={isDisable}
                  style={{
                    paddingTop: "15px",
                    paddingBottom: "15px",
                    backgroundColor: "#d1eaf0",
                  }}
                >
                  <option data-tokens="SelectRole" value={1}>
                    Choose..
                  </option>
                  <option data-tokens="SelectRole" value={1}>
                    Commercial
                  </option>
                  <option data-tokens="Agent/Agency" value={"Domestic"}>
                    Domestic
                  </option>
                  <option data-tokens="SingleUser" value={"Apartment"}>
                    Apartment
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Old Form */}

      {/* <div className="row offset-1">
        <div className="col-lg-12">
          <div className="row" style={{ marginBottom: "-15px" }}>
            <div className="col-lg-3 my_profile_setting_input form-group">
              <label
                className="text-color"
                htmlFor=""
                style={{
                    paddingTop: "15px",
                    color: "#1e90ff",
                    fontWeight: "lighter",
                  }}
              >
                Street Name <span class="req-btn">*</span>
              </label>
            </div>
            <div className="col-lg-7">
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput3"
                onChange={(e) => setStreetNameRef(e.target.value)}
                value={streetNameRef}
                disabled={isDisable}
              />
            </div>
          </div>
          <div className="row" style={{ marginBottom: "-15px" }}>
            <div className="col-lg-3 my_profile_setting_input form-group">
              <label
                className="text-color"
                htmlFor=""
                style={{
                    paddingTop: "15px",
                    color: "#1e90ff",
                    fontWeight: "lighter",
                  }}
              >
                Street Number <span class="req-btn">*</span>
              </label>
            </div>
            <div className="col-lg-7">
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput3"
                onChange={(e) => setStreetNumberRef(e.target.value)}
                value={streetNumberRef}
                disabled={isDisable}
              />
            </div>
          </div>
          <div className="row" style={{ marginBottom: "-15px" }}>
            <div className="col-lg-3 my_profile_setting_input form-group">
              <label
                className="text-color"
                htmlFor=""
                style={{
                    paddingTop: "15px",
                    color: "#1e90ff",
                    fontWeight: "lighter",
                  }}
              >
                City <span class="req-btn">*</span>
              </label>
            </div>
            <div className="col-lg-7">
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput3"
                onChange={(e) => setCityRef(e.target.value)}
                value={cityRef}
                disabled={isDisable}
              />
            </div>
          </div>
          <div className="row" style={{ marginBottom: "-15px" }}>
            <div className="col-lg-3 my_profile_setting_input form-group">
              <label
                className="text-color"
                htmlFor=""
                style={{
                    paddingTop: "15px",
                    color: "#1e90ff",
                    fontWeight: "lighter",
                  }}
              >
                State <span class="req-btn">*</span>
              </label>
            </div>
            <div className="col-lg-7">
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput3"
                onChange={(e) => setStateRef(e.target.value)}
                value={stateRef}
                disabled={isDisable}
              />
            </div>
          </div>
          <div className="row" style={{ marginBottom: "-15px" }}>
            <div className="col-lg-3 my_profile_setting_input form-group">
              <label
                className="text-color"
                htmlFor=""
                style={{
                    paddingTop: "15px",
                    color: "#1e90ff",
                    fontWeight: "lighter",
                  }}
              >
                Postal Code <span class="req-btn">*</span>
              </label>
            </div>
            <div className="col-lg-7">
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput3"
                onChange={(e) => handleZipCodeChange(e)}
                value={zipCodeRef}
                disabled={isDisable}
              />
            </div>
          </div>
          <div className="row" style={{ marginBottom: "-15px" }}>
            <div className="col-lg-3 my_profile_setting_input form-group">
              <label
                className="text-color"
                htmlFor=""
                style={{
                    paddingTop: "15px",
                    color: "#1e90ff",
                    fontWeight: "lighter",
                  }}
              >
                Property Area (sq.ft)
              </label>
            </div>
            <div className="col-lg-7">
              <input
                type="number"
                className="form-control"
                id="formGroupExampleInput3"
                onChange={(e) => setAreaRef(e.target.value)}
                value={areaRef}
                disabled={isDisable}
              />
            </div>
          </div>
          <div className="row" style={{ marginBottom: "-15px" }}>
            <div className="col-lg-3 my_profile_setting_input form-group">
              <label
                className="text-color"
                htmlFor=""
                style={{
                    paddingTop: "15px",
                    color: "#1e90ff",
                    fontWeight: "lighter",
                  }}
              >
                Type of Building <span class="req-btn">*</span>
              </label>
            </div>
            <div className="col-lg-7">
              <div className="form-group input-group ui_kit_select_search mb-3">
                <select
                  required
                  className="form-select"
                  data-live-search="true"
                  data-width="100%"
                  onChange={(e) => setBuildinRef(e.target.value)}
                  disabled={isDisable}
                  style={{
                    paddingTop: "15px",
                    paddingBottom: "15px",
                    backgroundColor: "aliceblue",
                  }}
                >
                  <option data-tokens="SelectRole" value={1}>
                    Choose..
                  </option>
                  <option data-tokens="SelectRole" value={1}>
                    Commercial
                  </option>
                  <option data-tokens="Agent/Agency" value={"Domestic"}>
                    Domestic
                  </option>
                  <option data-tokens="SingleUser" value={"Apartment"}>
                    Apartment
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default LocationField;
