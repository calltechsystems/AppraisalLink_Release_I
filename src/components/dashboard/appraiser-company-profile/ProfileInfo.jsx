"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { encryptionData } from "../../../utils/dataEncryption";
import axios from "axios";
import { CldUploadWidget } from "next-cloudinary";
import toast from "react-hot-toast";
import { province } from "../create-listing/data";
import { designation } from "../create-listing/data";
import Link from "next/link";

const ProfileInfo = ({ setProfileCount, setShowCard }) => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  let userData = JSON.parse(localStorage.getItem("user")) || {};
  const router = useRouter();

  const [selectedImage2, setSelectedImage2] = useState({
    name: "uploaded_file.pdf",
    url: userData?.appraiser_Details?.lenderListUrl || "",
  });
  const [SelectedImage, setSelectedImage] = useState(
    userData?.appraiserCompany_Datails?.profileImage ||
      "/assets/images/home/placeholder_01.jpg"
  );

  const hiddenStyle = { backgroundColor: "#E8F0FE", display: "none" };
  const viewStyle = { backgroundColor: "#E8F0FE", display: "block" };
  const [edit, setEdit] = useState(true);

  const [firstNameRef, setFirstNameRef] = useState(
    userData?.appraiserCompany_Datails?.firstName || ""
  );

  const [SMSAlert, setSMSAlert] = useState(false);

  const [licenseNumber, setLicenseNumber] = useState(
    userData?.appraiserCompany_Datails?.licenseNumber || ""
  );

  const [emailId, setEmailId] = useState(
    userData?.appraiserCompany_Datails?.emailId || ""
  );

  const [cellNumber, setCellNumber] = useState(
    userData?.appraiserCompany_Datails?.cellNumber || ""
  );

  const [lastNameRef, setLastNameRef] = useState(
    userData?.appraiserCompany_Datails?.lastName || ""
  );
  const [companyNameRef, setCompanyNameRef] = useState(
    userData?.appraiserCompany_Datails?.appraiserCompanyName || ""
  );

  const [addressLineRef, setAddressLineRef] = useState(
    userData?.appraiserCompany_Datails?.addressLineOne || ""
  );
  const [addressLineTwoRef, setAddressLineTwoRef] = useState(
    userData?.appraiserCompany_Datails?.addressLineTwo || ""
  );

  const [cityRef, setCityRef] = useState(
    userData?.appraiserCompany_Datails?.city || ""
  );
  const [stateRef, setStateRef] = useState(
    userData?.appraiserCompany_Datails?.state || ""
  );
  const [zipcodeRef, setZipcodeRef] = useState(
    userData?.appraiserCompany_Datails?.postalCode || ""
  );
  const [phoneNumberRef, setPhoneNumberRef] = useState(
    userData?.appraiserCompany_Datails?.phoneNumber || ""
  );

  const [officeContactFirstName, setOfficeContactFirstName] = useState(
    userData.appraiserCompany_Datails?.officeContactFirstName || ""
  );

  const [officeContactLastName, setOfficeContactLastName] = useState(
    userData?.appraiserCompany_Datails?.officeContactLastName || ""
  );

  const [officeContactEmail, setOfficeContactEmail] = useState(
    userData?.appraiserCompany_Datails?.officeContactEmail || ""
  );

  // const [designation, setDesignation] = useState(
  //   userData?.brokerage_Details?.designation || ""
  // );

  const [officeContactPhone, setOfficeContactPhone] = useState(
    userData?.appraiserCompany_Datails?.officeContactPhone || ""
  );

  const handleUpload2 = (result) => {
    // Handle the image upload result here
    console.log("handleUpload called", result.info);
    setSelectedImage2({
      url: result.info.secure_url,
      name: result.info.original_filename + "." + result.info.format,
    });
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

  const handleInputCellChange = (e) => {
    const inputValue = e.target.value;

    // Allow only numeric input
    const numericValue = inputValue.replace(/\D/g, "");

    // Restrict to 10 digits
    const truncatedValue = numericValue.slice(0, 10);
    if (truncatedValue.length === 10) {
      setCellNumber(truncatedValue);
    }

    setCellNumber(truncatedValue);
  };

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
    // const firstName = firstNameRef;
    // const lastName = lastNameRef;
    // const adressLine1 = addressLineRef;
    // const city = cityRef;
    // const state = stateRef;
    // const zipCode = zipcodeRef;
    // const phoneNumber = phoneNumberRef;

    // const adressLine2 = addressLineTwoRef;
    // const middleName = middleNameRef;
    // const companyName = companyNameRef;

    if (
      (!firstNameRef ||
        !lastNameRef ||
        !companyNameRef ||
        !phoneNumberRef ||
        !licenseNumber ||
        !stateRef ||
        !zipcodeRef ||
        !selectedImage2.url ||
        !addressLineRef ||
        !emailId ||
        !cityRef) &&
      !userData
    ) {
      toast.error("All marked fields arent filled !!");
    } else {
      let count = 9;

      // const percentage = Math.floor(count / 13) * 100;
      // setProfileCount(percentage);

      const payload = {
        id: userData.userId,
        token: userData.token,
        firstName: firstNameRef,
        lastName: lastNameRef,
        appraiserCompanyName: companyNameRef,
        licenseNumber: licenseNumber,
        addressLineOne: addressLineRef,
        addressLineTwo: addressLineTwoRef,
        officeContactFirstName: officeContactFirstName,
        officeContactLastName: officeContactLastName,
        officeContactEmail: officeContactEmail,
        city: cityRef,
        state: stateRef,
        lenderListUrl: selectedImage2.url,
        postalCode: zipcodeRef,
        phoneNumber: phoneNumberRef,
        officeContactPhone: officeContactPhone,
        cellNumber: cellNumber,
        emailId: emailId,
      };

      if (SMSAlert && !phoneNumberRef) {
        toast.error(
          "As SMS Alert is selected but phone number is not provided so SMS Alert will not work properly!"
        );
      }

      toast.loading("Updating ...");
      const encryptedData = encryptionData(payload);
      axios
        .put("/api/updateAppraiserCompanyProfile", encryptedData)
        .then((res) => {
          toast.success("Successfully Updated Profile!");

          let data = userData;
          console.log(res.data.userData);
          data.appraiserCompany_Datails = res.data.userData.appraiserCompany;
          localStorage.removeItem("user");
          localStorage.setItem("user", JSON.stringify(data));
          setShowCard(true);
          router.push("/appraiser-company-dashboard");
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
        {!edit && (
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
        )}
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
                            style={{ marginLeft: "0px" }}
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
                  <h3 className="heading-forms">
                    Appraiser Company Information
                  </h3>
                  {/* <hr /> */}
                  <div className="col-lg-12 mb-3 mt-2">
                    <div className="row">
                      <div className="col-lg-4">
                        <label
                          className="text-color"
                          htmlFor=""
                          style={{ paddingTop: "10px" }}
                        >
                          Appraiser Company Name <span class="req-btn">*</span>
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          type="text"
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
                          style={{ paddingTop: "10px" }}
                        >
                          Primary Contact First Name{" "}
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
                          disabled={!edit}
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
                          disabled={!edit}
                          value={middleNameRef}
                          onChange={(e) => setMiddleNameRef(e.target.value)}
                        />
                      </div>
                    </div>
                  </div> */}
                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-4">
                        <label
                          className="text-color"
                          htmlFor=""
                          style={{ paddingTop: "10px" }}
                        >
                          Primary Contact Last Name{" "}
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
                          style={{ paddingTop: "10px" }}
                        >
                          Phone Number(Primary) <span class="req-btn">*</span>
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
                          onChange={(e) => handleInputChange(e)}
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
                          style={{ paddingTop: "10px" }}
                        >
                          Cell Number{" "}
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          type="text"
                          className="form-control"
                          id="formGroupExampleInput3"
                          style={{ backgroundColor: "#E8F0FE" }}
                          value={cellNumber}
                          onChange={(e) => handleInputCellChange(e)}
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
                          style={{ paddingTop: "10px" }}
                        >
                          Licence No <span class="req-btn">*</span>
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          type="email"
                          className="form-control"
                          required
                          id="formGroupExampleInput3"
                          style={{ backgroundColor: "#E8F0FE" }}
                          value={licenseNumber}
                          onChange={(e) => setLicenseNumber(e.target.value)}
                          disabled={!edit}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row mt-1">
                    <div className="col-lg-4">
                      <label
                        htmlFor=""
                        style={{
                          paddingTop: "10px",
                          fontWeight: "bold",
                          color: "#2e008b",
                        }}
                      >
                        Add Lender List <span class="req-btn">*</span>
                      </label>
                    </div>
                    <div className="col-lg-3">
                      <CldUploadWidget
                        onUpload={handleUpload2}
                        uploadPreset="mpbjdclg"
                        options={{
                          cloudName: "dcrq3m6dx", // Your Cloudinary upload preset
                          maxFiles: 1,
                        }}
                      >
                        {({ open }) => (
                          <div>
                            <button
                              className="btn btn-color"
                              style={{ marginLeft: "10px" }}
                              onClick={open} // This will open the upload widget
                            >
                              Upload +
                            </button>
                          </div>
                        )}
                      </CldUploadWidget>
                    </div>
                    <div className="col-lg-5 mt-1">
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        href={selectedImage2.url}
                      >
                        {selectedImage2.name}
                      </Link>
                    </div>{" "}
                  </div>

                  <div className="col-lg-12 mb-3 mt-2">
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
                            onSelect={() => setSMSAlert(!SMSAlert)}
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
                  <h3 className="heading-forms mt-4">Address</h3>
                  {/* <hr /> */}

                  <div className="col-lg-12 mb-3 mt-2">
                    <div className="row">
                      <div className="col-lg-4">
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
                          value={addressLineRef}
                          onChange={(e) => setAddressLineRef(e.target.value)}
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
                          required
                          value={addressLineTwoRef}
                          onChange={(e) => setAddressLineTwoRef(e.target.value)}
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
                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-4">
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
                          disabled={!edit}
                        />
                      </div>
                    </div>
                  </div>

                  <h3 className="mt-4">Other Details</h3>
                  <hr />

                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-4">
                        <label
                          className="text-color"
                          htmlFor=""
                          style={{ paddingTop: "10px" }}
                        >
                          Office Contact First Name
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          type="text"
                          className="form-control"
                          id="formGroupExampleInput3"
                          style={{ backgroundColor: "#E8F0FE" }}
                          required
                          value={officeContactFirstName}
                          onChange={(e) =>
                            setOfficeContactFirstName(e.target.value)
                          }
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
                          style={{ paddingTop: "10px" }}
                        >
                          Office Contact Last Name
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          type="text"
                          className="form-control"
                          id="formGroupExampleInput3"
                          style={{ backgroundColor: "#E8F0FE" }}
                          required
                          value={officeContactLastName}
                          onChange={(e) =>
                            setOfficeContactLastName(e.target.value)
                          }
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
                          style={{ paddingTop: "10px" }}
                        >
                          Office Contact Email
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          type="text"
                          className="form-control"
                          id="formGroupExampleInput3"
                          style={{ backgroundColor: "#E8F0FE" }}
                          required
                          value={officeContactEmail}
                          onChange={(e) =>
                            setOfficeContactEmail(e.target.value)
                          }
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
                          style={{ paddingTop: "10px" }}
                        >
                          Office Contact Phone
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          type="text"
                          className="form-control"
                          id="formGroupExampleInput3"
                          style={{ backgroundColor: "#E8F0FE" }}
                          required
                          value={officeContactPhone}
                          onChange={(e) =>
                            setOfficeContactPhone(e.target.value)
                          }
                          disabled={!edit}
                        />
                      </div>
                    </div>
                  </div>
                  {/* <h3 className="mt-4">Other Details</h3>
                  <hr />

                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-4">
                        <label htmlFor="" style={{ paddingTop: "10px" }}>
                          Commission Rate (Only Numbers)
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          type="text"
                          className="form-control"
                          id="formGroupExampleInput3"
                          style={{ backgroundColor: "#E8F0FE" }}
                          value={commissionRate}
                          onChange={(e) => setCommissionRate(e.target.value)}
                          disabled={!edit}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-4">
                        <label htmlFor="" style={{ paddingTop: "10px" }}>
                          Max Number of Assigned Orders
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          type="text"
                          className="form-control"
                          id="formGroupExampleInput3"
                          style={{ backgroundColor: "#E8F0FE" }}
                          value={maxNumberOfAssignedOrders}
                          onChange={(e) => setMaxNumberOfAssignedOrders(e.target.value)}
                          disabled={!edit}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-4">
                        <label htmlFor="" style={{ paddingTop: "10px" }}>
                          Review Appraiser Share (Only Numbers)
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          type="text"
                          className="form-control"
                          id="formGroupExampleInput3"
                          style={{ backgroundColor: "#E8F0FE" }}
                          // value={assistantFirstName}
                          // onChange={(e) =>
                          //   setAssistantFirstName(e.target.value)
                          // }
                          // disabled={!edit}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-4">
                        <label htmlFor="" style={{ paddingTop: "10px" }}>
                          Designation
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          type="text"
                          className="form-control"
                          id="formGroupExampleInput3"
                          style={{ backgroundColor: "#E8F0FE" }}
                          value={designation}
                          onChange={(e) => setDesignation(e.target.value)}
                          disabled={!edit}
                        />
                      </div>
                    </div>
                  </div> */}
                  {/* <div className="row">
                  <div className="col-lg-6">
                    <div className="col-12 mb-2">
                      <label htmlFor="" style={{ paddingTop: "10px" }}>
                        Licence Number
                      </label>
                    </div>
                    <div className="col-12 mb-2">
                      <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput3"
                        style={{ backgroundColor: "#E8F0FE" }}
                        value={licenseNo}
                        onChange={(e) => setLicenseNo(e.target.value)}
                        disabled={!edit}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="col-12 mb-2">
                      <label htmlFor="" style={{ paddingTop: "10px" }}>
                        Brokerage Name
                      </label>
                    </div>
                    <div className="col-12 mb-2">
                      <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput3"
                        style={{ backgroundColor: "#E8F0FE" }}
                        value={brokerageName}
                        onChange={(e) => setBrokerageName(e.target.value)}
                        disabled={!edit}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="col-12 mb-2">
                      <label htmlFor="" style={{ paddingTop: "10px" }}>
                        Assistant First Name
                      </label>
                    </div>
                    <div className="col-12 mb-2">
                      <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput3"
                        style={{ backgroundColor: "#E8F0FE" }}
                        value={assistantFirstName}
                        onChange={(e) => setAssistantFirstName(e.target.value)}
                        disabled={!edit}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="col-12 mb-2">
                      <label htmlFor="" style={{ paddingTop: "10px" }}>
                        Assistant Last Name
                      </label>
                    </div>
                    <div className="col-12 mb-2">
                      <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput3"
                        style={{ backgroundColor: "#E8F0FE" }}
                        value={assistantLastName}
                        onChange={(e) => setAssistantLastName(e.target.value)}
                        disabled={!edit}
                      />
                    </div>
                  </div>
                </div> */}
                  {edit && (
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
                            {userData?.appraiserCompany_Datails
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
      </div>
    </>
  );
};

export default ProfileInfo;
