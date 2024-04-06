"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { encryptionData } from "../../../utils/dataEncryption";
import axios from "axios";
import { CldUploadWidget } from "next-cloudinary";
import toast from "react-hot-toast";
import { province } from "../create-listing/data";
import { designations } from "../create-listing/data";
import Link from "next/link";

const ProfileInfo = ({ setProfileCount, setShowCard }) => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  let userData = JSON.parse(localStorage.getItem("user")) || {};
  const router = useRouter();

  const [SelectedImage, setSelectedImage] = useState(
    userData?.appraiser_Details?.profileImage ||
      "/assets/images/home/placeholder_01.jpg"
  );

  const hiddenStyle = { backgroundColor: "#E8F0FE", display: "none" };
  const viewStyle = { backgroundColor: "#E8F0FE", display: "block" };
  const [edit, setEdit] = useState(true);

  const [firstNameRef, setFirstNameRef] = useState(
    userData?.appraiser_Details?.firstName || ""
  );

  const [designation, setDesignation] = useState(
    userData?.appraiser_Details?.designation || ""
  );
  const [middleNameRef, setMiddleNameRef] = useState(
    userData?.appraiser_Details?.middleName || ""
  );

  const [SMSAlert, setSMSAlert] = useState(false);

  const [cellNumber, setCellNumber] = useState(
    userData?.appraiser_Details?.cellNumber || ""
  );
  const [lastNameRef, setLastNameRef] = useState(
    userData?.appraiser_Details?.lastName || ""
  );
  const [companyNameRef, setCompanyNameRef] = useState(
    userData?.appraiser_Details?.companyName || ""
  );

  const [profile, setProfile] = useState(
    userData?.appraiser_Details?.profileImage || null
  );

  const [addressLineRef, setAddressLineRef] = useState(
    userData?.appraiser_Details?.adressLine1 || ""
  );
  const [addressLineTwoRef, setAddressLineTwoRef] = useState(
    userData?.appraiser_Details?.adressLine2 || ""
  );

  const [cityRef, setCityRef] = useState(
    userData?.appraiser_Details?.city || ""
  );
  const [stateRef, setStateRef] = useState(
    userData?.appraiser_Details?.province || ""
  );
  const [zipcodeRef, setZipcodeRef] = useState(
    userData?.appraiser_Details?.postalCode || ""
  );
  const [phoneNumberRef, setPhoneNumberRef] = useState(
    userData?.appraiser_Details?.phoneNumber || ""
  );

  const [commissionRate, setCommissionRate] = useState(
    userData.appraiser_Details?.commissionRate || ""
  );

  const [emailId, setEmailId] = useState(
    userData?.appraiser_Details?.emailId || ""
  );

  const [maxNumberOfAssignedOrders, setMaxNumberOfAssignedOrders] = useState(
    userData?.appraiser_Details?.maxNumberOfAssignedOrders || ""
  );

  const [otherDesignation, setOtherDesignation] = useState("");
  const [setODesignation, setSetODesignation] = useState(false);

  const [selectedImage2, setSelectedImage2] = useState({
    name: userData?.appraiser_Details?.lenderListUrl ? "Uploaded File" : "",
    url: userData?.appraiser_Details?.lenderListUrl || "",
  });

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

    const numericValue = inputValue.replace(/\D/g, "");

    const truncatedValue = numericValue.slice(0, 10);
    if (truncatedValue.length === 10) {
      setPhoneNumberRef(truncatedValue);
    }

    setPhoneNumberRef(truncatedValue);
  };

  const handleInputCellChange = (e) => {
    const inputValue = e.target.value;

    const numericValue = inputValue.replace(/\D/g, "");

    const truncatedValue = numericValue.slice(0, 10);
    if (truncatedValue.length === 10) {
      setCellNumber(truncatedValue);
    }

    setCellNumber(truncatedValue);
  };

  const [streetName, setStreetName] = useState(
    userData?.appraiser_Details?.streetName || ""
  );
  const [streetNumber, setStreetNumber] = useState(
    userData.appraiser_Details?.streetNumber || ""
  );
  const [apartmentNo, setApartmentNo] = useState(
    userData?.appraiser_Details?.apartmentNo || ""
  );

  console.log(stateRef);
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
    // const unit = unit;
    const adressLine2 = addressLineTwoRef;
    const middleName = middleNameRef;
    const companyName = companyNameRef;
    // const emailId = emailId;
    const phoneNumberRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    const cellNumberRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    const nameRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for email validation

    if (
      nameRegex.test(firstName) === false ||
      (middleName.trim() !== "" && nameRegex.test(middleName) === false) ||
      nameRegex.test(lastName) === false
    ) {
      toast.error("Appraiser Name should be valid ");
    } else if (phoneNumberRegex.test(phoneNumber) === false || !phoneNumber) {
      toast.error("Enter a Valid Phone Number Please");
    } else if (
      cellNumberRegex.test(cellNumber) === false &&
      cellNumber.trim() !== ""
    ) {
      toast.error("Enter a Valid Cell Number Please");
    } else if (emailRegex.test(emailId) === false) {
      toast.error("Enter a Valid Email Address Please");
    } else if (
      (!firstName ||
        !lastName ||
        !streetName ||
        !streetNumber ||
        !city ||
        !state ||
        !zipCode ||
        !province ||
        !streetName ||
        !streetName ||
        !selectedImage2.name ||
        !emailId ||
        !phoneNumber) &&
      !userData
    ) {
      toast.error("All marked fields arent filled !!");
    } else {
      const payload = {
        id: userData.userId,
        token: userData.token,
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        companyName: companyName,
        lenderListUrl: selectedImage2.url,
        streetNumber: streetNumber,
        apartmentNo: apartmentNo,
        cellNumber: cellNumber,
        streetName: streetName,
        commissionRate: commissionRate,
        maxNumberOfAssignedOrders: maxNumberOfAssignedOrders,
        designation: designation,
        city: city,
        province: state,
        postalCode: zipCode,
        area: "",
        phoneNumber: phoneNumber,
        profileImage: SelectedImage,
        emailId: emailId,
      };
      if (
        !payload.lastName ||
        !payload.firstName ||
        !payload.designation ||
        !payload.phoneNumber ||
        !payload.emailId ||
        // !payload.companyName ||
        !payload.lenderListUrl ||
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
          .put("/api/updateAppraiserProfile", encryptedData)
          .then((res) => {
            toast.success("Successfully Updated Profile!");
            console.log(res.data.userData);
            let data = userData;
            data.appraiser_Details = res.data.userData.appraiser;
            localStorage.removeItem("user");
            localStorage.setItem("user", JSON.stringify(data));
            setShowCard(true);
            router.push("/appraiser-dashboard");
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
              <div className="col-lg-3 mb-5 text-center">
                <div className="wrap-custom-file">
                  <img
                    style={{ borderRadius: "50%" }}
                    src={SelectedImage}
                    alt="Uploaded Image"
                  />
                  {edit && (
                    <div className="">
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, 1)}
                      />
                    </div>
                  )}
                  {/*edit && (
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
                      )*/}
                </div>
              </div>
              <div className="col-lg-9">
                <div className="row mb-2">
                  <h3 className="heading-forms">Appraiser Information</h3>
                  {/* <hr /> */}
                  <div className="col-lg-12 mb-3 mt-2">
                    <div className="row">
                      <div className="col-lg-4">
                        <label
                          htmlFor=""
                          style={{ paddingTop: "10px", color: "#2e008b" }}
                        >
                          First Name <span class="req-btn">*</span>
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
                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-4">
                        <label
                          htmlFor=""
                          style={{ paddingTop: "10px", color: "#2e008b" }}
                        >
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
                  </div>
                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-4">
                        <label
                          htmlFor=""
                          style={{ paddingTop: "10px", color: "#2e008b" }}
                        >
                          Last Name <span class="req-btn">*</span>
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
                          htmlFor=""
                          style={{ paddingTop: "10px", color: "#2e008b" }}
                        >
                          Company Name{" "}
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
                          htmlFor=""
                          style={{ paddingTop: "10px", color: "#2e008b" }}
                        >
                          Phone Number(Primary) <span class="req-btn">*</span>
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          type="phone"
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
                          htmlFor=""
                          style={{ paddingTop: "10px", color: "#2e008b" }}
                        >
                          Cell Number
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
                          htmlFor=""
                          style={{ paddingTop: "10px", color: "#2e008b" }}
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
                          htmlFor=""
                          style={{ paddingTop: "10px", color: "#2e008b" }}
                        >
                          Designation <span class="req-btn">*</span>
                        </label>
                      </div>
                      <div className="col-lg-4">
                        <select
                          required
                          className="form-select"
                          data-live-search="true"
                          data-width="100%"
                          value={designation}
                          onChange={(e) => setDesignation(e.target.value)}
                          // disabled={!edit}
                          style={{
                            backgroundColor: "#E8F0FE",
                            color: "black",
                          }}
                        >
                          {designations.map((item, index) => {
                            return (
                              <option key={item.id} value={item.value}>
                                {item.type}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      {setODesignation && (
                        <div className="col-lg-3" id="other-div">
                          <input
                            required
                            // style={setODesignation ? viewStyle : hiddenStyle}
                            onChange={(e) =>
                              setOtherDesignation(e.target.value)
                            }
                            value={otherDesignation}
                            type="text"
                            className="form-control"
                            id="formGroupExampleInput3"
                            style={{ backgroundColor: "#E8F0FE" }}
                            maxLength={30}
                          />
                        </div>
                      )}
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
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, 2)}
                      />
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
                  <div className="col-lg-12 mb-2 mt-3">
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
                            onSelect={() => setSMSAlert(true)}
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

                  <h3 className="heading-forms mt-4">Address</h3>
                  {/* <hr /> */}
                  <div className="col-lg-12 mb-3 mt-2">
                    <div className="row">
                      <div className="col-lg-4">
                        <label
                          htmlFor=""
                          style={{ paddingTop: "10px", color: "#2e008b" }}
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
                          disabled={!edit}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 mb-3">
                    <div className="row">
                      <div className="col-lg-4">
                        <label
                          htmlFor=""
                          style={{ paddingTop: "10px", color: "#2e008b" }}
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
                          value={apartmentNo}
                          onChange={(e) => setApartmentNo(e.target.value)}
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
                          htmlFor=""
                          style={{ paddingTop: "10px", color: "#2e008b" }}
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
                          htmlFor=""
                          style={{ paddingTop: "10px", color: "#2e008b" }}
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
                          onChange={(e) => setStateRef(e.target.value)}
                          value={stateRef}
                          disabled={!edit}
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
                      <div className="col-lg-4">
                        <label
                          htmlFor=""
                          style={{ paddingTop: "10px", color: "#2e008b" }}
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

                  {edit && (
                    <div className="row mt-4">
                      <div className="col-xl-12">
                        <div
                          className="my_profile_setting_input"
                          style={{ textAlign: "end" }}
                        >
                          <button
                            className="btn btn5 m-1"
                            // onClick={cancelHandler}
                            onClick={() => setShowCard(true)}
                          >
                            Cancel
                          </button>
                          <button
                            className="btn btn2 btn-dark"
                            onClick={onUpdatHandler}
                          >
                            {userData?.appraiser_Details
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
