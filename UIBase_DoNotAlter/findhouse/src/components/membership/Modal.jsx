// Modal.js (a React component)

import React from "react";

const Modal = ({ modalOpen, closeModal, price }) => {
  return (
    <div>
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h2>Get Subscription</h2>
            </div>
            <div
              style={{
                border: "1px",
                borderStyle: "solid",
                borderColor: "gray",
              }}
            ></div>
            <div
              style={{ marginLeft: "30%", fontSize: "48px", marginTop: "5%" }}
            >
              <p>Please checkout for further</p>
              <p>
                Your selected Package{" "}
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "36px",
                    color: "#2e008b",
                  }}
                >
                  {price.title}
                </span>{" "}
                with value{" "}
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "36px",
                    color: "#2e008b",
                  }}
                >
                  ${price.price}
                </span>
              </p>
            </div>
            <div className="button-container">
              <button className="cancel-button" onClick={closeModal}>
                Cancel
              </button>
              <button className="checkout-button">Checkout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
