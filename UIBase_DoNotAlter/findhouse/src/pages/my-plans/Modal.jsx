// Modal.js (a React component)

import React from 'react';

const Modal = ({ modalOpen, closeModal, price }) => {
  return (
    <div>
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <div style={{ display: "flex", flexDirection: "column", textAlign:'center' }}>
              <h2>Get Subscription on {price.title} Plan</h2>
            </div>
            <div style={{ border: "1px", borderStyle: "solid", borderColor: "gray" }}></div>
            <div style={{ marginLeft: "10%", fontSize: "15px", marginTop: "5%" }}>
              <p>Please checkout for further</p>
              <p>Your selected Package <span style={{fontWeight:"bold",fontSize:"23px",color:"#2e008b"}}>{price.title}</span> with value <span style={{fontWeight:"bold",fontSize:"23px",color:"#2e008b"}}>${price.price}</span></p>
            </div>
            <div className="button-container">
              {/* <button className="cancel-button" onClick={closeModal}>Cancel</button> */}
              <button className="checkout-button">Checkout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
