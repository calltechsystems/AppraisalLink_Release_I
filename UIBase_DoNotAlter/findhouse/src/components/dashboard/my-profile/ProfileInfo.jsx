"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { encryptionData } from "../../../utils/dataEncryption";
import axios from "axios";
import { CldUploadWidget } from "next-cloudinary";
import toast from "react-hot-toast";
import { province } from "../create-listing/data";

const ProfileInfo = ({ setProfileCount, setShowCard }) => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  let userData = JSON.parse(localStorage.getItem("user")) || {};
  const router = useRouter();
  const cancelHandler = () => {
    router.push("/my-dashboard");
  };

  const [SelectedImage, setSelectedImage] = useState(
    userData?.broker_Details?.profileImage ||
      "/assets/images/home/placeholder_01.jpg"
  );

  const [edit, setEdit] = useState(true);

  const [firstNameRef, setFirstNameRef] = useState(
    userData?.broker_Details?.firstName || ""
  );
  const [middleNameRef, setMiddleNameRef] = useState(
    userData?.broker_Details?.middleName || ""
  );
  const [lastNameRef, setLastNameRef] = useState(
    userData?.broker_Details?.lastName || ""
  );
  const [companyNameRef, setCompanyNameRef] = useState(
    userData?.broker_Details?.companyName || ""
  );

  const [profile, setProfile] = useState(
    userData?.broker_Details?.profileImage || null
  );

  const [addressLineRef, setAddressLineRef] = useState(
    userData?.broker_Details?.adressLine1 || ""
  );
  const [addressLineTwoRef, setAddressLineTwoRef] = useState(
    userData?.broker_Details?.adressLine2 || ""
  );

  const [cityRef, setCityRef] = useState(userData?.broker_Details?.city || "");
  const [stateRef, setStateRef] = useState(
    userData?.broker_Details?.province || ""
  );
  const [zipcodeRef, setZipcodeRef] = useState(
    userData?.broker_Details?.postalCode || ""
  );
  const [phoneNumberRef, setPhoneNumberRef] = useState(
    userData?.broker_Details?.phoneNumber || ""
  );

  const [mortgageBrokrageLicNoRef, setMortgageLicNoRef] = useState(
    userData?.broker_Details?.mortageBrokerageLicNo || ""
  );
  const [mortgageBrokerLicNoRef, setMortgageBrokerLicNoRef] = useState(
    userData?.broker_Details?.mortageBrokerLicNo || ""
  );

  const [streetNumber, setStreetNumber] = useState(
    userData?.broker_Details?.streetNumber || ""
  );
  const [cellNumberRef, setCellNumberRef] = useState(
    userData?.broker_Details?.cellNumber || " "
  );

  const [streetName, setStreetName] = useState(
    userData?.broker_Details?.streetName || ""
  );
  const [unit, setUnit] = useState(userData?.broker_Details?.apartmentNo || "");
  const [apartmentNo, setApartmentNo] = useState(
    userData?.broker_Details?.apartmentNo || ""
  );
  const [assistantFirstName, setAssistantFirstName] = useState(
    userData?.broker_Details?.assistantFirstName || ""
  );
  const [assistantLastName, setAssistantLastName] = useState(
    userData?.broker_Details?.assistantFirstName || ""
  );
  const [assistantPhoneNumber, setAssistantPhoneNumber] = useState(
    userData?.broker_Details?.assistantPhoneNumber || ""
  );
  const [assistantEmailAddress, setAssistantEmailAddress] = useState(
    userData?.broker_Details?.assistantEmailAddress || ""
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
    const firstName =
      firstNameRef !== "" ? firstNameRef : userData.broker_Details.firstName;
    const lastName =
      lastNameRef !== "" ? lastNameRef : userData.broker_Details.lastName;
    const adressLine1 =
      addressLineRef !== ""
        ? addressLineRef
        : userData.broker_Details.adressLine1;
    const city = cityRef !== "" ? cityRef : userData.broker_Details.city;
    const state = stateRef !== "" ? stateRef : userData.broker_Details.province;
    const zipCode =
      zipcodeRef !== "" ? zipcodeRef : userData.broker_Details.zipCode;
    const phoneNumber =
      phoneNumberRef !== ""
        ? phoneNumberRef
        : userData.broker_Details.phoneNumber;
    const cellNumber =
      cellNumberRef !== "" ? cellNumberRef : userData.broker_Details.cellNumber;
    const mortageBrokerLicNo =
      mortgageBrokerLicNoRef !== ""
        ? mortgageBrokerLicNoRef
        : userData.broker_Details.mortageBrokerLicNo;
    const mortageBrokerageLicNo =
      mortgageBrokrageLicNoRef !== ""
        ? mortgageBrokrageLicNoRef
        : userData.broker_Details.mortageBrokerageLicNo;

    const adressLine2 =
      addressLineTwoRef !== ""
        ? addressLineTwoRef
        : userData.broker_Details.adressLine2;
    const middleName =
      middleNameRef !== ""
        ? middleNameRef
        : userData?.broker_Details?.middleName;
    const companyName =
      companyNameRef !== ""
        ? companyNameRef
        : userData.broker_Details.companyName;

    const phoneNumberRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    const nameRegex = /^[A-Za-z]+$/;

    if (
      nameRegex.test(firstName) === false ||
      nameRegex.test(lastName) === false
    ) {
      toast.error("Name should be valid ");
    } else if (phoneNumberRegex.test(phoneNumber) === false || !phoneNumber) {
      toast.error("enter a valid phone number please");
    } else if (
      (!firstName ||
        !lastName ||
        !streetNumber ||
        !streetName ||
        !city ||
        !state ||
        !zipCode ||
        !phoneNumber ||
        !cellNumber ||
        !mortageBrokerLicNo ||
        !mortageBrokerageLicNo) &&
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
      if (companyName) {
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
      if (companyName === "") {
        count--;
      }
      if (profilePhoto) {
        count--;
      }

      const percentage = Math.floor(count / 13) * 100;
      setProfileCount(percentage);

      const payload = {
        id: userData.userId,
        token: userData.token,
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        apartmentNo: unit,
        companyName: companyName,
        streetName: streetName,
        streetNumber: streetNumber,
        assistantEmailAddress: assistantEmailAddress,
        assistantFirstName: assistantFirstName,
        assistantPhoneNumber: assistantPhoneNumber,
        city: city,
        state: state,
        postalCode: zipCode,
        phoneNumber: phoneNumber,
        cellNumber: cellNumber,
        mortageBrokerLicNo: mortageBrokerLicNo,
        mortgageBrokerageLicNo: mortgageBrokrageLicNoRef,
        profileImage: SelectedImage,
      };

      toast.loading("Updating ...");
      const encryptedData = encryptionData(payload);
      axios
        .put("/api/updateBrokerProfile", encryptedData)
        .then((res) => {
          toast.success("Successfully Updated Profile!");
          let data = userData;
          data.broker_Details = res.data.userData.brokerage;
          localStorage.removeItem("user");
          localStorage.setItem("user", JSON.stringify(data));
          router.push("/my-dashboard");
          setShowCard(true);
        })
        .catch((err) => {
          toast.error(err.message);
        })
        .finally(() => {});
      toast.dismiss();
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

  const [phoneNumber_01, setPhoneNumber_01] = useState("");

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

  return (
    <>
      <div className="row">
        {/* <h4 className="mb-3">Personal Information</h4> */}
        <div className="col-lg-12"></div>

        <div className="col-lg-12 col-xl-12 mt-2">
          <div className="my_profile_setting_input form-group">
            <div className="row">
              <div className="col-lg-3 text-center">
                <div className="wrap-custom-file">
                  <img
                    style={{ borderRadius: "50%" }}
                    src={SelectedImage}
                    alt="Uploaded Image"
                  />
                  {edit && (
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
                            style={{}}
                            onClick={open} // This will open the upload widget
                          >
                            Upload Photo
                          </button>
                        </div>
                      )}
                    </CldUploadWidget>
                  )}
                </div>
              </div>
              <div className="col-lg-9">
                <div className="row mb-2">
                  <h3 className="heading-forms">Personal Information</h3>
                  <hr />
                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-4">
                        <label
                          className="text-color"
                          htmlFor=""
                          style={{ paddingTop: "5px" }}
                        >
                          First Name <span class="req-btn">*</span>
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          type="text"
                          className="form-control"
                          id="formGroupExampleInput3"
                          style={{ backgroundColor: "#E8F0FE" }}
                          required
                          value={firstNameRef}
                          onChange={(e) => setFirstNameRef(e.target.value)}
                          disabled={!edit}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-4">
                        <label
                          className="text-color"
                          htmlFor=""
                          style={{ paddingTop: "5px" }}
                        >
                          Middle Name
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          type="text"
                          required
                          className="form-control"
                          style={{ backgroundColor: "#E8F0FE" }}
                          id="formGroupExampleInput3"
                          disabled={!edit}
                          value={middleNameRef}
                          onChange={(e) => setMiddleNameRef(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-4">
                        <label
                          className="text-color"
                          htmlFor=""
                          style={{ paddingTop: "5px" }}
                        >
                          Last Name <span class="req-btn">*</span>
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          type="text"
                          required
                          className="form-control"
                          style={{ backgroundColor: "#E8F0FE" }}
                          id="formGroupExampleInput3"
                          value={lastNameRef}
                          onChange={(e) => setLastNameRef(e.target.value)}
                          disabled={!edit}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-4">
                        <label
                          className="text-color"
                          htmlFor=""
                          style={{ paddingTop: "5px" }}
                        >
                          Company Name <span class="req-btn">*</span>
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          type="text"
                          required
                          className="form-control"
                          style={{ backgroundColor: "#E8F0FE" }}
                          id="formGroupExampleInput3"
                          value={companyNameRef}
                          onChange={(e) => setCompanyNameRef(e.target.value)}
                          disabled={!edit}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-4">
                        <label
                          className="text-color"
                          htmlFor=""
                          style={{ paddingTop: "5px" }}
                        >
                          Phone Number(Primary) <span class="req-btn">*</span>
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          type="text"
                          required
                          className="form-control"
                          style={{ backgroundColor: "#E8F0FE" }}
                          id="formGroupExampleInput3"
                          value={phoneNumberRef}
                          // onChange={(e) => setPhoneNumberRef(e.target.value)}
                          onChange={handleInputChange}
                          disabled={!edit}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-4">
                        <label
                          className="text-color"
                          htmlFor=""
                          style={{ paddingTop: "5px" }}
                        >
                          Cell Number
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          type="text"
                          className="form-control"
                          style={{ backgroundColor: "#E8F0FE" }}
                          id="formGroupExampleInput3"
                          value={cellNumberRef}
                          onChange={(e) => setCellNumberRef(e.target.value)}
                          disabled={!edit}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-4">
                        <label
                          className="text-color"
                          htmlFor=""
                          style={{ paddingTop: "5px" }}
                        >
                          Email Address <span class="req-btn">*</span>
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          type="email"
                          className="form-control"
                          style={{ backgroundColor: "#E8F0FE" }}
                          required
                          id="formGroupExampleInput3"
                          value={userData?.userEmail ? userData.userEmail : ""}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-4">
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
                          value={mortgageBrokrageLicNoRef}
                          onChange={(e) => setMortgageLicNoRef(e.target.value)}
                          disabled={!edit}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-4">
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
                          value={mortgageBrokerLicNoRef}
                          onChange={(e) =>
                            setMortgageBrokerLicNoRef(e.target.value)
                          }
                          disabled={!edit}
                        />
                      </div>
                    </div>
                  </div>

                  {/* <h3 className="mt-4 heading-forms">Alerts</h3>
                  <hr /> */}
                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="form-group form-check custom-checkbox">
                          <input
                            className="form-check-input mt-3"
                            type="checkbox"
                            value=""
                            id="terms"
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
                                  Updates Sends on Your Registered Email Address
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
                            id="terms"
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
                                  Updates Sends on Your Registered Phone Number
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

                  <h3 className="mt-4 heading-forms">Address</h3>
                  <hr />
                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-4">
                        <label
                          className="text-color"
                          htmlFor=""
                          style={{ paddingTop: "5px" }}
                        >
                          Street Number <span class="req-btn">*</span>
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          type="text"
                          className="form-control"
                          style={{ backgroundColor: "#E8F0FE" }}
                          id="formGroupExampleInput3"
                          required
                          value={streetNumber}
                          onChange={(e) => setStreetNumber(e.target.value)}
                          disabled={!edit}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-4">
                        <label
                          className="text-color"
                          htmlFor=""
                          style={{ paddingTop: "5px" }}
                        >
                          Street Name <span class="req-btn">*</span>
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          type="text"
                          className="form-control"
                          style={{ backgroundColor: "#E8F0FE" }}
                          id="formGroupExampleInput3"
                          value={streetName}
                          onChange={(e) => setStreetName(e.target.value)}
                          disabled={!edit}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-4">
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
                          value={unit}
                          onChange={(e) => setUnit(e.target.value)}
                          className="form-control"
                          style={{ backgroundColor: "#E8F0FE" }}
                          id="formGroupExampleInput3"
                          required
                          // value={cityRef}
                          // onChange={(e) => setCityRef(e.target.value)}
                          disabled={!edit}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-4">
                        <label
                          className="text-color"
                          htmlFor=""
                          style={{ paddingTop: "5px" }}
                        >
                          City <span class="req-btn">*</span>
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          type="text"
                          className="form-control"
                          style={{ backgroundColor: "#E8F0FE" }}
                          id="formGroupExampleInput3"
                          required
                          value={cityRef}
                          onChange={(e) => setCityRef(e.target.value)}
                          disabled={!edit}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-4">
                        <label
                          className="text-color"
                          htmlFor=""
                          style={{ paddingTop: "5px" }}
                        >
                          Province <span class="req-btn">*</span>
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <div className="form-group input-group ui_kit_select_search">
                          <select
                            required
                            className="form-select"
                            data-live-search="true"
                            data-width="100%"
                            value={
                              stateRef
                                ? stateRef
                                : userData?.broker_Details?.province
                            }
                            onChange={(e) => setStateRef(e.target.value)}
                            disabled={!edit}
                            style={{
                              paddingTop: "15px",
                              paddingBottom: "15px",
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
                  </div>
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-lg-4">
                        <label
                          className="text-color"
                          htmlFor=""
                          style={{ paddingTop: "5px" }}
                        >
                          Postal-Code <span class="req-btn">*</span>
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          type="text"
                          className="form-control"
                          style={{ backgroundColor: "#E8F0FE" }}
                          required
                          id="formGroupExampleInput3"
                          onChange={(e) => handleZipCodeChange(e.target.value)}
                          value={zipcodeRef}
                          disabled={!edit}
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
                      <div className="col-lg-4">
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
                          disabled={!edit}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-4 ">
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
                          disabled={!edit}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-4">
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
                          onChange={(e) =>
                            setAssistantPhoneNumber(e.target.value)
                          }
                          disabled={!edit}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-lg-4">
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
                          disabled={!edit}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="heading-forms">Assistant#2 Information</h3>
                    <hr />
                  </div>
                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-4">
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
                          disabled={!edit}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-4 ">
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
                          disabled={!edit}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-4">
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
                          onChange={(e) =>
                            setAssistantPhoneNumber(e.target.value)
                          }
                          disabled={!edit}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-lg-4">
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
                          // value={assistantEmailAddress}
                          // onChange={(e) => setAssistantEmailAddress(e.target.value)}
                          // disabled={!edit}
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-lg-5">
                  <label
                    htmlFor=""
                    style={{ paddingTop: "15px" }}
                  >
                    First Name <span class="req-btn">*</span> :
                  </label>
                </div>
                <div className="col-lg-7">
                  <input
                    type="text"
                    required
                    className="form-control"
                    id="formGroupExampleInput3"
                    onChange={
                     (e)=>setFirstNameRef(e.target.value)
                    } 
                    value={firstNameRef}
                    disabled={!edit}
                  />
                </div> */}
                </div>
                {/* <div className="row mb-2">
                <div className="col-lg-5">
                  <label
                    htmlFor=""
                    style={{ paddingTop: "15px" }}
                  >
                    Middle Name :
                  </label>
                </div>
                <div className="col-lg-7">
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput3"
                    onChange={(e)=>setMiddleNameRef(e.target.value)}
                    value={middleNameRef}
                  />
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-lg-5">
                  <label
                    htmlFor=""
                    style={{ paddingTop: "15px" }}
                  >
                    Last Name <span class="req-btn">*</span> :
                  </label>
                </div>
                <div className="col-lg-7">
                  <input
                    type="text"
                    required
                    className="form-control"
                    id="formGroupExampleInput3"
                    onChange={
                     (e)=>setLastNameRef(e.target.value)
                    }
                    value={lastNameRef}
                    disabled={!edit}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-5 mb-2">
                  <label
                    htmlFor=""
                    style={{ paddingTop: "15px" }}
                  >
                    Company Name{" "}
                  </label>
                </div>
                <div className="col-lg-7">
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput3"
                    onChange={
                      (e)=>setCompanyNameRef(e.target.value)
                    }
                    value={companyNameRef}
                    disabled={!edit}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-5 mb-2">
                  <label
                    htmlFor=""
                    style={{ paddingTop: "15px" }}
                  >
                    Address Line 1 <span class="req-btn">*</span> :
                  </label>
                </div>
                <div className="col-lg-7 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput3"
                    required
                    onChange={
                     (e)=>setAddressLineRef(e.target.value)
                    }
                    value={addressLineRef}
                    disabled={!edit}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-5 mb-2">
                  <label
                    htmlFor=""
                    style={{ paddingTop: "15px" }}
                  >
                    Address Line 2 :
                  </label>
                </div>
                <div className="col-lg-7 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput3"
                    onChange={
                     (e)=>setAddressLineTwoRef(e.target.value)
                    }
                    value={addressLineTwoRef}
                    disabled={!edit}
                  />
                </div>
              </div> */}
                {/* <div className="row">
                <div className="col-lg-5 mb-2">
                  <label
                    htmlFor=""
                    style={{ paddingTop: "15px" }}
                  >
                    City <span class="req-btn">*</span> :
                  </label>
                </div>
                <div className="col-lg-7 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    required
                    id="formGroupExampleInput3"
                    placeholder={
                      userData
                        ? userData?.broker_Details?.city
                        : "Enter your city"
                    }
                    ref={cityRef}
                    disabled={!edit}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-5 mb-2">
                  <label
                    htmlFor=""
                    style={{ paddingTop: "15px" }}
                  >
                    State <span class="req-btn">*</span> :
                  </label>
                </div>
                <div className="col-lg-7 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    required
                    id="formGroupExampleInput3"
                    placeholder={
                      userData
                        ? userData?.broker_Details?.state
                        : "Enter your state"
                    }
                    ref={stateRef}
                    disabled={!edit}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-5 mb-2">
                  <label
                    htmlFor=""
                    style={{ paddingTop: "15px" }}
                  >
                    Zip-Code <span class="req-btn">*</span> :
                  </label>
                </div>
                <div className="col-lg-7 mb-2">
                  <input
                    type="text"
                    required
                    className="form-control"
                    id="formGroupExampleInput3"
                    placeholder={
                      userData
                        ? userData?.broker_Details?.zipCode
                        : "Enter your zipcode"
                    }
                    ref={zipcodeRef}
                    disabled={!edit}
                  />
                </div>
              </div> 
              <div className="row">
                <div className="col-lg-5 mb-2">
                  <label
                    htmlFor=""
                    style={{ paddingTop: "15px" }}
                  >
                    Phone Number <span class="req-btn">*</span> :
                  </label>
                </div>
                <div className="col-lg-7">
                  <input
                    type="text"
                    required
                    className="form-control"
                    id="formGroupExampleInput3"
                    placeholder={
                      userData
                        ? userData?.broker_Details?.phoneNumber
                        : "Enter your phoneNumber"
                    }
                    ref={phoneNumberRef}
                    disabled={!edit}
                  />
                </div>
              </div>*/}
                {/* <div className="row">
                <div className="col-lg-5 mb-2">
                  <label
                    htmlFor=""
                    style={{ paddingTop: "15px" }}
                  >
                    Mortgage Brokerage Lic. No. <span class="req-btn">*</span> :
                  </label>
                </div>
                <div className="col-lg-7">
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput3"
                    placeholder={
                      userData
                        ? userData?.broker_Details?.mortageBrokerLicNo
                        : "Enter your Bokerage Lic No"
                    }
                    ref={mortgageBrokrageLicNoRef}
                    disabled={!edit}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-5">
                  <label
                    htmlFor=""
                    style={{ paddingTop: "15px" }}
                  >
                    Mortgage Broker Licence No. <span class="req-btn">*</span> :
                  </label>
                </div>
                <div className="col-lg-7">
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput3"
                    placeholder={
                      userData
                        ? userData?.broker_Details?.mortageBrokerLicNo
                        : "Enter your Broker Lic No"
                    }
                    ref={mortgageBrokerLicNoRef}
                    disabled={!edit}
                  />
                </div>
              </div> */}
                {edit && (
                  <div className="row mt-4">
                    <div className="col-xl-12">
                      <div
                        className="my_profile_setting_input"
                        style={{ textAlign: "center" }}
                      >
                        <button
                          className="btn btn5 m-1"
                          onClick={() => setShowCard(true)}
                        >
                          Cancel
                        </button>
                        <button className="btn btn5" onClick={onUpdatHandler}>
                          {userData?.broker_Details
                            ? "Update Profile"
                            : "Create Profile"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
