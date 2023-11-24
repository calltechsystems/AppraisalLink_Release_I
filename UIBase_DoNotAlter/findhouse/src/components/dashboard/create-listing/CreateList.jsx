import { useRef } from "react";
import { Urgency } from "./data";

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
          <div className="row mb-2">
            <div className="col-lg-6">
              <div className="my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  style={{
                    paddingTop: "15px",
                    color: "#1560bd",
                    fontWeight: "",
                  }}
                >
                  Maximum Appraisal Cost ($)
                </label>
              </div>
              <div className="">
                <input
                  style={{
                    // paddingTop: "15px",
                    // paddingBottom: "15px",
                    backgroundColor: "#E8F0FE",
                    //color: "white",
                  }}
                  type="number"
                  className="form-control"
                  id="formGroupExampleInput3"
                  onChange={(e) => setBidLowerRangeRef(e.target.value)}
                  value={bidLowerRangeRef}
                  disabled={isDisable}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  style={{
                    paddingTop: "15px",
                    color: "#1560bd",
                    fontWeight: "",
                  }}
                >
                  Community <span class="req-btn">*</span>
                </label>
              </div>
              <div className="">
                <input
                  style={{
                    // paddingTop: "15px",
                    // paddingBottom: "15px",
                    backgroundColor: "#E8F0FE",
                    //color: "white",
                  }}
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
          </div>

          <div className="row mb-2">
            <div className="col-lg-12">
              <div className="my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  style={{
                    paddingTop: "15px",
                    color: "#1560bd",
                    fontWeight: "",
                  }}
                >
                  Urgency
                </label>
              </div>
              <div className="">
                <div className="form-group input-group ui_kit_select_search mb-3">
                  <select
                    required
                    className="form-select"
                    data-live-search="true"
                    data-width="100%"
                    onChange={(e) => setUrgencyRef(e.target.value)}
                    disabled={isDisable}
                    style={{
                      paddingTop: "15px",
                      paddingBottom: "15px",
                      backgroundColor: "#E8F0FE",
                      // color: "white",
                    }}
                  >
                  {Urgency.map((item,index)=>{
                    return <option key={item.id} value={item.value}>{item.type}</option>
                 })}
                  
                  </select>
                </div>
              </div>
            </div>
          </div>
          {/* End .col */}
        </div>
      </div>

      {/* <div className="row">
        <div className="col-lg-12">
          <div className="row" style={{ marginBottom: "-15px" }}>
            <div className="col-lg-3 my_profile_setting_input form-group">
              <label
                htmlFor=""
                style={{ paddingTop: "15px", fontWeight: "" }}
              >
                Maximum Appraisal Cost ($)
              </label>
            </div>
            <div className="col-lg-7">
              <input
                type="number"
                className="form-control"
                id="formGroupExampleInput3"
                style={{ background: "aliceblue" }}
                onChange={(e) => setBidLowerRangeRef(e.target.value)}
                value={bidLowerRangeRef}
                disabled={isDisable}
              />
            </div>
          </div>
          <div className="row" style={{ marginBottom: "-15px" }}>
            <div className="col-lg-3 my_profile_setting_input form-group">
              <label
                htmlFor=""
                style={{ paddingTop: "15px", fontWeight: "" }}
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
          <div className="row" style={{ marginBottom: "-15px" }}>
            <div className="col-lg-3 my_profile_setting_input form-group">
              <label
                htmlFor=""
                style={{ paddingTop: "15px", fontWeight: "" }}
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
                  disabled={isDisable}
                  style={{ paddingTop: "15px", paddingBottom: "15px" }}
                >
                  <option data-tokens="SelectRole" value={1}>
                    Choose..
                  </option>
                  <option data-tokens="SelectRole" value={1}>
                    Low
                  </option>
                  <option data-tokens="Agent/Agency" value={1}>
                    Medium
                  </option>
                  <option data-tokens="SingleUser" value={2}>
                    High
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

export default CreateList;
