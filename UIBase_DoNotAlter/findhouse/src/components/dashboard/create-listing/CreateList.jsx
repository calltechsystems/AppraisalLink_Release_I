import { useRef } from "react";

const CreateList = ({
  isDisable,
  communityRef,
  setCommunityRef,
  buildinRef,
  setBuildinRef,
  urgencyRef,
  setUrgencyRef,
  propertyData,
  bidLowerRangeRef,
  setBidLowerRangeRef,
  setDisable,
}) => {
  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="row" style={{marginBottom:'-15px'}}>
            <div className="col-lg-3 my_profile_setting_input form-group">
              <label
                htmlFor=""
                style={{ paddingTop: "15px", fontWeight: "lighter" }}
              >
                Community
              </label>
            </div>
            <div className="col-lg-7">
              <input
                required
                type="text"
                className="form-control"
                id="formGroupExampleInput3"
                onChange={(e) => setCommunityRef(e.target.value)}
                value={communityRef}
                disabled={isDisable}
              />
            </div>
          </div>
          {/* <div className="row mb-2">
            <div className="col-lg-3 my_profile_setting_input form-group">
              <label htmlFor="" style={{ paddingTop: "15px", fontWeight:'lighter' }}>
                Type of Building <span class="req-btn">*</span> :
              </label>
            </div>
            <div className="col-lg-7">
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput3"
                onChange={(e)=>setBuildinRef(e.target.value)}
                value={buildinRef}
                disabled={isDisable}
              />
            </div>
          </div> */}
          <div className="row" style={{marginBottom:'-15px'}}>
            <div className="col-lg-3 my_profile_setting_input form-group">
              <label
                htmlFor=""
                style={{ paddingTop: "15px", fontWeight: "lighter" }}
              >
                Urgency
              </label>
            </div>
            <div className="col-lg-7">
              <div className="form-group input-group ui_kit_select_search mb-3">
                <select
                  required
                  className="form-select"
                  data-live-search="true"
                  data-width="100%"
                  onChange={(e) => setUrgencyRef(e.target.value)}
                  value={buildinRef}
                  disabled={isDisable}
                  style={{ paddingTop: "15px", paddingBottom: "15px" }}
                >
                  <option data-tokens="SelectRole" value={1}>
                    Low
                  </option>
                  <option data-tokens="Agent/Agency" value={3}>
                    Medium
                  </option>
                  <option data-tokens="SingleUser" value={2}>
                    High
                  </option>
                </select>
              </div>
            </div>
            <div className="row" style={{marginBottom:'-15px'}}>
              <div className="col-lg-3 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  style={{ paddingTop: "15px", fontWeight: "lighter" }}
                >
                  Maximum Appraisal Cost ($)
                </label>
              </div>
              <div className="col-lg-7">
                <input
                  type="number"
                  className="form-control"
                  id="formGroupExampleInput3"
                  onChange={(e) => setBidLowerRangeRef(e.target.value)}
                  value={bidLowerRangeRef}
                  disabled={isDisable}
                />
              </div>
            </div>
          </div>
          {/* End .col */}
        </div>
      </div>

      {/* <div className="row">
        <div className="col-lg-6 offset-3">
          <div className="col-lg-12">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="propertyTitle">Community</label>
              <input type="text" className="form-control" id="propertyTitle" placeholder="xxxxz"/>
            </div>
          </div> */}
      {/* End .col */}

      {/* <div className="col-lg-12">
        <div className="my_profile_setting_textarea">
          <label htmlFor="propertyDescription">Description</label>
          <textarea
            className="form-control"
            id="propertyDescription"
            rows="7"
          ></textarea>
        </div>
      </div> */}
      {/* End .col */}

      {/* <div className="col-lg-6 col-xl-6">
            <div className="my_profile_setting_input ui_kit_select_search form-group">
              <label>Type</label>
              <select
                className="selectpicker form-select"
                data-live-search="true"
                data-width="100%"
              >
                <option data-tokens="type1">Type1</option>
                <option data-tokens="Type2">Type2</option>
                <option data-tokens="Type3">Type3</option>
                <option data-tokens="Type4">Type4</option>
                <option data-tokens="Type5">Type5</option>
              </select>
            </div>
          </div> */}
      {/* End .col */}

      {/* <div className="col-lg-6 col-xl-6">
            <div className="my_profile_setting_input ui_kit_select_search form-group">
              <label>Status</label>
              <select
                className="selectpicker form-select"
                data-live-search="true"
                data-width="100%"
              >
                <option data-tokens="Status1">Status1</option>
                <option data-tokens="Status2">Status2</option>
                <option data-tokens="Status3">Status3</option>
                <option data-tokens="Status4">Status4</option>
                <option data-tokens="Status5">Status5</option>
              </select>
            </div>
          </div> */}
      {/* End .col */}

      {/* <div className="col-lg-12">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="formGroupExamplePrice">Type of Building</label>
              <input
                type="number"
                className="form-control"
                id="formGroupExamplePrice"
                placeholder="abcccqw"
              />
            </div>
          </div> */}
      {/* End .col */}

      {/* <div className="col-lg-12">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="formGroupExampleArea">Urgency</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleArea"
                placeholder="xyz"
              />
            </div>
          </div> */}
      {/* End .col */}

      {/* <div className="col-lg-4 col-xl-4">
            <div className="my_profile_setting_input ui_kit_select_search form-group">
              <label>Rooms</label>
              <select
                className="selectpicker form-select"
                data-live-search="true"
                data-width="100%"
              >
                <option data-tokens="Status1">1</option>
                <option data-tokens="Status2">2</option>
                <option data-tokens="Status3">3</option>
                <option data-tokens="Status4">4</option>
                <option data-tokens="Status5">5</option>
                <option data-tokens="Status6">Other</option>
              </select>
            </div>
          </div> */}
      {/* End .col */}

      {/* <div className="col-xl-12">
            <div className="my_profile_setting_input">
              <button className="btn btn1 float-start">Back</button>
              <button className="btn btn2 float-end">Next</button>
            </div>
          </div> */}
      {/* </div>
      </div> */}
    </>
  );
};

export default CreateList;
