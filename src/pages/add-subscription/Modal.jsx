// Modal.js (a React component)

import axios from 'axios';
import React, { useEffect } from 'react';
import {  encryptionData } from '../../utils/dataEncryption';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { userAgent } from 'next/server';

const Modal = ({ modalOpen, closeModal, price,setDisable,disable }) => {
  const [paypalUrl, setPaypalUrl] = useState('');
  const [status , setStatus] = useState(0);
  // const userData = JSON.parse(localStorage.getItem("user"));
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
        setPaypalUrl(res.data.data.response)
        setStatus(1);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }

  const onClickHandler = (id)=>{
   
    setStatus(2);
    setDisable(true);

    const data = (JSON.parse(localStorage.getItem("user")));

    const payload = {
      sucscriptionId : id,
      userId : data.userId,
      token : data.token
    }

    const encryptiondata = encryptionData(payload);
    axios
      .post("/api/recurringPayement",encryptiondata)
      .then((res) => {
       console.log(res);
      })
      .catch((err) => {
        toast.error(err.message);
      });

  }
  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("Inside timeout place");
    }, 20000);
  
    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, [status === 2]);

  useEffect ( ()=>{
   
  },[paypalUrl !== ""]);
  useEffect(() => {
    if (status === 2) {
      // Set a timeout to reload the page after 2 minutes (2000 milliseconds * 60 seconds * 2 minutes)
      const reloadTimeout = setTimeout(() => {
        window.location.reload();
      }, 2000 * 60 * 2);

      return () => clearTimeout(reloadTimeout); // Cleanup the timeout on component unmount or when status changes
    }
  }, [status]);
  
  return (
    <div>
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            {status !== 2 && <span className="close" onClick={closeModal}>&times;</span>}
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
                <div onClick={()=>onClickHandler(price.id)}><a href={paypalUrl}   className="checkout-button">
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
