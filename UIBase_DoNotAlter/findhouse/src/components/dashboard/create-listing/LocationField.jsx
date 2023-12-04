import { current } from "@reduxjs/toolkit";
import { typeOfBuilding } from "./data";
import { Urgency } from "./data";

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
  bidLowerRangeRef,
  setBidLowerRangeRef,
  communityRef,
  setCommunityRef,
  setUrgencyRef,
}) => {
  return (
    <>
      {/* Old Form */}

      <div className="row offset-1">
        <div className="col-lg-12">
          <div className="row" style={{ marginBottom: "10px" }}>
            <div className="col-lg-3 my_profile_setting_input form-group">
              <label
                className="text-color"
                htmlFor=""
                style={{
                  paddingTop: "15px",
                  color: "#1560bd",
                  fontWeight: "",
                }}
              >
                Street Number <span class="req-btn">*</span>
              </label>
            </div>
            <div className="col-lg-7">
              <input
                style={{ backgroundColor: "#E8F0FE" }}
                type="text"
                className="form-control"
                id="formGroupExampleInput3"
                onChange={(e) => setStreetNumberRef(e.target.value)}
                value={streetNumberRef}
                disabled={isDisable}
              />
            </div>
          </div>
          <div className="row" style={{ marginBottom: "10px" }}>
            <div className="col-lg-3 my_profile_setting_input form-group">
              <label
                className="text-color"
                htmlFor=""
                style={{
                  paddingTop: "15px",
                  color: "#1560bd",
                  fontWeight: "",
                }}
              >
                Street Name <span class="req-btn">*</span>
              </label>
            </div>
            <div className="col-lg-7">
              <input
                style={{ backgroundColor: "#E8F0FE" }}
                type="text"
                className="form-control"
                id="formGroupExampleInput3"
                onChange={(e) => setStreetNameRef(e.target.value)}
                value={streetNameRef}
                disabled={isDisable}
              />
            </div>
          </div>
          <div className="row" style={{ marginBottom: "10px" }}>
            <div className="col-lg-3 my_profile_setting_input form-group">
              <label
                className="text-color"
                htmlFor=""
                style={{
                  paddingTop: "15px",
                  color: "#1560bd",
                  fontWeight: "",
                }}
              >
                Unit/Apartment Number
              </label>
            </div>
            <div className="col-lg-7">
              <input
                style={{ backgroundColor: "#E8F0FE" }}
                type="text"
                className="form-control"
                id="formGroupExampleInput3"
                // onChange={(e) => setStreetNumberRef(e.target.value)}
                // value={streetNumberRef}
                // disabled={isDisable}
              />
            </div>
          </div>
          <div className="row" style={{ marginBottom: "10px" }}>
            <div className="col-lg-3 my_profile_setting_input form-group">
              <label
                className="text-color"
                htmlFor=""
                style={{
                  paddingTop: "15px",
                  color: "#1560bd",
                  fontWeight: "",
                }}
              >
                City <span class="req-btn">*</span>
              </label>
            </div>
            <div className="col-lg-7">
              <input
                style={{ backgroundColor: "#E8F0FE" }}
                type="text"
                className="form-control"
                id="formGroupExampleInput3"
                onChange={(e) => setCityRef(e.target.value)}
                value={cityRef}
                disabled={isDisable}
              />
            </div>
          </div>
          <div className="row" style={{ marginBottom: "10px" }}>
            <div className="col-lg-3 my_profile_setting_input form-group">
              <label
                className="text-color"
                htmlFor=""
                style={{
                  paddingTop: "15px",
                  color: "#1560bd",
                  fontWeight: "",
                }}
              >
                Province <span class="req-btn">*</span>
              </label>
            </div>
            <div className="col-lg-7">
              <input
                style={{ backgroundColor: "#E8F0FE" }}
                type="text"
                className="form-control"
                id="formGroupExampleInput3"
                onChange={(e) => setStateRef(e.target.value)}
                value={stateRef}
                disabled={isDisable}
              />
            </div>
          </div>
          <div className="row" style={{ marginBottom: "10px" }}>
            <div className="col-lg-3 my_profile_setting_input form-group">
              <label
                className="text-color"
                htmlFor=""
                style={{
                  paddingTop: "15px",
                  color: "#1560bd",
                  fontWeight: "",
                }}
              >
                Postal Code <span class="req-btn">*</span>
              </label>
            </div>
            <div className="col-lg-7">
              <input
                style={{ backgroundColor: "#E8F0FE" }}
                type="text"
                className="form-control"
                id="formGroupExampleInput3"
                onChange={(e) => handleZipCodeChange(e)}
                value={zipCodeRef}
                disabled={isDisable}
              />
            </div>
          </div>
          <div className="col-lg-6 mt20">
            <div className="form-group form-check custom-checkbox">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                required
                id="terms"
                style={{ border: "1px solid black" }}
              />
              <label
                className="form-check-label form-check-label"
                htmlFor="terms"
                style={{
                  color: "#2e008b",
                  fontWeight: "bold",
                }}
              >
                Validate Address
              </label>
            </div>
            {/* End .form-group */}
          </div>
          {/* <div className="row" style={{ marginBottom: "10px" }}>
            <div className="col-lg-3 my_profile_setting_input form-group">
              <label
                className="text-color"
                htmlFor=""
                style={{
                  paddingTop: "15px",
                  color: "#1560bd",
                  fontWeight: "",
                }}
              >
                Property Area (sq.ft)
              </label>
            </div>
            <div className="col-lg-7">
              <input
              style={{ backgroundColor: "#E8F0FE" }}
                type="number"
                className="form-control"
                id="formGroupExampleInput3"
                // onChange={(e) => setAreaRef(e.target.value)}
                // value={areaRef}
                // disabled={isDisable}
              />
            </div>
          </div>
          <div className="row" style={{ marginBottom: "10px" }}>
            <div className="col-lg-3 my_profile_setting_input form-group">
              <label
                className="text-color"
                htmlFor=""
                style={{
                  paddingTop: "15px",
                  color: "#1560bd",
                  fontWeight: "",
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
                  // onChange={(e) => setBuildinRef(e.target.value)}
                  // // disabled={isDisable}
                  style={{
                    paddingTop: "15px",
                    paddingBottom: "15px",
                    backgroundColor: "#e8f0fe",
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
          </div> */}
        </div>
      </div>
    </>
  );
};

export default LocationField;
