// Modal.js (a React component)

import React from "react";

const LoginModal = ({ modalOpen, closeModal, price }) => {
  return (
    <>
      <div>
        {modalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h2 className="text-center">
                  Get to our{" "}
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "29px",
                      color: "#2e008b",
                    }}
                  >
                    {price.title} Plan
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
              <div style={{ marginLeft: "14%" }}>
                <p className="m-3" style={{ fontSize: "17px" }}>
                  Please checkout for payment option
                </p>
                <p className="m-3" style={{ fontSize: "17px" }}>
                  Your selected Package{" "}
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "25px",
                       color: "#2e008b",
                    }}
                  >
                    {price.title} Plan
                  </span>{" "}
                  with value{" "}
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "25px",
                      color: "#2e008b",
                    }}
                  >
                    ${price.price}
                  </span>
                </p>
              </div>
              <div className="button-container">
                {/* <button className="cancel-button" onClick={closeModal}>
                  Cancel
                </button> */}
                <button className="btn btn-log w-35 btn-thm">Checkout</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LoginModal;
