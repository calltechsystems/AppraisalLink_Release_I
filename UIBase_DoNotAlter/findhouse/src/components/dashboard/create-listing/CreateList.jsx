import { useRef, useState } from "react";
import { Urgency, typeOfAppraisal, Purpose } from "./data";
import { typeOfBuilding } from "./data";

const CreateList = ({
  isDisable,
  urgencyRef,
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
  const [selectedOption, setSelectedOption] = useState("");

  const check = (e) => {
    const selectedIndex = e.target.selectedIndex;
    setSelectedOption(e.target.value);

    const otherDiv = document.getElementById("other-div");

    if (selectedIndex === 8) {
      otherDiv.style.display = "block";
    } else {
      otherDiv.style.display = "none";
    }
  };

  const [selectedOption_01, setSelectedOption_01] = useState("");

  const check_01 = (e) => {
    const selectedIndex = e.target.selectedIndex;
    setSelectedOption_01(e.target.value);

    const otherDiv = document.getElementById("other-div_01");

    if (selectedIndex === 4) {
      otherDiv.style.display = "block";
    } else {
      otherDiv.style.display = "none";
    }
  };

  const [selectedOption_02, setSelectedOption_02] = useState("");

  const check_02 = (e) => {
    const selectedIndex = e.target.selectedIndex;
    setSelectedOption_02(e.target.value);

    const otherDiv = document.getElementById("other-div_02");

    if (selectedIndex === 6) {
      otherDiv.style.display = "block";
    } else {
      otherDiv.style.display = "none";
    }
  };
  return (
    <>
      {/* <div className="row">
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
                    
                    backgroundColor: "#E8F0FE",
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
        </div>
      </div> */}

      <div className="row offset-1">
        <div className="col-lg-12">
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
                Property Area (sq.ft) <span class="req-btn">*</span>
              </label>
            </div>
            <div className="col-lg-7">
              <input
                style={{ backgroundColor: "#E8F0FE" }}
                type="number"
                className="form-control"
                id="formGroupExampleInput3"
                onChange={(e) => setAreaRef(e.target.value)}
                value={areaRef}
                disabled={isDisable}
              />
            </div>
          </div> */}
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
              <div className="form-group input-group ui_kit_select_search">
                <select
                  required
                  className="form-select"
                  data-live-search="true"
                  data-width="100%"
                  value={selectedOption}
                  onChange={check}
                  // onChange={(e) => setBuildinRef(e.target.value)}
                  disabled={isDisable}
                  style={{
                    paddingTop: "15px",
                    paddingBottom: "15px",
                    backgroundColor: "#E8F0FE",
                    // color:"white"
                  }}
                >
                  {typeOfBuilding.map((item, index) => {
                    return (
                      <option key={item.id} value={item.value}>
                        {item.type}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="row" style={{ marginBottom: "10px" }}>
            <div className="col-lg-3 my_profile_setting_input form-group"></div>
            <div className="col-lg-7">
              <div id="other-div" style={{ display: "none" }}>
                {/* Content for the "Other" option */}
                <input
                  required
                  style={{ backgroundColor: "#E8F0FE" }}
                  onChange={(e) => setBuildinRef(e.target.value)}
                  type="text"
                  className="form-control"
                  id="otherInput"
                  name="otherInput"
                />
              </div>
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
                Type of Appraisal <span class="req-btn">*</span>
              </label>
            </div>
            <div className="col-lg-7">
              <div className="form-group input-group ui_kit_select_search">
                <select
                  required
                  className="form-select"
                  data-live-search="true"
                  data-width="100%"
                  value={selectedOption_01}
                  onChange={check_01}
                  // onChange={(e) => setBuildinRef(e.target.value)}
                  // disabled={isDisable}
                  style={{
                    paddingTop: "15px",
                    paddingBottom: "15px",
                    backgroundColor: "#E8F0FE",
                    // color:"white"
                  }}
                >
                  {typeOfAppraisal.map((item, index) => {
                    return (
                      <option key={item.id} value={item.value}>
                        {item.type}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="row" style={{ marginBottom: "10px" }}>
            <div className="col-lg-3 my_profile_setting_input form-group"></div>
            <div className="col-lg-7">
              <div id="other-div_01" style={{ display: "none" }}>
                {/* Content for the "Other" option */}
                <input
                  required
                  style={{ backgroundColor: "#E8F0FE" }}
                  type="text"
                  className="form-control"
                  id="otherInput"
                  name="otherInput"
                />
              </div>
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
                Purpose <span class="req-btn">*</span>
              </label>
            </div>
            <div className="col-lg-7">
              <div className="form-group input-group ui_kit_select_search">
                <select
                  required
                  className="form-select"
                  data-live-search="true"
                  data-width="100%"
                  value={selectedOption_02}
                  onChange={check_02}
                  // onChange={(e) => setBuildinRef(e.target.value)}
                  // disabled={isDisable}
                  style={{
                    paddingTop: "15px",
                    paddingBottom: "15px",
                    backgroundColor: "#E8F0FE",
                    // color:"white"
                  }}
                >
                  {Purpose.map((item, index) => {
                    return (
                      <option key={item.id} value={item.value}>
                        {item.type}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="row" style={{ marginBottom: "10px" }}>
            <div className="col-lg-3 my_profile_setting_input form-group"></div>
            <div className="col-lg-7">
              <div id="other-div_02" style={{ display: "none" }}>
                {/* Content for the "Other" option */}
                <input
                  required
                  style={{ backgroundColor: "#E8F0FE" }}
                  type="text"
                  className="form-control"
                  id="otherInput"
                  name="otherInput"
                />
              </div>
            </div>
          </div>
          <div className="row" style={{ marginBottom: "10px" }}>
            <div className="col-lg-3 my_profile_setting_input form-group">
              <label
                htmlFor=""
                className="text-color"
                style={{
                  paddingTop: "15px",
                  color: "#1560bd",
                  fontWeight: "",
                }}
              >
                Lender Information
              </label>
            </div>
            <div className="col-lg-7">
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput3"
                style={{ backgroundColor: "#E8F0FE" }}
                // onChange={(e) => setCommunityRef(e.target.value)}
                // value={communityRef}
                // disabled={isDisable}
              />
            </div>
          </div>
          <div className="row" style={{ marginBottom: "10px" }}>
            <div className="col-lg-3 my_profile_setting_input form-group">
              <label
                htmlFor=""
                className="text-color"
                style={{
                  paddingTop: "15px",
                  color: "#1560bd",
                  fontWeight: "",
                }}
              >
                Community
              </label>
            </div>
            <div className="col-lg-7">
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput3"
                style={{ backgroundColor: "#E8F0FE" }}
                onChange={(e) => setCommunityRef(e.target.value)}
                value={communityRef}
                disabled={isDisable}
              />
            </div>
          </div>
          <div className="row" style={{ marginBottom: "10px" }}>
            <div className="col-lg-3 my_profile_setting_input form-group">
              <label
                htmlFor=""
                className="text-color"
                style={{
                  paddingTop: "15px",
                  color: "#1560bd",
                  fontWeight: "",
                }}
              >
                Estimated Value / Purchase Price ($)
              </label>
            </div>
            <div className="col-lg-7">
              <input
                type="number"
                className="form-control"
                id="formGroupExampleInput3"
                style={{ backgroundColor: "#E8F0FE" }}
                onChange={(e) => setBidLowerRangeRef(e.target.value)}
                value={bidLowerRangeRef}
                disabled={isDisable}
              />
            </div>
          </div>
          <div className="row" style={{ marginBottom: "10px" }}>
            <div className="col-lg-3 my_profile_setting_input form-group">
              <label
                htmlFor=""
                className="text-color"
                style={{
                  paddingTop: "15px",
                  color: "#1560bd",
                  fontWeight: "",
                }}
              >
                Urgency
              </label>
            </div>
            <div className="col-lg-7">
              <div className="form-group input-group ui_kit_select_search mb-3">
                <select
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
                  {Urgency.map((item, index) => {
                    return (
                      <option key={item.id} value={item.value}>
                        {item.type}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="row" style={{ marginBottom: "10px" }}>
            <div className="col-lg-3 my_profile_setting_input form-group">
              <label
                htmlFor=""
                className="text-color"
                style={{
                  paddingTop: "15px",
                  color: "#1560bd",
                  fontWeight: "",
                }}
              >
                Quote Required By <span class="req-btn">*</span>
              </label>
            </div>
            <div className="col-lg-7">
              <input
                required
                type="date"
                className="form-control"
                id="formGroupExampleInput3"
                style={{ backgroundColor: "#E8F0FE" }}
                onChange={(e) => setCommunityRef(e.target.value)}
                value={communityRef}
                disabled={isDisable}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateList;
