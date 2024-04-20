// Modal.js (a React component)

import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { encryptionData } from "../../../utils/dataEncryption";

const Modal = ({ modalOpen, closeModal, editPlan }) => {
  const [planAmount, setPlanAmount] = useState(0);
  const [planProperties, setPlanProperties] = useState(0);
  const [disable,setDisable] = useState(false)

  useEffect(() => {
    setPlanAmount(editPlan?.amount);
    setPlanProperties(editPlan?.noOfProperties);
  }, [editPlan]);

  const updateHandler = () => {
    if (
      String(planAmount) === String(editPlan?.amount) &&
      String(planProperties) === String(editPlan?.noOfProperties)
    ) {
      closeModal()
      toast.error("No Change found !");
    }
    else{

      const userData = JSON.parse(localStorage.getItem("user"))

      const payload = {
        planID : editPlan?.id,
        numberOfProperty : planProperties,
        amount : planAmount,
        token : userData.token
      }

      setDisable(true)
      const encryptedBody = encryptionData(payload);
      axios.post("/api/updatePlanDetails",encryptedBody,{
        headers:{
          Authorization : `Bearer ${userData.token}`
        }
      })
      .then((res)=>{
        toast.success("Successfully Updated!!");
        window.location.reload();
      })
      .catch((err)=>{
        toast.error("Try Again!!");
      })
      setDisable(false)
    }
  };

  return (
    <div>
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h2 className="text-center">
                {" "}
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "29px",
                    color: "#2e008b",
                  }}
                >
                  Update Plan Details
                </span>
              </h2>
            </div>
            <div
              style={{
                border: "1px",
                borderStyle: "solid",
                borderColor: "gray",
              }}
            ></div>
            <div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="row mb-2 mt-2 text-center">
                    <div className="row">
                      <div className="col-lg-3 mb-2">
                        <label
                          htmlFor=""
                          style={{ paddingTop: "15px", fontWeight: "lighter" }}
                        >
                          Plan Title <span class="req-btn">*</span> :
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          required
                          type="text"
                          className="form-control"
                          id="formGroupExampleInput3"
                          value={editPlan?.planName}
                        />
                      </div>
                    </div>
                    <div className="row mb-2 mt-2">
                      <div className="col-lg-3 mb-2">
                        <label
                          htmlFor=""
                          style={{ paddingTop: "15px", fontWeight: "lighter" }}
                        >
                          Plan Amount <span class="req-btn">*</span> :
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          required
                          type="number"
                          className="form-control"
                          id="formGroupExampleInput3"
                          value={planAmount}
                          onChange={(e) => setPlanAmount(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row mb-2 mt-2">
                      <div className="col-lg-3 mb-2">
                        <label
                          htmlFor=""
                          style={{ paddingTop: "15px", fontWeight: "lighter" }}
                        >
                          Properties <span class="req-btn">*</span> :
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          required
                          type="number"
                          className="form-control"
                          id="formGroupExampleInput3"
                          value={planProperties}
                          onChange={(e) => setPlanProperties(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row mb-2 mt-2">
                      <div className="col-lg-3 mb-2">
                        <label
                          htmlFor=""
                          style={{ paddingTop: "15px", fontWeight: "lighter" }}
                        >
                          Validity(Days) <span class="req-btn">*</span> :
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          required
                          type="number"
                          className="form-control"
                          id="formGroupExampleInput3"
                          value="30"
                        />
                      </div>
                    </div>
                    <div className="row mb-2 mt-2">
                      <div className="col-lg-3 mb-2">
                        <label
                          htmlFor=""
                          style={{ paddingTop: "15px", fontWeight: "lighter" }}
                        >
                          Roll Over <span class="req-btn">*</span> :
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          required
                          type="text"
                          className="form-control"
                          id="formGroupExampleInput3"
                          value="No"
                        />
                      </div>
                    </div>
                    <div className="row mb-2 mt-2">
                      <div className="col-lg-3 mb-2">
                        <label
                          htmlFor=""
                          style={{ paddingTop: "15px", fontWeight: "lighter" }}
                        >
                          Support <span class="req-btn">*</span> :
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          required
                          type="text"
                          className="form-control"
                          id="formGroupExampleInput3"
                          value="Limited"
                          // placeholder="Limited"
                        />
                      </div>
                    </div>
                  </div>

                  {/* End .col */}
                </div>
              </div>
            </div>
            <div className="button-container">
              {/* <button className="cancel-button" onClick={closeModal}>
                  Cancel
                </button> */}
              <button className="btn btn-log w-35 btn-thm"
              disabled={disable}
              onClick={updateHandler}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
