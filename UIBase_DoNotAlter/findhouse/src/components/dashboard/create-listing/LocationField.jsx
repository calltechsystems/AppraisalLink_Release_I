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
  propertyData,
  setDisable,
  buildinRef,
}) => {
  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="row" style={{ marginBottom: "-15px" }}>
            <div className="col-lg-3 my_profile_setting_input form-group">
              <label
                htmlFor=""
                style={{ paddingTop: "15px", fontWeight: "lighter" }}
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
                htmlFor=""
                style={{ paddingTop: "15px", fontWeight: "lighter" }}
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
                htmlFor=""
                style={{ paddingTop: "15px", fontWeight: "lighter" }}
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
                htmlFor=""
                style={{ paddingTop: "15px", fontWeight: "lighter" }}
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
                htmlFor=""
                style={{ paddingTop: "15px", fontWeight: "lighter" }}
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
                htmlFor=""
                style={{ paddingTop: "15px", fontWeight: "lighter" }}
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
                htmlFor=""
                style={{ paddingTop: "15px", fontWeight: "lighter" }}
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
                  value={buildinRef}
                  disabled={isDisable}
                  style={{ paddingTop: "15px", paddingBottom: "15px" }}
                >
                  <option data-tokens="SelectRole" value={1}>
                    Choose..
                  </option>
                  <option data-tokens="SelectRole" value={1}>
                    Commercial
                  </option>
                  <option data-tokens="Agent/Agency" value={3}>
                    Domestic
                  </option>
                  <option data-tokens="SingleUser" value={2}>
                    Apartment
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="row">
        <div className="col-lg-6">
          <div className="col-lg-12">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="propertyAddress">Street Name</label>
              <input
                type="text"
                className="form-control"
                id="propertyAddress"
                placeholder="House No. 13, Near Xyz Colony"
              />
            </div>
          </div>

          <div className="col-lg-12">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="propertyAddress">Street Number</label>
              <input
                type="text"
                className="form-control"
                id="propertyAddress"
                placeholder="House No. 13, Near Xyz Colony"
              />
            </div>
          </div>

          <div className="col-lg-12">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="propertyCity">City</label>
              <input
                type="text"
                className="form-control"
                id="propertyCity"
                placeholder="Tokyo"
              />
            </div>
          </div>
          

          <div className="col-lg-12">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="propertyState">State</label>
              <input
                type="text"
                className="form-control"
                id="propertyState"
                placeholder="State"
              />
            </div>
          </div>


          <div className="col-lg-12">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="zipCode">Zip-Code</label>
              <input
                type="text"
                className="form-control"
                id="zipCode"
                placeholder="239788"
              />
            </div>
          </div>


          <div className="col-lg-12">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="zipCode">Area</label>
              <input
                type="text"
                className="form-control"
                id="zipCode"
                placeholder="abcxyz"
              />
            </div>
          </div> */}

      {/* <div className="col-lg-12">
            <div className="my_profile_setting_input ui_kit_select_search form-group">
              <label>Country</label>
              <select
                className="selectpicker form-select"
                data-live-search="true"
                data-width="100%"
              >
                <option data-tokens="Turkey">Turkey</option>
                <option data-tokens="Iran">Iran</option>
                <option data-tokens="Iraq">Iraq</option>
                <option data-tokens="Spain">Spain</option>
                <option data-tokens="Greece">Greece</option>
                <option data-tokens="Portugal">Portugal</option>
              </select>
            </div>
          </div> */}
      {/* End .col */}

      {/* <div className="col-lg-12">
        <div className="my_profile_setting_input form-group">
          <div className="h400 bdrs8" id="map-canvas">
            <div className="gmap_canvas pe-none">
              <iframe
                title="map"
                className="gmap_iframe"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d206252.721472711!2d-115.31508339643749!3d36.12519578053308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80beb782a4f57dd1%3A0x3accd5e6d5b379a3!2sLas%20Vegas%2C%20NV%2C%20USA!5e0!3m2!1sen!2sbd!4v1669000531244!5m2!1sen!2sbd"
              ></iframe>
            </div>
          </div>
        </div>
      </div> */}

      {/* End .col */}

      {/* <div className="col-xl-12">
            <div className="my_profile_setting_input">
              <button className="btn btn2 float-center" style={{marginLeft:"8rem"}}>Submit</button>
            </div>
          </div> */}
      {/* End .col */}
      {/* </div>
      </div> */}
    </>
  );
};

export default LocationField;
