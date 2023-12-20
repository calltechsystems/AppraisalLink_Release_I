// Modal.js (a React component)

import React, { useEffect } from "react";
import { useRouter } from "next/router";

const Modal = ({ modalOpen, closeModal, price, selectedPlan }) => {
  const router = useRouter();
  let user = {};
  const loginHandler = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData?.userType === 1) {
      router.push("/my-plans");
    } else {
      router.push("/login");
    }
  };

  useEffect(() => {
    user = JSON.parse(localStorage.getItem("user"));
  }, []);
  return (
    <>
      <div>
        {modalOpen && (
          <div className="modal">
            <div className="modal-content">
              {/* <span className="close" onClick={closeModal}>
                &times;
              </span> */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h3 className="text-center">
                  Get subscription to our{" "}
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "29px",
                      color: "#2e008b",
                    }}
                  >
                    {price.title} Plan
                  </span>
                </h3>
              </div>
              <hr />
              <div className="text-center">
                <p className="m-3" style={{ fontSize: "16px" }}>
                  Please click continue to login
                </p>
                <p className="m-3" style={{ fontSize: "16px" }}>
                  Your selected Package {" "}
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
              <hr />
              <div className="col-lg-12 text-center">
                {/* <button className="cancel-button" onClick={closeModal}>
                  Cancel
                </button> */}
                <button className="btn w-25 btn-color m-1" onClick={closeModal}>
                  Cancel
                </button>
                <button
                  className="btn btn-color w-25 m-1"
                  onClick={loginHandler}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Modal;
