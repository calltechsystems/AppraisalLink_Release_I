// Modal.js (a React component)

import axios from "axios";
import React, { useEffect } from "react";
import { encryptionData } from "../../utils/dataEncryption";
import { useState } from "react";
import toast from "react-hot-toast";

const Modal = ({ modalOpen, closeModal, price }) => {
  const [paypalUrl, setPaypalUrl] = useState("");
  const [status, setStatus] = useState(0);
  const checkOutHandler = () => {
    const data = JSON.parse(localStorage.getItem("user"));

    const payload = {
      planId: price.id,
      userId: data.userId,
      token: data.token,
    };

    const encryptiondata = encryptionData(payload);
    axios
      .post("/api/paypalPayement", encryptiondata)
      .then((res) => {
        setPaypalUrl(res.data.data.response);
        setStatus(1);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {}, [paypalUrl !== ""]);
  return (
    <div>
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            {/* <span className="close" onClick={closeModal}>
              &times;
            </span> */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              <h2>Get Subscription on {price.title} Plan</h2>
            </div>
           <hr />
            <div
              style={{ marginLeft: "10%", fontSize: "15px", marginTop: "2%" }}
            >
              <p>Please checkout for further</p>
              <p>
                Your selected Package{" "}
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "23px",
                    color: "#2e008b",
                  }}
                >
                  {price.title}
                </span>{" "}
                with value{" "}
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "23px",
                    color: "#2e008b",
                  }}
                >
                  ${price.price}
                </span>
              </p>
            </div><hr />
            <div className="col-lg-12 text-center">
              <button className="btn btn-color w-25 m-1" onClick={closeModal}>Cancel</button>
              {paypalUrl ? (
                status === 1 ? (
                  <div onClick={() => setStatus(2)}>
                    <a
                      href={paypalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="checkout-button"
                    >
                      Proceed to PayPal
                    </a>
                  </div>
                ) : (
                  <label className="btn btn-color w-25">Waiting ...</label>
                )
              ) : (
                <button className="btn btn-color w-25" onClick={checkOutHandler}>
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
