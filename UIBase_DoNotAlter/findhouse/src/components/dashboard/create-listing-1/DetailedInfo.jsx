import React, { Component, useState } from "react";
import { useRouter } from "next/router";
import { CldUploadWidget } from "next-cloudinary";
import ReactInputMask from "react-input-mask";
import CheckBoxFilter from "../../common/CheckBoxFilter";
import toast from "react-hot-toast";
import axios from "axios";
import { uploadFile } from "./functions";
const DetailedInfo = ({
  onCancelHandler,
  isDisable,
  changeUrlToStringHandler,
  updateHandler,
  remark,
  setRemark,
  applicantFirstName,
  setApplicantFirstName,
  applicantLatsName,
  setApplicantLastName,
  applicantNumber,
  setApplicantNumber,
  applicantEmail,
  setApplicantEmail,
  propertyData,
  submitHandler,
  changeStringUrlHandler,
  setApplicantAddress,
  applicantAddress,
  attachment,
  errorLabel,
  filesUrl,
  image,
  disable,
  setImage,
  setFilesUrl,
  setAttachment,
  setDisable,
}) => {
  const router = useRouter();
  console.log(filesUrl, attachment);
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const [uploadedFiles, setUploadedFiles] = useState([]);

  const cancelHandler = () => {
    router.push("/my-properties");
  };
  console.log(applicantEmail);

  const handleOpen = (event) => {
    const files = event.originalEvent.target.files;

    // Filter the selected images
    const images = Array.from(files).filter((file) =>
      ["image/jpeg", "image/png", "image/gif"].includes(file.type)
    );

    // Update the state with the selected images
    setSelectedImages(images);

    // Log the count of selected images
    console.log("Number of selected images:", images.length);
  };

  const handleUpload = async (e, type) => {
    const file = e.target.files[0];
    toast.loading("Uploading..");
    try {
      const generatedUrl = await uploadFile(file);
      toast.dismiss();
      toast.success("Uploaded Successfully");
      let allUrl = [...filesUrl];
      allUrl.push(generatedUrl);
      setFilesUrl(allUrl);
      setAttachment(generatedUrl);
    } catch (err) {
      toast.dismiss();
      toast.error("Try Again!");
    }
  };

  const errorLabelStyle = { borderColor: "red" };

  const checkIsError = (value) => {
    let isError = false;
    errorLabel.map((err, index) => {
      console.log(err, value);
      if (String(err) === String(value)) {
        isError = true;
      }
    });
    console.log(isError);
    return isError;
  };

  const [phoneNumber, setPhoneNumber] = useState("");

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    // Allow only numeric input
    const numericValue = inputValue.replace(/\D/g, "");

    // Restrict to 10 digits
    const truncatedValue = numericValue.slice(0, 10);
    if (truncatedValue.length === 10) {
      setApplicantNumber(truncatedValue);
    }

    setApplicantNumber(truncatedValue);
  };
  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="row" style={{ marginBottom: "10px" }}>
            <div className="col-lg-3 my_profile_setting_input form-group">
              <label
                className="text-color"
                style={{ paddingTop: "15px", fontWeight: "" }}
              >
                First Name <span class="req-btn">*</span>
              </label>
            </div>
            <div className="col-lg-5">
              <input
                style={
                  checkIsError("applicantFirstName")
                    ? errorLabelStyle
                    : {
                        backgroundColor: "#E8F0FE",
                        //color: "white",
                      }
                }
                type="text"
                className="form-control"
                id="formGroupExampleInput3"
                onChange={(e) => setApplicantFirstName(e.target.value)}
                value={applicantFirstName}
                disabled={isDisable}
                maxLength={30}
              />
            </div>
          </div>
          <div className="row" style={{ marginBottom: "10px" }}>
            <div className="col-lg-3 my_profile_setting_input form-group">
              <label
                className="text-color"
                style={{ paddingTop: "15px", fontWeight: "" }}
              >
                Last Name <span class="req-btn">*</span>
              </label>
            </div>
            <div className="col-lg-5">
              <input
                style={
                  checkIsError("applicantLastName")
                    ? errorLabelStyle
                    : {
                        // paddingTop: "15px",
                        // paddingBottom: "15px",
                        backgroundColor: "#E8F0FE",
                        //color: "white",
                      }
                }
                type="text"
                className="form-control"
                id="formGroupExampleInput3"
                onChange={(e) => setApplicantLastName(e.target.value)}
                value={applicantLatsName}
                disabled={isDisable}
                maxLength={30}
              />
            </div>
          </div>
          <div className="row" style={{ marginBottom: "10px" }}>
            <div className="col-lg-3 my_profile_setting_input form-group">
              <label
                className="text-color"
                style={{ paddingTop: "15px", fontWeight: "" }}
              >
                Phone Number <span class="req-btn">*</span>
              </label>
              <div className="hover-text-01">
                <div
                  className="tooltip-text-01"
                  style={{
                    marginTop: "-60px",
                    marginLeft: "-100px",
                  }}
                >
                  <ul>
                    <li style={{ fontSize: "15px" }}>
                      Please enter phone number without country code.
                    </li>
                    {/* <li>
                                  Regular Request : Timeline for the appraisal
                                  report is 3 – 4 days.
                                </li> */}
                  </ul>
                </div>
                <i class="fa fa-info-circle" aria-hidden="true"></i>
              </div>
            </div>
            <div className="col-lg-5">
              <ReactInputMask
                mask="999 999-9999" // Canadian phone format
                value={applicantNumber}
                onChange={handleInputChange}
                className="form-control"
                disabled={isDisable}
                style={
                  checkIsError("applicantPhoneNumber")
                    ? errorLabelStyle
                    : {
                        backgroundColor: "#E8F0FE",
                      }
                }
              >
                {(inputProps) => (
                  <input
                    {...inputProps}
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    title="Please enter a valid phone number"
                    required
                  />
                )}
              </ReactInputMask>
            </div>
            {/* <div className="col-lg-5">
              <input
                style={
                  checkIsError("applicantPhoneNumber")
                    ? errorLabelStyle
                    : {
                        // paddingTop: "15px",
                        // paddingBottom: "15px",
                        backgroundColor: "#E8F0FE",
                        //color: "white",
                      }
                }
                type="text"
                id="phoneNumber"
                className="form-control"
                name="phoneNumber"
                value={applicantNumber}
                onChange={handleInputChange}
                pattern="[0-9]*"
                maxLength="10"
                // placeholder="Enter 10 digits"
                title="Please enter only 10 digits"
                required
                disabled={isDisable}
              />
            </div> */}
          </div>
          <div className="row" style={{ marginBottom: "10px" }}>
            <div className="col-lg-3 my_profile_setting_input form-group">
              <label
                className="text-color"
                style={{ paddingTop: "15px", fontWeight: "" }}
              >
                Email Address <span class="req-btn">*</span>
              </label>
            </div>
            <div className="col-lg-5">
              <input
                style={
                  checkIsError("applicantEmailAddress")
                    ? errorLabelStyle
                    : {
                        // paddingTop: "15px",
                        // paddingBottom: "15px",
                        backgroundColor: "#E8F0FE",
                        //color: "white",
                      }
                }
                type="text"
                className="form-control"
                id="formGroupExampleInput3"
                onChange={(e) => setApplicantEmail(e.target.value)}
                value={applicantEmail}
                disabled={isDisable}
                maxLength={100}
              />
            </div>
          </div>

          <div className="">
            <div className="row my_profile_setting_textarea">
              <div className="col-lg-3">
                <label
                  htmlFor="propertyDescription"
                  className="text-color"
                  style={{
                    paddingTop: "15px",
                    color: "#1560bd",
                    fontWeight: "",
                  }}
                >
                  Remark / Additional Information
                </label>
              </div>

              <div className="col-lg-5">
                <textarea
                  style={{
                    // paddingTop: "15px",
                    // paddingBottom: "15px",
                    backgroundColor: "#E8F0FE",
                    //color: "white",
                  }}
                  onChange={(e) => setRemark(e.target.value)}
                  value={remark}
                  className="form-control"
                  id="propertyDescription"
                  rows="4"
                  maxLength={200}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="">
            <div className="row my_profile_setting_input form-group">
              <div className="col-lg-3">
                <label
                  className="text-color"
                  htmlFor=""
                  style={{
                    paddingTop: "25px",
                    color: "#1560bd",
                    fontWeight: "",
                  }}
                >
                  Attachment
                </label>
              </div>
              <div className="col-lg-7 mb-2">
                <label className="upload">
                  <input type="file" onChange={(e) => handleUpload(e)} />
                </label>
              </div>
            </div>
          </div>
          <div className="col-xl-12">
            <div className="my_profile_setting_input overflow-hidden mt20 text-center">
              {filesUrl.length > 0
                ? filesUrl.map((url, index) => {
                    <div
                      className=""
                      style={{
                        width: "20px",
                        height: "20px",
                        cursor: "pointer",
                      }}
                    >
                      <span className="flaticon-garbage text-danger"></span>
                    </div>;
                    return (
                      <>
                        <img key={index} src={url} width={120} height={120} />
                      </>
                    );
                  })
                : attachment[0] !== ""
                ? attachment.map((url, index) => {
                    return (
                      <img key={index} src={url} width={120} height={120} />
                    );
                  })
                : ""}
            </div>
          </div>
          <div className="col-xl-12">
            <div className="my_profile_setting_input overflow-hidden mt20 text-center">
              {isDisable && (
                <button
                  disabled={disable}
                  className="btn btn5 m-1"
                  onClick={cancelHandler}
                >
                  Cancel
                </button>
              )}
              {!isDisable &&
                (propertyData ? (
                  // <button className="btn btn5" onClick={submitHandler}>
                  //   Update
                  // </button>
                  <button
                    disabled={disable}
                    className={`btn btn5 ${isButtonDisabled ? "disabled" : ""}`}
                    onClick={submitHandler}
                  >
                    Update
                  </button>
                ) : (
                  <button
                    disabled={disable}
                    className="btn btn5"
                    onClick={submitHandler}
                  >
                    Submit
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailedInfo;
