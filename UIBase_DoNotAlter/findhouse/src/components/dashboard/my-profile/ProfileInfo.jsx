"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { encryptionData } from "../../../utils/dataEncryption";
import axios from "axios";
import { CldUploadWidget } from "next-cloudinary";
import toast from "react-hot-toast";

const ProfileInfo = ({ setProfileCount, setShowCard }) => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  let userData = JSON.parse(localStorage.getItem("user")) || {};
  const router = useRouter();

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
    userData?.broker_Details?.state || ""
  );
  const [zipcodeRef, setZipcodeRef] = useState(
    userData?.broker_Details?.zipCode || ""
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
    const state = stateRef !== "" ? stateRef : userData.broker_Details.state;
    const zipCode =
      zipcodeRef !== "" ? zipcodeRef : userData.broker_Details.zipCode;
    const phoneNumber =
      phoneNumberRef !== ""
        ? phoneNumberRef
        : userData.broker_Details.phoneNumber;
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
      middleNameRef !== "" ? middleNameRef : userData?.broker_Details?.middleName;
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
        !adressLine1 ||
        !city ||
        !state ||
        !zipCode ||
        !phoneNumber ||
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
        companyName: companyName,
        licenseNo: mortageBrokerLicNo,
        brokerageName: firstName,
        adressLine1: adressLine1,
        adressLine2: adressLine2,
        city: city,
        state: state,
        zipCode: zipCode,
        area: city,
        phoneNumber: phoneNumber,
        mortageBrokerLicNo: mortageBrokerLicNo,
        mortgageBrokerageLicNoRef: mortageBrokerageLicNo,
        profileImage: SelectedImage,
      };

      // console.log(payload);

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
                            style={{ }}
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
                  <div className="col-lg-4">
                    <div className="col-12">
                      <label
                        className="text-color"
                        htmlFor=""
                        style={{ paddingTop: "15px" }}
                      >
                        First Name <span class="req-btn">*</span>
                      </label>
                    </div>
                    <div className="col-12 mb-2">
                      <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput3"
                        style={{ backgroundColor: "aliceblue" }}
                        required
                        value={firstNameRef}
                        onChange={(e) => setFirstNameRef(e.target.value)}
                        disabled={!edit}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="col-12">
                      <label
                        className="text-color"
                        htmlFor=""
                        style={{ paddingTop: "15px" }}
                      >
                        Middle Name
                      </label>
                    </div>
                    <div className="col-12 mb-2">
                      <input
                        type="text"
                        required
                        className="form-control"
                        style={{ backgroundColor: "aliceblue" }}
                        id="formGroupExampleInput3"
                        disabled={!edit}
                        value={middleNameRef}
                        onChange={(e) => setMiddleNameRef(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="col-12">
                      <label
                        className="text-color"
                        htmlFor=""
                        style={{ paddingTop: "15px" }}
                      >
                        Last Name <span class="req-btn">*</span>
                      </label>
                    </div>
                    <div className="col-12 mb-2">
                      <input
                        type="text"
                        required
                        className="form-control"
                        style={{ backgroundColor: "aliceblue" }}
                        id="formGroupExampleInput3"
                        value={lastNameRef}
                        onChange={(e) => setLastNameRef(e.target.value)}
                        disabled={!edit}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="col-12 mb-2">
                      <label
                        className="text-color"
                        htmlFor=""
                        style={{ paddingTop: "15px" }}
                      >
                        Company Name{" "}
                      </label>
                    </div>
                    <div className="col-12 mb-2">
                      <input
                        type="text"
                        className="form-control"
                        style={{ backgroundColor: "aliceblue" }}
                        id="formGroupExampleInput3"
                        value={companyNameRef}
                        onChange={(e) => setCompanyNameRef(e.target.value)}
                        disabled={!edit}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="col-12 mb-2">
                      <label
                        className="text-color"
                        htmlFor=""
                        style={{ paddingTop: "15px" }}
                      >
                        Address Line 1 <span class="req-btn">*</span>
                      </label>
                    </div>
                    <div className="col-12 mb-2">
                      <input
                        type="text"
                        className="form-control"
                        style={{ backgroundColor: "aliceblue" }}
                        id="formGroupExampleInput3"
                        required
                        value={addressLineRef}
                        onChange={(e) => setAddressLineRef(e.target.value)}
                        disabled={!edit}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="col-12 mb-2">
                      <label
                        className="text-color"
                        htmlFor=""
                        style={{ paddingTop: "15px" }}
                      >
                        Address Line 2
                      </label>
                    </div>
                    <div className="col-12 mb-2">
                      <input
                        type="text"
                        className="form-control"
                        style={{ backgroundColor: "aliceblue" }}
                        id="formGroupExampleInput3"
                        value={addressLineTwoRef}
                        onChange={(e) => setAddressLineTwoRef(e.target.value)}
                        disabled={!edit}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="col-12 mb-2">
                      <label
                        className="text-color"
                        htmlFor=""
                        style={{ paddingTop: "15px" }}
                      >
                        City <span class="req-btn">*</span>
                      </label>
                    </div>
                    <div className="col-12 mb-2">
                      <input
                        type="text"
                        className="form-control"
                        style={{ backgroundColor: "aliceblue" }}
                        id="formGroupExampleInput3"
                        required
                        value={cityRef}
                        onChange={(e) => setCityRef(e.target.value)}
                        disabled={!edit}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="col-12 mb-2">
                      <label
                        className="text-color"
                        htmlFor=""
                        style={{ paddingTop: "15px" }}
                      >
                        State <span class="req-btn">*</span>
                      </label>
                    </div>
                    <div className="col-12 mb-2">
                      <input
                        type="text"
                        className="form-control"
                        style={{ backgroundColor: "aliceblue" }}
                        required
                        id="formGroupExampleInput3"
                        value={stateRef}
                        onChange={(e) => setStateRef(e.target.value)}
                        disabled={!edit}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="col-12 mb-2">
                      <label
                        className="text-color"
                        htmlFor=""
                        style={{ paddingTop: "15px" }}
                      >
                        Zip-Code <span class="req-btn">*</span>
                      </label>
                    </div>
                    <div className="col-12 mb-2">
                      <input
                        type="text"
                        className="form-control"
                        style={{ backgroundColor: "aliceblue" }}
                        required
                        id="formGroupExampleInput3"
                        onChange={(e) => handleZipCodeChange(e.target.value)}
                        value={zipcodeRef}
                        disabled={!edit}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="col-12 mb-2">
                      <label
                        className="text-color"
                        htmlFor=""
                        style={{ paddingTop: "15px" }}
                      >
                        Phone Number <span class="req-btn">*</span>
                      </label>
                    </div>
                    <div className="col-12 mb-2">
                      <input
                        type="text"
                        required
                        className="form-control"
                        style={{ backgroundColor: "aliceblue" }}
                        id="formGroupExampleInput3"
                        value={phoneNumberRef}
                        onChange={(e) => setPhoneNumberRef(e.target.value)}
                        disabled={!edit}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="col-12 mb-2">
                      <label
                        className="text-color"
                        htmlFor=""
                        style={{ paddingTop: "15px" }}
                      >
                        Email Address <span class="req-btn">*</span>
                      </label>
                    </div>
                    <div className="col-12 mb-2">
                      <input
                        type="email"
                        className="form-control"
                        style={{ backgroundColor: "aliceblue" }}
                        required
                        id="formGroupExampleInput3"
                        value={userData?.userEmail ? userData.userEmail : ""}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="col-12">
                      <label
                        className="text-color"
                        htmlFor=""
                        style={{ paddingTop: "15px" }}
                      >
                        Mortgage Brokerage Licence No.{" "}
                        <span class="req-btn">*</span>{" "}
                      </label>
                    </div>
                    <div className="col-12 mb-2">
                      <input
                        type="text"
                        required
                        className="form-control"
                        style={{ backgroundColor: "aliceblue" }}
                        id="formGroupExampleInput3"
                        value={mortgageBrokrageLicNoRef}
                        onChange={(e) => setMortgageLicNoRef(e.target.value)}
                        disabled={!edit}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="col-12">
                      <label
                        className="text-color"
                        htmlFor=""
                        style={{ paddingTop: "15px" }}
                      >
                        Mortgage Broker Licence No.{" "}
                        <span class="req-btn">*</span>{" "}
                      </label>
                    </div>
                    <div className="col-12 mb-2">
                      <input
                        type="text"
                        required
                        className="form-control"
                        style={{ backgroundColor: "aliceblue" }}
                        id="formGroupExampleInput3"
                        value={mortgageBrokerLicNoRef}
                        onChange={(e) =>
                          setMortgageBrokerLicNoRef(e.target.value)
                        }
                        disabled={!edit}
                      />
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
                        style={{ textAlign: "end" }}
                      >
                        <button className="btn btn2 m-1">Cancel</button>
                        <button
                          className="btn btn2 btn-dark"
                          onClick={onUpdatHandler}
                        >
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
