"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { encryptionData } from "../../../utils/dataEncryption";
import axios from "axios";
import { CldUploadWidget } from "next-cloudinary";
import toast from "react-hot-toast";
import { province } from "../create-listing/data";
import { designation } from "../create-listing/data";

const ProfileInfo = ({ setProfileCount, setShowCard }) => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  let userData = JSON.parse(localStorage.getItem("user")) || {};
  const router = useRouter();

  const [SelectedImage, setSelectedImage] = useState(
    userData?.brokerage_Details?.profileImage ||
      "/assets/images/home/placeholder_01.jpg"
  );

  const hiddenStyle = { backgroundColor: "#E8F0FE", display: "none" };
  const viewStyle = { backgroundColor: "#E8F0FE", display: "block" };
  const [edit, setEdit] = useState(!userData.brokerage_Details?.firstName);
  const [SMSAlert, setSMSAlert] = useState(false);

  const [firstNameRef, setFirstNameRef] = useState(
    userData?.brokerage_Details?.firstName || ""
  );
  const [middleNameRef, setMiddleNameRef] = useState(
    userData?.brokerage_Details?.middleName || ""
  );
  const [lastNameRef, setLastNameRef] = useState(
    userData?.brokerage_Details?.lastName || ""
  );
  const [brokerageNameRef, setBrokerageNameRef] = useState(
    userData?.brokerage_Details?.brokerageName || ""
  );
  const [cellNumberRef, setCellNumberRef] = useState(
    userData?.brokerage_Details?.cellNumber || ""
  );

  const [mortageBrokrageLicNoRef, setMortageBrokerageLicNoRef] = useState(
    userData?.brokerage_Details?.mortageBrokerageLicNo || ""
  );
  const [mortageBrokerLicNoRef, setMortageBrokerLicNoRef] = useState(
    userData?.brokerage_Details?.mortageBrokerLicNo || ""
  );

  const [profile, setProfile] = useState(
    userData?.brokerage_Details?.profileImage || null
  );

  const [addressLineRef, setAddressLineRef] = useState(
    userData?.brokerage_Details?.adressLine1 || ""
  );
  const [addressLineTwoRef, setAddressLineTwoRef] = useState(
    userData?.brokerage_Details?.adressLine2 || ""
  );

  const [cityRef, setCityRef] = useState(
    userData?.brokerage_Details?.city || ""
  );
  const [stateRef, setStateRef] = useState(
    userData?.brokerage_Details?.province || ""
  );
  const [zipcodeRef, setZipcodeRef] = useState(
    userData?.brokerage_Details?.postalCode || ""
  );
  const [phoneNumberRef, setPhoneNumberRef] = useState(
    userData?.brokerage_Details?.phoneNumber || ""
  );

  const [assistantFirstName, setAssistantFirstName] = useState(
    userData?.brokerage_Details?.assistantFirstName || ""
  );
  const [assistantLastName, setAssistantLastName] = useState(
    userData?.brokerage_Details?.assistantLastName || ""
  );
  const [assistantPhoneNumber, setAssistantPhoneNumber] = useState(
    userData?.brokerage_Details?.assistantPhoneNumber || ""
  );
  const [assistantEmailAddress, setAssistantEmailAddress] = useState(
    userData?.brokerage_Details?.assistantEmailAddress || ""
  );

  const [assistantTwoFirstName, setAssistantTwoFirstName] = useState(
    userData?.brokerage_Details?.assistantTwoFirstName || ""
  );
  const [assistantTwoLastName, setAssistantTwoLastName] = useState(
    userData?.brokerage_Details?.assistantTwoLastName || ""
  );

  const [assistantTwoEmailAddress, setAssistantTwoEmailAddress] = useState(
    userData?.brokerage_Details?.assistantTwoEmailAddress || ""
  );

  const [assistantTwoPhoneNumber, setAssistantTwoPhoneNumber] = useState(
    userData?.brokerage_Details?.assistantTwoPhoneNumber || ""
  );

  const [emailId, setEmailId] = useState(
    userData?.brokerage_Details?.emailId || ""
  );

  const [streetName, setStreetName] = useState(
    userData?.brokerage_Details?.streetName || ""
  );
  const [streetNumber, setStreetNumber] = useState(
    userData.brokerage_Details?.streetNumber || ""
  );
  const [unit, setUnit] = useState(
    userData?.brokerage_Details?.apartmentNo || ""
  );

  const [apartmentNo, setApartmentNo] = useState(
    userData?.brokerage_Details?.apartmentNo || ""
  );

  const uploadProfile = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const dataUrl = event.target.result;

        setProfilePhoto(dataUrl);
      };

      reader.readAsDataURL(file);
    }

    console.log(typeof profilePhoto);
  };

  const onUpdatHandler = () => {
    const firstName = firstNameRef;
    const lastName = lastNameRef;
    const adressLine1 = addressLineRef;
    const city = cityRef;
    const state = stateRef;
    const zipCode = zipcodeRef;
    const phoneNumber = phoneNumberRef;
    const cellNumber = cellNumberRef;
    const adressLine2 = addressLineTwoRef;
    const middleName = middleNameRef;
    const brokerageName = brokerageNameRef;
    const mortageBrokerLicNo =
      mortageBrokerLicNoRef !== ""
        ? mortageBrokerLicNoRef
        : userData.brokerage_Details.mortageBrokerLicNo;
    const mortageBrokrageLicNo =
      mortageBrokrageLicNoRef !== ""
        ? mortageBrokrageLicNoRef
        : userData.brokerage_Details.mortageBrokerageLicNo;
    // const assistantEmailAddress = assistantEmailAddress;
    // const assistantFirstName = assistantFirstName;
    // const assistantPhoneNumber = assistantPhoneNumber;

    const phoneNumberRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    const cellNumberRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    const nameRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for email validation

    if (
      nameRegex.test(firstName) === false ||
      (middleName !== null &&
        middleName.trim() !== "" &&
        !nameRegex.test(middleName)) ||
      nameRegex.test(lastName) === false
    ) {
      toast.error("Name should be valid ");
    } else if (
      (assistantFirstName.trim() !== "" &&
        !nameRegex.test(assistantFirstName)) ||
      (assistantLastName.trim() !== "" && !nameRegex.test(assistantLastName)) ||
      (assistantTwoFirstName.trim() !== "" &&
        !nameRegex.test(assistantTwoFirstName)) ||
      (assistantTwoLastName.trim() !== "" &&
        !nameRegex.test(assistantTwoLastName))
    ) {
      toast.error("Applicant Name should be valid ");
    } else if (phoneNumberRegex.test(phoneNumber) === false || !phoneNumber) {
      toast.error("Enter a Valid Phone Number Please");
    } else if (
      cellNumberRegex.test(cellNumber) === false &&
      cellNumber.trim() !== ""
    ) {
      toast.error("Enter a Valid Cell Number Please");
    } else if (
      cellNumberRegex.test(assistantPhoneNumber) === false &&
      assistantPhoneNumber.trim() !== ""
    ) {
      toast.error("Enter a Valid Assistant Phone Number Please");
    } else if (
      cellNumberRegex.test(assistantTwoPhoneNumber) === false &&
      assistantTwoPhoneNumber.trim() !== ""
    ) {
      toast.error("Enter a Valid Assistant Phone Number Please");
    } else if (emailRegex.test(emailId) === false) {
      toast.error("Enter a Valid Email Address Please");
    } else if (
      emailRegex.test(assistantEmailAddress) === false &&
      assistantEmailAddress.trim() !== ""
    ) {
      toast.error("Enter a Valid Assistant Email Address Please");
    } else if (
      emailRegex.test(assistantTwoEmailAddress) === false &&
      assistantTwoEmailAddress.trim() !== ""
    ) {
      toast.error("Enter a Valid Assistant Email Address Please");
    } else if (
      (!firstName ||
        !lastName ||
        !streetName ||
        !streetNumber ||
        !city ||
        !state ||
        !zipCode ||
        !phoneNumber ||
        !cellNumber) &&
      !userData
    ) {
      toast.error("All marked fields arent filled !!");
    } else {
      let count = 9;
      if (adressLine2) {
        count++;
      }
      if (middleName) {
        count++;
      }
      if (brokerageName) {
        count++;
      }
      if (profilePhoto) {
        count++;
      }
      if (adressLine2 === "") {
        count--;
      }
      if (middleName === "") {
        count--;
      }
      if (brokerageName === "") {
        count--;
      }
      if (profilePhoto) {
        count--;
      }

      // const percentage = Math.floor(count / 13) * 100;
      // setProfileCount(percentage);

      const payload = {
        id: userData.userId,
        token: userData.token,
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        brokerageName: brokerageName,
        // mortageBrokerLicNo:
        //   mortageBrokerLicNoRef !== ""
        //     ? mortageBrokerLicNoRef
        //     : userData.brokerage_Details.mortageBrokerLicNo,
        // mortageBrokerageLicNo:
        //   mortageBrokrageLicNoRef !== ""
        //     ? mortageBrokrageLicNoRef
        //     : userData.brokerage_Details.mortageBrokerageLicNo,
        streetNumber: streetNumber,
        apartmentNo: apartmentNo,
        streetName: streetName,
        city: city,
        province: state,
        postalCode: zipCode,
        area: "",
        phoneNumber: phoneNumber,
        cellNumber: cellNumber,
        profileImage: SelectedImage,
        assistantEmailAddress: assistantEmailAddress,
        assistantFirstName: assistantFirstName,
        assistantLastName: assistantLastName,
        assistantPhoneNumber: assistantPhoneNumber,
        assistantTwoFirstName: assistantTwoFirstName,
        assistantTwoLastName: assistantTwoLastName,
        assistantTwoEmailAddress: assistantTwoEmailAddress,
        assistantTwoPhoneNumber: assistantTwoPhoneNumber,
        mortageBrokerLicNo: mortageBrokerLicNoRef,
        mortageBrokerageLicNo: mortageBrokrageLicNoRef,
        emailId: emailId,
      };
      if (
        !payload.lastName ||
        !payload.firstName ||
        !payload.brokerageName ||
        !payload.phoneNumber ||
        !payload.emailId ||
        !payload.mortageBrokerLicNo ||
        !payload.mortageBrokerageLicNo ||
        !payload.streetName ||
        !payload.streetNumber ||
        !payload.city ||
        !payload.province ||
        !payload.postalCode
      ) {
        toast.error("Please fill all the mandatory fields!");
      } else if (SMSAlert && !phoneNumber) {
        toast.error(
          "As SMS Alert is selected but phone number is not provided so SMS Alert will not work properly!"
        );
      } else {
        toast.loading("Updating ...");
        const encryptedData = encryptionData(payload);
        axios
          .put("/api/UpdateBrokerageCompanyProfile", encryptedData)
          .then((res) => {
            toast.success("Successfully Updated Profile!");

            let data = userData;
            data.brokerage_Details = res.data.userData.broker;
            localStorage.removeItem("user");
            localStorage.setItem("user", JSON.stringify(data));
            setShowCard(true);
            router.push("/brokerage-dashboard");
          })
          .catch((err) => {
            toast.error(err.message);
          })
          .finally(() => {});
        toast.dismiss();
      }
    }
  };

  const changeEditHandler = () => {
    setEdit(true);
  };
  const uploadInputRef = useRef(null);

  const openWidget = () => {
    if (uploadInputRef.current) {
      uploadInputRef.current.click(); // Trigger the hidden file input
    }
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    const userData = JSON.parse(localStorage.getItem("user"));

    const BACKEND_DOMAIN = process.env.BACKEND_DOMAIN;
    const formdata = {
      file: file,
    };

    toast.dismiss("Uploading !!!");
    axios
      .post(`${BACKEND_DOMAIN}/FileUpload/fileupload`, formdata, {
        headers: {
          Authorization: `Bearer ${userData?.token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        toast.dismiss();
        toast.success("Uploaded Successfully !");
        const image = res.data;

        const imageUrl = image.split("! Access it at: ")[1];
        if (String(type) === "1") {
          setSelectedImage(imageUrl);
        } else {
          setSelectedImage2({
            name: file.name,
            url: imageUrl,
          });
        }
      })
      .catch((err) => {
        toast.dismiss();
        console.log(err);
        toast.error("Try Again !!");
      });
  };

  const handleUpload = (result) => {
    // Handle the image upload result here
    console.log("handleUpload called");
    if (result.info.secure_url) {
      setSelectedImage(result.info.secure_url);
      setProfilePhoto(result.info.secure_url);
      // You can also save the URL to your state or do other operations here
    } else {
      // Handle the case when the upload failed
      console.error("Image upload failed");
    }
  };

  const handleZipCodeChange = async (val) => {
    setZipcodeRef(val);

    try {
      const response = await axios.get(
        `https://api.zippopotam.us/us/${zipcodeRef}`
      );
      const data = response.data;

      console.log(response);

      setStateRef(data.places[0]["state"]);
      setCityRef(data.places[0]["place name"]);
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    const url = uploadImage(file);
    console.log(url);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    // Allow only numeric input
    const numericValue = inputValue.replace(/\D/g, "");

    // Restrict to 10 digits
    const truncatedValue = numericValue.slice(0, 10);
    if (truncatedValue.length === 10) {
      setPhoneNumberRef(truncatedValue);
    }
    setPhoneNumberRef(truncatedValue);
  };

  const handleInputChange_01 = (e) => {
    const inputValue = e.target.value;

    // Allow only numeric input
    const numericValue = inputValue.replace(/\D/g, "");

    // Restrict to 10 digits
    const truncatedValue = numericValue.slice(0, 10);
    if (truncatedValue.length === 10) {
      setCellNumberRef(truncatedValue);
    }
    setCellNumberRef(truncatedValue);
  };

  const handleInputChange_02 = (e) => {
    const inputValue = e.target.value;

    // Allow only numeric input
    const numericValue = inputValue.replace(/\D/g, "");

    // Restrict to 10 digits
    const truncatedValue = numericValue.slice(0, 10);
    if (truncatedValue.length === 10) {
      setAssistantPhoneNumber(truncatedValue);
    }
    setAssistantPhoneNumber(truncatedValue);
  };

  const handleInputChange_03 = (e) => {
    const inputValue = e.target.value;

    // Allow only numeric input
    const numericValue = inputValue.replace(/\D/g, "");

    // Restrict to 10 digits
    const truncatedValue = numericValue.slice(0, 10);
    if (truncatedValue.length === 10) {
      setAssistantTwoPhoneNumber(truncatedValue);
    }
    setAssistantTwoPhoneNumber(truncatedValue);
  };

  return (
    <>
      <div className="row">
        {/* <h4 className="mb-3">Personal Information</h4> */}
        <div className="col-lg-12"></div>
        {/* {!edit && (
          <div>
            <button
              className="btn btn2 btn-color profile_edit_button"
              onClick={changeEditHandler}
            >
              <span
                className="flaticon-edit"
                data-toggle="tooltip"
                data-placement="top"
                title="Edit Profile"
              ></span>
            </button>
          </div>
        )} */}
        <div className="col-lg-12 col-xl-12 mt-2">
          <div className="my_profile_setting_input form-group">
            <div className="row">
              <div className="col-lg-3 mb-5 text-center">
                <div className="wrap-custom-file">
                  <img
                    style={{ borderRadius: "50%" }}
                    src={SelectedImage}
                    alt="Uploaded Image"
                  />
                  {!edit && (
                    <div className="">
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, 1)}
                      />
                    </div>
                  )}
                  {/* {!edit && (
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
                            Upload Photo
                          </button>
                        </div>
                      )}
                    </CldUploadWidget>
                  )} */}
                </div>
              </div>
              <div className="col-lg-9">
                <div className="row mb-2">
                  <h3 className="heading-forms">
                    Mortgage Brokerage Information
                  </h3>
                  <hr />
                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-5">
                        <label
                          className="text-color"
                          htmlFor=""
                          style={{ paddingTop: "10px" }}
                        >
                          Brokerage Name <span class="req-btn">*</span>
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          type="text"
                          className="form-control"
                          style={{ backgroundColor: "#E8F0FE" }}
                          id="formGroupExampleInput3"
                          value={brokerageNameRef}
                          onChange={(e) => setBrokerageNameRef(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-5">
                        <label
                          className="text-color"
                          htmlFor=""
                          style={{ paddingTop: "10px" }}
                        >
                          Principal Broker / Owner - First Name{" "}
                          <span class="req-btn">*</span>
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          type="text"
                          className="form-control"
                          id="formGroupExampleInput3"
                          required
                          style={{ backgroundColor: "#E8F0FE" }}
                          value={firstNameRef}
                          onChange={(e) => setFirstNameRef(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-4">
                        <label htmlFor="" style={{ paddingTop: "10px" }}>
                          Middle Name
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          type="text"
                          required
                          className="form-control"
                          id="formGroupExampleInput3"
                          style={{ backgroundColor: "#E8F0FE" }}
                          
                          value={middleNameRef}
                          onChange={(e) => setMiddleNameRef(e.target.value)}
                        />
                      </div>
                    </div>
                  </div> */}
                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-5">
                        <label
                          className="text-color"
                          htmlFor=""
                          style={{ paddingTop: "10px" }}
                        >
                          Principal Broker / Owner - Last Name{" "}
                          <span class="req-btn">*</span>
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          type="text"
                          required
                          className="form-control"
                          id="formGroupExampleInput3"
                          style={{ backgroundColor: "#E8F0FE" }}
                          value={lastNameRef}
                          onChange={(e) => setLastNameRef(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-5">
                        <label
                          className="text-color"
                          htmlFor=""
                          style={{ paddingTop: "5px" }}
                        >
                          Mortgage Brokerage Licence No.{" "}
                          <span class="req-btn">*</span>{" "}
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          type="text"
                          required
                          className="form-control"
                          style={{ backgroundColor: "#E8F0FE" }}
                          id="formGroupExampleInput3"
                          value={mortageBrokrageLicNoRef}
                          onChange={(e) =>
                            setMortageBrokerageLicNoRef(e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-5">
                        <label
                          className="text-color"
                          htmlFor=""
                          style={{ paddingTop: "5px" }}
                        >
                          Mortgage Broker Licence No.
                          <span class="req-btn">*</span>{" "}
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          type="text"
                          required
                          className="form-control"
                          style={{ backgroundColor: "#E8F0FE" }}
                          id="formGroupExampleInput3"
                          value={mortageBrokerLicNoRef}
                          onChange={(e) =>
                            setMortageBrokerLicNoRef(e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-5">
                        <label
                          className="text-color"
                          htmlFor=""
                          style={{ paddingTop: "10px" }}
                        >
                          Phone Number (Primary) <span class="req-btn">*</span>
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          type="text"
                          required
                          className="form-control"
                          id="formGroupExampleInput3"
                          style={{ backgroundColor: "#E8F0FE" }}
                          value={phoneNumberRef}
                          // onChange={(e) => setPhoneNumberRef(e.target.value)}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-5">
                        <label
                          className="text-color"
                          htmlFor=""
                          style={{ paddingTop: "10px" }}
                        >
                          Cell Number
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          type="text"
                          required
                          className="form-control"
                          id="formGroupExampleInput3"
                          style={{ backgroundColor: "#E8F0FE" }}
                          value={cellNumberRef}
                          // onChange={(e) => setCellNumberRef(e.target.value)}
                          onChange={handleInputChange_01}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-5">
                        <label
                          className="text-color"
                          htmlFor=""
                          style={{ paddingTop: "10px" }}
                        >
                          Email Address <span class="req-btn">*</span>
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          type="email"
                          className="form-control"
                          required
                          id="formGroupExampleInput3"
                          style={{ backgroundColor: "#E8F0FE" }}
                          value={emailId}
                          onChange={(e) => setEmailId(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="form-group form-check custom-checkbox">
                          <input
                            className="form-check-input mt-3"
                            type="checkbox"
                            value=""
                            required
                            id="terms"
                            checked
                            style={{ border: "1px solid black" }}
                          />
                          <label
                            className="form-check-label form-check-label"
                            htmlFor="terms"
                            style={{
                              color: "#2e008b",
                              fontWeight: "bold",
                              fontSize: "",
                            }}
                          >
                            Email Alerts
                          </label>
                          <div className="hover-text">
                            <div
                              className="tooltip-text"
                              style={{
                                marginTop: "-60px",
                                marginLeft: "-100px",
                              }}
                            >
                              <ul>
                                <li style={{ fontSize: "15px" }}>
                                  Updates sent to your profile email address.
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
                      </div>
                      <div className="col-lg-4">
                        <div className="form-group form-check custom-checkbox">
                          <input
                            className="form-check-input mt-3"
                            type="checkbox"
                            value=""
                            required
                            id="terms"
                            checked
                            style={{ border: "1px solid black" }}
                          />
                          <label
                            className="form-check-label form-check-label"
                            htmlFor="terms"
                            style={{
                              color: "#2e008b",
                              fontWeight: "bold",
                            }}
                          >
                            SMS Alerts
                          </label>
                          <div className="hover-text">
                            <div
                              className="tooltip-text"
                              style={{
                                marginTop: "-60px",
                                marginLeft: "-100px",
                              }}
                            >
                              <ul>
                                <li style={{ fontSize: "15px" }}>
                                  Updates sent to your registered cell number.
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
                      </div>
                    </div>
                  </div>

                  <h3 className="heading-forms mt-4">Address</h3>
                  <hr />
                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-5">
                        <label
                          className="text-color"
                          htmlFor=""
                          style={{ paddingTop: "10px" }}
                        >
                          Street Number <span class="req-btn">*</span>
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          type="text"
                          className="form-control"
                          id="formGroupExampleInput3"
                          style={{ backgroundColor: "#E8F0FE" }}
                          required
                          value={streetNumber}
                          onChange={(e) => setStreetNumber(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-5">
                        <label
                          className="text-color"
                          htmlFor=""
                          style={{ paddingTop: "10px" }}
                        >
                          Street Name <span class="req-btn">*</span>
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          type="text"
                          className="form-control"
                          id="formGroupExampleInput3"
                          style={{ backgroundColor: "#E8F0FE" }}
                          value={streetName}
                          onChange={(e) => setStreetName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-5">
                        <label
                          className="text-color"
                          htmlFor=""
                          style={{ paddingTop: "5px" }}
                        >
                          Unit / Apt. No.
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          type="text"
                          value={apartmentNo}
                          onChange={(e) => setApartmentNo(e.target.value)}
                          className="form-control"
                          style={{ backgroundColor: "#E8F0FE" }}
                          id="formGroupExampleInput3"
                          required
                          // value={cityRef}
                          // onChange={(e) => setCityRef(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-5">
                        <label
                          className="text-color"
                          htmlFor=""
                          style={{ paddingTop: "10px" }}
                        >
                          City <span class="req-btn">*</span>
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          type="text"
                          className="form-control"
                          id="formGroupExampleInput3"
                          style={{ backgroundColor: "#E8F0FE" }}
                          required
                          value={cityRef}
                          onChange={(e) => setCityRef(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-5">
                        <label
                          className="text-color"
                          htmlFor=""
                          style={{ paddingTop: "10px" }}
                        >
                          Province <span class="req-btn">*</span>
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <select
                          required
                          className="form-select"
                          data-live-search="true"
                          data-width="100%"
                          value={stateRef}
                          onChange={(e) => setStateRef(e.target.value)}
                          style={{
                            backgroundColor: "#E8F0FE",
                            // color:"white"
                          }}
                        >
                          {province.map((item, index) => {
                            return (
                              <option key={item.id} value={item.value}>
                                {item.type}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-5">
                        <label
                          className="text-color"
                          htmlFor=""
                          style={{ paddingTop: "10px" }}
                        >
                          Postal-Code <span class="req-btn">*</span>
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          type="text"
                          className="form-control"
                          required
                          id="formGroupExampleInput3"
                          style={{ backgroundColor: "#E8F0FE" }}
                          onChange={(e) => handleZipCodeChange(e.target.value)}
                          value={zipcodeRef}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-5">
                    {/* <p>
                      If you have an Administrative Assistant, fill in the
                      following:
                    </p> */}
                    <h3 className="heading-forms">Assistant#1 Information</h3>
                    <hr />
                  </div>
                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-5">
                        <label
                          className="text-color"
                          htmlFor=""
                          style={{ paddingTop: "5px" }}
                        >
                          Assistant First Name{" "}
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          type="text"
                          className="form-control"
                          style={{ backgroundColor: "#E8F0FE" }}
                          id="formGroupExampleInput3"
                          value={assistantFirstName}
                          onChange={(e) =>
                            setAssistantFirstName(e.target.value)
                          }
                          //
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-5 ">
                        <label
                          className="text-color"
                          htmlFor=""
                          style={{ paddingTop: "5px" }}
                        >
                          Assistant Last Name{" "}
                        </label>
                      </div>
                      <div className="col-lg-7 ">
                        <input
                          type="text"
                          className="form-control"
                          style={{ backgroundColor: "#E8F0FE" }}
                          id="formGroupExampleInput3"
                          value={assistantLastName}
                          onChange={(e) => setAssistantLastName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-5">
                        <label
                          className="text-color"
                          htmlFor=""
                          style={{ paddingTop: "5px" }}
                        >
                          Assistant Phone Number
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          type="text"
                          required
                          className="form-control"
                          style={{ backgroundColor: "#E8F0FE" }}
                          id="formGroupExampleInput3"
                          value={assistantPhoneNumber}
                          onChange={handleInputChange_02}
                          // onChange={(e) =>
                          //   setAssistantPhoneNumber(e.target.value)
                          // }
                          // disabled={!edit}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-lg-5">
                        <label
                          className="text-color"
                          htmlFor=""
                          style={{ paddingTop: "5px" }}
                        >
                          Assistant Email Address
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          type="email"
                          className="form-control"
                          style={{ backgroundColor: "#E8F0FE" }}
                          required
                          id="formGroupExampleInput3"
                          value={assistantEmailAddress}
                          onChange={(e) =>
                            setAssistantEmailAddress(e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-5">
                    {/* <p>
                      If you have an Administrative Assistant, fill in the
                      following:
                    </p> */}
                    <h3 className="heading-forms">Assistant#2 Information</h3>
                    <hr />
                  </div>
                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-5">
                        <label
                          className="text-color"
                          htmlFor=""
                          style={{ paddingTop: "5px" }}
                        >
                          Assistant First Name{" "}
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          type="text"
                          className="form-control"
                          style={{ backgroundColor: "#E8F0FE" }}
                          id="formGroupExampleInput3"
                          value={assistantTwoFirstName}
                          onChange={(e) =>
                            setAssistantTwoFirstName(e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-5 ">
                        <label
                          className="text-color"
                          htmlFor=""
                          style={{ paddingTop: "5px" }}
                        >
                          Assistant Last Name{" "}
                        </label>
                      </div>
                      <div className="col-lg-7 ">
                        <input
                          type="text"
                          className="form-control"
                          style={{ backgroundColor: "#E8F0FE" }}
                          id="formGroupExampleInput3"
                          value={assistantTwoLastName}
                          onChange={(e) =>
                            setAssistantTwoLastName(e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-5">
                        <label
                          className="text-color"
                          htmlFor=""
                          style={{ paddingTop: "5px" }}
                        >
                          Assistant Phone Number
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          type="text"
                          required
                          className="form-control"
                          style={{ backgroundColor: "#E8F0FE" }}
                          id="formGroupExampleInput3"
                          value={assistantTwoPhoneNumber}
                          onChange={handleInputChange_03}
                          // onChange={(e) =>
                          //   setAssistantTwoPhoneNumber(e.target.value)
                          // }
                          // disabled={!edit}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-lg-5">
                        <label
                          className="text-color"
                          htmlFor=""
                          style={{ paddingTop: "5px" }}
                        >
                          Assistant Email Address
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          type="email"
                          className="form-control"
                          style={{ backgroundColor: "#E8F0FE" }}
                          required
                          id="formGroupExampleInput3"
                          value={assistantTwoEmailAddress}
                          onChange={(e) =>
                            setAssistantTwoEmailAddress(e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row mt-4">
                    <div className="col-xl-12">
                      <div
                        className="my_profile_setting_input"
                        style={{ textAlign: "end" }}
                      >
                        <button
                          className="btn btn5 m-1"
                          onClick={() => setShowCard(true)}
                        >
                          Cancel
                        </button>
                        <button
                          className="btn btn2 btn-dark"
                          onClick={onUpdatHandler}
                        >
                          {userData?.brokerage_Details
                            ? "Update Profile"
                            : "Create Profile"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
