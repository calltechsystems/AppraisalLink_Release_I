// Modal.js (a React component)

import React from "react";

const Modal = ({ modalOpen, closeModal }) => {
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
                  Participate in Bid
                </span>
              </h2>
              <p className="text-center">
                {" "}
                Please place a bid to fill your amount
              </p>
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
                          Bid Amount <span class="req-btn">*</span> :
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          type="text"
                          className="form-control"
                          id="formGroupExampleInput3"
                        />
                      </div>
                    </div>
                    <div className="row mb-2 mt-2">
                      <div className="col-lg-3 mb-2">
                        <label
                          htmlFor=""
                          style={{ paddingTop: "15px", fontWeight: "lighter" }}
                        >
                          Your Amount <span class="req-btn">*</span> :
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          type="number"
                          className="form-control"
                          id="formGroupExampleInput3"
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
              <button className="btn btn-log w-35 btn-thm">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
