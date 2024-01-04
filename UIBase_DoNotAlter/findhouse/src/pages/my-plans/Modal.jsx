import React, { useEffect, useState } from "react";
import axios from "axios";
import { encryptionData } from "../../utils/dataEncryption";
import toast from "react-hot-toast";
import {ClipLoader } from 'react-spinners';

const Modal = ({ modalOpen, closeModal, price }) => {
  const [paypalUrl, setPaypalUrl] = useState("");
  const [status, setStatus] = useState(0);
  const [countdown, setCountdown] = useState(180); // 3 minutes in seconds

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

  useEffect(() => {
    let countdownInterval;

    if (status === 2 && countdown > 0) {
      countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      // Handle countdown reaching 0, e.g., close modal or perform additional actions
      clearInterval(countdownInterval);
      window.location.reload();
    }

    return () => {
      clearInterval(countdownInterval);
    };
  }, [status, countdown]);

  return (
    <div>
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            {/* <span className="close" onClick={closeModal}>
              &times;
            </span> */}
           {status === 2 ? 
            <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <img src="data:image/jpeg;base64,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" width={60} height={30}/>
          </div> : <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              <h2>Get Subscription on {price.title} Plan</h2>
            </div>}
            <hr />
           {status === 2 ? 
            <div
              style={{ marginLeft: "10%", fontSize: "15px", marginTop: "2%" }}
            >
              <p>We have already redirected you to the paypal page.</p>
              <p>
                Don&apos;t <span style={{color:"red"}}>reload</span> or <span style={{color:"red"}}>refresh</span> the page
               
              </p>
            </div>: <div
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
            </div>}
            <hr />
            <div className="col-lg-12 text-center">
             {status!== 2 && <button className="btn btn-color w-25 m-1" onClick={closeModal}>
                Cancel
              </button>}
              {paypalUrl ? (
                status === 1 ? (
                  <div onClick={() => setStatus(2)}>
                    <a
                      href={paypalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-color w-25"
                    >
                      <img
                        src="https://th.bing.com/th/id/OIP.pQDcRxJ3IS71sWCWQ96IUwHaHa?w=171&h=180&c=7&r=0&o=5&pid=1.7"
                        width={40}
                        height={30}
                        alt="PayPal"
                      />
                    </a>
                  </div>
                ) : (
                  <label className="btn btn-color w-25"><ClipLoader color="#ffffff" loading={true}  size={40} /></label>
                )
              ) : (
                <button className="btn btn-color w-25" onClick={checkOutHandler}>
                  Checkout
                </button>
              )}
            </div>
            {status === 2 && (
              <div className="text-center mt-3">
                <p>Countdown: {Math.floor(countdown / 60)}:{countdown % 60}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
