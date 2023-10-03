// Modal.js (a React component)

import axios from 'axios';
import React, { useEffect } from 'react';
import {  encryptionData } from '../../utils/dataEncryption';
import { useState } from 'react';

const Modal = ({ modalOpen, closeModal, price }) => {
  const [paypalUrl, setPaypalUrl] = useState('');
  const [status , setStatus] = useState(0);
  const checkOutHandler = ()=>{
    const data = (JSON.parse(localStorage.getItem("user")));

    const payload = {
      planId : price.id,
      userId : data.userId,
      token : data.token
    }

    const encryptiondata = encryptionData(payload);
    axios
      .post("/api/paypalPayement",
      encryptiondata)
      .then((res) => {
        console.log(res.data);
        setPaypalUrl(res.data.data.response)
        setStatus(1);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  useEffect ( ()=>{
    const fetchData = async () => {
      try {
        // Make your API call here
        const response = await axios.get('/your-api-endpoint');
        console.log(response.data);

        // You can process the response data here
      } catch (error) {
        console.error(error);
      }
    };

    // Call the fetchData function immediately when the component mounts
    fetchData();

    // Set up an interval to call the fetchData function every minute (60,000 milliseconds)
    const intervalId = setInterval(fetchData, 30000);
    return () => {
      clearInterval(intervalId);
    };
  },[paypalUrl !== ""]);
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
              {paypalUrl ? (
                status === 1 ?
                <div onClick={()=>setStatus(2)}><a href={paypalUrl} target="_blank" rel="noopener noreferrer" className="checkout-button">
                  Proceed to PayPal
                </a></div>:
                <label className="checkout-button">
                  Waiting ...
                </label>
              ) : (
                <button className="checkout-button" onClick={checkOutHandler}>
                  Checkout
                </button>
              )}            
              </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
