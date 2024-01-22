// Modal.js (a React component)

import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { encryptionData } from "../../../utils/dataEncryption";
import axios from "axios";
import { useRouter } from "next/router";
import { flip } from "@popperjs/core";

import { CldUploadWidget } from "next-cloudinary";
const Modal = ({
  modalOpen,
  setModalOpen,
  closeModal,
  currentBid,
  alreadyBidded,
  setIsQuoteModalOpen,
  setIsModalOpen,
  handleSubmit,
  setCurrentBid,
  setBidAmount,
  bidAmount,
  propertyId,
  closeQuoteModal,
  openQuoteModal,
}) => {
  const router = useRouter();
  const [value, setValue] = useState(null);
  const [description, setDescription] = useState("");

  const [toggle, setToggle] = useState(false);

  const [selectedImage,setSelectedImage]=useState({});

  const handleUpload = (result) => {
      // Handle the image upload result here
      console.log("handleUpload called",result.info);
      setSelectedImage({url:result.info.secure_url,name:result.info.original_filename+"."+result.info.format});
      // if (result.info.secure_url) {
      //   setSelectedImage(result.info.secure_url);
      //   setProfilePhoto(result.info.secure_url);
      //   // You can also save the URL to your state or do other operations here
      // } else {
      //   // Handle the case when the upload failed
      //   console.error("Image upload failed");
      // }
    };

  const onCancelHandler = () => {
    setToggle(false);
    setValue(0);
    setDescription("");
    closeModal();
  };

  const handleToggle = () => {
    setToggle(true);
  };

  const onCloseModalHandler = () => {
    setValue("");
    setSelectedImage({});
    setDescription("");
    setToggle(false);
    setCurrentBid({});
    setBidAmount(0);
    setModalOpen(false);
  };

  const onSubmitHnadler = () => {
    const bidAmount = value;
    const desp = description;

    if (bidAmount <= 0 || bidAmount === "") {
      toast.error("Quoted amount should be filled !");
      return;
    } 
    if(!alreadyBidded && !selectedImage){
      toast.error("Please upload the lender list document !");
      return ;
    }
    else {
      const user = JSON.parse(localStorage.getItem("user"));

      const formData = {
        propertyId: propertyId,
        userId: user.userId,
        bidAmount: bidAmount,
        description: desp ? desp : "NA",
        token: user.token,
        lenderListUrl : selectedImage.url
      };


      const payload = encryptionData(formData);
      setIsModalOpen(false);
      toast.loading(alreadyBidded ? "Updating a bid!" : "Setting a bid");
      axios
        .post("/api/setBid", payload)
        .then((res) => {
          toast.dismiss();
          toast.success(alreadyBidded ? "Successfully Updated a bid!" : "Successfully set a bid");
          location.reload(true);
        })
        .catch((err) => {
          toast.dismiss();
          toast.error("Try Again");
        });
      setToggle(false);
    }
  };

  const formatLargeNumber = (number) => {
    // Convert the number to a string
    const numberString = number.toString();

    // Determine the length of the integer part
    const integerLength = Math.floor(Math.log10(Math.abs(number))) + 1;

    // Choose the appropriate unit based on the length of the integer part
    let unit = '';

    if (integerLength >= 10) {
        unit = 'B'; // Billion
    } else if (integerLength >= 7) {
        unit = 'M'; // Million
    } else if (integerLength >= 4) {
        unit = 'K'; // Thousand
    }

    // Divide the number by the appropriate factor
    const formattedNumber = (number / Math.pow(10, (integerLength - 1))).toFixed(2);

    return `${formattedNumber}${unit}`;
};


  const openConfirmModal = () => {
    if (!value) {
      toast.error("Quoted amount should be filled !");
    }
    if(!alreadyBidded && !selectedImage){
      toast.error("Please upload the lender list document !");
      return ;
    }
     else {
      setToggle(true);
    }
  };
  return (
    <div>
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            {/* <span className="close" onClick={onCloseModalHandler}>
              &times;
            </span> */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h2 className="text-center">
                {" "}
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "27px",
                    color: "#2e008b",
                  }}
                >
                  {!toggle
                    ?  `${ alreadyBidded ? "Appraisal Quote Updation Form " : "Appraisal Quote Form"}`
                    :  `${ alreadyBidded ? "Confirmation of Quote Updation Form " : "Confirmation of Quote Form"}` }
                </span>
              </h2>
            </div>
            <div><hr /></div>
            <div>
              {!toggle ? (
                <div className="row">
                  <div className="col-lg-12">
                    <div className="row mb-2 mt-2 text-center">
                    <div className="col-lg-12 mb-2">
                    <label
                      htmlFor=""
                      style={{
                        paddingTop: "15px",
                        fontWeight: "lighter",
                      }}
                    >
                     {`${alreadyBidded? `Your Eariler Quote was $ ${formatLargeNumber(bidAmount)}` : "Please provide a quote for this property"}`}
                    </label>
                  </div>
                      <div className="row mb-2 mt-2" >
                     
                    
                        <div className="col-lg-3 mb-2">
                          <label
                            htmlFor=""
                            style={{
                              paddingTop: "15px",
                              fontWeight: "lighter",
                            }}
                          >
                            {`${ alreadyBidded ? "Appraisal updation Quote " : "Appraisal Quote"}`} <span class="req-btn">*</span> :
                          </label>
                        </div>

                      

                        <div className="col-lg-7">
                          <input
                            type="number"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className="form-control"
                            id="formGroupExampleInput3"
                          />
                        </div>
                      </div>

                      {!alreadyBidded && (<div className="row">
                      <div className="col-lg-3 mb-2"> 
                      <label
                            htmlFor=""
                            style={{
                              paddingTop: "15px",
                              fontWeight: "lighter",
                            }}
                          >
                          Add Lender List
                          </label>
                          </div> 
                          <div className="col-lg-7">
                        <label>{selectedImage.name}</label>
                          <CldUploadWidget
                        onUpload={handleUpload}
                        uploadPreset="mpbjdclg"
                        options={{
                          cloudName: "dcrq3m6dx", // Your Cloudinary upload preset
                          maxFiles: 1,
                        }}
                      >
                        {({ open }) => (
                          <div>
                            <button
                              className="btn btn-color profile_edit_button mb-5"
                              style={{ marginLeft: "0px" }}
                              onClick={open} // This will open the upload widget
                            >
                              Upload +
                            </button>
                          </div>
                        )}
                      </CldUploadWidget>
                      </div>
                      </div>
                      )}

                      <div className="row">
                        <div className="col-lg-3 mb-2">
                          <label
                            htmlFor=""
                            style={{
                              paddingTop: "15px",
                              fontWeight: "lighter",
                            }}
                          >
                            Remark
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="form-control"
                            id="formGroupExampleInput3"
                          />
                        </div>
                      </div>
                    </div>

                    {/* End .col */}
                  </div>
                </div>
              ) : (
                <><p className="m-3 text-center" style={{ fontSize: "18px" }}>
                  Are you confirming that you will quote this property for the
                  given amount : <br />
                  <h3 className="mt-2 text-color"> $ {value}</h3>
                </p>
                {alreadyBidded && (<p className="m-3 text-center" style={{ fontSize: "18px" }}> from <span style={{color:"red"}}>$ {formatLargeNumber(bidAmount)}</span></p>)}
                </>
              )}
            </div>
            <hr />
            <div
              className="col-lg-12 text-center"
              style={{ marginRight: "4%" }}
            >
              {/* <button className="cancel-button" onClick={closeModal}>
                  Cancel
                </button> */}
              <button
                className="btn btn-color w-25"
                onClick={onCloseModalHandler}
              >
                Cancel
              </button>
              <button
                className="btn btn-color w-25 m-1"
                onClick={toggle ? onSubmitHnadler : openConfirmModal}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
